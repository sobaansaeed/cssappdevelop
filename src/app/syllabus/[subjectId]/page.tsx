'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen, ChevronLeft, FileText, Clock, Award, Users, Calendar } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  type: 'compulsory' | 'optional';
  group?: string;
  code: string;
}

interface SyllabusSection {
  title: string;
  topics: string[];
  description?: string;
}

interface DetailedSyllabus {
  subjectId: string;
  subjectName: string;
  subjectType: 'compulsory' | 'optional';
  subjectGroup?: string;
  code: string;
  marks: number;
  duration: string;
  sections: SyllabusSection[];
  recommendedBooks: string[];
  examPattern: string;
  preparationTips: string[];
}

export default function SubjectSyllabusPage() {
  const params = useParams();
  const subjectId = params.subjectId as string;
  
  const [subject, setSubject] = useState<Subject | null>(null);
  const [syllabus, setSyllabus] = useState<DetailedSyllabus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subjectId) {
      fetchSubjectData();
      generateSyllabus();
    }
  }, [subjectId]);

  const fetchSubjectData = async () => {
    try {
      const response = await fetch('/api/subjects');
      const data = await response.json();
      
      // Find the subject in either compulsory or optional
      const foundSubject = data.compulsory.find((s: Subject) => s.id === subjectId) ||
                          data.optional.find((s: Subject) => s.id === subjectId);
      
      if (foundSubject) {
        setSubject(foundSubject);
      }
    } catch (error) {
      console.error('Error fetching subject data:', error);
    }
  };

  const generateSyllabus = () => {
    // Generate detailed syllabus based on subject ID
    const syllabusData: { [key: string]: DetailedSyllabus } = {
      'english-essay': {
        subjectId: 'english-essay',
        subjectName: 'English Essay',
        subjectType: 'compulsory',
        code: 'CE-1',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Essay Writing Requirements',
            description: 'Candidates will be required to write one or more Essay in English. A wide choice of topics will be given.',
            topics: [
              'Multiple essay topics provided for selection',
              'Candidates choose from wide range of topics',
              'One or more essays may be required',
              'Comprehensive topic coverage expected',
              'Current affairs and contemporary issues',
              'Analytical and argumentative essay types'
            ]
          },
          {
            title: 'Evaluation Criteria',
            description: 'Candidates are expected to reflect comprehensive and research based knowledge on a selected topic.',
            topics: [
              'Comprehensive knowledge demonstration',
              'Research-based content and arguments',
              'In-depth understanding of selected topic',
              'Evidence-based writing approach',
              'Critical analysis and evaluation',
              'Well-researched supporting materials'
            ]
          },
          {
            title: 'Technical Writing Assessment',
            description: 'Candidate\'s articulation, expression and technical treatment of the style of English Essay writing will be examined.',
            topics: [
              'Articulation and clarity of thought',
              'Expression and communication skills',
              'Technical treatment of essay style',
              'Proper essay structure and organization',
              'Coherent argument development',
              'Professional writing standards'
            ]
          }
        ],
        recommendedBooks: [
          'High School English Grammar and Composition by Wren & Martin',
          'Word Power Made Easy by Norman Lewis',
          'Essays for CSS by various authors',
          'Current Affairs Magazines and Newspapers',
          'Research Methodology books',
          'Academic Writing guides'
        ],
        examPattern: 'One or more essays in English with wide choice of topics (100 Marks)',
        preparationTips: [
          'Practice comprehensive research on various topics',
          'Develop strong articulation and expression skills',
          'Master technical essay writing style and structure',
          'Stay updated with current affairs and contemporary issues',
          'Practice writing essays with proper research backing',
          'Focus on clear communication and coherent argument development',
          'Join essay writing workshops or study groups',
          'Read extensively to improve knowledge base'
        ]
      },
      'english-precis': {
        subjectId: 'english-precis',
        subjectName: 'English (Precis & Composition)',
        subjectType: 'compulsory',
        code: 'CE-2',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Precis Writing (20 marks)',
            description: 'Candidates will be given a passage for précising and suggesting an appropriate title.',
            topics: [
              'Précising the given text (15 marks)',
              'Suggesting appropriate title (5 marks)',
              'Text condensation and summarization',
              'Maintaining original meaning and tone',
              'Word limit management',
              'Title selection and justification'
            ]
          },
          {
            title: 'Reading Comprehension (20 marks)',
            description: 'A passage, rich in substance but not overly technical or discipline-specific, will be provided.',
            topics: [
              'Five questions based on the passage',
              'Each question carries 4 marks',
              'Understanding main ideas and themes',
              'Inference and interpretation skills',
              'Critical reading and analysis',
              'Answer formulation and expression'
            ]
          },
          {
            title: 'Grammar and Vocabulary (20 marks)',
            description: 'Focuses on correct usage of various grammatical elements and vocabulary.',
            topics: [
              'Tense usage and application',
              'Articles (a, an, the)',
              'Prepositions and their usage',
              'Conjunctions and connectors',
              'Punctuation rules and application',
              'Phrasal verbs and their meanings',
              'Synonyms and antonyms',
              'Vocabulary enhancement and usage'
            ]
          },
          {
            title: 'Sentence Correction (10 marks)',
            description: 'Sentences with structural flaws in grammar or punctuation will be given for correction.',
            topics: [
              'Identifying grammatical errors',
              'Correcting punctuation mistakes',
              'Rewriting sentences with necessary corrections',
              'Avoiding unnecessary alterations',
              '2-3 sentences focusing on punctuation',
              'No duplicate problem types in sentences'
            ]
          },
          {
            title: 'Grouping of Words (10 marks)',
            description: 'A list of twenty words of moderate difficulty will be provided for grouping.',
            topics: [
              'Twenty words of moderate difficulty',
              'Grouping words in pairs',
              'Similar or opposite meanings',
              'Understanding word relationships',
              'Vocabulary categorization',
              'Semantic grouping skills'
            ]
          },
          {
            title: 'Pairs of Words (10 marks)',
            description: 'Ten pairs of seemingly similar words with different meanings will be given.',
            topics: [
              'Ten pairs of confusing words',
              'Explaining differences in meaning',
              'Using words in context sentences',
              'Understanding subtle distinctions',
              'Five pairs to be explained and used',
              'Clear differentiation of meanings'
            ]
          },
          {
            title: 'Translation (10 marks)',
            description: 'Ten short Urdu sentences must be accurately translated into English.',
            topics: [
              'Ten short Urdu sentences',
              'Structural composition translation',
              'Significant terms translation',
              'Figurative expressions translation',
              'Idiomatic expressions translation',
              'Accurate English translation'
            ]
          }
        ],
        recommendedBooks: [
          'English Grammar in Use by Raymond Murphy (Cambridge University Press)',
          'Practical English Usage by M.Swan (Oxford University Press)',
          'The Little, Brown Handbook by H. Ramsey Flower & Jane Aaron (The Little, Brown & Co; Harper Collins.)',
          'A University English Grammar by R. Quirk & S. Greenbaum (ELBS; Longmans)',
          'Write Better, Speak Better by Readers Digest Association',
          'Modern English in Action by Henry Christ (D.C. Heath & Co.)'
        ],
        examPattern: 'Precis Writing (20) + Reading Comprehension (20) + Grammar & Vocabulary (20) + Sentence Correction (10) + Grouping of Words (10) + Pairs of Words (10) + Translation (10) = 100 Marks',
        preparationTips: [
          'Practice precis writing with various types of passages',
          'Work on reading comprehension with diverse topics',
          'Master grammar rules including tense, articles, and prepositions',
          'Practice sentence correction exercises regularly',
          'Build vocabulary through word grouping and pair exercises',
          'Practice Urdu to English translation with idiomatic expressions',
          'Use recommended grammar books for comprehensive study',
          'Focus on punctuation and sentence structure',
          'Practice time management for each section',
          'Join study groups for peer learning and feedback'
        ]
      },
      'economics': {
        subjectId: 'economics',
        subjectName: 'Economics',
        subjectType: 'optional',
        subjectGroup: 'group1',
        code: 'OG1-2',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Microeconomics',
            description: 'Study of individual economic units and markets',
            topics: [
              'Consumer Behavior and Demand',
              'Production and Cost Theory',
              'Market Structures',
              'Price Determination',
              'Elasticity of Demand and Supply',
              'Utility Theory'
            ]
          },
          {
            title: 'Macroeconomics',
            description: 'Study of economy-wide phenomena',
            topics: [
              'National Income Accounting',
              'Aggregate Demand and Supply',
              'Monetary and Fiscal Policy',
              'Inflation and Unemployment',
              'Economic Growth and Development',
              'International Trade'
            ]
          },
          {
            title: 'Development Economics',
            description: 'Economic development and growth theories',
            topics: [
              'Development Theories',
              'Poverty and Inequality',
              'Human Development',
              'Sustainable Development',
              'Economic Planning',
              'Foreign Aid and Investment'
            ]
          }
        ],
        recommendedBooks: [
          'Principles of Economics by N. Gregory Mankiw',
          'Economics by Paul Samuelson',
          'Development Economics by Debraj Ray',
          'Pakistan Economy by various authors'
        ],
        examPattern: 'Essay questions covering theoretical and applied aspects',
        preparationTips: [
          'Master fundamental economic concepts',
          'Stay updated with economic policies and trends',
          'Practice numerical problems and graphs',
          'Read economic journals and reports',
          'Focus on Pakistan\'s economic issues'
        ]
      },
      'computer-science': {
        subjectId: 'computer-science',
        subjectName: 'Computer Science',
        subjectType: 'optional',
        subjectGroup: 'group1',
        code: 'OG1-3',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Programming Fundamentals',
            description: 'Core programming concepts and techniques',
            topics: [
              'Data Types and Variables',
              'Control Structures',
              'Functions and Procedures',
              'Object-Oriented Programming',
              'Error Handling',
              'Debugging Techniques'
            ]
          },
          {
            title: 'Data Structures and Algorithms',
            description: 'Organizing and processing data efficiently',
            topics: [
              'Arrays and Linked Lists',
              'Stacks and Queues',
              'Trees and Graphs',
              'Sorting Algorithms',
              'Searching Algorithms',
              'Algorithm Complexity'
            ]
          },
          {
            title: 'Database Systems',
            description: 'Data management and database design',
            topics: [
              'Database Design',
              'SQL Programming',
              'Normalization',
              'Transaction Management',
              'Database Security',
              'Big Data Concepts'
            ]
          }
        ],
        recommendedBooks: [
          'Introduction to Algorithms by Cormen',
          'Database System Concepts by Silberschatz',
          'Computer Networks by Tanenbaum',
          'Operating System Concepts by Silberschatz'
        ],
        examPattern: 'Programming problems + Theory questions + Database queries',
        preparationTips: [
          'Practice programming regularly',
          'Work on algorithm problems',
          'Learn database management systems',
          'Stay updated with technology trends',
          'Join coding communities and forums'
        ]
      }
    };

    const subjectSyllabus = syllabusData[subjectId];
    if (subjectSyllabus) {
      setSyllabus(subjectSyllabus);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading syllabus...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!subject || !syllabus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Subject Not Found</h1>
            <p className="text-gray-600 mb-6">The requested subject syllabus could not be found.</p>
            <Link
              href="/syllabus"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to All Subjects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {syllabus.subjectName}
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Complete syllabus, exam pattern, and preparation guide
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/syllabus" className="hover:text-blue-600">
                Syllabus
              </Link>
            </li>
            <li>
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </li>
            <li className="text-gray-900 font-medium">{syllabus.subjectName}</li>
          </ol>
        </nav>

        {/* Subject Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{syllabus.marks}</div>
            <div className="text-gray-600">Total Marks</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{syllabus.duration}</div>
            <div className="text-gray-600">Duration</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-green-600">{syllabus.sections.length}</div>
            <div className="text-gray-600">Sections</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{syllabus.subjectType}</div>
            <div className="text-gray-600">Type</div>
          </div>
        </div>

        {/* Syllabus Sections */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Detailed Syllabus</h2>
          
          <div className="space-y-8">
            {syllabus.sections.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Section {index + 1}
                  </span>
                  {section.title}
                </h3>
                
                {section.description && (
                  <p className="text-gray-600 mb-4 leading-relaxed">{section.description}</p>
                )}
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {section.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Pattern */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Exam Pattern</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <p className="text-gray-700 text-lg leading-relaxed">{syllabus.examPattern}</p>
          </div>
        </div>

        {/* Recommended Books */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Recommended Books</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {syllabus.recommendedBooks.map((book, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{book}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Tips */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Preparation Tips</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {syllabus.preparationTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/syllabus"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to All Subjects
          </Link>
        </div>
      </div>
    </div>
  );
} 