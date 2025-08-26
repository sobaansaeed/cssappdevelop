import os
import json
import logging
from datetime import datetime
from typing import Dict, Optional, Any
from models import GradingResult

logger = logging.getLogger(__name__)

class StorageService:
    """Service for storing and retrieving essay results"""
    
    def __init__(self):
        # Create storage directories
        self.base_dir = "storage"
        self.results_dir = os.path.join(self.base_dir, "results")
        self.pdfs_dir = os.path.join(self.base_dir, "pdfs")
        
        self._ensure_directories()
    
    def _ensure_directories(self):
        """Ensure storage directories exist"""
        os.makedirs(self.base_dir, exist_ok=True)
        os.makedirs(self.results_dir, exist_ok=True)
        os.makedirs(self.pdfs_dir, exist_ok=True)
    
    async def store_essay_result(
        self, 
        essay_id: str, 
        original_text: str, 
        grading_result: GradingResult, 
        annotated_pdf_path: str
    ) -> None:
        """
        Store essay result and metadata
        
        Args:
            essay_id: Unique identifier for the essay
            original_text: Original essay text
            grading_result: AI grading result
            annotated_pdf_path: Path to annotated PDF
        """
        try:
            # Create result metadata
            result_data = {
                "essay_id": essay_id,
                "original_text": original_text,
                "grading_result": {
                    "overall_score": grading_result.overall_score,
                    "category_scores": {
                        category: {
                            "score": score.score,
                            "feedback": score.feedback
                        }
                        for category, score in grading_result.category_scores.items()
                    },
                    "summary_feedback": grading_result.summary_feedback,
                    "submission_type": grading_result.submission_type,
                    "word_count": grading_result.word_count,
                    "examiner_remarks": grading_result.examiner_remarks
                },
                "annotated_pdf_path": annotated_pdf_path,
                "graded_at": datetime.now().isoformat(),
                "word_count": len(original_text.split()),
                "character_count": len(original_text)
            }
            
            # Save to JSON file
            result_file = os.path.join(self.results_dir, f"{essay_id}.json")
            with open(result_file, 'w', encoding='utf-8') as f:
                json.dump(result_data, f, indent=2, ensure_ascii=False)
            
            logger.info(f"Stored essay result for ID: {essay_id}")
            
        except Exception as e:
            logger.error(f"Error storing essay result: {e}")
            raise Exception(f"Failed to store essay result: {str(e)}")
    
    async def get_essay_result(self, essay_id: str) -> Optional[Dict[str, Any]]:
        """
        Retrieve essay result by ID
        
        Args:
            essay_id: Unique identifier for the essay
            
        Returns:
            Essay result data or None if not found
        """
        try:
            result_file = os.path.join(self.results_dir, f"{essay_id}.json")
            
            if not os.path.exists(result_file):
                logger.warning(f"Essay result not found for ID: {essay_id}")
                return None
            
            with open(result_file, 'r', encoding='utf-8') as f:
                result_data = json.load(f)
            
            logger.info(f"Retrieved essay result for ID: {essay_id}")
            return result_data
            
        except Exception as e:
            logger.error(f"Error retrieving essay result: {e}")
            return None
    
    async def list_essay_results(self, limit: int = 50) -> list:
        """
        List recent essay results
        
        Args:
            limit: Maximum number of results to return
            
        Returns:
            List of essay result metadata
        """
        try:
            results = []
            
            # Get all JSON files in results directory
            for filename in os.listdir(self.results_dir):
                if filename.endswith('.json'):
                    essay_id = filename[:-5]  # Remove .json extension
                    
                    result_data = await self.get_essay_result(essay_id)
                    if result_data:
                        # Return only metadata, not full text
                        metadata = {
                            "essay_id": essay_id,
                            "overall_score": result_data["grading_result"]["overall_score"],
                            "graded_at": result_data["graded_at"],
                            "word_count": result_data.get("word_count", 0)
                        }
                        results.append(metadata)
            
            # Sort by graded_at (newest first) and limit
            results.sort(key=lambda x: x["graded_at"], reverse=True)
            return results[:limit]
            
        except Exception as e:
            logger.error(f"Error listing essay results: {e}")
            return []
    
    async def delete_essay_result(self, essay_id: str) -> bool:
        """
        Delete essay result and associated files
        
        Args:
            essay_id: Unique identifier for the essay
            
        Returns:
            True if deleted successfully, False otherwise
        """
        try:
            # Get result data first
            result_data = await self.get_essay_result(essay_id)
            if not result_data:
                return False
            
            # Delete JSON file
            result_file = os.path.join(self.results_dir, f"{essay_id}.json")
            if os.path.exists(result_file):
                os.remove(result_file)
            
            # Delete annotated PDF
            pdf_path = result_data.get("annotated_pdf_path")
            if pdf_path and os.path.exists(pdf_path):
                os.remove(pdf_path)
            
            logger.info(f"Deleted essay result for ID: {essay_id}")
            return True
            
        except Exception as e:
            logger.error(f"Error deleting essay result: {e}")
            return False
    
    def get_storage_stats(self) -> Dict[str, Any]:
        """Get storage statistics"""
        try:
            total_results = len([f for f in os.listdir(self.results_dir) if f.endswith('.json')])
            total_pdfs = len([f for f in os.listdir(self.pdfs_dir) if f.endswith('.pdf')])
            
            # Calculate total size
            total_size = 0
            for root, dirs, files in os.walk(self.base_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    total_size += os.path.getsize(file_path)
            
            return {
                "total_essays": total_results,
                "total_pdfs": total_pdfs,
                "total_size_mb": round(total_size / (1024 * 1024), 2),
                "storage_path": os.path.abspath(self.base_dir)
            }
            
        except Exception as e:
            logger.error(f"Error getting storage stats: {e}")
            return {"error": str(e)}
