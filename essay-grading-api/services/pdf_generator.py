import io
import os
import logging
from datetime import datetime
from typing import Dict, Any
from fastapi import UploadFile
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from PyPDF2 import PdfReader, PdfWriter
from models import GradingResult

logger = logging.getLogger(__name__)

class PDFGenerator:
    """Service for generating annotated PDFs with grading results"""
    
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
    
    def _setup_custom_styles(self):
        """Setup custom paragraph styles"""
        # Title style
        self.title_style = ParagraphStyle(
            'CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=18,
            spaceAfter=30,
            alignment=1,  # Center
            textColor=colors.darkblue
        )
        
        # Score style
        self.score_style = ParagraphStyle(
            'ScoreStyle',
            parent=self.styles['Normal'],
            fontSize=14,
            spaceAfter=20,
            alignment=1,  # Center
            textColor=colors.darkgreen
        )
        
        # Category style
        self.category_style = ParagraphStyle(
            'CategoryStyle',
            parent=self.styles['Heading2'],
            fontSize=14,
            spaceAfter=10,
            textColor=colors.darkblue
        )
        
        # Feedback style
        self.feedback_style = ParagraphStyle(
            'FeedbackStyle',
            parent=self.styles['Normal'],
            fontSize=11,
            spaceAfter=15,
            leftIndent=20
        )
    
    async def create_annotated_pdf(
        self, 
        original_file: UploadFile, 
        grading_result: GradingResult, 
        essay_id: str
    ) -> str:
        """
        Create an annotated PDF with grading results
        
        Args:
            original_file: Original PDF file
            grading_result: AI grading result
            essay_id: Unique identifier for the essay
            
        Returns:
            Path to the generated annotated PDF
        """
        try:
            # Create output directory
            output_dir = "storage/pdfs"
            os.makedirs(output_dir, exist_ok=True)
            
            # Generate output filename
            output_path = os.path.join(output_dir, f"graded_essay_{essay_id}.pdf")
            
            # Create the annotated PDF
            await self._generate_grading_report(
                grading_result=grading_result,
                essay_id=essay_id,
                output_path=output_path
            )
            
            logger.info(f"Generated annotated PDF: {output_path}")
            return output_path
            
        except Exception as e:
            logger.error(f"Error creating annotated PDF: {e}")
            raise Exception(f"Failed to create annotated PDF: {str(e)}")
    
    async def _generate_grading_report(
        self, 
        grading_result: GradingResult, 
        essay_id: str, 
        output_path: str
    ):
        """Generate the grading report PDF"""
        try:
            # Create PDF document
            doc = SimpleDocTemplate(output_path, pagesize=A4)
            story = []
            
            # Add title
            title = Paragraph("Essay Grading Report", self.title_style)
            story.append(title)
            story.append(Spacer(1, 20))
            
            # Add essay ID and timestamp
            metadata = f"Essay ID: {essay_id}<br/>Graded on: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}<br/>Submission Type: {grading_result.submission_type}<br/>Word Count: {grading_result.word_count}"
            metadata_para = Paragraph(metadata, self.styles['Normal'])
            story.append(metadata_para)
            story.append(Spacer(1, 30))
            
            # Add overall score
            score_text = f"Overall Score: {grading_result.overall_score}/100"
            score_para = Paragraph(score_text, self.score_style)
            story.append(score_para)
            story.append(Spacer(1, 30))
            
            # Add category scores table
            story.extend(self._create_category_scores_table(grading_result))
            story.append(Spacer(1, 30))
            
            # Add detailed feedback
            story.extend(self._create_detailed_feedback(grading_result))
            story.append(Spacer(1, 30))
            
            # Add summary feedback
            story.extend(self._create_summary_feedback(grading_result))
            
            # Add examiner remarks
            story.extend(self._create_examiner_remarks(grading_result))
            
            # Build PDF
            doc.build(story)
            
        except Exception as e:
            logger.error(f"Error generating grading report: {e}")
            raise
    
    def _create_category_scores_table(self, grading_result: GradingResult) -> list:
        """Create a table showing category scores"""
        elements = []
        
        # Table header
        elements.append(Paragraph("Category Scores", self.category_style))
        
        # Create table data
        table_data = [['Category', 'Score', 'Max Points']]
        
        for category, score_data in grading_result.category_scores.items():
            max_points = self._get_max_points_for_category(category)
            table_data.append([
                category,
                str(score_data.score),
                str(max_points)
            ])
        
        # Create table
        table = Table(table_data, colWidths=[3*inch, 1*inch, 1*inch])
        
        # Style the table
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        elements.append(table)
        elements.append(Spacer(1, 20))
        
        return elements
    
    def _create_detailed_feedback(self, grading_result: GradingResult) -> list:
        """Create detailed feedback section"""
        elements = []
        
        elements.append(Paragraph("Detailed Feedback by Category", self.category_style))
        
        for category, score_data in grading_result.category_scores.items():
            # Category header
            category_header = f"{category} ({score_data.score}/{self._get_max_points_for_category(category)} points)"
            elements.append(Paragraph(category_header, self.styles['Heading3']))
            
            # Feedback
            feedback_para = Paragraph(score_data.feedback, self.feedback_style)
            elements.append(feedback_para)
            elements.append(Spacer(1, 15))
        
        return elements
    
    def _create_summary_feedback(self, grading_result: GradingResult) -> list:
        """Create summary feedback section"""
        elements = []
        
        elements.append(Paragraph("Overall Summary", self.category_style))
        
        summary_para = Paragraph(grading_result.summary_feedback, self.feedback_style)
        elements.append(summary_para)
        
        return elements
    
    def _create_examiner_remarks(self, grading_result: GradingResult) -> list:
        """Create examiner remarks section"""
        elements = []
        
        elements.append(Paragraph("Examiner Remarks", self.category_style))
        
        # Strengths
        if grading_result.examiner_remarks.get("strengths"):
            elements.append(Paragraph("Strengths:", self.styles['Heading3']))
            for strength in grading_result.examiner_remarks["strengths"]:
                elements.append(Paragraph(f"• {strength}", self.feedback_style))
            elements.append(Spacer(1, 10))
        
        # Weaknesses
        if grading_result.examiner_remarks.get("weaknesses"):
            elements.append(Paragraph("Areas for Improvement:", self.styles['Heading3']))
            for weakness in grading_result.examiner_remarks["weaknesses"]:
                elements.append(Paragraph(f"• {weakness}", self.feedback_style))
            elements.append(Spacer(1, 10))
        
        # Suggestions
        if grading_result.examiner_remarks.get("suggestions"):
            elements.append(Paragraph("Suggestions:", self.styles['Heading3']))
            for suggestion in grading_result.examiner_remarks["suggestions"]:
                elements.append(Paragraph(f"• {suggestion}", self.feedback_style))
            elements.append(Spacer(1, 10))
        
        return elements
    
    def _get_max_points_for_category(self, category: str) -> int:
        """Get maximum points for a category"""
        max_points = {
            "Thesis & Topic Understanding": 10,
            "Outline Quality": 10,
            "Structure & Coherence": 15,
            "Content Depth, Balance & Relevance": 20,
            "Language Proficiency & Expression": 15,
            "Critical Thinking & Analytical Reasoning": 5,
            "Conclusion": 10,
            "Word Count & Length Control": 15
        }
        return max_points.get(category, 10)
    
    async def overlay_grading_on_original_pdf(
        self, 
        original_file: UploadFile, 
        grading_result: GradingResult, 
        essay_id: str
    ) -> str:
        """
        Overlay grading results on the original PDF (alternative approach)
        
        Args:
            original_file: Original PDF file
            grading_result: AI grading result
            essay_id: Unique identifier for the essay
            
        Returns:
            Path to the annotated PDF
        """
        try:
            # Read original PDF
            content = await original_file.read()
            original_pdf = PdfReader(io.BytesIO(content))
            
            # Create output PDF
            output_dir = "storage/pdfs"
            os.makedirs(output_dir, exist_ok=True)
            output_path = os.path.join(output_dir, f"annotated_essay_{essay_id}.pdf")
            
            # Create PDF writer
            writer = PdfWriter()
            
            # Add first page with grading overlay
            if len(original_pdf.pages) > 0:
                page = original_pdf.pages[0]
                
                # Create overlay with grading information
                overlay = self._create_grading_overlay(grading_result, essay_id)
                
                # Merge overlay with original page
                page.merge_page(overlay)
                writer.add_page(page)
            
            # Add remaining pages
            for i in range(1, len(original_pdf.pages)):
                writer.add_page(original_pdf.pages[i])
            
            # Add summary page at the end
            summary_page = self._create_summary_page(grading_result, essay_id)
            writer.add_page(summary_page)
            
            # Write output PDF
            with open(output_path, 'wb') as output_file:
                writer.write(output_file)
            
            logger.info(f"Generated annotated PDF with overlay: {output_path}")
            return output_path
            
        except Exception as e:
            logger.error(f"Error creating PDF overlay: {e}")
            raise Exception(f"Failed to create PDF overlay: {str(e)}")
    
    def _create_grading_overlay(self, grading_result: GradingResult, essay_id: str):
        """Create a PDF overlay with grading information"""
        # This is a simplified version - you can enhance it with more detailed overlays
        packet = io.BytesIO()
        can = canvas.Canvas(packet, pagesize=A4)
        
        # Add grading information to the overlay
        can.setFont("Helvetica-Bold", 16)
        can.setFillColor(colors.darkblue)
        can.drawString(50, 750, f"Essay ID: {essay_id}")
        
        can.setFont("Helvetica-Bold", 14)
        can.drawString(50, 720, f"Overall Score: {grading_result.overall_score}/100")
        
        can.setFont("Helvetica", 12)
        y_position = 690
        for category, score_data in grading_result.category_scores.items():
            can.drawString(50, y_position, f"{category}: {score_data.score}")
            y_position -= 20
        
        can.save()
        packet.seek(0)
        
        return PdfReader(packet).pages[0]
    
    def _create_summary_page(self, grading_result: GradingResult, essay_id: str):
        """Create a summary page for the PDF"""
        packet = io.BytesIO()
        can = canvas.Canvas(packet, pagesize=A4)
        
        # Add summary information
        can.setFont("Helvetica-Bold", 18)
        can.setFillColor(colors.darkblue)
        can.drawString(50, 750, "Essay Grading Summary")
        
        can.setFont("Helvetica", 12)
        y_position = 700
        
        # Add category scores
        for category, score_data in grading_result.category_scores.items():
            can.drawString(50, y_position, f"{category}: {score_data.score}")
            y_position -= 20
        
        # Add summary feedback
        y_position -= 30
        can.setFont("Helvetica-Bold", 14)
        can.drawString(50, y_position, "Summary Feedback:")
        y_position -= 20
        
        can.setFont("Helvetica", 11)
        # Wrap text for summary feedback
        words = grading_result.summary_feedback.split()
        line = ""
        for word in words:
            if len(line + word) < 80:
                line += word + " "
            else:
                can.drawString(50, y_position, line.strip())
                y_position -= 15
                line = word + " "
        
        if line:
            can.drawString(50, y_position, line.strip())
        
        can.save()
        packet.seek(0)
        
        return PdfReader(packet).pages[0]
