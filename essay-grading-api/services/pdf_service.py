import pdfplumber
import io
from fastapi import UploadFile
import logging

logger = logging.getLogger(__name__)

class PDFService:
    """Service for extracting text from PDF files"""
    
    async def extract_text(self, file: UploadFile) -> str:
        """
        Extract text from uploaded PDF file
        
        Args:
            file: Uploaded PDF file
            
        Returns:
            Extracted text as string
            
        Raises:
            Exception: If PDF processing fails
        """
        try:
            # Read file content
            content = await file.read()
            
            # Open PDF with pdfplumber
            with pdfplumber.open(io.BytesIO(content)) as pdf:
                text_parts = []
                
                # Extract text from each page
                for page_num, page in enumerate(pdf.pages):
                    try:
                        page_text = page.extract_text()
                        if page_text:
                            text_parts.append(page_text.strip())
                        logger.info(f"Extracted text from page {page_num + 1}")
                    except Exception as e:
                        logger.warning(f"Failed to extract text from page {page_num + 1}: {e}")
                        continue
                
                # Combine all text
                full_text = "\n\n".join(text_parts)
                
                if not full_text.strip():
                    raise Exception("No text could be extracted from the PDF")
                
                logger.info(f"Successfully extracted {len(full_text)} characters from PDF")
                return full_text
                
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {e}")
            raise Exception(f"Failed to extract text from PDF: {str(e)}")
    
    def get_word_count(self, text: str) -> int:
        """Get word count from text"""
        if not text:
            return 0
        words = text.strip().split()
        return len(words)
    
    def get_character_count(self, text: str) -> int:
        """Get character count from text"""
        return len(text) if text else 0
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize extracted text"""
        if not text:
            return ""
        
        # Remove excessive whitespace
        text = " ".join(text.split())
        
        # Remove common PDF artifacts
        text = text.replace('\x00', '')  # Null characters
        text = text.replace('\r', '\n')  # Normalize line endings
        
        return text.strip()
