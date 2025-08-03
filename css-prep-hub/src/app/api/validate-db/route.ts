import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const newspaperDbId = process.env.NOTION_DATABASE_ID;
    const editorialDbId = process.env.NOTION_EDITORIAL_DATABASE_ID;
    
    // Validate database ID format (32 characters with hyphens)
    const isValidFormat = (id: string) => {
      if (!id) return false;
      // Remove hyphens and check if it's 32 characters
      const cleanId = id.replace(/-/g, '');
      return cleanId.length === 32 && /^[a-zA-Z0-9]+$/.test(cleanId);
    };

    const validation = {
      newspaperDb: {
        id: newspaperDbId ? `${newspaperDbId.substring(0, 8)}...` : 'Not set',
        isValid: isValidFormat(newspaperDbId || ''),
        length: newspaperDbId?.length || 0
      },
      editorialDb: {
        id: editorialDbId ? `${editorialDbId.substring(0, 8)}...` : 'Not set',
        isValid: isValidFormat(editorialDbId || ''),
        length: editorialDbId?.length || 0
      }
    };

    return NextResponse.json({
      message: 'Database ID Validation',
      validation,
      expectedFormat: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (32 characters total)',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error validating database IDs:', error);
    return NextResponse.json(
      { 
        error: 'Failed to validate database IDs',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 