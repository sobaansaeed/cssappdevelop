from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from datetime import datetime

class CategoryScore(BaseModel):
    score: int = Field(..., ge=0, le=100, description="Score for this category")
    feedback: str = Field(..., description="Detailed feedback for this category")

class GradingResult(BaseModel):
    overall_score: int = Field(..., ge=0, le=100, description="Overall score out of 100")
    category_scores: Dict[str, CategoryScore] = Field(..., description="Scores for each category")
    summary_feedback: str = Field(..., description="Overall feedback paragraph")
    submission_type: str = Field(..., description="Submission type (A/B/C/D/E/F/G)")
    word_count: int = Field(..., description="Actual word count of the essay")
    examiner_remarks: Dict[str, list] = Field(..., description="Examiner remarks with strengths, weaknesses, and suggestions")

class EssayRequest(BaseModel):
    essay_text: Optional[str] = Field(None, description="Essay text (if not uploading PDF)")
    rubric_type: Optional[str] = Field("default", description="Type of rubric to use")

class EssayResponse(BaseModel):
    essay_id: str = Field(..., description="Unique identifier for the essay")
    overall_score: int = Field(..., description="Overall score out of 100")
    category_scores: Dict[str, CategoryScore] = Field(..., description="Scores for each category")
    summary_feedback: str = Field(..., description="Overall feedback")
    submission_type: str = Field(..., description="Submission type (A/B/C/D/E/F/G)")
    word_count: int = Field(..., description="Actual word count")
    examiner_remarks: Dict[str, list] = Field(..., description="Examiner remarks")
    message: str = Field(..., description="Status message")

class EssayResult(BaseModel):
    essay_id: str
    original_text: str
    grading_result: GradingResult
    annotated_pdf_path: str
    graded_at: datetime
    file_size: Optional[int] = None
    word_count: Optional[int] = None

class HealthCheck(BaseModel):
    status: str
    services: Dict[str, str]
    timestamp: datetime = Field(default_factory=datetime.now)
