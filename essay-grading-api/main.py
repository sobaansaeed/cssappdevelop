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

# Progress tracking
progress_tracker = {}

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
        
        # Generate unique essay ID and task ID
        essay_id = str(uuid.uuid4())
        task_id = str(uuid.uuid4())
        
        # Initialize progress tracking
        progress_tracker[task_id] = {
            "task_id": task_id,
            "essay_id": essay_id,
            "progress": 0,
            "status": "processing",
            "message": "Starting analysis..."
        }
        
        try:
            # Update progress: Text validation complete
            progress_tracker[task_id]["progress"] = 10
            progress_tracker[task_id]["message"] = "Text validated, starting AI analysis..."
            
            # Grade essay using AI
            grading_result = await ai_service.grade_essay(request.essay_text)
            
            # Update progress: AI analysis complete
            progress_tracker[task_id]["progress"] = 70
            progress_tracker[task_id]["message"] = "AI analysis complete, generating PDF..."
            
            # Generate annotated PDF (create a simple text-based PDF)
            annotated_pdf_path = await pdf_generator.create_annotated_pdf_from_text(
                essay_text=request.essay_text,
                grading_result=grading_result,
                essay_id=essay_id
            )
            
            # Update progress: PDF generation complete
            progress_tracker[task_id]["progress"] = 90
            progress_tracker[task_id]["message"] = "PDF generated, storing results..."
            
            # Store results
            await storage_service.store_essay_result(
                essay_id=essay_id,
                original_text=request.essay_text,
                grading_result=grading_result,
                annotated_pdf_path=annotated_pdf_path
            )
            
            # Update progress: Complete
            progress_tracker[task_id]["progress"] = 100
            progress_tracker[task_id]["status"] = "completed"
            progress_tracker[task_id]["message"] = "Analysis completed successfully!"
            
            return EssayResponse(
                essay_id=essay_id,
                task_id=task_id,
                overall_score=grading_result.overall_score,
                category_scores=grading_result.category_scores,
                summary_feedback=grading_result.summary_feedback,
                submission_type=grading_result.submission_type,
                word_count=grading_result.word_count,
                examiner_remarks=grading_result.examiner_remarks,
                message="Essay graded successfully"
            )
            
        except Exception as e:
            # Update progress: Error
            progress_tracker[task_id]["progress"] = 0
            progress_tracker[task_id]["status"] = "error"
            progress_tracker[task_id]["message"] = str(e)
            raise e
        
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
        
        # Generate unique essay ID and task ID
        essay_id = str(uuid.uuid4())
        task_id = str(uuid.uuid4())
        
        # Initialize progress tracking
        progress_tracker[task_id] = {
            "task_id": task_id,
            "essay_id": essay_id,
            "progress": 0,
            "status": "processing",
            "message": "Starting PDF analysis..."
        }
        
        # Save uploaded file temporarily
        import tempfile
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name
        
        try:
            # Update progress: PDF processing started
            progress_tracker[task_id]["progress"] = 20
            progress_tracker[task_id]["message"] = "Extracting text from PDF..."
            
            # Extract text from PDF using enhanced service
            essay_text = pdf_service.extract_text_from_pdf(temp_file_path)
            
            # Update progress: Text extraction complete
            progress_tracker[task_id]["progress"] = 40
            progress_tracker[task_id]["message"] = "Text extracted, cleaning content..."
            
            # Clean the extracted text
            essay_text = pdf_service.clean_text(essay_text)
            
            # Update progress: Text cleaning complete
            progress_tracker[task_id]["progress"] = 50
            progress_tracker[task_id]["message"] = "Content cleaned, starting AI analysis..."
            
        except Exception as e:
            # Update progress: Error during PDF processing
            progress_tracker[task_id]["progress"] = 0
            progress_tracker[task_id]["status"] = "error"
            error_msg = f"Failed to extract text from PDF. The system tried enhanced extraction methods including tables and forms. Please ensure the PDF is readable and not corrupted. Error: {str(e)}"
            progress_tracker[task_id]["message"] = error_msg
            raise HTTPException(status_code=400, detail=error_msg)
        finally:
            # Clean up temporary file
            import os
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
        
        if not essay_text or len(essay_text.strip()) < 50:
            raise HTTPException(status_code=400, detail="PDF appears to be empty or contains insufficient text (minimum 50 characters required)")
        
        try:
            # Update progress: Validation complete
            progress_tracker[task_id]["progress"] = 60
            progress_tracker[task_id]["message"] = "Content validated, processing with AI..."
            
            # Grade essay using AI
            grading_result = await ai_service.grade_essay(essay_text)
            
            # Update progress: AI analysis complete
            progress_tracker[task_id]["progress"] = 80
            progress_tracker[task_id]["message"] = "AI analysis complete, generating PDF..."
            
            # Generate annotated PDF
            annotated_pdf_path = await pdf_generator.create_annotated_pdf(
                grading_result=grading_result,
                essay_id=essay_id
            )
            
            # Update progress: PDF generation complete
            progress_tracker[task_id]["progress"] = 90
            progress_tracker[task_id]["message"] = "PDF generated, storing results..."
            
            # Store results
            await storage_service.store_essay_result(
                essay_id=essay_id,
                original_text=essay_text,
                grading_result=grading_result,
                annotated_pdf_path=annotated_pdf_path
            )
            
            # Update progress: Complete
            progress_tracker[task_id]["progress"] = 100
            progress_tracker[task_id]["status"] = "completed"
            progress_tracker[task_id]["message"] = "Analysis completed successfully!"
            
        except Exception as e:
            # Update progress: Error
            progress_tracker[task_id]["progress"] = 0
            progress_tracker[task_id]["status"] = "error"
            progress_tracker[task_id]["message"] = str(e)
            raise e
        
        return EssayResponse(
            essay_id=essay_id,
            task_id=task_id,
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

@app.get("/progress/{task_id}")
async def get_progress(task_id: str):
    """
    Get progress status for a task
    """
    try:
        if task_id not in progress_tracker:
            raise HTTPException(status_code=404, detail="Task not found")
        
        return progress_tracker[task_id]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving progress: {str(e)}")

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
