import pdfplumber
import logging
import os
from typing import Tuple, Optional

logger = logging.getLogger(__name__)

class PDFService:
    """Service for extracting text from PDF files with enhanced capabilities"""
    
    def __init__(self):
        logger.info("PDFService initialized with enhanced text extraction")
    
    def extract_text_from_pdf(self, pdf_file_path: str) -> str:
        """
        Extract text from PDF using enhanced methods:
        1. Extract selectable text with improved parsing
        2. Extract text from tables and forms
        3. Enhanced text cleaning and normalization
        """
        try:
            logger.info(f"Starting enhanced text extraction from: {pdf_file_path}")
            
            if not os.path.exists(pdf_file_path):
                raise Exception(f"PDF file not found: {pdf_file_path}")
            
            # Extract text using enhanced methods
            extracted_text = self._extract_enhanced_text(pdf_file_path)
            
            if not extracted_text.strip():
                raise Exception("No text could be extracted from the PDF")
            
            # Clean the final text
            cleaned_text = self.clean_text(extracted_text)
            
            logger.info(f"Final extracted text: {len(cleaned_text)} characters")
            return cleaned_text
            
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {e}")
            raise Exception(f"Failed to extract text from PDF: {str(e)}")
    
    def _extract_enhanced_text(self, pdf_file_path: str) -> str:
        """Extract text using enhanced methods including tables and forms"""
        try:
            text = ""
            with pdfplumber.open(pdf_file_path) as pdf:
                logger.info(f"PDF opened successfully, {len(pdf.pages)} pages found")
                
                for page_num, page in enumerate(pdf.pages):
                    try:
                        # Extract regular text
                        page_text = page.extract_text()
                        
                        # Extract text from tables
                        tables_text = self._extract_text_from_tables(page)
                        
                        # Extract text from forms and annotations
                        forms_text = self._extract_text_from_forms(page)
                        
                        # Combine all text from this page
                        combined_page_text = ""
                        if page_text:
                            combined_page_text += page_text + "\n"
                        if tables_text:
                            combined_page_text += tables_text + "\n"
                        if forms_text:
                            combined_page_text += forms_text + "\n"
                        
                        if combined_page_text.strip():
                            text += combined_page_text
                            logger.info(f"Page {page_num + 1}: Extracted {len(combined_page_text)} characters (enhanced)")
                        else:
                            logger.info(f"Page {page_num + 1}: No text found")
                            
                    except Exception as e:
                        logger.warning(f"Error extracting text from page {page_num + 1}: {e}")
                        continue
            
            return text.strip()
        except Exception as e:
            logger.warning(f"Enhanced text extraction failed: {e}")
            return ""
    
    def _extract_text_from_tables(self, page) -> str:
        """Extract text from tables in the page"""
        try:
            tables = page.extract_tables()
            if not tables:
                return ""
            
            table_text = ""
            for table in tables:
                for row in table:
                    if row:
                        # Join row elements and clean
                        row_text = " | ".join([str(cell).strip() if cell else "" for cell in row])
                        if row_text.strip():
                            table_text += row_text + "\n"
            
            return table_text.strip()
        except Exception as e:
            logger.warning(f"Table text extraction failed: {e}")
            return ""
    
    def _extract_text_from_forms(self, page) -> str:
        """Extract text from forms and annotations"""
        try:
            # Extract text from form fields
            form_text = ""
            
            # Try to extract from annotations
            if hasattr(page, 'annotations') and page.annotations:
                for annotation in page.annotations:
                    if hasattr(annotation, 'get_text') and callable(annotation.get_text):
                        try:
                            annotation_text = annotation.get_text()
                            if annotation_text:
                                form_text += annotation_text + "\n"
                        except:
                            continue
            
            return form_text.strip()
        except Exception as e:
            logger.warning(f"Form text extraction failed: {e}")
            return ""
    
    def get_word_count(self, text: str) -> int:
        """Get word count from text"""
        if not text:
            return 0
        words = text.split()
        return len(words)
    
    def get_character_count(self, text: str) -> int:
        """Get character count from text"""
        return len(text) if text else 0
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize extracted text with enhanced processing"""
        if not text:
            return ""
        
        # Remove excessive whitespace and normalize
        lines = text.split('\n')
        cleaned_lines = []
        
        for line in lines:
            # Clean each line
            line = line.strip()
            if line:
                # Remove excessive spaces within the line
                line = ' '.join(line.split())
                # Remove common PDF artifacts
                line = line.replace('|', ' ')  # Replace table separators with spaces
                line = line.replace('  ', ' ')  # Remove double spaces
                cleaned_lines.append(line)
        
        # Join lines with proper spacing
        cleaned_text = '\n'.join(cleaned_lines)
        
        # Remove non-printable characters
        cleaned_text = ''.join(char for char in cleaned_text if char.isprintable() or char.isspace())
        
        # Final cleanup
        cleaned_text = ' '.join(cleaned_text.split())  # Normalize all whitespace
        
        return cleaned_text.strip()
