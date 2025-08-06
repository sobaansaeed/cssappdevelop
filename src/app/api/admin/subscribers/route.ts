import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { getSubscribersData } from '@/lib/vercel-storage';

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const token = request.cookies.get('admin-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized access.'
      }, { status: 401 });
    }

    const data = getSubscribersData();
    
    return NextResponse.json({
      success: true,
      subscribers: data.subscribers,
      stats: data.stats
    }, { status: 200 });

  } catch (error) {
    console.error('Error getting admin subscribers:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to get subscribers data.'
    }, { status: 500 });
  }
} 