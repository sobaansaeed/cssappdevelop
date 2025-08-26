#!/usr/bin/env python3
"""
Integration example showing how to connect the Python Essay Grading API
with the existing Next.js frontend
"""

import requests
import json
from typing import Dict, Any, Optional

class EssayGradingAPI:
    """Client for the Essay Grading API"""
    
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url.rstrip('/')
    
    def health_check(self) -> bool:
        """Check if the API is healthy"""
        try:
            response = requests.get(f"{self.base_url}/health")
            return response.status_code == 200
        except:
            return False
    
    def grade_essay_pdf(self, pdf_file_path: str) -> Optional[Dict[str, Any]]:
        """
        Grade an essay PDF and return results
        
        Args:
            pdf_file_path: Path to the PDF file
            
        Returns:
            Dictionary with grading results or None if failed
        """
        try:
            with open(pdf_file_path, 'rb') as f:
                files = {'file': (pdf_file_path, f, 'application/pdf')}
                response = requests.post(f"{self.base_url}/upload-essay", files=files)
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Error: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            print(f"Error grading essay: {e}")
            return None
    
    def get_grading_results(self, essay_id: str) -> Optional[Dict[str, Any]]:
        """Get grading results as JSON"""
        try:
            response = requests.get(f"{self.base_url}/results/{essay_id}/json")
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Error: {response.status_code} - {response.text}")
                return None
        except Exception as e:
            print(f"Error getting results: {e}")
            return None
    
    def download_graded_pdf(self, essay_id: str, output_path: str) -> bool:
        """Download the graded PDF"""
        try:
            response = requests.get(f"{self.base_url}/results/{essay_id}")
            if response.status_code == 200:
                with open(output_path, 'wb') as f:
                    f.write(response.content)
                return True
            else:
                print(f"Error: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            print(f"Error downloading PDF: {e}")
            return False

def integrate_with_nextjs_frontend():
    """
    Example of how to integrate the Python API with your Next.js frontend
    """
    print("🔄 Integration Example: Python API + Next.js Frontend")
    print("=" * 60)
    
    # Initialize API client
    api = EssayGradingAPI()
    
    # Check if API is running
    if not api.health_check():
        print("❌ API is not running. Please start the Python API first.")
        print("   Run: python main.py")
        return
    
    print("✅ API is running and healthy")
    
    # Example: Grade an essay
    sample_pdf = "sample_essay.pdf"  # You would get this from your frontend
    
    print(f"\n📤 Grading essay: {sample_pdf}")
    result = api.grade_essay_pdf(sample_pdf)
    
    if result:
        essay_id = result['essay_id']
        print(f"✅ Essay graded successfully!")
        print(f"   Essay ID: {essay_id}")
        print(f"   Overall Score: {result['overall_score']}/100")
        
        # Get detailed results
        print(f"\n📊 Getting detailed results...")
        detailed_results = api.get_grading_results(essay_id)
        
        if detailed_results:
            print("✅ Detailed results retrieved")
            print(f"   Graded at: {detailed_results['graded_at']}")
            
            # Print category scores
            print("   Category Scores:")
            for category, score_data in detailed_results['category_scores'].items():
                print(f"     {category}: {score_data['score']}")
                print(f"       Feedback: {score_data['feedback'][:100]}...")
        
        # Download graded PDF
        print(f"\n📄 Downloading graded PDF...")
        if api.download_graded_pdf(essay_id, f"graded_{essay_id}.pdf"):
            print(f"✅ Graded PDF downloaded: graded_{essay_id}.pdf")
        else:
            print("❌ Failed to download graded PDF")
    
    else:
        print("❌ Failed to grade essay")

def nextjs_integration_code():
    """
    Example Next.js code for integrating with the Python API
    """
    print("\n" + "=" * 60)
    print("📝 Next.js Integration Code Example")
    print("=" * 60)
    
    nextjs_code = '''
// Next.js API route for essay grading
// pages/api/grade-essay-python.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = new FormData();
    formData.append('file', req.body.file);

    // Call Python API
    const response = await fetch('http://localhost:8000/upload-essay', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Python API error: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Store result in your database if needed
    // await db.essays.create({
    //   userId: req.user.id,
    //   essayId: result.essay_id,
    //   score: result.overall_score,
    //   // ... other fields
    // });

    res.status(200).json(result);
  } catch (error) {
    console.error('Essay grading error:', error);
    res.status(500).json({ error: 'Failed to grade essay' });
  }
}

// Frontend component for uploading essays
// components/EssayUploader.js

import { useState } from 'react';

export default function EssayUploader() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/grade-essay-python', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setResult(data);
      
      // Optionally download the graded PDF
      const pdfResponse = await fetch(`http://localhost:8000/results/${data.essay_id}`);
      if (pdfResponse.ok) {
        const blob = await pdfResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `graded_essay_${data.essay_id}.pdf`;
        a.click();
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to grade essay');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          required
        />
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Grading...' : 'Grade Essay'}
        </button>
      </form>

      {result && (
        <div>
          <h3>Grading Results</h3>
          <p>Overall Score: {result.overall_score}/100</p>
          <p>Essay ID: {result.essay_id}</p>
          
          <h4>Category Scores:</h4>
          {Object.entries(result.category_scores).map(([category, data]) => (
            <div key={category}>
              <strong>{category}:</strong> {data.score}
              <p>{data.feedback}</p>
            </div>
          ))}
          
          <h4>Summary:</h4>
          <p>{result.summary_feedback}</p>
        </div>
      )}
    </div>
  );
}
'''
    
    print(nextjs_code)

if __name__ == "__main__":
    # Run integration example
    integrate_with_nextjs_frontend()
    
    # Show Next.js integration code
    nextjs_integration_code()
