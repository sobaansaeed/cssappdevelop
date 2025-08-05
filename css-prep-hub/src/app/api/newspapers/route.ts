import { NextRequest, NextResponse } from 'next/server';
import pdfData from '../../../data/pdfs.json';

interface PDFFile {
  id: string;
  title: string;
  date: string;
  fileUrl: string;
  category: 'newspapers' | 'editorials';
}

export interface Newspaper {
  id: string;
  title: string;
  date: string;
  fileUrl: string;
}

export async function GET(_request: NextRequest) {
  try {
    // Filter only newspapers from the PDF data
    const newspapers: Newspaper[] = (pdfData.pdfs as PDFFile[])
      .filter(pdf => pdf.category === 'newspapers')
      .map(pdf => ({
        id: pdf.id,
        title: pdf.title,
        date: pdf.date,
        fileUrl: pdf.fileUrl
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({
      newspapers,
      count: newspapers.length,
    });

  } catch (error) {
    console.error('Error fetching newspapers:', error);
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