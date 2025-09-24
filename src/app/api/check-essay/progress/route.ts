import { NextRequest, NextResponse } from 'next/server';

const getApiBase = () => {
  const fromEnv = process.env.ESSAY_API_BASE_URL || process.env.NEXT_PUBLIC_ESSAY_API_BASE_URL;
  return (fromEnv && fromEnv.trim()) || 'http://localhost:8000';
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');
    if (!taskId) {
      return NextResponse.json({ error: 'taskId is required' }, { status: 400 });
    }

    const apiBase = getApiBase();
    const resp = await fetch(`${apiBase}/progress/${encodeURIComponent(taskId)}`);
    const text = await resp.text();

    let json: any;
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      json = { detail: text };
    }

    if (!resp.ok) {
      return NextResponse.json({ error: 'upstream_error', detail: json.detail || json || 'Failed' }, { status: resp.status });
    }

    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json({ error: 'proxy_failed', detail: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';

