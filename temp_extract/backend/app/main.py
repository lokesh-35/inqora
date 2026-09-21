"""
FastAPI application entry point for AI Research Evidence & Potential Gap Analysis Agent
"""

import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .models.schemas import (
    SearchRequest,
    AnalyzePaperRequest,
    AnalyzeGapsRequest,
    SuggestResearchRequest,
    ChatRequest,
)
from .pdf.extractor import extract_text_from_pdf_bytes

load_dotenv()

app = FastAPI(
    title="AI Research Evidence & Potential Gap Analysis Agent API",
    description="REST API for academic literature discovery, PDF text extraction, evidence analysis, research gap synthesis, and RAG Q&A.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "AI Research Evidence & Potential Gap Analysis Agent (FastAPI)",
        "version": "1.0.0",
        "geminiConfigured": bool(os.getenv("GEMINI_API_KEY"))
    }

@app.post("/api/upload-paper")
async def upload_paper(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    contents = await file.read()
    try:
        extracted = extract_text_from_pdf_bytes(contents)
        return {
            "title": file.filename.replace(".pdf", ""),
            "rawText": extracted["text"],
            "pageCount": extracted["pageCount"],
            "textPreview": extracted["text"][:600]
        }
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"PDF extraction error: {str(e)}")
