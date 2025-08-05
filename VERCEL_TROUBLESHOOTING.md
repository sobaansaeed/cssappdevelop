# Vercel Deployment Troubleshooting Guide

## Common Issues and Solutions

### 1. PDF Files Not Loading

**Problem**: PDFs don't appear on the website or return 404 errors.

**Solutions**:
- Check that PDF files are in the correct directories: `public/pdfs/newspapers/` or `public/pdfs/editorials/`
- Verify the file paths in `src/data/pdfs.json` match the actual file locations
- Ensure PDF files are committed and pushed to GitHub
- Check that Vercel deployment completed successfully

### 2. JSON Syntax Errors

**Problem**: Build fails due to invalid JSON in `src/data/pdfs.json`.

**Solutions**:
- Use a JSON validator to check syntax
- Ensure all required fields are present: `id`, `title`, `date`, `fileUrl`, `category`
- Check for missing commas, brackets, or quotes
- Verify the JSON structure matches the expected format

### 3. API Routes Not Working

**Problem**: API endpoints return errors or don't load data.

**Solutions**:
- Check that all API route files are in the correct location: `src/app/api/`
- Verify the build process completes successfully
- Test the health endpoint: `/api/health`
- Check Vercel function logs for specific error messages

### 4. Admin Interface Issues

**Problem**: Admin interface at `/admin` doesn't work properly.

**Solutions**:
- Ensure the admin page component is properly built
- Check that the admin interface can access the PDFs API
- Verify that the JSON data is being read correctly

## Debugging Steps

### Step 1: Test System Health
Visit: `https://your-app.vercel.app/api/health`

This will confirm that the basic system is working.

### Step 2: Check System Information
Visit: `https://your-app.vercel.app/api/debug`

This provides detailed information about your system setup.

### Step 3: Test Individual APIs
- Newspapers: `https://your-app.vercel.app/api/newspapers`
- Editorials: `https://your-app.vercel.app/api/editorials`
- All PDFs: `https://your-app.vercel.app/api/pdfs`

### Step 4: Check Vercel Logs
1. Go to Vercel Dashboard → Your Project → Functions
2. Click on the function that's failing
3. Check the "Logs" tab for error details

## Deployment Checklist

- [ ] PDF files uploaded to correct directories
- [ ] JSON metadata updated in `src/data/pdfs.json`
- [ ] All changes committed and pushed to GitHub
- [ ] Vercel deployment completed successfully
- [ ] API routes accessible via direct URL
- [ ] PDFs appear on website pages
- [ ] Admin interface working at `/admin`

## Quick Fix Commands

If you need to force a redeploy:
```bash
# In your local project directory
git add .
git commit -m "Fix PDF system configuration"
git push origin main
```

## Common JSON Format Issues

### Correct Format
```json
{
  "pdfs": [
    {
      "id": "unique-id",
      "title": "PDF Title",
      "date": "2024-08-05",
      "fileUrl": "/pdfs/newspapers/filename.pdf",
      "category": "newspapers"
    }
  ]
}
```

### Common Mistakes
- Missing commas between objects
- Incorrect file paths (should start with `/pdfs/`)
- Wrong category values (use "newspapers" or "editorials" only)
- Invalid date format (use YYYY-MM-DD)

## File Management Best Practices

### Directory Structure
```
public/pdfs/
├── newspapers/
│   ├── August 5 Dawn.pdf
│   └── August 5 The News.pdf
└── editorials/
    ├── August 5 Dawn Editorial.pdf
    └── August 5 The News Editorial.pdf
```

### File Naming
- Use descriptive names: `August 5 Dawn Editorial.pdf`
- Avoid special characters in filenames
- Keep names consistent with JSON metadata

## Still Having Issues?

1. Check the Vercel function logs for specific error messages
2. Test the `/api/debug` endpoint to see system status
3. Verify all file paths and JSON syntax
4. Ensure all PDF files exist in the correct directories
5. Check that the build process completes without errors

## System Benefits

✅ **No external dependencies** - Works without any third-party services
✅ **No API limits** - Unlimited PDF uploads
✅ **Full control** - Your data, your rules
✅ **Easy maintenance** - Simple file-based system
✅ **Immediate deployment** - No complex configuration required

The manual PDF system is designed to be simple and reliable. Most issues can be resolved by checking file paths and JSON syntax. 