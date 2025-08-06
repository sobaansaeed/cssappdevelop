import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, getAdminToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: 'Username and password are required.'
      }, { status: 400 });
    }

    if (verifyAdminCredentials(username, password)) {
      const token = getAdminToken();
      
      const response = NextResponse.json({
        success: true,
        message: 'Login successful.',
        token
      }, { status: 200 });

      // Set cookie for session management
      response.cookies.set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials.'
      }, { status: 401 });
    }

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred during login.'
    }, { status: 500 });
  }
} 