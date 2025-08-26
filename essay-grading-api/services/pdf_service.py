import pdfplumber
import logging
import os
import re
from typing import Tuple, Optional

logger = logging.getLogger(__name__)

class PDFService:
    """Service for extracting text from PDF files with proper formatting preservation"""
    
    def __init__(self):
        logger.info("PDFService initialized with enhanced formatting preservation")
    
    def extract_text_from_pdf(self, pdf_file_path: str) -> str:
        """
        Extract text from PDF with proper formatting preservation:
        1. Maintain paragraph structure
        2. Preserve line breaks and spacing
        3. Clean up formatting artifacts
        4. Ensure readable text for AI grading
        """
        try:
            logger.info(f"Starting formatted text extraction from: {pdf_file_path}")
            
            if not os.path.exists(pdf_file_path):
                raise Exception(f"PDF file not found: {pdf_file_path}")
            
            # Extract text with formatting preservation
            extracted_text = self._extract_formatted_text(pdf_file_path)
            
            if not extracted_text.strip():
                raise Exception("No text could be extracted from the PDF")
            
            # Clean and format the text for AI grading
            formatted_text = self._format_text_for_ai_grading(extracted_text)
            
            logger.info(f"Final formatted text: {len(formatted_text)} characters")
            return formatted_text
            
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {e}")
            raise Exception(f"Failed to extract text from PDF: {str(e)}")
    
    def _extract_formatted_text(self, pdf_file_path: str) -> str:
        """Extract text while preserving formatting and structure"""
        try:
            all_text = []
            with pdfplumber.open(pdf_file_path) as pdf:
                logger.info(f"PDF opened successfully, {len(pdf.pages)} pages found")
                
                for page_num, page in enumerate(pdf.pages):
                    try:
                        # Extract text with character positioning
                        chars = page.chars if hasattr(page, 'chars') else []
                        words = page.extract_words() if hasattr(page, 'extract_words') else []
                        
                        if chars:
                            # Use character-level extraction for better formatting
                            page_text = self._extract_text_from_chars(chars, page.height)
                        elif words:
                            # Fallback to word-level extraction
                            page_text = self._extract_text_from_words(words, page.height)
                        else:
                            # Basic text extraction
                            page_text = page.extract_text() or ""
                        
                        if page_text.strip():
                            all_text.append(page_text)
                            logger.info(f"Page {page_num + 1}: Extracted {len(page_text)} characters (formatted)")
                        else:
                            logger.info(f"Page {page_num + 1}: No text found")
                            
                    except Exception as e:
                        logger.warning(f"Error extracting text from page {page_num + 1}: {e}")
                        continue
            
            return "\n\n".join(all_text)  # Separate pages with double line breaks
        except Exception as e:
            logger.warning(f"Formatted text extraction failed: {e}")
            return ""
    
    def _extract_text_from_chars(self, chars, page_height):
        """Extract text from characters while preserving positioning"""
        if not chars:
            return ""
        
        # Sort characters by vertical position (top to bottom)
        sorted_chars = sorted(chars, key=lambda c: (c['top'], c['x0']))
        
        lines = []
        current_line = []
        current_y = None
        line_height_threshold = 5  # pixels
        
        for char in sorted_chars:
            char_text = char.get('text', '')
            char_y = char.get('top', 0)
            
            # Start new line if y-position changes significantly
            if current_y is None or abs(char_y - current_y) > line_height_threshold:
                if current_line:
                    lines.append(''.join(current_line))
                    current_line = []
                current_y = char_y
            
            current_line.append(char_text)
        
        # Add the last line
        if current_line:
            lines.append(''.join(current_line))
        
        return '\n'.join(lines)
    
    def _extract_text_from_words(self, words, page_height):
        """Extract text from words while preserving positioning"""
        if not words:
            return ""
        
        # Sort words by vertical position (top to bottom)
        sorted_words = sorted(words, key=lambda w: (w['top'], w['x0']))
        
        lines = []
        current_line = []
        current_y = None
        line_height_threshold = 5  # pixels
        
        for word in sorted_words:
            word_text = word.get('text', '')
            word_y = word.get('top', 0)
            
            # Start new line if y-position changes significantly
            if current_y is None or abs(word_y - current_y) > line_height_threshold:
                if current_line:
                    lines.append(' '.join(current_line))
                    current_line = []
                current_y = word_y
            
            current_line.append(word_text)
        
        # Add the last line
        if current_line:
            lines.append(' '.join(current_line))
        
        return '\n'.join(lines)
    
    def _format_text_for_ai_grading(self, text: str) -> str:
        """Format extracted text for optimal AI grading"""
        if not text:
            return ""
        
        # Step 1: Basic cleaning
        text = self._basic_cleaning(text)
        
        # Step 2: Paragraph detection and formatting
        text = self._format_paragraphs(text)
        
        # Step 3: Remove excessive whitespace while preserving structure
        text = self._normalize_whitespace(text)
        
        # Step 4: Final formatting for AI readability
        text = self._final_formatting(text)
        
        return text.strip()
    
    def _basic_cleaning(self, text: str) -> str:
        """Basic text cleaning"""
        # Remove non-printable characters except newlines and tabs
        text = ''.join(char for char in text if char.isprintable() or char in '\n\t')
        
        # Replace common PDF artifacts
        text = text.replace('|', ' ')  # Table separators
        text = text.replace('  ', ' ')  # Double spaces
        text = text.replace('\t', ' ')  # Tabs to spaces
        
        return text
    
    def _format_paragraphs(self, text: str) -> str:
        """Detect and format paragraphs properly"""
        lines = text.split('\n')
        formatted_lines = []
        current_paragraph = []
        
        for line in lines:
            line = line.strip()
            
            if not line:
                # Empty line indicates paragraph break
                if current_paragraph:
                    formatted_lines.append(' '.join(current_paragraph))
                    current_paragraph = []
                formatted_lines.append('')  # Keep paragraph spacing
            else:
                # Check if this line starts a new paragraph
                if self._is_new_paragraph(line, current_paragraph):
                    if current_paragraph:
                        formatted_lines.append(' '.join(current_paragraph))
                        current_paragraph = []
                current_paragraph.append(line)
        
        # Add the last paragraph
        if current_paragraph:
            formatted_lines.append(' '.join(current_paragraph))
        
        return '\n'.join(formatted_lines)
    
    def _is_new_paragraph(self, line: str, current_paragraph: list) -> bool:
        """Determine if a line starts a new paragraph"""
        if not current_paragraph:
            return True
        
        # Check for common paragraph indicators
        paragraph_indicators = [
            r'^\d+\.',  # Numbered lists
            r'^[A-Z][a-z]+\.',  # Capitalized words followed by period
            r'^[A-Z][A-Z\s]+:',  # ALL CAPS headers
            r'^[A-Z][a-z\s]+:',  # Title case headers
        ]
        
        for pattern in paragraph_indicators:
            if re.match(pattern, line):
                return True
        
        # Check if line starts with common paragraph starters
        paragraph_starters = [
            'However,', 'Moreover,', 'Furthermore,', 'Additionally,',
            'In conclusion,', 'Therefore,', 'Thus,', 'Hence,',
            'On the other hand,', 'In contrast,', 'Similarly,',
            'First,', 'Second,', 'Third,', 'Finally,',
            'The', 'This', 'These', 'Those',
            'It is', 'There is', 'There are'
        ]
        
        for starter in paragraph_starters:
            if line.startswith(starter):
                return True
        
        return False
    
    def _normalize_whitespace(self, text: str) -> str:
        """Normalize whitespace while preserving structure"""
        # Replace multiple newlines with double newlines (paragraph breaks)
        text = re.sub(r'\n\s*\n\s*\n+', '\n\n', text)
        
        # Replace multiple spaces with single space
        text = re.sub(r' +', ' ', text)
        
        # Clean up line breaks within paragraphs
        lines = text.split('\n')
        cleaned_lines = []
        
        for line in lines:
            line = line.strip()
            if line:
                # Remove excessive spaces within lines
                line = re.sub(r' +', ' ', line)
                cleaned_lines.append(line)
            else:
                cleaned_lines.append('')
        
        return '\n'.join(cleaned_lines)
    
    def _final_formatting(self, text: str) -> str:
        """Final formatting for AI grading"""
        # Ensure proper paragraph spacing
        text = re.sub(r'\n\s*\n\s*\n+', '\n\n', text)
        
        # Remove leading/trailing whitespace from paragraphs
        paragraphs = text.split('\n\n')
        cleaned_paragraphs = []
        
        for paragraph in paragraphs:
            paragraph = paragraph.strip()
            if paragraph:
                # Clean up internal spacing
                paragraph = re.sub(r' +', ' ', paragraph)
                cleaned_paragraphs.append(paragraph)
        
        # Join paragraphs with proper spacing
        formatted_text = '\n\n'.join(cleaned_paragraphs)
        
        # Ensure the text ends with a single newline
        formatted_text = formatted_text.rstrip() + '\n'
        
        return formatted_text
    
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
        """Legacy method - now uses enhanced formatting"""
        return self._format_text_for_ai_grading(text)
