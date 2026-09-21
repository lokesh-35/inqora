# AI Research Evidence & Potential Gap Analysis Agent

An AI-powered academic research assistant for students, scientists, and researchers designed to discover literature, extract methodologies and datasets, compare empirical findings, group recurring limitations, identify evidence-grounded potential research gaps, and suggest rigorous future directions.

---

## 1. Project Overview & Philosophy

The **AI Research Evidence & Potential Gap Analysis Agent** accelerates systematic literature reviews by synthesizing academic papers while enforcing academic integrity.

### Crucial Epistemic Principle: Non-Claim of Absolute Novelty
In academic research, claiming that a topic has *"never been researched"* or is a *"completely new gap"* is scientifically unfounded and misleading. The agent strictly uses conservative, evidence-supported language:
- *"This may represent a potential research gap."*
- *"The reviewed literature suggests that this area is insufficiently addressed."*
- *"Among the collected papers, this limitation appears repeatedly."*
- *"Further investigation may be useful..."*

Every identified gap is explicitly anchored to supporting papers with direct evidence citations.

---

## 2. Core Features

1. **Academic Paper Discovery**: Search arXiv, Semantic Scholar, and Crossref with automated relevance scoring and title deduplication.
2. **PDF Text Extraction & Parsing**: Upload PDF research papers; extracts clean text, page numbers, and structured sections using PyMuPDF (backend) and `pdf-parse` (full-stack server).
3. **Structured Paper Information Extraction**: Uses Gemini (`gemini-3.8-flash`) to extract:
   - Title, Authors, Publication Year
   - Research Problem & Research Objective
   - Methodology & Architectures
   - Dataset, Dataset Size, and Domain Conditions
   - Quantitative Evaluation Metrics & Key Results
   - Stated Limitations, Scope Bounds & Future Work
   - Main Conclusions
4. **Comparative Literature Matrix**: Interactive side-by-side comparison table:
   | Paper | Methodology | Dataset | Key Result | Limitation |
5. **Taxonomic Limitation Grouping**: Detects recurring limitations across papers and groups them into categories (e.g. *Dataset Diversity & Environmental Realism*, *Architecture Exploration*, *Edge Deployment*).
6. **Potential Research Gap Synthesis**: Derives candidate research gaps with descriptive confidence ratings (*Strong evidence*, *Moderate evidence*, *Limited evidence*) and complete evidence traceability.
7. **Suggested Research Directions**: Generates step-by-step methodologies, model architectures (e.g., Vision Transformers, YOLOv8/v9), recommended datasets, evaluation metrics, and technology stacks.
8. **RAG Research Chatbot**: In-memory vector chunk retrieval allowing interactive Q&A grounded strictly in the collected papers. Answers honestly if evidence is insufficient: *"The available papers do not provide enough evidence to answer this confidently."*
9. **Interactive Demo Mode**: One-click pre-loaded case study (*"AI-based crop disease detection"*) featuring benchmark papers (Abdu et al., 2020; Yin et al., 2020; Ngugi et al., 2024; Mohanty et al., 2016).

---

## 3. Technology Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (responsive academic design, clean light canvas, navy/indigo accents)
- **Icons**: Lucide React
- **Animations**: Motion (`motion/react`)

### Full-Stack Server
- **Runtime**: Node.js + Express (port 3000)
- **AI Integration**: Google GenAI SDK (`@google/genai`) using `gemini-3.8-flash`
- **PDF Extraction**: `pdf-parse` / PyMuPDF pipeline
- **Search Connectors**: arXiv API, Semantic Scholar Graph API, Crossref API

### Python Backend (`backend/`)
- **Framework**: Python 3.10+ with FastAPI & Pydantic v2
- **PDF Engine**: PyMuPDF (`fitz`)
- **Vector Search**: FAISS / Vector cosine indexing

---

## 4. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set your API keys:
```env
# Required for Gemini AI inference (Paper extraction, gap synthesis, RAG)
GEMINI_API_KEY="your-google-gemini-api-key"

# Optional: Higher rate limits on Semantic Scholar paper searches
SEMANTIC_SCHOLAR_API_KEY=""
```

---

## 5. Running the Project Locally

### Option A: Full-Stack Application (Vite + Express + Gemini)

The active development server runs Express on port `3000` with hot-mounted Vite middleware:

```bash
# 1. Install dependencies
npm install

# 2. Start the unified development server
npm run dev

# 3. Open your browser
http://localhost:3000
```

### Option B: Running the Python FastAPI Backend

To run the standalone FastAPI backend located in `backend/`:

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install Python requirements
pip install -r requirements.txt

# 4. Launch FastAPI with Uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 6. REST API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health status and Gemini readiness |
| `GET` | `/api/demo-data` | Pre-loaded benchmark case study (crop disease detection) |
| `POST` | `/api/search-papers` | Queries arXiv, Semantic Scholar, and Crossref |
| `POST` | `/api/upload-paper` | Multipart PDF upload and text extraction |
| `POST` | `/api/analyze-paper` | Gemini structured extraction of methods, metrics, and limitations |
| `POST` | `/api/compare-papers` | Generates comparison matrix rows across papers |
| `POST` | `/api/analyze-gaps` | Synthesizes grouped limitations and potential research gaps |
| `POST` | `/api/suggest-research` | Generates step-by-step methodology and research directions |
| `POST` | `/api/chat` | RAG evidence-grounded chatbot answering |

---

## 7. RAG (Retrieval-Augmented Generation) Pipeline

```
Uploaded PDF or Discovered Paper
  ↓
Text Extraction (PyMuPDF / pdf-parse)
  ↓
Text Cleaning & Paragraph Boundary Normalization
  ↓
Chunking (800-token window with 150-token semantic overlap)
  ↓
Section Attribution (Abstract, Methods, Results, Discussion)
  ↓
Vector / Lexical Retrieval Score against User Query
  ↓
Top-K Relevant Chunks Formatted with Source Citations
  ↓
Gemini 3.8 Flash (with strict anti-hallucination prompt)
  ↓
Evidence-Grounded Response + Exact Paper Quotations
```

---

## 8. Academic Output Labels

All UI elements clearly distinguish source origins:
- **`Reported by Paper`**: Direct empirical finding or metric stated by the paper.
- **`Extracted Evidence`**: Short excerpt with section reference.
- **`AI Summary`**: Synthesis produced by the language model.
- **`Potential Research Gap`**: Candidate area requiring further investigation.
- **`Suggested Research Direction`**: Step-by-step proposed methodology.
- **`Demo Data`**: Indicates pre-loaded illustrative benchmark studies.

---

## 9. Limitations & Future Roadmap

- **OCR for Scanned PDFs**: Currently requires readable digital text streams; future versions will integrate Tesseract / Vision OCR for legacy scanned prints.
- **Citation Graph Mapping**: Expanding Semantic Scholar integration to visualize citation trees.
- **Exporting Reviews**: Direct export to LaTeX, BibTeX, and PRISMA systematic review tables.
