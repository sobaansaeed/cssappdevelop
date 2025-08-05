import { NextRequest, NextResponse } from 'next/server';
import subjectsData from '../../../data/subjects.json';

interface Subject {
  id: string;
  name: string;
  type: 'compulsory' | 'optional';
  group?: string;
  code: string;
}

export interface SubjectResponse {
  id: string;
  name: string;
  type: 'compulsory' | 'optional';
  group?: string;
  code: string;
}

export async function GET(_request: NextRequest) {
  try {
    const compulsory: SubjectResponse[] = subjectsData.compulsory as Subject[];
    
    // Flatten optional subjects from all groups
    const optional: SubjectResponse[] = [];
    Object.entries(subjectsData.optional).forEach(([groupKey, groupData]) => {
      const groupSubjects = groupData.subjects as Subject[];
      groupSubjects.forEach(subject => {
        optional.push({
          ...subject,
          group: groupKey
        });
      });
    });

    return NextResponse.json({
      compulsory,
      optional,
      groups: subjectsData.optional,
      counts: {
        compulsory: compulsory.length,
        optional: optional.length,
        total: compulsory.length + optional.length
      }
    });

  } catch (error) {
    console.error('Error fetching subjects:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch subjects',
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 