import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check system status
    const systemStatus = {
      pdfSystem: {
        status: 'active',
        description: 'Manual PDF hosting system'
      },
      apis: {
        newspapers: '/api/newspapers',
        editorials: '/api/editorials',
        pdfs: '/api/pdfs',
        health: '/api/health'
      },
      directories: {
        newspapers: 'public/pdfs/newspapers/',
        editorials: 'public/pdfs/editorials/'
      }
    };

    return NextResponse.json({
      message: 'System Debug Information',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      system: systemStatus,
      summary: {
        systemType: 'Manual PDF Hosting',
        noExternalDependencies: true,
        readyToUse: true
      },
      recommendations: {
        addPDFs: 'Upload PDFs to public/pdfs/ directories',
        updateJSON: 'Edit src/data/pdfs.json to add metadata',
        useAdmin: 'Visit /admin for web-based management',
        useScript: 'Use add-pdf.js script for command-line management'
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