# Essay Grading API

A FastAPI-based backend service that accepts essay PDFs, grades them using AI, and returns annotated PDFs with detailed feedback.

## Features

- **PDF Processing**: Extract text from uploaded PDF files using pdfplumber
- **AI Grading**: Grade essays using OpenAI GPT-4 with customizable rubrics
- **PDF Generation**: Create annotated PDFs with grading results using reportlab
- **Storage**: Store and retrieve essay results and generated PDFs
- **RESTful API**: Clean REST endpoints for uploading and retrieving results

## Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd essay-grading-api
```

2. **Create virtual environment**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**:
```bash
cp env.example .env
# Edit .env with your OpenAI API key and other settings
```

5. **Run the application**:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Endpoints

### 1. Upload Essay for Grading
```
POST /upload-essay
```

**Request**: Upload a PDF file using multipart/form-data

**Response**:
```json
{
  "essay_id": "uuid-string",
  "overall_score": 75,
  "category_scores": {
    "Thesis & Topic Understanding": {
      "score": 8,
      "feedback": "Clear thesis statement with good topic understanding..."
    },
    "Outline Quality": {
      "score": 7,
      "feedback": "Basic outline present but could be more detailed..."
    },
    "Structure & Coherence": {
      "score": 12,
      "feedback": "Well-organized with logical flow..."
    },
    "Content Depth, Balance & Relevance": {
      "score": 15,
      "feedback": "Good content depth with relevant examples..."
    },
    "Language Proficiency & Expression": {
      "score": 12,
      "feedback": "Good language use with minor issues..."
    },
    "Critical Thinking & Analytical Reasoning": {
      "score": 4,
      "feedback": "Shows analytical thinking..."
    },
    "Conclusion": {
      "score": 8,
      "feedback": "Effective conclusion that summarizes main points..."
    },
    "Word Count & Length Control": {
      "score": 9,
      "feedback": "Appropriate length for CSS exam..."
    }
  },
  "summary_feedback": "Good work overall with room for improvement...",
  "submission_type": "B",
  "word_count": 2800,
  "examiner_remarks": {
    "strengths": ["Clear structure", "Good examples"],
    "weaknesses": ["Could improve outline", "More analysis needed"],
    "suggestions": ["Enhance outline", "Add more critical analysis"]
  },
  "message": "Essay graded successfully"
}
```

### 2. Retrieve Graded PDF
```
GET /results/{essay_id}
```

**Response**: Returns the annotated PDF file

### 3. Retrieve Grading Results (JSON)
```
GET /results/{essay_id}/json
```

**Response**: Returns grading results as JSON (without PDF)

### 4. Health Check
```
GET /health
```

**Response**:
```json
{
  "status": "healthy",
  "services": {
    "pdf_service": "available",
    "ai_service": "available",
    "storage_service": "available"
  }
}
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8000)
- `STORAGE_PATH`: Path for storing files (default: ./storage)
- `LOG_LEVEL`: Logging level (default: INFO)

### Rubric Configuration

The system uses the official CSS FPSC Pakistan essay grading rubric with 8 categories:
- **Thesis & Topic Understanding** (10 points): Clarity and relevance of thesis statement
- **Outline Quality** (10 points): Presence and quality of essay outline
- **Structure & Coherence** (15 points): Organization, logical flow, transitions
- **Content Depth, Balance & Relevance** (20 points): Depth, clarity, originality, relevance
- **Language Proficiency & Expression** (15 points): Grammar, vocabulary, sentence variety
- **Critical Thinking & Analytical Reasoning** (5 points): Analytical depth and reasoning
- **Conclusion** (10 points): Quality and effectiveness of conclusion
- **Word Count & Length Control** (15 points): Appropriate length (2500-3000 words for CSS)

The system also classifies submissions into types (A-G) and provides detailed examiner remarks with strengths, weaknesses, and suggestions.

## Usage Examples

### Using curl

1. **Upload an essay**:
```bash
curl -X POST "http://localhost:8000/upload-essay" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@your_essay.pdf"
```

2. **Get grading results**:
```bash
curl -X GET "http://localhost:8000/results/{essay_id}/json" \
  -H "accept: application/json"
```

3. **Download annotated PDF**:
```bash
curl -X GET "http://localhost:8000/results/{essay_id}" \
  -H "accept: application/pdf" \
  --output graded_essay.pdf
```

### Using Python requests

```python
import requests

# Upload essay
with open('essay.pdf', 'rb') as f:
    response = requests.post(
        'http://localhost:8000/upload-essay',
        files={'file': f}
    )
    result = response.json()
    essay_id = result['essay_id']

# Get results
response = requests.get(f'http://localhost:8000/results/{essay_id}/json')
results = response.json()
print(f"Overall score: {results['overall_score']}")

# Download annotated PDF
response = requests.get(f'http://localhost:8000/results/{essay_id}')
with open('graded_essay.pdf', 'wb') as f:
    f.write(response.content)
```

## Project Structure

```
essay-grading-api/
├── main.py                 # FastAPI application entry point
├── models.py              # Pydantic models for data validation
├── requirements.txt       # Python dependencies
├── env.example           # Environment variables template
├── README.md             # This file
├── services/             # Service modules
│   ├── pdf_service.py    # PDF text extraction
│   ├── ai_service.py     # AI grading service
│   ├── storage_service.py # File storage and retrieval
│   └── pdf_generator.py  # PDF generation and annotation
└── storage/              # Generated files (created at runtime)
    ├── results/          # JSON result files
    └── pdfs/             # Generated PDF files
```

## Development

### Running in Development Mode

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### API Documentation

Once the server is running, you can access:
- **Interactive API docs**: http://localhost:8000/docs
- **ReDoc documentation**: http://localhost:8000/redoc

### Testing

You can test the API using the interactive documentation at `/docs` or by using tools like Postman.

## Production Deployment

### Using Docker

1. **Create Dockerfile**:
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

2. **Build and run**:
```bash
docker build -t essay-grading-api .
docker run -p 8000:8000 -e OPENAI_API_KEY=your_key essay-grading-api
```

### Using Gunicorn

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid file formats
- File size limits
- AI service failures
- PDF processing errors
- Storage issues

All errors return appropriate HTTP status codes and descriptive error messages.

## Security Considerations

- Set appropriate CORS origins for production
- Use environment variables for sensitive configuration
- Implement rate limiting for production use
- Consider adding authentication/authorization
- Validate file uploads thoroughly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
