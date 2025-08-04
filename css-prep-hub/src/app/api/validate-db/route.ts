import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

interface DatabaseValidation {
  accessible: boolean;
  properties?: string[];
  requiredProperties?: string[];
  missingProperties?: string[];
  error?: string;
}

export async function GET() {
  try {
    // Check environment variables
    const notionApiKey = process.env.NOTION_API_KEY;
    const newspaperDbId = process.env.NOTION_DATABASE_ID;
    const editorialDbId = process.env.NOTION_EDITORIAL_DATABASE_ID;

    const validation = {
      environment: {
        notionApiKey: {
          exists: !!notionApiKey,
          valid: notionApiKey?.startsWith('secret_') || false,
          preview: notionApiKey ? `${notionApiKey.substring(0, 10)}...` : 'Not set'
        },
        newspaperDbId: {
          exists: !!newspaperDbId,
          valid: newspaperDbId ? /^[a-zA-Z0-9]{32}$/.test(newspaperDbId.replace(/-/g, '')) : false,
          value: newspaperDbId || 'Not set'
        },
        editorialDbId: {
          exists: !!editorialDbId,
          valid: editorialDbId ? /^[a-zA-Z0-9]{32}$/.test(editorialDbId.replace(/-/g, '')) : false,
          value: editorialDbId || 'Not set'
        }
      },
      databases: {
        newspapers: null as DatabaseValidation | null,
        editorials: null as DatabaseValidation | null
      }
    };

    // If we have valid credentials, test database connections
    if (validation.environment.notionApiKey.exists && validation.environment.notionApiKey.valid) {
      const notion = new Client({ auth: notionApiKey });

      // Test Newspapers Database
      if (validation.environment.newspaperDbId.exists && validation.environment.newspaperDbId.valid && newspaperDbId) {
        try {
          const newspaperResponse = await notion.databases.retrieve({
            database_id: newspaperDbId
          });
          
          validation.databases.newspapers = {
            accessible: true,
            properties: Object.keys(newspaperResponse.properties),
            requiredProperties: ['Name', 'Date', 'Files & media'],
            missingProperties: ['Name', 'Date', 'Files & media'].filter(
              prop => !Object.keys(newspaperResponse.properties).includes(prop)
            )
          };
        } catch (error) {
          validation.databases.newspapers = {
            accessible: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      }

      // Test Editorials Database
      if (validation.environment.editorialDbId.exists && validation.environment.editorialDbId.valid && editorialDbId) {
        try {
          const editorialResponse = await notion.databases.retrieve({
            database_id: editorialDbId
          });
          
          validation.databases.editorials = {
            accessible: true,
            properties: Object.keys(editorialResponse.properties),
            requiredProperties: ['Title', 'Author Name', 'Newspaper', 'Date', 'Files & media'],
            missingProperties: ['Title', 'Author Name', 'Newspaper', 'Date', 'Files & media'].filter(
              prop => !Object.keys(editorialResponse.properties).includes(prop)
            )
          };
        } catch (error) {
          validation.databases.editorials = {
            accessible: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      }
    }

    // Summary
    const summary = {
      allEnvironmentVariablesSet: validation.environment.notionApiKey.exists && 
                                  validation.environment.newspaperDbId.exists && 
                                  validation.environment.editorialDbId.exists,
      allEnvironmentVariablesValid: validation.environment.notionApiKey.valid && 
                                    validation.environment.newspaperDbId.valid && 
                                    validation.environment.editorialDbId.valid,
      newspapersDatabaseReady: validation.databases.newspapers?.accessible && 
                               (validation.databases.newspapers?.missingProperties?.length ?? 0) === 0,
      editorialsDatabaseReady: validation.databases.editorials?.accessible && 
                               (validation.databases.editorials?.missingProperties?.length ?? 0) === 0
    };

    return NextResponse.json({
      message: 'Database Validation Results',
      timestamp: new Date().toISOString(),
      validation,
      summary,
      recommendations: {
        ifNotionApiKeyMissing: 'Add NOTION_API_KEY to Vercel environment variables',
        ifNotionApiKeyInvalid: 'API key should start with "secret_"',
        ifDbIdMissing: 'Add database IDs to Vercel environment variables',
        ifDbIdInvalid: 'Database ID should be 32 characters (remove hyphens)',
        ifDatabaseInaccessible: 'Check Notion integration permissions',
        ifPropertiesMissing: 'Add missing properties to your Notion database'
      }
    });

  } catch (error) {
    console.error('Error in database validation:', error);
    return NextResponse.json(
      { 
        error: 'Database validation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 