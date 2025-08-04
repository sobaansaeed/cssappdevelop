# Vercel API Troubleshooting Guide

## Common Issues and Solutions

### 1. Environment Variables Not Loading

**Problem**: API routes return 500 errors with "environment variable not configured" messages.

**Solutions**:
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add these variables for ALL environments (Production, Preview, Development):
  ```
  NOTION_API_KEY=secret_your_key_here
  NOTION_DATABASE_ID=your_database_id_here
  NOTION_EDITORIAL_DATABASE_ID=your_editorial_db_id_here
  ```
- **Important**: After adding variables, redeploy your application
- Check that your Notion API key starts with `secret_`

### 2. CORS Issues

**Problem**: API calls from frontend fail with CORS errors.

**Solutions**:
- The updated `next.config.ts` and `vercel.json` now include proper CORS headers
- If still having issues, check browser console for specific CORS errors

### 3. API Routes Not Found (404)

**Problem**: API endpoints return 404 errors.

**Solutions**:
- Ensure your API routes are in the correct location: `src/app/api/`
- Check that route files are named `route.ts` (not `api.ts`)
- Verify the build process completes successfully
- Check Vercel function logs for deployment errors

### 4. Notion API Connection Issues

**Problem**: API returns errors when connecting to Notion.

**Solutions**:
- Verify your Notion integration has access to the databases
- Check that database IDs are correct (32 characters, no hyphens)
- Ensure database properties match expected names:
  - Newspapers: `Name`, `Date`, `Files & media`
  - Editorials: `Title`, `Author Name`, `Newspaper`, `Date`, `Files & media`

### 5. Runtime Errors

**Problem**: API functions timeout or crash.

**Solutions**:
- Check Vercel function logs in the dashboard
- Ensure `@notionhq/client` is in dependencies (not devDependencies)
- Verify Node.js runtime is set to 18.x in `vercel.json`

## Debugging Steps

### Step 1: Test Environment Variables
Visit: `https://your-app.vercel.app/api/test-env`

This will show you which environment variables are missing or incorrectly formatted.

### Step 2: Comprehensive Debug
Visit: `https://your-app.vercel.app/api/debug`

This provides detailed analysis of your environment setup and recommendations.

### Step 3: Test Individual APIs
- Newspapers: `https://your-app.vercel.app/api/newspapers`
- Editorials: `https://your-app.vercel.app/api/editorials`

### Step 4: Check Vercel Logs
1. Go to Vercel Dashboard → Your Project → Functions
2. Click on the function that's failing
3. Check the "Logs" tab for error details

## Deployment Checklist

- [ ] Environment variables added to Vercel dashboard
- [ ] Environment variables set for all environments (Production, Preview, Development)
- [ ] Application redeployed after adding environment variables
- [ ] Build process completes successfully
- [ ] API routes accessible via direct URL
- [ ] Notion integration has database access
- [ ] Database IDs are correct and in proper format

## Quick Fix Commands

If you need to force a redeploy:
```bash
# In your local project directory
git add .
git commit -m "Fix API configuration"
git push origin main
```

## Still Having Issues?

1. Check the Vercel function logs for specific error messages
2. Test the `/api/debug` endpoint to see environment variable status
3. Verify your Notion integration settings
4. Ensure all database properties exist and are named correctly
5. Check that your Notion API key is valid and not expired 