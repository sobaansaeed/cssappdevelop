import { NextRequest } from 'next/server';

// Simple admin credentials (in production, use environment variables)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'csskro2024';

export function verifyAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function getAdminToken(): string {
  // Simple token generation (in production, use JWT)
  return Buffer.from(`${ADMIN_USERNAME}:${Date.now()}`).toString('base64');
}

export function verifyAdminToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [username] = decoded.split(':');
    return username === ADMIN_USERNAME;
  } catch {
    return false;
  }
}

export function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown';
} 