import pdfplumber
import logging
import os
import re
from typing import Tuple, Optional

logger = logging.getLogger(__name__)

class PDFService:
    """Service for extracting text from PDF files with professional formatting preservation"""
    
    def __init__(self):
        logger.info("PDFService initialized with professional formatting preservation")
    
    def extract_text_from_pdf(self, pdf_file_path: str) -> str:
        """
        Extract text from PDF with professional formatting preservation:
        1. Maintain proper paragraph structure and spacing
        2. Preserve sentence breaks and punctuation
        3. Handle complex layouts and formatting
        4. Ensure readable text for accurate AI grading
        """
        try:
            logger.info(f"Starting professional text extraction from: {pdf_file_path}")
            
            if not os.path.exists(pdf_file_path):
                raise Exception(f"PDF file not found: {pdf_file_path}")
            
            # Extract text with professional formatting
            extracted_text = self._extract_professional_text(pdf_file_path)
            
            if not extracted_text.strip():
                raise Exception("No text could be extracted from the PDF")
            
            # Apply professional formatting for AI grading
            formatted_text = self._apply_professional_formatting(extracted_text)
            
            logger.info(f"Final professionally formatted text: {len(formatted_text)} characters")
            return formatted_text
            
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {e}")
            raise Exception(f"Failed to extract text from PDF: {str(e)}")
    
    def _extract_professional_text(self, pdf_file_path: str) -> str:
        """Extract text while preserving professional formatting and structure"""
        try:
            all_pages_text = []
            with pdfplumber.open(pdf_file_path) as pdf:
                logger.info(f"PDF opened successfully, {len(pdf.pages)} pages found")
                
                for page_num, page in enumerate(pdf.pages):
                    try:
                        # Get page dimensions
                        page_width = page.width
                        page_height = page.height
                        
                        # Extract text using multiple methods for best results
                        page_text = self._extract_page_text_professionally(page, page_width, page_height)
                        
                        if page_text.strip():
                            all_pages_text.append(page_text)
                            logger.info(f"Page {page_num + 1}: Extracted {len(page_text)} characters (professional)")
                        else:
                            logger.info(f"Page {page_num + 1}: No text found")
                            
                    except Exception as e:
                        logger.warning(f"Error extracting text from page {page_num + 1}: {e}")
                        continue
            
            # Join pages with proper spacing
            full_text = "\n\n".join(all_pages_text)
            return full_text
            
        except Exception as e:
            logger.warning(f"Professional text extraction failed: {e}")
            return ""
    
    def _extract_page_text_professionally(self, page, page_width, page_height):
        """Extract text from a single page with professional formatting"""
        try:
            # Method 1: Try character-level extraction for precise positioning
            chars = page.chars if hasattr(page, 'chars') else []
            if chars:
                return self._extract_text_from_chars_professionally(chars, page_width, page_height)
            
            # Method 2: Try word-level extraction
            words = page.extract_words() if hasattr(page, 'extract_words') else []
            if words:
                return self._extract_text_from_words_professionally(words, page_width, page_height)
            
            # Method 3: Fallback to basic text extraction
            basic_text = page.extract_text() or ""
            if basic_text:
                return self._clean_basic_text(basic_text)
            
            return ""
            
        except Exception as e:
            logger.warning(f"Professional page extraction failed: {e}")
            return ""
    
    def _extract_text_from_chars_professionally(self, chars, page_width, page_height):
        """Extract text from characters with professional formatting"""
        if not chars:
            return ""
        
        # Sort characters by position (top to bottom, left to right)
        sorted_chars = sorted(chars, key=lambda c: (c['top'], c['x0']))
        
        # Group characters into lines based on vertical position
        lines = []
        current_line = []
        current_y = None
        line_height_threshold = 3  # pixels for line detection
        
        for char in sorted_chars:
            char_text = char.get('text', '')
            char_y = char.get('top', 0)
            char_x = char.get('x0', 0)
            
            # Skip non-printable characters
            if not char_text or not char_text.strip():
                continue
            
            # Start new line if y-position changes significantly
            if current_y is None or abs(char_y - current_y) > line_height_threshold:
                if current_line:
                    lines.append(self._format_line(current_line))
                    current_line = []
                current_y = char_y
            
            current_line.append({
                'text': char_text,
                'x': char_x,
                'y': char_y
            })
        
        # Add the last line
        if current_line:
            lines.append(self._format_line(current_line))
        
        return '\n'.join(lines)
    
    def _extract_text_from_words_professionally(self, words, page_width, page_height):
        """Extract text from words with professional formatting"""
        if not words:
            return ""
        
        # Sort words by position (top to bottom, left to right)
        sorted_words = sorted(words, key=lambda w: (w['top'], w['x0']))
        
        # Group words into lines based on vertical position
        lines = []
        current_line = []
        current_y = None
        line_height_threshold = 5  # pixels for line detection
        
        for word in sorted_words:
            word_text = word.get('text', '')
            word_y = word.get('top', 0)
            word_x = word.get('x0', 0)
            
            # Skip empty words
            if not word_text or not word_text.strip():
                continue
            
            # Start new line if y-position changes significantly
            if current_y is None or abs(word_y - current_y) > line_height_threshold:
                if current_line:
                    lines.append(self._format_word_line(current_line))
                    current_line = []
                current_y = word_y
            
            current_line.append({
                'text': word_text,
                'x': word_x,
                'y': word_y
            })
        
        # Add the last line
        if current_line:
            lines.append(self._format_word_line(current_line))
        
        return '\n'.join(lines)
    
    def _format_line(self, chars):
        """Format a line of characters with proper spacing"""
        if not chars:
            return ""
        
        # Sort characters by x-position
        sorted_chars = sorted(chars, key=lambda c: c['x'])
        
        # Join characters with appropriate spacing
        line_text = ""
        for i, char in enumerate(sorted_chars):
            char_text = char['text']
            
            # Add space before character if needed
            if i > 0:
                prev_char = sorted_chars[i-1]
                space_needed = char['x'] - (prev_char['x'] + len(prev_char['text']) * 5)  # Approximate char width
                if space_needed > 15:  # If significant gap, add space
                    line_text += " "
                elif space_needed > 5:  # If small gap, add space
                    line_text += " "
            
            line_text += char_text
        
        return line_text.strip()
    
    def _format_word_line(self, words):
        """Format a line of words with proper spacing"""
        if not words:
            return ""
        
        # Sort words by x-position
        sorted_words = sorted(words, key=lambda w: w['x'])
        
        # Join words with spaces
        line_text = " ".join([word['text'] for word in sorted_words])
        return line_text.strip()
    
    def _clean_basic_text(self, text):
        """Clean basic extracted text"""
        if not text:
            return ""
        
        # Remove excessive whitespace
        text = re.sub(r'\s+', ' ', text)
        
        # Fix common issues
        text = text.replace('|', ' ')  # Remove table separators
        text = text.replace('  ', ' ')  # Remove double spaces
        
        return text.strip()
    
    def _apply_professional_formatting(self, text: str) -> str:
        """Apply professional formatting for optimal AI grading"""
        if not text:
            return ""
        
        # Step 1: Basic cleaning
        text = self._basic_cleaning(text)
        
        # Step 2: Fix spacing issues
        text = self._fix_spacing_issues(text)
        
        # Step 3: Paragraph detection and formatting
        text = self._detect_and_format_paragraphs(text)
        
        # Step 4: Sentence formatting
        text = self._format_sentences(text)
        
        # Step 5: Final professional formatting
        text = self._final_professional_formatting(text)
        
        return text.strip()
    
    def _basic_cleaning(self, text: str) -> str:
        """Basic text cleaning"""
        # Remove non-printable characters except newlines and tabs
        text = ''.join(char for char in text if char.isprintable() or char in '\n\t')
        
        # Replace common PDF artifacts
        text = text.replace('|', ' ')  # Table separators
        text = text.replace('\t', ' ')  # Tabs to spaces
        
        return text
    
    def _fix_spacing_issues(self, text: str) -> str:
        """Fix common spacing issues in extracted text"""
        if not text:
            return ""
        
        # Fix run-on text by adding spaces between words
        # Look for patterns where lowercase letters are followed by uppercase letters
        text = re.sub(r'([a-z])([A-Z])', r'\1 \2', text)
        
        # Fix spacing around punctuation
        text = re.sub(r'([.!?])([A-Z])', r'\1 \2', text)
        text = re.sub(r'([.!?])([a-z])', r'\1 \2', text)
        
        # Fix spacing around common words
        common_words = ['The', 'This', 'That', 'These', 'Those', 'In', 'On', 'At', 'By', 'For', 'With', 'As', 'Since', 'Because', 'However', 'Moreover', 'Furthermore', 'Additionally', 'Therefore', 'Thus', 'Hence', 'In conclusion']
        for word in common_words:
            text = re.sub(rf'([a-z])({word})', r'\1 \2', text, flags=re.IGNORECASE)
        
        # Normalize multiple spaces
        text = re.sub(r' +', ' ', text)
        
        return text.strip()
    
    def _detect_and_format_paragraphs(self, text: str) -> str:
        """Detect and format paragraphs professionally"""
        lines = text.split('\n')
        formatted_paragraphs = []
        current_paragraph = []
        
        for line in lines:
            line = line.strip()
            
            if not line:
                # Empty line indicates paragraph break
                if current_paragraph:
                    formatted_paragraphs.append(' '.join(current_paragraph))
                    current_paragraph = []
            else:
                # Check if this line starts a new paragraph
                if self._is_new_paragraph_start(line, current_paragraph):
                    if current_paragraph:
                        formatted_paragraphs.append(' '.join(current_paragraph))
                        current_paragraph = []
                current_paragraph.append(line)
        
        # Add the last paragraph
        if current_paragraph:
            formatted_paragraphs.append(' '.join(current_paragraph))
        
        # Join paragraphs with proper spacing
        return '\n\n'.join(formatted_paragraphs)
    
    def _is_new_paragraph_start(self, line: str, current_paragraph: list) -> bool:
        """Determine if a line starts a new paragraph"""
        if not current_paragraph:
            return True
        
        # Check for paragraph indicators
        paragraph_indicators = [
            r'^\d+\.',  # Numbered lists
            r'^[A-Z][a-z]+\.',  # Capitalized words followed by period
            r'^[A-Z][A-Z\s]+:',  # ALL CAPS headers
            r'^[A-Z][a-z\s]+:',  # Title case headers
            r'^[A-Z][a-z\s]+\.',  # Title case followed by period
        ]
        
        for pattern in paragraph_indicators:
            if re.match(pattern, line):
                return True
        
        # Check for common paragraph starters
        paragraph_starters = [
            'However,', 'Moreover,', 'Furthermore,', 'Additionally,',
            'In conclusion,', 'Therefore,', 'Thus,', 'Hence,',
            'On the other hand,', 'In contrast,', 'Similarly,',
            'First,', 'Second,', 'Third,', 'Finally,',
            'The', 'This', 'These', 'Those',
            'It is', 'There is', 'There are',
            'In', 'At', 'By', 'For', 'With',
            'As', 'Since', 'Because', 'Although',
            'While', 'When', 'Where', 'Why', 'How'
        ]
        
        for starter in paragraph_starters:
            if line.startswith(starter):
                return True
        
        return False
    
    def _format_sentences(self, text: str) -> str:
        """Format sentences properly"""
        # Split into paragraphs
        paragraphs = text.split('\n\n')
        formatted_paragraphs = []
        
        for paragraph in paragraphs:
            if not paragraph.strip():
                continue
            
            # Clean up sentence spacing
            paragraph = re.sub(r'\s+', ' ', paragraph)  # Normalize spaces
            paragraph = re.sub(r'\s+([.!?])', r'\1', paragraph)  # Fix punctuation spacing
            paragraph = re.sub(r'([.!?])\s*([A-Z])', r'\1 \2', paragraph)  # Add space after sentence
            
            formatted_paragraphs.append(paragraph.strip())
        
        return '\n\n'.join(formatted_paragraphs)
    
    def _final_professional_formatting(self, text: str) -> str:
        """Apply final professional formatting"""
        # Ensure proper paragraph spacing
        text = re.sub(r'\n\s*\n\s*\n+', '\n\n', text)
        
        # Clean up any remaining artifacts
        text = re.sub(r' +', ' ', text)  # Remove multiple spaces
        text = re.sub(r'\n +', '\n', text)  # Remove leading spaces on lines
        
        # Ensure proper sentence endings
        text = re.sub(r'([.!?])\s*([A-Z])', r'\1 \2', text)
        
        # Remove any non-printable characters
        text = ''.join(char for char in text if char.isprintable() or char.isspace())
        
        return text.strip()
    
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
        """Legacy method - now uses professional formatting"""
        return self._apply_professional_formatting(text)
