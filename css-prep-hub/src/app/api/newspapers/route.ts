import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Type definitions for Notion API
interface NotionTextContent {
  plain_text: string;
}



// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export interface Newspaper {
  id: string;
  title: string;
  date: string;
  fileUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    
    if (!databaseId) {
      return NextResponse.json(
        { error: 'NOTION_DATABASE_ID not configured' },
        { status: 500 }
      );
    }

    // Query the Notion database
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Date',
          direction: 'descending', // newest first
        },
      ],
    });

    // Transform the data
    const newspapers: Newspaper[] = response.results
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((page: any) => {
        // Extract properties
        const titleProperty = page.properties.Name;
        const dateProperty = page.properties.Date;
        const fileProperty = page.properties['Files & media'];

        // Get title (from Name property)
        let title = '';
        if (titleProperty) {
          if (titleProperty.title && titleProperty.title.length > 0) {
            // Handle Title property type
            title = titleProperty.title[0].plain_text;
          } else if (titleProperty.rich_text && titleProperty.rich_text.length > 0) {
            // Handle Rich Text property type
            title = titleProperty.rich_text[0].plain_text;
          } else if (titleProperty.type === 'title' && titleProperty.title) {
            // Handle Title property
            title = titleProperty.title.map((t: NotionTextContent) => t.plain_text).join('');
          }
        }

        // Get date
        let date = '';
        if (dateProperty && dateProperty.date && dateProperty.date.start) {
          date = dateProperty.date.start;
        }

        // Get file URL
        let fileUrl = '';
        if (fileProperty && fileProperty.files && fileProperty.files.length > 0) {
          const file = fileProperty.files[0];
          if (file.type === 'file') {
            fileUrl = file.file.url;
          } else if (file.type === 'external') {
            fileUrl = file.external.url;
          }
        }

        // Only return newspapers that have all required fields
        if (title && date && fileUrl) {
          return {
            id: page.id,
            title,
            date,
            fileUrl,
          };
        }
        return null;
      })
      .filter(Boolean) as Newspaper[]; // Remove null entries

    return NextResponse.json({
      newspapers,
      count: newspapers.length,
    });

  } catch (error) {
    console.error('Error fetching newspapers from Notion:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch newspapers',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add CORS headers if needed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}