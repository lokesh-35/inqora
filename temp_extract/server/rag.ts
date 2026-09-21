import { Paper, PaperChunk, ChatMessage } from '../src/types';
import { getGeminiClient, generateGeminiContent } from './gemini';
import { RAG_CHAT_PROMPT } from './prompts';

/**
 * Split text into semantic chunks with overlap and page/section metadata
 */
export function chunkPaperText(paper: Paper, chunkSize = 800, overlap = 150): PaperChunk[] {
  const text = paper.rawText || `${paper.title}\n\nAbstract: ${paper.abstract}\n\nMethodology: ${paper.methodology || ''}\n\nResults: ${paper.keyResults || ''}\n\nLimitations: ${(paper.limitations || []).join('; ')}`;
  if (!text || text.length < 50) return [];

  const chunks: PaperChunk[] = [];
  let startIndex = 0;
  let chunkIndex = 0;

  while (startIndex < text.length) {
    const endIndex = Math.min(startIndex + chunkSize, text.length);
    let chunkText = text.slice(startIndex, endIndex);

    // Try to break at paragraph or sentence boundary
    if (endIndex < text.length) {
      const lastBreak = Math.max(chunkText.lastIndexOf('\n\n'), chunkText.lastIndexOf('. '));
      if (lastBreak > chunkSize * 0.5) {
        chunkText = chunkText.slice(0, lastBreak + 1);
        startIndex += lastBreak + 1 - overlap;
      } else {
        startIndex = endIndex - overlap;
      }
    } else {
      startIndex = endIndex;
    }

    const trimmed = chunkText.trim();
    if (trimmed.length > 40) {
      // Estimate section
      let section = 'Main Text';
      if (/abstract/i.test(trimmed.slice(0, 100))) section = 'Abstract';
      else if (/method|dataset|architecture|model/i.test(trimmed.slice(0, 100))) section = 'Methodology & Data';
      else if (/result|accuracy|performance|metric/i.test(trimmed.slice(0, 100))) section = 'Results & Findings';
      else if (/limitation|discussion|future/i.test(trimmed.slice(0, 100))) section = 'Limitations & Discussion';

      chunks.push({
        id: `${paper.id}-chunk-${chunkIndex++}`,
        paperId: paper.id,
        paperTitle: paper.title,
        section,
        text: trimmed,
      });
    }
  }

  return chunks;
}

/**
 * Compute term frequency overlap score for quick vector/lexical retrieval
 */
function scoreChunkRelevance(query: string, chunkText: string): number {
  const queryTerms = query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(t => t.length > 2);
  if (!queryTerms.length) return 0;

  const textLower = chunkText.toLowerCase();
  let score = 0;
  for (const term of queryTerms) {
    const count = (textLower.match(new RegExp(`\\b${term}`, 'g')) || []).length;
    if (count > 0) {
      score += Math.log(1 + count) * (term.length > 5 ? 1.5 : 1.0);
    }
  }
  return score;
}

/**
 * Retrieve top-k relevant chunks across all collected papers
 */
export function retrieveRelevantChunks(query: string, papers: Paper[], topK = 5): Array<{ chunk: PaperChunk; score: number }> {
  const allChunks: PaperChunk[] = [];
  for (const paper of papers) {
    const chunks = paper.chunks && paper.chunks.length > 0 ? paper.chunks : chunkPaperText(paper);
    allChunks.push(...chunks);
  }

  const scored = allChunks.map(chunk => ({
    chunk,
    score: scoreChunkRelevance(query, chunk.text),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.filter(s => s.score > 0).slice(0, topK);
}

/**
 * Perform evidence-grounded RAG Question Answering
 */
export async function answerQuestionRAG(
  question: string,
  papers: Paper[],
  history: ChatMessage[] = []
): Promise<{ text: string; sources: Array<{ paperTitle: string; passage: string; section?: string }>; isEvidenceSufficient: boolean }> {
  const relevant = retrieveRelevantChunks(question, papers, 6);
  const ai = getGeminiClient();

  if (relevant.length === 0 && papers.length === 0) {
    return {
      text: 'No papers are currently collected in the system. Please upload a research paper PDF, run a search query, or load the demo case study to begin.',
      sources: [],
      isEvidenceSufficient: false,
    };
  }

  const contextBlocks = relevant.map((item, idx) => {
    return `[Source ${idx + 1}] Paper: "${item.chunk.paperTitle}" | Section: ${item.chunk.section || 'General'}\nExcerpt: ${item.chunk.text}`;
  }).join('\n\n---\n\n');

  const sources = relevant.map(r => ({
    paperTitle: r.chunk.paperTitle,
    passage: r.chunk.text.slice(0, 240) + (r.chunk.text.length > 240 ? '...' : ''),
    section: r.chunk.section,
  }));

  if (!ai) {
    // Graceful offline/mock response grounded strictly in retrieved chunks
    if (relevant.length === 0) {
      return {
        text: 'The available papers do not provide enough evidence to answer this confidently.',
        sources: [],
        isEvidenceSufficient: false,
      };
    }

    const topItem = relevant[0];
    return {
      text: `Based on the collected literature (specifically "${topItem.chunk.paperTitle}"), the reported evidence indicates: "${topItem.chunk.text.slice(0, 300)}...". For real-time synthesized AI question answering, configure GEMINI_API_KEY.`,
      sources,
      isEvidenceSufficient: true,
    };
  }

  try {
    const prompt = `${RAG_CHAT_PROMPT}

USER QUESTION: "${question}"

RETRIEVED RESEARCH PAPER EVIDENCE:
${contextBlocks || 'No directly matching excerpts found in collected literature.'}

SUMMARY OF COLLECTED PAPERS:
${papers.map(p => `- ${p.title} (${p.year}). Methods: ${p.methodology || 'N/A'}. Dataset: ${p.dataset || 'N/A'}. Results: ${p.keyResults || 'N/A'}. Limitations: ${(p.limitations || []).join('; ')}`).join('\n')}

Provide an evidence-based answer. If evidence is insufficient, explicitly declare: "The available papers do not provide enough evidence to answer this confidently."`;

    const response = await generateGeminiContent({
      contents: prompt,
    });

    const answerText = response.text || 'The available papers do not provide enough evidence to answer this confidently.';
    const isInsufficient = answerText.toLowerCase().includes('do not provide enough evidence');

    return {
      text: answerText,
      sources: isInsufficient ? [] : sources,
      isEvidenceSufficient: !isInsufficient,
    };
  } catch (err: any) {
    console.error('RAG Gemini Error:', err);
    // Fall back to direct chunk synthesis from top retrieved evidence
    if (relevant.length > 0) {
      const topItem = relevant[0];
      return {
        text: `Based on the retrieved research evidence from "${topItem.chunk.paperTitle}" [${topItem.chunk.section || 'Extracted Section'}]:\n\n"${topItem.chunk.text.slice(0, 320)}..."\n\nThe collected papers report these specific findings for your inquiry.`,
        sources,
        isEvidenceSufficient: true,
      };
    }
    return {
      text: 'The available papers do not provide enough evidence to answer this confidently.',
      sources: [],
      isEvidenceSufficient: false,
    };
  }
}
