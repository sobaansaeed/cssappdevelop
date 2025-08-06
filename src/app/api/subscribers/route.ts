import { NextResponse } from 'next/server';
import { readSubscribersData } from '@/lib/subscribers';

export async function GET() {
  try {
    const data = readSubscribersData();
    
    return NextResponse.json({
      success: true,
      count: data.stats.active,
      stats: data.stats
    }, { status: 200 });

  } catch (error) {
    console.error('Error getting subscriber count:', error);
    return NextResponse.json({
      success: false,
      count: 0,
      message: 'Failed to get subscriber count.'
    }, { status: 500 });
  }
} 