# Environment Setup - Manual PDF System

## Overview

This application uses a simple manual PDF hosting system with no external dependencies. PDFs are stored locally and managed through JSON metadata.

## System Architecture

### PDF Storage
- **Location**: `public/pdfs/` directory
- **Newspapers**: `public/pdfs/newspapers/`
- **Editorials**: `public/pdfs/editorials/`

### Metadata Management
- **File**: `src/data/pdfs.json`
- **Format**: JSON with PDF information
- **Updates**: Manual or through admin interface

## Local Development

No special environment variables are required. The system works out of the box.

### Optional Environment Variables
```env
# For development only (optional)
NODE_ENV=development
```

## Deployment

### Vercel Deployment
1. Push code to GitHub
2. Vercel automatically deploys
3. No environment variables needed
4. PDFs are served from public directory

## API Endpoints

### Available APIs
- `/api/newspapers` - Get newspapers from JSON data
- `/api/editorials` - Get editorials from JSON data
- `/api/pdfs` - Get all PDFs with filtering
- `/api/health` - Health check
- `/api/debug` - System information

## Management Tools

### 1. Manual Management
- Upload PDFs to `public/pdfs/` directories
- Edit `src/data/pdfs.json` to add metadata
- Deploy changes

### 2. Admin Interface
- Visit `/admin` on your website
- Web-based PDF management
- Add, edit, and delete PDF entries

### 3. Command Line Script
```bash
# Add PDF
node add-pdf.js quick-add "Title" "2024-08-05" "newspapers"

# List PDFs
node add-pdf.js list

# Scan directories
node add-pdf.js scan
```

## File Structure

```
public/pdfs/
├── newspapers/
│   ├── newspaper1.pdf
│   └── newspaper2.pdf
└── editorials/
    ├── editorial1.pdf
    └── editorial2.pdf

src/data/
└── pdfs.json  # PDF metadata
```

## JSON Format

```json
{
  "pdfs": [
    {
      "id": "unique-id",
      "title": "PDF Title",
      "date": "2024-08-05",
      "fileUrl": "/pdfs/category/filename.pdf",
      "category": "newspapers" or "editorials"
    }
  ]
}
```

## Troubleshooting

### Common Issues
1. **PDF not appearing**: Check JSON syntax and file paths
2. **Build errors**: Verify JSON is valid
3. **PDF not loading**: Check file exists in public directory

### Debug Tools
- `/api/health` - Basic health check
- `/api/debug` - System information
- `/admin` - Web-based management

## Benefits

✅ **No external dependencies**
✅ **No API limits**
✅ **Full control over data**
✅ **Easy to maintain**
✅ **Works immediately**
✅ **No configuration required**

This system is simple, reliable, and perfect for managing PDFs without external services. 