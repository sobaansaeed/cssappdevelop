import { NextRequest, NextResponse } from 'next/server';
import pastPapersData from '../../../data/past-papers.json';
import subjectsData from '../../../data/subjects.json';

interface PastPaper {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectType: 'compulsory' | 'optional';
  subjectGroup?: string;
  year: string;
  title: string;
  fileUrl: string;
  uploadDate: string;
  description: string;
}

export interface PastPaperResponse {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectType: 'compulsory' | 'optional';
  subjectGroup?: string;
  year: string;
  title: string;
  fileUrl: string;
  uploadDate: string;
  description: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('subjectId');
    const subjectType = searchParams.get('subjectType');
    const year = searchParams.get('year');
    const group = searchParams.get('group');

    let pastPapers: PastPaperResponse[] = pastPapersData.pastPapers as PastPaper[];

    // Filter by subject ID
    if (subjectId) {
      pastPapers = pastPapers.filter(paper => paper.subjectId === subjectId);
    }

    // Filter by subject type (compulsory/optional)
    if (subjectType) {
      pastPapers = pastPapers.filter(paper => paper.subjectType === subjectType);
    }

    // Filter by year
    if (year) {
      pastPapers = pastPapers.filter(paper => paper.year === year);
    }

    // Filter by group (for optional subjects)
    if (group) {
      pastPapers = pastPapers.filter(paper => paper.subjectGroup === group);
    }

    // Sort by year (newest first), then by subject name
    pastPapers.sort((a, b) => {
      const yearComparison = parseInt(b.year) - parseInt(a.year);
      if (yearComparison !== 0) return yearComparison;
      return a.subjectName.localeCompare(b.subjectName);
    });

    return NextResponse.json({
      pastPapers,
      count: pastPapers.length,
      filters: {
        subjectId,
        subjectType,
        year,
        group
      }
    });

  } catch (error) {
    console.error('Error fetching past papers:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch past papers',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 