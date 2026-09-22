import { Paper } from '../src/types';

interface SearchOptions {
  query: string;
  topic?: string;
  question?: string;
  keywords?: string;
  limit?: number;
}

/**
 * Clean and normalize text strings from API results
 */
function cleanText(text: string): string {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').replace(/[\n\r]+/g, ' ').trim();
}

/**
 * Calculate simple lexical relevance score between paper content and user query terms
 */
function calculateRelevance(
  title: string,
  abstract: string,
  queryTerms: string[]
): number {
  if (!queryTerms.length) return 0.75;
  const content = `${title} ${abstract}`.toLowerCase();
  let matches = 0;
  for (const term of queryTerms) {
    if (term.length < 3) continue;
    if (content.includes(term.toLowerCase())) {
      matches += 1;
    }
  }
  const base = 0.6;
  const bonus = Math.min(0.39, (matches / Math.max(queryTerms.length, 1)) * 0.4);
  return Number((base + bonus).toFixed(2));
}

/**
 * Search papers on arXiv API (Atom XML)
 */
async function searchArxiv(terms: string[], limit = 6): Promise<Paper[]> {
  const searchQuery = terms.map(t => `all:"${t.replace(/"/g, '')}"`).join('+AND+');
  const url = `http://export.arxiv.org/api/query?search_query=${searchQuery}&start=0&max_results=${limit}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return [];

    const xml = await res.text();
    const papers: Paper[] = [];
    
    // Parse entries from Atom XML
    const entryMatches = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
    for (const entry of entryMatches) {
      const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
      const summaryMatch = entry.match(/<summary>([\s\S]*?)<\/summary>/);
      const publishedMatch = entry.match(/<published>([\s\S]*?)<\/published>/);
      const idMatch = entry.match(/<id>([\s\S]*?)<\/id>/);
      const authorsMatch = entry.match(/<author>[\s\S]*?<name>([\s\S]*?)<\/name>[\s\S]*?<\/author>/g) || [];

      const title = cleanText(titleMatch ? titleMatch[1] : 'Not available');
      if (!title || title.toLowerCase().includes('arxiv.org error')) continue;

      const abstract = cleanText(summaryMatch ? summaryMatch[1] : 'Not available');
      const year = publishedMatch ? new Date(publishedMatch[1]).getFullYear() : 'Not reported';
      const paperUrl = idMatch ? idMatch[1].trim() : undefined;
      const authors = authorsMatch.map(a => {
        const name = a.match(/<name>([\s\S]*?)<\/name>/);
        return name ? cleanText(name[1]) : 'Unknown';
      });

      const paperId = `arxiv-${encodeURIComponent(title.slice(0, 30)).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
      papers.push({
        id: paperId,
        title,
        authors: authors.length > 0 ? authors : ['Not reported'],
        year,
        abstract: abstract || 'Abstract not available in record',
        source: 'arXiv',
        url: paperUrl,
        isOpenAccess: true,
        relevanceScore: calculateRelevance(title, abstract, terms),
      });
    }
    return papers;
  } catch {
    clearTimeout(timeoutId);
    return [];
  }
}

/**
 * Search papers on Semantic Scholar Graph API
 */
async function searchSemanticScholar(terms: string[], limit = 6): Promise<Paper[]> {
  const query = terms.join(' ');
  const apiKey = process.env.SEMANTIC_SCHOLAR_API_KEY;
  const headers: Record<string, string> = {};
  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }

  const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=${limit}&fields=title,authors,year,abstract,url,externalIds,isOpenAccess`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, { headers, signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return [];

    const data = await res.json();
    if (!data.data || !Array.isArray(data.data)) return [];

    const papers: Paper[] = data.data.map((item: any, idx: number) => {
      const title = cleanText(item.title || 'Not available');
      const abstract = cleanText(item.abstract || 'Abstract not available in record');
      const authors = Array.isArray(item.authors)
        ? item.authors.map((a: any) => cleanText(a.name || ''))
        : ['Not reported'];
      const doi = item.externalIds?.DOI;
      return {
        id: `s2-${item.paperId || idx}`,
        title,
        authors: authors.length > 0 ? authors : ['Not reported'],
        year: item.year || 'Not reported',
        abstract,
        source: 'Semantic Scholar' as const,
        url: item.url || (doi ? `https://doi.org/${doi}` : undefined),
        doi,
        isOpenAccess: Boolean(item.isOpenAccess),
        relevanceScore: calculateRelevance(title, abstract, terms),
      };
    });
    return papers;
  } catch {
    clearTimeout(timeoutId);
    return [];
  }
}

