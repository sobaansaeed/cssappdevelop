#!/usr/bin/env python3
"""
Test script for the Essay Grading API
This script demonstrates how to use the API endpoints
"""

import requests
import json
import os
import time
from pathlib import Path

# API Configuration
BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test the health check endpoint"""
    print("🔍 Testing health check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Status: {response.json()['status']}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to API. Make sure the server is running.")
        return False

def create_sample_essay_pdf():
    """Create a sample PDF for testing"""
    try:
        from reportlab.lib.pagesizes import letter
        from reportlab.platypus import SimpleDocTemplate, Paragraph
        from reportlab.lib.styles import getSampleStyleSheet
        
        # Create sample essay text
        essay_text = """
        The Impact of Technology on Modern Education
        
        Technology has fundamentally transformed the landscape of modern education, 
        creating both opportunities and challenges for students, teachers, and 
        educational institutions. This essay explores the various ways in which 
        technology has influenced education and examines its implications for 
        the future of learning.
        
        One of the most significant impacts of technology on education is the 
        democratization of knowledge. The internet has made information accessible 
        to anyone with a connection, breaking down geographical and economic barriers 
        that previously limited educational opportunities. Students in remote areas 
        can now access the same resources as those in urban centers, and online 
        courses have made higher education more accessible to working adults and 
        non-traditional students.
        
        However, the integration of technology in education also presents challenges. 
        The digital divide remains a significant issue, with students from 
        lower-income families often lacking access to necessary devices and 
        reliable internet connections. Additionally, the rapid pace of technological 
        change requires continuous adaptation from both educators and students, 
        creating a learning curve that can be overwhelming for some.
        
        Despite these challenges, the benefits of technology in education are 
        substantial. Interactive learning tools, virtual reality experiences, 
        and adaptive learning platforms have made education more engaging and 
        personalized. These technologies can accommodate different learning styles 
        and paces, potentially improving educational outcomes for diverse student 
        populations.
        
        In conclusion, while technology has introduced new challenges to the 
        educational landscape, its overall impact has been positive. The key 
        to maximizing these benefits lies in thoughtful integration that 
        addresses accessibility concerns and provides adequate support for 
        both educators and students as they navigate this evolving landscape.
        """
        
        # Create PDF
        doc = SimpleDocTemplate("sample_essay.pdf", pagesize=letter)
        styles = getSampleStyleSheet()
        story = []
        
        # Add title
        title = Paragraph("Sample Essay for Testing", styles['Title'])
        story.append(title)
        
        # Add essay text
        for paragraph in essay_text.strip().split('\n\n'):
            if paragraph.strip():
                p = Paragraph(paragraph.strip(), styles['Normal'])
                story.append(p)
        
        doc.build(story)
        print("✅ Created sample essay PDF: sample_essay.pdf")
        return "sample_essay.pdf"
        
    except ImportError:
        print("❌ ReportLab not available. Creating text file instead.")
        with open("sample_essay.txt", "w") as f:
            f.write("Sample essay text for testing...")
        return "sample_essay.txt"

def test_upload_essay(file_path):
    """Test uploading an essay for grading"""
    print(f"📤 Testing essay upload with file: {file_path}")
    
    try:
        with open(file_path, 'rb') as f:
            files = {'file': (file_path, f, 'application/pdf' if file_path.endswith('.pdf') else 'text/plain')}
            response = requests.post(f"{BASE_URL}/upload-essay", files=files)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Essay uploaded successfully")
            print(f"   Essay ID: {result['essay_id']}")
            print(f"   Overall Score: {result['overall_score']}/100")
            print(f"   Message: {result['message']}")
            return result['essay_id']
        else:
            print(f"❌ Upload failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Upload error: {e}")
        return None

def test_get_results_json(essay_id):
    """Test retrieving grading results as JSON"""
    print(f"📊 Testing JSON results retrieval for essay: {essay_id}")
    
    try:
        response = requests.get(f"{BASE_URL}/results/{essay_id}/json")
        
        if response.status_code == 200:
            results = response.json()
            print("✅ Results retrieved successfully")
            print(f"   Overall Score: {results['overall_score']}")
            print(f"   Graded at: {results['graded_at']}")
            
            # Print category scores
            print("   Category Scores:")
            for category, score_data in results['category_scores'].items():
                print(f"     {category}: {score_data['score']} - {score_data['feedback'][:50]}...")
            
            # Print additional info
            print(f"   Submission Type: {results.get('submission_type', 'N/A')}")
            print(f"   Word Count: {results.get('word_count', 'N/A')}")
            
            # Print examiner remarks
            if 'examiner_remarks' in results:
                print("   Examiner Remarks:")
                for remark_type, remarks in results['examiner_remarks'].items():
                    print(f"     {remark_type}: {', '.join(remarks[:2])}...")
            
            return True
        else:
            print(f"❌ Results retrieval failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Results retrieval error: {e}")
        return False

def test_get_results_pdf(essay_id):
    """Test retrieving the annotated PDF"""
    print(f"📄 Testing PDF results retrieval for essay: {essay_id}")
    
    try:
        response = requests.get(f"{BASE_URL}/results/{essay_id}")
        
        if response.status_code == 200:
            # Save the PDF
            output_file = f"graded_essay_{essay_id}.pdf"
            with open(output_file, 'wb') as f:
                f.write(response.content)
            
            print(f"✅ PDF downloaded successfully: {output_file}")
            print(f"   File size: {len(response.content)} bytes")
            return True
        else:
            print(f"❌ PDF retrieval failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ PDF retrieval error: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 Starting Essay Grading API Tests")
    print("=" * 50)
    
    # Test 1: Health check
    if not test_health_check():
        print("❌ Health check failed. Exiting.")
        return
    
    print()
    
    # Test 2: Create sample essay
    sample_file = create_sample_essay_pdf()
    print()
    
    # Test 3: Upload essay
    essay_id = test_upload_essay(sample_file)
    if not essay_id:
        print("❌ Essay upload failed. Exiting.")
        return
    
    print()
    
    # Wait a moment for processing
    print("⏳ Waiting for processing...")
    time.sleep(2)
    
    # Test 4: Get JSON results
    if not test_get_results_json(essay_id):
        print("❌ JSON results retrieval failed.")
    
    print()
    
    # Test 5: Get PDF results
    if not test_get_results_pdf(essay_id):
        print("❌ PDF results retrieval failed.")
    
    print()
    print("=" * 50)
    print("✅ All tests completed!")
    
    # Cleanup
    if os.path.exists(sample_file):
        os.remove(sample_file)
        print(f"🧹 Cleaned up: {sample_file}")

if __name__ == "__main__":
    main()
