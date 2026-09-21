"""
PDF Text Extraction module using PyMuPDF (fitz)
"""

import io
from typing import Dict, Any, List
try:
    import fitz  # PyMuPDF
except ImportError:
    fitz = None

def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> Dict[str, Any]:
    """
    Extracts structured clean text from PDF bytes using PyMuPDF.
    Handles normal PDFs, multi-page PDFs, empty files, and extraction errors.
    """
    if not pdf_bytes:
        raise ValueError("Uploaded PDF file is empty.")

    if fitz is None:
        raise RuntimeError("PyMuPDF (fitz) is not installed in the python environment.")

    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    num_pages = len(doc)
    if num_pages == 0:
        raise ValueError("The uploaded PDF has 0 pages.")

    full_text_pages: List[str] = []
    page_records = []

    for page_num in range(num_pages):
        page = doc.load_page(page_num)
        page_text = page.get_text("text").strip()
        if page_text:
            full_text_pages.append(page_text)
            page_records.append({
                "page": page_num + 1,
                "text": page_text
            })

    full_text = "\n\n".join(full_text_pages).strip()
    if not full_text:
        raise ValueError("No extractable text found in PDF. Scanned images or protected PDFs require OCR.")

    return {
        "text": full_text,
        "pageCount": num_pages,
        "pages": page_records
    }
