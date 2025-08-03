# Environment Variables Setup

## Required Environment Variables

Your application needs these environment variables to work with Notion API:

### 1. NOTION_API_KEY
- Get from: https://www.notion.so/my-integrations
- Create a new integration or use existing one
- Copy the "Internal Integration Token"

### 2. NOTION_DATABASE_ID
- Open your newspapers database in Notion
- Copy the database ID from the URL: `https://notion.so/workspace/[DATABASE_ID]?v=...`

### 3. NOTION_EDITORIAL_DATABASE_ID
- Open your editorials database in Notion
- Copy the database ID from the URL: `https://notion.so/workspace/[DATABASE_ID]?v=...`

## Local Development

Create a `.env.local` file in the `css-prep-hub` directory:

```env
NOTION_API_KEY=secret_your_notion_api_key_here
NOTION_DATABASE_ID=your_newspaper_database_id_here
NOTION_EDITORIAL_DATABASE_ID=your_editorial_database_id_here
```

## Vercel Deployment

Add these same environment variables in your Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add each variable with Production, Preview, and Development environments selected
3. Redeploy your application

## Database Setup

Make sure your Notion databases have these properties:

### Newspapers Database:
- Name (Title)
- Date (Date)
- Files & media (Files)

### Editorials Database:
- Title (Title)
- Author Name (Text)
- Newspaper (Select or Text)
- Date (Date)
- Files & media (Files)

## Troubleshooting

If you still get errors:
1. Check that your Notion integration has access to the databases
2. Verify database IDs are correct
3. Ensure all required properties exist in your databases 