/**
 * Search papers on Crossref Works API
 */
async function searchCrossref(terms: string[], limit = 5): Promise<Paper[]> {
  const query = terms.join(' ');
  const url = `https://api.crossref.org/works?query=${encodeURIComponent(query)}&rows=${limit}&mailto=research-agent@example.com`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return [];

    const data = await res.json();
    const items = data.message?.items;
    if (!Array.isArray(items)) return [];

    const papers: Paper[] = items.map((item: any, idx: number) => {
      const title = Array.isArray(item.title) ? cleanText(item.title[0]) : 'Not available';
      const abstract = cleanText(item.abstract ? item.abstract.replace(/<[^>]*>/g, '') : 'Abstract not available in record');
      const authors = Array.isArray(item.author)
        ? item.author.map((a: any) => `${a.given || ''} ${a.family || ''}`.trim() || 'Unknown')
        : ['Not reported'];
      const year = item.published?.['date-parts']?.[0]?.[0] || 'Not reported';
      const doi = item.DOI;

      return {
        id: `crossref-${doi ? doi.replace(/[^a-zA-Z0-9]/g, '-') : idx}`,
        title,
        authors: authors.length > 0 ? authors : ['Not reported'],
        year,
        abstract,
        source: 'Crossref' as const,
        url: item.URL || (doi ? `https://doi.org/${doi}` : undefined),
        doi,
        isOpenAccess: false,
        relevanceScore: calculateRelevance(title, abstract, terms),
      };
    });
    return papers;
  } catch {
    clearTimeout(timeoutId);
    return [];
  }
}

/**
 * Orchestrate discovery across open research repositories, deduplicating by normalized title.
 */
export async function searchResearchPapers(options: SearchOptions): Promise<Paper[]> {
  const searchedAt = new Date().toISOString();
  const terms: string[] = [];
  if (options.topic) terms.push(...options.topic.split(/[,\s]+/).filter(Boolean));
  if (options.keywords) terms.push(...options.keywords.split(/[,\s]+/).filter(Boolean));
  if (options.question) {
    const qTerms = options.question
      .replace(/[?.,]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3 && !['what', 'how', 'when', 'where', 'which', 'could'].includes(w.toLowerCase()));
    terms.push(...qTerms);
  }
  const uniqueTerms = Array.from(new Set(terms)).slice(0, 7);

  // Parallel query with resilience
  const [arxivResults, s2Results, crossrefResults] = await Promise.allSettled([
    searchArxiv(uniqueTerms, 5),
    searchSemanticScholar(uniqueTerms, 5),
    searchCrossref(uniqueTerms, 4),
  ]);

  const allPapers: Paper[] = [];
  if (arxivResults.status === 'fulfilled') allPapers.push(...arxivResults.value);
  if (s2Results.status === 'fulfilled') allPapers.push(...s2Results.value);
  if (crossrefResults.status === 'fulfilled') allPapers.push(...crossrefResults.value);

  // Deduplicate by clean lower-case title
  const seenTitles = new Set<string>();
  const deduplicated: Paper[] = [];

  for (const paper of allPapers) {
    const norm = paper.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!norm || norm.length < 8) continue;
    if (!seenTitles.has(norm)) {
      seenTitles.add(norm);
      deduplicated.push(paper);
    }
  }

  // Sort by relevance score descending
  deduplicated.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));

  return deduplicated.slice(0, options.limit || 10).map((paper) => ({
    ...paper,
    searchedAt,
    evidenceType: paper.abstract && paper.abstract !== 'Abstract not available in record' ? 'abstract' : 'metadata',
  }));
}
