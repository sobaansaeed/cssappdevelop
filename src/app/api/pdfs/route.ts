import { NextRequest, NextResponse } from 'next/server';
import pdfData from '../../../data/pdfs.json';

interface PDFFile {
  id: string;
  title: string;
  date: string;
  fileUrl: string;
  category: 'newspapers' | 'editorials';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredPDFs = pdfData.pdfs as PDFFile[];

    // Filter by category if specified
    if (category && (category === 'newspapers' || category === 'editorials')) {
      filteredPDFs = filteredPDFs.filter(pdf => pdf.category === category);
    }

    // Sort by date (newest first)
    filteredPDFs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Apply pagination
    const paginatedPDFs = filteredPDFs.slice(offset, offset + limit);

    return NextResponse.json({
      pdfs: paginatedPDFs,
      total: filteredPDFs.length,
      category: category || 'all',
      pagination: {
        limit,
        offset,
        hasMore: offset + limit < filteredPDFs.length
      }
    });

  } catch (error) {
    console.error('Error fetching PDFs:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch PDFs',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

 