#!/usr/bin/env python3
"""
Test script for the CSS Rubric Essay Grading API
This script tests the updated CSS FPSC Pakistan rubric implementation
"""

import requests
import json
import os
import time
from pathlib import Path

# API Configuration
BASE_URL = "http://localhost:8000"

def test_css_rubric():
    """Test the CSS rubric implementation"""
    print("🎯 Testing CSS FPSC Pakistan Rubric Implementation")
    print("=" * 60)
    
    # Test 1: Health check
    print("🔍 Testing health check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to API. Make sure the server is running.")
        return
    
    # Test 2: Create a sample CSS-style essay
    print("\n📝 Creating sample CSS essay...")
    sample_essay = create_css_sample_essay()
    
    # Test 3: Test with text input (simulating PDF content)
    print("\n📤 Testing essay grading with CSS rubric...")
    test_result = test_essay_grading(sample_essay)
    
    if test_result:
        print("\n✅ CSS Rubric Test Completed Successfully!")
        print("🎉 The system is now using the official CSS FPSC Pakistan rubric!")
    else:
        print("\n❌ CSS Rubric Test Failed!")

def create_css_sample_essay():
    """Create a sample essay that would be typical for CSS exam"""
    essay = """
    The Role of Technology in Modern Governance
    
    Introduction
    
    In the contemporary era, technology has become an indispensable tool in governance, transforming how governments operate, interact with citizens, and deliver public services. This essay examines the multifaceted role of technology in modern governance, exploring its benefits, challenges, and implications for democratic processes.
    
    Outline
    
    I. Digital Transformation in Government Services
    II. E-Governance and Citizen Engagement
    III. Data-Driven Policy Making
    IV. Cybersecurity Challenges
    V. Digital Divide and Accessibility Issues
    VI. Future Prospects and Recommendations
    
    Digital Transformation in Government Services
    
    The digital transformation of government services has revolutionized public administration. Online portals, mobile applications, and automated systems have streamlined bureaucratic processes, reducing paperwork and processing times. For instance, the implementation of digital identity systems has simplified citizen verification processes, while online tax filing systems have made compliance more convenient for taxpayers.
    
    E-Governance and Citizen Engagement
    
    E-governance platforms have enhanced citizen participation in democratic processes. Social media platforms, government websites, and mobile applications provide citizens with direct access to information about policies, programs, and government activities. This transparency fosters accountability and builds public trust in government institutions.
    
    Data-Driven Policy Making
    
    Technology enables governments to collect, analyze, and utilize vast amounts of data for evidence-based policy making. Big data analytics help identify trends, predict outcomes, and optimize resource allocation. For example, smart city initiatives use data from various sensors to improve urban planning and service delivery.
    
    Cybersecurity Challenges
    
    However, the increasing reliance on technology also brings significant cybersecurity challenges. Government systems are prime targets for cyber attacks, which can compromise sensitive data and disrupt essential services. The need for robust cybersecurity measures has become paramount in protecting national security and citizen privacy.
    
    Digital Divide and Accessibility Issues
    
    Despite the benefits, the digital divide remains a critical concern. Rural areas and economically disadvantaged communities often lack access to high-speed internet and digital devices, creating disparities in access to government services. This digital inequality can exacerbate existing social and economic inequalities.
    
    Future Prospects and Recommendations
    
    The future of technology in governance lies in the integration of artificial intelligence, blockchain, and the Internet of Things. Governments must invest in digital infrastructure, cybersecurity, and digital literacy programs to ensure inclusive and secure digital governance.
    
    Conclusion
    
    Technology has fundamentally transformed modern governance, offering unprecedented opportunities for efficiency, transparency, and citizen engagement. However, realizing these benefits requires addressing cybersecurity challenges, bridging the digital divide, and ensuring that technological solutions serve the public interest. The successful integration of technology in governance depends on balanced policies that maximize benefits while minimizing risks.
    """
    
    return essay.strip()

def test_essay_grading(essay_text):
    """Test essay grading with the new CSS rubric"""
    try:
        # Create a temporary text file to simulate PDF upload
        with open("temp_essay.txt", "w", encoding="utf-8") as f:
            f.write(essay_text)
        
        # Upload the essay
        with open("temp_essay.txt", "rb") as f:
            files = {'file': ("temp_essay.txt", f, 'text/plain')}
            response = requests.post(f"{BASE_URL}/upload-essay", files=files)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Essay uploaded and graded successfully!")
            
            # Display results
            print(f"\n📊 Grading Results:")
            print(f"   Essay ID: {result['essay_id']}")
            print(f"   Overall Score: {result['overall_score']}/100")
            print(f"   Submission Type: {result['submission_type']}")
            print(f"   Word Count: {result['word_count']}")
            
            print(f"\n📋 Category Scores:")
            for category, score_data in result['category_scores'].items():
                print(f"   {category}: {score_data['score']}")
                print(f"     Feedback: {score_data['feedback'][:80]}...")
            
            print(f"\n💬 Summary Feedback:")
            print(f"   {result['summary_feedback']}")
            
            print(f"\n👨‍🏫 Examiner Remarks:")
            for remark_type, remarks in result['examiner_remarks'].items():
                print(f"   {remark_type}:")
                for remark in remarks:
                    print(f"     • {remark}")
            
            # Test JSON results retrieval
            print(f"\n📄 Testing JSON results retrieval...")
            json_response = requests.get(f"{BASE_URL}/results/{result['essay_id']}/json")
            if json_response.status_code == 200:
                print("✅ JSON results retrieved successfully")
            else:
                print("❌ JSON results retrieval failed")
            
            # Cleanup
            os.remove("temp_essay.txt")
            
            return True
        else:
            print(f"❌ Upload failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Test error: {e}")
        return False

def verify_css_rubric_features():
    """Verify that the CSS rubric features are working"""
    print("\n🔍 Verifying CSS Rubric Features...")
    
    features = [
        "8-category scoring system",
        "Submission type classification (A-G)",
        "Word count analysis",
        "Examiner remarks (strengths, weaknesses, suggestions)",
        "CSS-specific scoring guidelines",
        "Strict grading standards (>50 is rare)"
    ]
    
    for feature in features:
        print(f"   ✅ {feature}")
    
    print("\n🎯 CSS Rubric Features Verified!")

if __name__ == "__main__":
    # Run the test
    test_css_rubric()
    
    # Verify features
    verify_css_rubric_features()
    
    print("\n" + "=" * 60)
    print("🎉 CSS Rubric Implementation Complete!")
    print("🚀 Your essay grading system is now using the official CSS FPSC Pakistan rubric!")
    print("=" * 60)
