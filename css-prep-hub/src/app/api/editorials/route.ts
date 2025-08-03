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

export interface Editorial {
  id: string;
  title: string;
  authorName: string;
  newspaper: string;
  date: string;
  fileUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    // Check all required environment variables
    const notionApiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_EDITORIAL_DATABASE_ID;
    
    if (!notionApiKey) {
      console.error('NOTION_API_KEY is missing');
      return NextResponse.json(
        { error: 'NOTION_API_KEY not configured' },
        { status: 500 }
      );
    }
    
    if (!databaseId) {
      console.error('NOTION_EDITORIAL_DATABASE_ID is missing');
      return NextResponse.json(
        { error: 'NOTION_EDITORIAL_DATABASE_ID not configured' },
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
    const editorials: Editorial[] = response.results
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((page: any) => {
        // Extract properties
        const titleProperty = page.properties['Title '];
        const authorProperty = page.properties['Author Name'];
        const newspaperProperty = page.properties['Newspaper '];
        const dateProperty = page.properties.Date;
        const fileProperty = page.properties['Files & media'];

        // Get title
        let title = '';
        
        if (titleProperty) {
          // Handle Title property type (most common for Notion title fields)
          if (titleProperty.type === 'title' && titleProperty.title && titleProperty.title.length > 0) {
            title = titleProperty.title.map((t: NotionTextContent) => t.plain_text).join('');
          }
          // Handle direct title array
          else if (titleProperty.title && Array.isArray(titleProperty.title) && titleProperty.title.length > 0) {
            title = titleProperty.title.map((t: NotionTextContent) => t.plain_text).join('');
          }
          // Handle Rich Text property type
          else if (titleProperty.rich_text && titleProperty.rich_text.length > 0) {
            title = titleProperty.rich_text[0].plain_text;
          }
          // Handle single title object
          else if (titleProperty.title && titleProperty.title.plain_text) {
            title = titleProperty.title.plain_text;
          }
        }

        // Get author name
        let authorName = '';
        if (authorProperty) {
          if (authorProperty.rich_text && authorProperty.rich_text.length > 0) {
            authorName = authorProperty.rich_text[0].plain_text;
          } else if (authorProperty.title && authorProperty.title.length > 0) {
            authorName = authorProperty.title[0].plain_text;
          } else if (authorProperty.select && authorProperty.select.name) {
            authorName = authorProperty.select.name;
          } else if (authorProperty.people && authorProperty.people.length > 0) {
            authorName = authorProperty.people[0].name;
          } else if (authorProperty.plain_text) {
            authorName = authorProperty.plain_text;
          } else if (typeof authorProperty === 'string') {
            authorName = authorProperty;
          }
        }

        // Get newspaper
        let newspaper = '';
        
        if (newspaperProperty) {
          if (newspaperProperty.select && newspaperProperty.select.name) {
            newspaper = newspaperProperty.select.name;
          } else if (newspaperProperty.rich_text && newspaperProperty.rich_text.length > 0) {
            newspaper = newspaperProperty.rich_text[0].plain_text;
          } else if (newspaperProperty.title && newspaperProperty.title.length > 0) {
            newspaper = newspaperProperty.title[0].plain_text;
          } else if (typeof newspaperProperty === 'string') {
            newspaper = newspaperProperty;
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





        // Only return editorials that have all required fields
        if (title && authorName && newspaper && date && fileUrl) {
          return {
            id: page.id,
            title,
            authorName,
            newspaper,
            date,
            fileUrl,
          };
        }
        return null;
      })
      .filter(Boolean) as Editorial[]; // Remove null entries

    return NextResponse.json({
      editorials,
      count: editorials.length,
    });

  } catch (error) {
    console.error('Error fetching editorials from Notion:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch editorials',
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