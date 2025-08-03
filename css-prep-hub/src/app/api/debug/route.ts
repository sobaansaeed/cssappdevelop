import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check all environment variables
    const notionApiKey = process.env.NOTION_API_KEY;
    const newspaperDbId = process.env.NOTION_DATABASE_ID;
    const editorialDbId = process.env.NOTION_EDITORIAL_DATABASE_ID;
    
    // Detailed analysis
    const analysis = {
      notionApiKey: {
        exists: !!notionApiKey,
        length: notionApiKey?.length || 0,
        startsWithSecret: notionApiKey?.startsWith('secret_') || false,
        preview: notionApiKey ? `${notionApiKey.substring(0, 10)}...` : 'Not set'
      },
      newspaperDbId: {
        exists: !!newspaperDbId,
        length: newspaperDbId?.length || 0,
        isValidFormat: newspaperDbId ? /^[a-zA-Z0-9]{32}$/.test(newspaperDbId.replace(/-/g, '')) : false,
        value: newspaperDbId || 'Not set'
      },
      editorialDbId: {
        exists: !!editorialDbId,
        length: editorialDbId?.length || 0,
        isValidFormat: editorialDbId ? /^[a-zA-Z0-9]{32}$/.test(editorialDbId.replace(/-/g, '')) : false,
        value: editorialDbId || 'Not set'
      }
    };

    // Check if all required variables are set
    const allSet = analysis.notionApiKey.exists && 
                   analysis.newspaperDbId.exists && 
                   analysis.editorialDbId.exists;

    // Check if all variables are in correct format
    const allValid = analysis.notionApiKey.startsWithSecret && 
                     analysis.newspaperDbId.isValidFormat && 
                     analysis.editorialDbId.isValidFormat;

    return NextResponse.json({
      message: 'Comprehensive Environment Debug',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      analysis,
      summary: {
        allVariablesSet: allSet,
        allVariablesValid: allValid,
        readyToConnect: allSet && allValid
      },
      recommendations: {
        ifNotionApiKeyMissing: 'Get from https://www.notion.so/my-integrations',
        ifNotionApiKeyInvalid: 'Should start with "secret_"',
        ifDbIdMissing: 'Copy from Notion database URL',
        ifDbIdInvalid: 'Should be 32 characters (remove hyphens)'
      }
    });

  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json(
      { 
        error: 'Debug endpoint failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 