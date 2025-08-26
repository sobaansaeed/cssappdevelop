from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import uuid
from typing import Optional
import json

from models import EssayRequest, EssayResponse, GradingResult
from services.pdf_service import PDFService
from services.ai_service import AIService
from services.storage_service import StorageService
from services.pdf_generator import PDFGenerator

app = FastAPI(
    title="Essay Grading API",
    description="AI-powered essay grading system with PDF annotation",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
pdf_service = PDFService()
ai_service = AIService()
storage_service = StorageService()
pdf_generator = PDFGenerator()

@app.get("/")
async def root():
    return {"message": "Essay Grading API is running", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "services": {
        "pdf_service": "available",
        "ai_service": "available",
        "storage_service": "available"
    }}

@app.post("/upload-essay", response_model=EssayResponse)
async def upload_essay(request: EssayRequest):
    """
    Submit essay text and get it graded with annotations
    """
    try:
        # Validate input
        if not request.essay_text or len(request.essay_text.strip()) < 100:
            raise HTTPException(status_code=400, detail="Essay text must be at least 100 characters long")
        
        if len(request.essay_text) > 15000:
            raise HTTPException(status_code=400, detail="Essay text must be less than 15,000 characters")
        
        # Generate unique essay ID
        essay_id = str(uuid.uuid4())
        
        # Grade essay using AI
        grading_result = await ai_service.grade_essay(request.essay_text)
        
        # Generate annotated PDF (create a simple text-based PDF)
        annotated_pdf_path = await pdf_generator.create_annotated_pdf_from_text(
            essay_text=request.essay_text,
            grading_result=grading_result,
            essay_id=essay_id
        )
        
        # Store results
        await storage_service.store_essay_result(
            essay_id=essay_id,
            original_text=request.essay_text,
            grading_result=grading_result,
            annotated_pdf_path=annotated_pdf_path
        )
        
        return EssayResponse(
            essay_id=essay_id,
            overall_score=grading_result.overall_score,
            category_scores=grading_result.category_scores,
            summary_feedback=grading_result.summary_feedback,
            submission_type=grading_result.submission_type,
            word_count=grading_result.word_count,
            examiner_remarks=grading_result.examiner_remarks,
            message="Essay graded successfully"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing essay: {str(e)}")

@app.post("/upload-pdf", response_model=EssayResponse)
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a PDF essay and get it graded with annotations
    """
    try:
        # Validate file
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are accepted")
        
        if file.size > 10 * 1024 * 1024:  # 10MB limit
            raise HTTPException(status_code=400, detail="File size must be less than 10MB")
        
        # Generate unique essay ID
        essay_id = str(uuid.uuid4())
        
        # Extract text from PDF
        essay_text = await pdf_service.extract_text(file)
        
        if not essay_text or len(essay_text.strip()) < 100:
            raise HTTPException(status_code=400, detail="PDF appears to be empty or contains insufficient text")
        
        # Grade essay using AI
        grading_result = await ai_service.grade_essay(essay_text)
        
        # Generate annotated PDF
        annotated_pdf_path = await pdf_generator.create_annotated_pdf(
            original_file=file,
            grading_result=grading_result,
            essay_id=essay_id
        )
        
        # Store results
        await storage_service.store_essay_result(
            essay_id=essay_id,
            original_text=essay_text,
            grading_result=grading_result,
            annotated_pdf_path=annotated_pdf_path
        )
        
        return EssayResponse(
            essay_id=essay_id,
            overall_score=grading_result.overall_score,
            category_scores=grading_result.category_scores,
            summary_feedback=grading_result.summary_feedback,
            submission_type=grading_result.submission_type,
            word_count=grading_result.word_count,
            examiner_remarks=grading_result.examiner_remarks,
            message="Essay graded successfully"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing essay: {str(e)}")

@app.get("/results/{essay_id}")
async def get_results(essay_id: str):
    """
    Retrieve graded PDF results by essay ID
    """
    try:
        result = await storage_service.get_essay_result(essay_id)
        if not result:
            raise HTTPException(status_code=404, detail="Essay not found")
        
        # Return the annotated PDF file
        if os.path.exists(result['annotated_pdf_path']):
            return FileResponse(
                result['annotated_pdf_path'],
                media_type='application/pdf',
                filename=f"graded_essay_{essay_id}.pdf"
            )
        else:
            raise HTTPException(status_code=404, detail="Graded PDF not found")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving results: {str(e)}")

@app.get("/results/{essay_id}/json")
async def get_results_json(essay_id: str):
    """
    Retrieve grading results as JSON (without PDF)
    """
    try:
        result = await storage_service.get_essay_result(essay_id)
        if not result:
            raise HTTPException(status_code=404, detail="Essay not found")
        
        return {
            "essay_id": essay_id,
            "overall_score": result['grading_result']['overall_score'],
            "category_scores": result['grading_result']['category_scores'],
            "summary_feedback": result['grading_result']['summary_feedback'],
            "submission_type": result['grading_result']['submission_type'],
            "word_count": result['grading_result']['word_count'],
            "examiner_remarks": result['grading_result']['examiner_remarks'],
            "graded_at": result['graded_at']
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving results: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
