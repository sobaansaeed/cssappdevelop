# Alternative PDF Hosting System

## 🚀 Quick Start

This system provides a reliable alternative to Notion API for hosting PDFs.

### Available APIs
- `/api/newspapers-alt` - Newspapers (replaces `/api/newspapers`)
- `/api/editorials-alt` - Editorials (replaces `/api/editorials`)
- `/api/pdfs` - All PDFs with filtering
- `/api/health` - Health check

### Admin Interface
- `/admin` - Web interface to manage PDFs

## 📁 File Structure
```
public/pdfs/
├── newspapers/
│   └── your-newspaper.pdf
└── editorials/
    └── your-editorial.pdf

src/data/
└── pdfs.json  # PDF metadata
```

## 🔧 How to Add PDFs

### Method 1: Manual (Recommended)
1. Upload PDF to `public/pdfs/newspapers/` or `public/pdfs/editorials/`
2. Edit `src/data/pdfs.json` to add metadata
3. Deploy to Vercel

### Method 2: Admin Interface
1. Visit `/admin` on your deployed site
2. Use the web form to add PDFs
3. Upload files manually to the public directory

## 📝 JSON Format
```json
{
  "pdfs": [
    {
      "id": "unique-id",
      "title": "PDF Title",
      "date": "2024-01-15",
      "fileUrl": "/pdfs/newspapers/filename.pdf",
      "category": "newspapers"
    }
  ]
}
```

## 🔄 Switch Your Frontend

Replace these API calls:
```javascript
// OLD (Notion API)
fetch('/api/newspapers')
fetch('/api/editorials')

// NEW (Alternative API)
fetch('/api/newspapers-alt')
fetch('/api/editorials-alt')
```

## ✅ Benefits
- ✅ No external dependencies
- ✅ Works immediately
- ✅ No API limits
- ✅ Full control over data
- ✅ Easy to maintain

## 🎯 Next Steps
1. Deploy this code to Vercel
2. Test the alternative APIs
3. Update your frontend to use the new endpoints
4. Add your actual PDF files

The alternative system will work immediately without any Notion setup! 