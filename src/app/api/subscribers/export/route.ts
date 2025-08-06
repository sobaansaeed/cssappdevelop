import { NextRequest, NextResponse } from 'next/server';
import { exportSubscribersToCSV, getAllSubscribers } from '@/lib/subscribers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'csv';
    
    if (format === 'csv') {
      const csvData = exportSubscribersToCSV();
      
      return new NextResponse(csvData, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="subscribers-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    } else if (format === 'json') {
      const subscribers = getAllSubscribers();
      
      return NextResponse.json({
        success: true,
        subscribers,
        exportedAt: new Date().toISOString()
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid export format. Use "csv" or "json".'
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Error exporting subscribers:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to export subscribers.'
    }, { status: 500 });
  }
} 