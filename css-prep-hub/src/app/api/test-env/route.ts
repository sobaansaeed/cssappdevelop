import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if environment variables are loaded
    const hasNotionApiKey = !!process.env.NOTION_API_KEY;
    const hasNewspaperDb = !!process.env.NOTION_DATABASE_ID;
    const hasEditorialDb = !!process.env.NOTION_EDITORIAL_DATABASE_ID;
    
    // Don't expose the actual values for security
    const envStatus = {
      NOTION_API_KEY: hasNotionApiKey ? '✅ Set' : '❌ Missing',
      NOTION_DATABASE_ID: hasNewspaperDb ? '✅ Set' : '❌ Missing',
      NOTION_EDITORIAL_DATABASE_ID: hasEditorialDb ? '✅ Set' : '❌ Missing',
      allSet: hasNotionApiKey && hasNewspaperDb && hasEditorialDb
    };

    return NextResponse.json({
      message: 'Environment Variables Status',
      status: envStatus,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error checking environment variables:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check environment variables',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 