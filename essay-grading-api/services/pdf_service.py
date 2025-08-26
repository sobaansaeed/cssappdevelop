import pdfplumber
import pytesseract
import cv2
import numpy as np
from PIL import Image
from pdf2image import convert_from_path
import io
import logging
from typing import Tuple, Optional

logger = logging.getLogger(__name__)

class PDFService:
    """Service for extracting text from PDF files with OCR support"""
    
    def __init__(self):
        # Configure Tesseract path for macOS (if installed via Homebrew)
        try:
            pytesseract.get_tesseract_version()
        except Exception:
            # Try common macOS Tesseract paths
            possible_paths = [
                '/usr/local/bin/tesseract',
                '/opt/homebrew/bin/tesseract',
                '/usr/bin/tesseract'
            ]
            for path in possible_paths:
                try:
                    pytesseract.pytesseract.tesseract_cmd = path
                    pytesseract.get_tesseract_version()
                    logger.info(f"Tesseract found at: {path}")
                    break
                except Exception:
                    continue
            else:
                logger.warning("Tesseract not found. OCR functionality will be limited.")
    
    def extract_text_from_pdf(self, pdf_file_path: str) -> str:
        """
        Extract text from PDF using multiple methods:
        1. First try to extract selectable text
        2. If no text found, use OCR on images
        3. Combine results for best coverage
        """
        try:
            # Method 1: Extract selectable text
            selectable_text = self._extract_selectable_text(pdf_file_path)
            
            # Method 2: Extract text using OCR from images
            ocr_text = self._extract_text_with_ocr(pdf_file_path)
            
            # Combine results
            combined_text = self._combine_text_results(selectable_text, ocr_text)
            
            if not combined_text.strip():
                raise Exception("No text could be extracted from the PDF using any method")
            
            logger.info(f"Successfully extracted {len(combined_text)} characters from PDF")
            return combined_text
            
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {e}")
            raise Exception(f"Failed to extract text from PDF: {str(e)}")
    
    def _extract_selectable_text(self, pdf_file_path: str) -> str:
        """Extract selectable text from PDF using pdfplumber"""
        try:
            text = ""
            with pdfplumber.open(pdf_file_path) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
            return text.strip()
        except Exception as e:
            logger.warning(f"Failed to extract selectable text: {e}")
            return ""
    
    def _extract_text_with_ocr(self, pdf_file_path: str) -> str:
        """Extract text from PDF images using OCR"""
        try:
            # Convert PDF to images
            images = convert_from_path(pdf_file_path, dpi=300)
            
            all_text = ""
            for i, image in enumerate(images):
                try:
                    # Convert PIL image to OpenCV format
                    opencv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
                    
                    # Preprocess image for better OCR
                    processed_image = self._preprocess_image_for_ocr(opencv_image)
                    
                    # Extract text using Tesseract
                    page_text = pytesseract.image_to_string(
                        processed_image, 
                        config='--psm 6 --oem 3 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?;:()[]{}"\'-_/\\|@#$%^&*+=<>~` '
                    )
                    
                    if page_text.strip():
                        all_text += page_text + "\n"
                        logger.info(f"OCR extracted {len(page_text)} characters from page {i+1}")
                    
                except Exception as e:
                    logger.warning(f"OCR failed for page {i+1}: {e}")
                    continue
            
            return all_text.strip()
            
        except Exception as e:
            logger.warning(f"OCR extraction failed: {e}")
            return ""
    
    def _preprocess_image_for_ocr(self, image: np.ndarray) -> np.ndarray:
        """Preprocess image to improve OCR accuracy"""
        try:
            # Convert to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Apply thresholding to get binary image
            _, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
            
            # Apply morphological operations to clean up the image
            kernel = np.ones((1, 1), np.uint8)
            cleaned = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
            
            # Apply slight blur to reduce noise
            blurred = cv2.GaussianBlur(cleaned, (1, 1), 0)
            
            return blurred
            
        except Exception as e:
            logger.warning(f"Image preprocessing failed: {e}")
            return image
    
    def _combine_text_results(self, selectable_text: str, ocr_text: str) -> str:
        """Combine text from different extraction methods"""
        if selectable_text and ocr_text:
            # If both methods found text, prefer selectable text but add OCR as backup
            combined = selectable_text
            if len(ocr_text) > len(selectable_text) * 1.5:  # OCR found significantly more text
                combined = ocr_text
            logger.info(f"Combined text: {len(selectable_text)} chars (selectable) + {len(ocr_text)} chars (OCR)")
            return combined
        elif selectable_text:
            logger.info(f"Using selectable text: {len(selectable_text)} characters")
            return selectable_text
        elif ocr_text:
            logger.info(f"Using OCR text: {len(ocr_text)} characters")
            return ocr_text
        else:
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
        """Clean and normalize extracted text"""
        if not text:
            return ""
        
        # Remove excessive whitespace
        text = ' '.join(text.split())
        
        # Remove common OCR artifacts
        text = text.replace('|', 'I')  # Common OCR mistake
        text = text.replace('0', 'O')  # Common OCR mistake in certain contexts
        
        # Remove non-printable characters
        text = ''.join(char for char in text if char.isprintable() or char.isspace())
        
        return text.strip()
