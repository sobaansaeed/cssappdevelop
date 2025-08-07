'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen, ChevronLeft, FileText, Clock, Award, Users, ChevronDown, ChevronRight } from 'lucide-react';

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
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  const toggleSection = (sectionIndex: number) => {
    const newExpandedSections = new Set(expandedSections);
    if (newExpandedSections.has(sectionIndex)) {
      newExpandedSections.delete(sectionIndex);
    } else {
      newExpandedSections.add(sectionIndex);
    }
    setExpandedSections(newExpandedSections);
  };



  const fetchSubjectData = useCallback(async () => {
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
  }, [subjectId]);

  const generateSyllabus = useCallback(() => {
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
      'current-affairs': {
        subjectId: 'current-affairs',
        subjectName: 'Current Affairs',
        subjectType: 'compulsory',
        code: 'CE-4',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Introduction',
            description: 'Candidates will be expected to display such general knowledge of history, politics and International Affairs, as deemed necessary to interpret current affairs.',
            topics: [
              'General knowledge of history and politics',
              'International affairs understanding',
              'Current events interpretation skills',
              'Analytical thinking for contemporary issues',
              'Comprehensive knowledge of global developments'
            ]
          },
          {
            title: 'I. Pakistan\'s Domestic Affairs (20 Marks)',
            description: 'Comprehensive understanding of Pakistan\'s internal political, economic, and social developments.',
            topics: [
              'Political developments and governance',
              'Economic policies and trends',
              'Social issues and reforms',
              'Constitutional developments',
              'Administrative reforms',
              'Public policy analysis'
            ]
          },
          {
            title: 'II. Pakistan\'s External Affairs (40 Marks)',
            description: 'Pakistan\'s relations with neighboring countries, Muslim world, major powers, and international organizations.',
            topics: [
              'Relations with Neighbors: India, China, Afghanistan, Russia',
              'Relations with Muslim World: Iran, Saudi Arabia, Indonesia, Turkey',
              'Relations with United States',
              'Regional Organizations: SAARC, ECO, OIC, GCC',
              'International Organizations: UN, WTO',
              'Bilateral and multilateral agreements',
              'Trade and economic cooperation',
              'Security and defense cooperation'
            ]
          },
          {
            title: 'III. Global Issues (40 Marks)',
            description: 'Comprehensive coverage of major global challenges and international developments.',
            topics: [
              'International Security and conflicts',
              'International Political Economy',
              'Human Rights and humanitarian issues',
              'Environment: Global Warming, Kyoto Protocol, Copenhagen Accord',
              'Population: World population trends and policies',
              'Terrorism and Counter Terrorism strategies',
              'Global Energy Politics and security',
              'Nuclear Proliferation and Nuclear Security',
              'Nuclear Politics in South Asia',
              'International Trade: Doha Development Round and Bali Package',
              'Cooperation and Competition in Arabian Sea, Indian and Pacific Oceans',
              'Millennium Development Goals and current status',
              'Globalization and its impacts',
              'Middle East Crisis and developments',
              'Kashmir Issue and regional implications',
              'Palestine Issue and international response'
            ]
          }
        ],
        recommendedBooks: [
          'Pakistan Foreign Policy 1947-2005: A Concise History, 2011 by Abdul Sattar',
          'Issue in Pakistan\'s Economy, 2010 by Akbar S. Zaidi',
          'Pakistan: A Hard Country, 2012 by Anatol Lieven',
          'Government & Politics in South Asia, 6th ed., 2009 by Baxter, Malik, Kennedy & Oberst',
          'Introduction to International Political Economy, 2010 by David Balaam & Bradford Dillman',
          'International Organization (Second Edition) 2012 by Volker Rittberger, Bernhard Zangl and Andress Kruck',
          'The Age of Deception: Nuclear Diplomacy in Treacherous Times (2011) by Mohamed Elbaradei',
          'International Relations, 2012 by Joshua Goldstein',
          'World Politics: Trends & Transformation, 2014-2015 by Kegley & Blanton',
          'Pakistan Beyond the Crisis, 2011 by Maleeha Lodhi',
          'Globalization in Question, 2009 by Paul Hirst',
          'International Political Economy: Interests & Institutions in the Global Economy, 2010 by Thomas Oatley',
          'Politics and Change in the Middle East, 10th Ed., Pearson, 2012 by Andersen, Seibert, and Wagner',
          'Eating Grass: The Making of the Pakistani Bomb, (2012) by Feroz Khan',
          'Pakistan and World Affairs by Shamshad Ahmad (Edition-2015)',
          'World Times Magazine'
        ],
        examPattern: 'Pakistan\'s Domestic Affairs (20 Marks) + Pakistan\'s External Affairs (40 Marks) + Global Issues (40 Marks) = 100 Marks',
        preparationTips: [
          'Stay updated with daily newspapers and current affairs magazines',
          'Follow international news sources for global developments',
          'Study Pakistan\'s foreign policy and diplomatic relations',
          'Understand international organizations and their roles',
          'Analyze global issues from multiple perspectives',
          'Practice writing analytical essays on current topics',
          'Join discussion groups on international affairs',
          'Attend seminars and workshops on current issues',
          'Read recommended books for comprehensive understanding',
          'Follow official statements and policy documents',
          'Study historical context of current developments',
          'Practice critical analysis of news and events',
          'Develop understanding of economic and political interconnections',
          'Stay informed about regional and global conflicts',
          'Study environmental and climate change issues'
        ]
      },
      'pakistan-affairs': {
        subjectId: 'pakistan-affairs',
        subjectName: 'Pakistan Affairs',
        subjectType: 'compulsory',
        code: 'CE-5',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Ideology of Pakistan',
            description: 'Understanding the foundation and historical development of Pakistan\'s ideology.',
            topics: [
              'Definition and historical aspects of Pakistan ideology',
              'Muslim rule in the Sub-Continent and its downfall',
              'Renaissance efforts and reform movements',
              'Key figures: Shaikh Ahmad Sarhindi, Shah Waliullah, Sayyid Ahmad Shaheed',
              'Educational institutions: Aligarh, Deoband, Nadwah, Sindh Madrassah, Islamia College Peshawar',
              'Ideology interpretation through speeches of Allama Iqbal and Quaid-i-Azam Muhammad Ali Jinnah'
            ]
          },
          {
            title: 'II. Land and People of Pakistan',
            description: 'Comprehensive study of Pakistan\'s geography, society, and resources.',
            topics: [
              'Geography and physical features',
              'Society and demographic characteristics',
              'Natural resources and their distribution',
              'Agriculture and its trends and problems',
              'Industry and industrial development',
              'Education system and challenges'
            ]
          },
          {
            title: 'III. Pakistan and Changing Regional Apparatus',
            description: 'Pakistan\'s position in evolving regional dynamics.',
            topics: [
              'Regional power dynamics',
              'Pakistan\'s strategic position',
              'Changing regional alliances',
              'Economic integration in the region',
              'Security cooperation mechanisms'
            ]
          },
          {
            title: 'IV. Nuclear Program of Pakistan',
            description: 'Pakistan\'s nuclear capabilities, safety, and international concerns.',
            topics: [
              'Nuclear program development and milestones',
              'Nuclear safety protocols and measures',
              'Nuclear security arrangements',
              'International concerns and responses',
              'Nuclear non-proliferation commitments'
            ]
          },
          {
            title: 'V. Regional Cooperation Organizations',
            description: 'Pakistan\'s role in regional organizations and cooperation.',
            topics: [
              'SAARC: South Asian Association for Regional Cooperation',
              'ECO: Economic Cooperation Organization',
              'SCO: Shanghai Cooperation Organization',
              'Pakistan\'s role and contributions in these organizations',
              'Regional economic integration efforts'
            ]
          },
          {
            title: 'VI. Civil-Military Relations in Pakistan',
            description: 'Historical and contemporary civil-military dynamics.',
            topics: [
              'Historical evolution of civil-military relations',
              'Constitutional framework for civil-military relations',
              'Contemporary challenges and developments',
              'Role of military in national security',
              'Democratic civilian control mechanisms'
            ]
          },
          {
            title: 'VII. Economic Challenges in Pakistan',
            description: 'Major economic challenges and their implications.',
            topics: [
              'Fiscal challenges and budget deficits',
              'Balance of payments and external debt',
              'Inflation and monetary policy',
              'Unemployment and poverty',
              'Economic reforms and structural adjustments'
            ]
          },
          {
            title: 'VIII. Non-Traditional Security Threats in Pakistan',
            description: 'Emerging security challenges and non-state actors.',
            topics: [
              'Role of non-state actors in security',
              'Terrorism and extremism',
              'Cybersecurity threats',
              'Environmental security challenges',
              'Transnational crime and smuggling'
            ]
          },
          {
            title: 'IX. Pakistan\'s Role in the Region',
            description: 'Pakistan\'s strategic and diplomatic role in South Asia.',
            topics: [
              'Strategic partnerships and alliances',
              'Diplomatic initiatives and mediation',
              'Economic cooperation and trade',
              'Security cooperation and counter-terrorism',
              'Cultural and people-to-people contacts'
            ]
          },
          {
            title: 'X. The Palestine Issue',
            description: 'Pakistan\'s stance and role in the Palestine issue.',
            topics: [
              'Historical context of Palestine issue',
              'Pakistan\'s diplomatic support for Palestine',
              'UN resolutions and international law',
              'Humanitarian aspects and refugee crisis',
              'Regional implications and peace process'
            ]
          },
          {
            title: 'XI. Changing Security Dynamics for Pakistan',
            description: 'Evolving security challenges and national security.',
            topics: [
              'Challenges to national security of Pakistan',
              'Regional security environment changes',
              'Global security trends and their impact',
              'Counter-terrorism strategies',
              'Border security and management'
            ]
          },
          {
            title: 'XII. Political Evolution Since 1971',
            description: 'Political developments and democratic evolution.',
            topics: [
              'Post-1971 political landscape',
              'Democratic transitions and military interventions',
              'Constitutional developments',
              'Political parties and their evolution',
              'Electoral reforms and democratic consolidation'
            ]
          },
          {
            title: 'XIII. Pakistan and US War on Terror',
            description: 'Pakistan\'s role and challenges in the war on terror.',
            topics: [
              'Pakistan\'s alliance with the US',
              'Military operations and counter-terrorism efforts',
              'Domestic implications and challenges',
              'International pressure and expectations',
              'Economic and security costs'
            ]
          },
          {
            title: 'XIV. Foreign Policy of Pakistan Post 9/11',
            description: 'Evolution of Pakistan\'s foreign policy after 9/11.',
            topics: [
              'Strategic realignment and new partnerships',
              'Relations with major powers',
              'Regional diplomacy and cooperation',
              'Counter-terrorism cooperation',
              'Economic diplomacy and trade relations'
            ]
          },
          {
            title: 'XV. Evolution of Democratic System in Pakistan',
            description: 'Democratic development and institutional strengthening.',
            topics: [
              'Democratic institutions and their evolution',
              'Electoral system and reforms',
              'Parliamentary democracy development',
              'Judicial independence and rule of law',
              'Civil society and media role'
            ]
          },
          {
            title: 'XVI. Ethnic Issues and National Integration',
            description: 'Ethnic diversity and national unity challenges.',
            topics: [
              'Ethnic diversity and cultural pluralism',
              'National integration challenges',
              'Provincial autonomy and federalism',
              'Language and cultural policies',
              'Inter-ethnic harmony and cooperation'
            ]
          },
          {
            title: 'XVII. Hydro Politics',
            description: 'Water issues in domestic and regional context.',
            topics: [
              'Water resources and their management',
              'Inter-provincial water disputes',
              'Transboundary water issues with India',
              'Water security and climate change',
              'International water law and treaties'
            ]
          },
          {
            title: 'XVIII. Pakistan\'s National Interest',
            description: 'Core national interests and their protection.',
            topics: [
              'Definition and components of national interest',
              'Security interests and territorial integrity',
              'Economic interests and development',
              'Diplomatic interests and international standing',
              'Cultural and ideological interests'
            ]
          },
          {
            title: 'XIX. Challenges to Sovereignty',
            description: 'Internal and external challenges to Pakistan\'s sovereignty.',
            topics: [
              'External interference and pressure',
              'Internal security challenges',
              'Economic dependency and sovereignty',
              'International obligations and sovereignty',
              'Border disputes and territorial integrity'
            ]
          },
          {
            title: 'XX. Pakistan\'s Energy Problems and their Effects',
            description: 'Energy crisis and its impact on development.',
            topics: [
              'Energy mix and resource availability',
              'Energy infrastructure and capacity',
              'Energy security and import dependency',
              'Economic impact of energy crisis',
              'Renewable energy and sustainable solutions'
            ]
          },
          {
            title: 'XXI. Pakistan\'s Relations with Neighbors excluding India',
            description: 'Bilateral relations with Afghanistan, China, and Iran.',
            topics: [
              'Pakistan-Afghanistan relations and border issues',
              'Pakistan-China strategic partnership',
              'Pakistan-Iran relations and cooperation',
              'Regional connectivity and economic corridors',
              'Security cooperation and border management'
            ]
          },
          {
            title: 'XXII. Pakistan and India Relations Since 1947',
            description: 'Complex bilateral relations and historical developments.',
            topics: [
              'Historical context and partition legacy',
              'Major conflicts and peace processes',
              'Trade and economic relations',
              'People-to-people contacts',
              'Confidence-building measures'
            ]
          },
          {
            title: 'XXIII. The Kashmir Issue',
            description: 'Core dispute and its regional implications.',
            topics: [
              'Historical background of Kashmir dispute',
              'UN resolutions and international law',
              'Pakistan\'s stance and diplomatic efforts',
              'Human rights violations in Kashmir',
              'Regional peace and stability implications'
            ]
          },
          {
            title: 'XXIV. The War in Afghanistan since 1979',
            description: 'Impact on Pakistan and post-2014 challenges.',
            topics: [
              'Soviet invasion and Pakistan\'s response',
              'Mujahideen support and refugee crisis',
              'Post-9/11 developments and challenges',
              'Post-2014 withdrawal and implications',
              'Current situation and Pakistan\'s role'
            ]
          },
          {
            title: 'XXV. Proxy Wars',
            description: 'Role of external elements in regional conflicts.',
            topics: [
              'Definition and characteristics of proxy wars',
              'External involvement in regional conflicts',
              'Pakistan\'s experience with proxy conflicts',
              'Regional power competition',
              'Counter-proxy war strategies'
            ]
          },
          {
            title: 'XXVI. Economic Conditions of Pakistan',
            description: 'Current economic situation and sectoral performance.',
            topics: [
              'Most recent economic survey findings',
              'Previous and current budgets analysis',
              'Major sectors performance and problems',
              'Economic indicators and trends',
              'Economic reforms and policy measures'
            ]
          },
          {
            title: 'XXVII. Recent Constitutional and Legal Debates',
            description: 'Contemporary constitutional and legal developments.',
            topics: [
              'Latest constitutional amendments',
              'Important legislations and their impact',
              'Landmark legal cases and judgments',
              'Role of higher courts in governance',
              'Judicial activism and constitutional interpretation'
            ]
          },
          {
            title: 'XXVIII. Prevailing Social Problems of Pakistan',
            description: 'Major social challenges and strategies to address them.',
            topics: [
              'Poverty: causes, extent, and alleviation strategies',
              'Education: access, quality, and reform measures',
              'Health: healthcare system and public health challenges',
              'Sanitation: water and sanitation infrastructure',
              'Social welfare and development programs'
            ]
          }
        ],
        recommendedBooks: [
          'Federalism and Ethnic Conflict Regulation in India and Pakistan by Katharine Adeney',
          'The Future of Pakistan by Stephen P. Cohen et al.',
          'Frontline Pakistan: The Struggle with Militant Islam by Zahid Hussain',
          'Kashmir in Conflict: India, Pakistan and the Unending War by Victoria Schofield',
          'A Brief History of Pakistan by James Wynbrandt',
          'Pakistan: A Hard Country by Anatol Lieven',
          'Pakistan: Between Mosque and Military by Husain Haqqani',
          'The Idea of Pakistan by Stephen Philip Cohen',
          'Pakistan: Eye of the Storm by Owen Bennett Jones',
          'Pakistan: A Modern History by Ian Talbot',
          'The Pakistan Paradox: Instability and Resilience by Christophe Jaffrelot',
          'Pakistan: The Garrison State by Ishtiaq Ahmed',
          'Pakistan: Democracy, Development and Security Issues by Veena Kukreja',
          'Pakistan: The Struggle Within by Wilson John',
          'Pakistan: A Country Study by Peter Blood',
          'Pakistan: A New History by Ian Talbot',
          'Pakistan: The Formative Phase by Khalid Bin Sayeed',
          'Pakistan: The Continuing Search for Nationhood by Lawrence Ziring'
        ],
        examPattern: 'Comprehensive coverage of 28 topics covering ideology, history, politics, economics, and contemporary issues of Pakistan (100 Marks)',
        preparationTips: [
          'Study the historical development of Pakistan ideology from pre-partition to present',
          'Understand Pakistan\'s geography, resources, and demographic characteristics',
          'Analyze Pakistan\'s relations with neighbors and major powers',
          'Study constitutional developments and democratic evolution since 1971',
          'Follow current economic indicators and budget analysis',
          'Stay updated with recent constitutional and legal developments',
          'Understand Pakistan\'s role in regional and international organizations',
          'Study nuclear program, security challenges, and foreign policy evolution',
          'Analyze social problems and development challenges',
          'Read recommended books for comprehensive understanding',
          'Follow current affairs related to Pakistan\'s domestic and foreign policy',
          'Practice writing analytical essays on Pakistan-related topics',
          'Study Pakistan\'s economic surveys and budget documents',
          'Understand the Kashmir issue and Pakistan-India relations',
          'Analyze Pakistan\'s role in Afghanistan and regional security'
        ]
      },
      'islamic-studies': {
        subjectId: 'islamic-studies',
        subjectName: 'Islamic Studies',
        subjectType: 'compulsory',
        code: 'CE-6',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Introduction to Islam',
            description: 'Fundamental concepts and distinctive aspects of Islam.',
            topics: [
              'Concept of Islam and its meaning',
              'Importance of Din in Human Life',
              'Difference between Din and Religion',
              'Distinctive Aspects of Islam',
              'Islamic Beliefs & its Impact on Individual & Society and the Fundamental of Islam',
              'Islamic Worships: Spiritual, Moral and Social Impact'
            ]
          },
          {
            title: 'II. Study of Sirah of the Prophet Muhammad (PBUH) as Role Model for',
            description: 'Prophet Muhammad (PBUH) as a comprehensive role model in various aspects of life.',
            topics: [
              'Individual: Personal character and conduct',
              'Diplomat: Diplomatic skills and international relations',
              'Educator: Teaching methods and educational leadership',
              'Military Strategist: Strategic thinking and military leadership',
              'Peace Maker: Conflict resolution and peace-building'
            ]
          },
          {
            title: 'III. Human Rights & Status of Woman in Islam',
            description: 'Islamic perspective on human rights and women\'s status.',
            topics: [
              'Human Rights and Status of Woman in Islam',
              'Dignity of Men and Women',
              'Women\'s rights in Islamic law',
              'Gender equality in Islamic perspective',
              'Women\'s role in society and family'
            ]
          },
          {
            title: 'IV. Islamic Civilization and Culture',
            description: 'Understanding Islamic civilization and its characteristics.',
            topics: [
              'Meanings and the Vital Elements of Islamic Civilization',
              'Role of Civilization in Development of Human Personality and Community',
              'Characteristics of Islamic Civilization: Tawhid, Self-purification, Dignity of Man, Equality, Social Justice, Moral Values, Tolerance, Rule of Law'
            ]
          },
          {
            title: 'V. Islam and the World',
            description: 'Islam\'s impact on the world and contemporary challenges.',
            topics: [
              'Impact of Islamic Civilization on the West and Vice Versa',
              'The Role of Islam in the Modern World',
              'Muslim World and the Contemporary Challenges',
              'Rise of Extremism and its causes',
              'Islam\'s contribution to world civilization'
            ]
          },
          {
            title: 'VI. Public Administration and Governance in Islam',
            description: 'Islamic principles of governance and public administration.',
            topics: [
              'Concept of Public Administration in Islam',
              'Quranic Guidance on Good Governance',
              'Concept of Governance and its Applications in the light of Qur\'an, Sunnah and Fiqh',
              'Governance Structure in Islam: Shura, Legislation, Sources of Islamic Law',
              'Governance under Pious Khilafat',
              'Particular letters of Hazrat Umar (R.A) and Hazrat Ali (R.A) to different Authority',
              'Responsibilities of Civil Servants',
              'System of Accountability (hisbah) in Islam'
            ]
          },
          {
            title: 'VII. Islamic Code of Life',
            description: 'Comprehensive Islamic system covering all aspects of life.',
            topics: [
              'Salient Features of Islamic System: Social System, Political System, Economic System, Judicial System, Administrative System',
              'Procedure of Ijma and Ijtihad',
              'Islamic economic principles and practices',
              'Islamic social welfare system',
              'Islamic judicial system and rule of law'
            ]
          }
        ],
        recommendedBooks: [
          'The Holy Quran and its translations',
          'Sahih Bukhari and Sahih Muslim (Hadith collections)',
          'The Life of Muhammad by Martin Lings',
          'Muhammad: His Life Based on the Earliest Sources by Martin Lings',
          'The Sealed Nectar by Safiur Rahman Mubarakpuri',
          'Islam: A Short History by Karen Armstrong',
          'The Oxford History of Islam by John L. Esposito',
          'Islamic Civilization in Thirty Lives by Chase F. Robinson',
          'The Venture of Islam by Marshall G.S. Hodgson',
          'Islam and the Modern World by Seyyed Hossein Nasr',
          'The Islamic World: Past and Present by John L. Esposito',
          'Women in Islam by Fatima Mernissi',
          'The Status of Women in Islam by Jamal Badawi',
          'Islamic Law and Society by Joseph Schacht',
          'The Shari\'ah: Law and the Order of Islam by Wael B. Hallaq',
          'Islamic Governance and Democracy by John L. Esposito',
          'The Islamic State: A Study in Islamic Political Theory by Asghar Ali Engineer',
          'Islam and Democracy by John L. Esposito and John O. Voll',
          'Islamic Economics: Theory and Practice by M. Umer Chapra',
          'The Economic System of Islam by Taqiuddin an-Nabhani'
        ],
        examPattern: 'Comprehensive coverage of 7 sections covering introduction to Islam, Prophet Muhammad (PBUH) as role model, human rights, Islamic civilization, governance, and Islamic code of life (100 Marks)',
        preparationTips: [
          'Study the fundamental concepts of Islam and its distinctive aspects',
          'Understand the life of Prophet Muhammad (PBUH) as a comprehensive role model',
          'Learn about Islamic perspective on human rights and women\'s status',
          'Study Islamic civilization and its impact on world history',
          'Understand Islamic principles of governance and public administration',
          'Learn about the comprehensive Islamic code of life',
          'Read authentic Islamic literature and scholarly works',
          'Study the Quran and Hadith for primary sources',
          'Understand the historical development of Islamic civilization',
          'Learn about contemporary challenges facing the Muslim world',
          'Study Islamic economic principles and social welfare system',
          'Understand the concept of Ijma and Ijtihad in Islamic law',
          'Read recommended books for comprehensive understanding',
          'Practice writing analytical essays on Islamic topics',
          'Stay updated with contemporary Islamic scholarship and debates'
        ]
      },
      'comparative-religions': {
        subjectId: 'comparative-religions',
        subjectName: 'Comparative Study of Major Religions',
        subjectType: 'compulsory',
        code: 'CE-7',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Introduction',
            description: 'Foundation for understanding the study of religions as an academic discipline.',
            topics: [
              'Definition(s) of religion',
              'Emergence of the study of religion as a discipline',
              'Theological and academic study of religion',
              'An overview of religious landscape of the World'
            ]
          },
          {
            title: 'II. Hinduism',
            description: 'Comprehensive study of Hinduism, its history, scriptures, doctrines, and modern developments.',
            topics: [
              'Historical Background: Indus valley civilization, Aryan invasion theory, Vedic Dharma, Brahmanism',
              'Scriptures: Sruti (Vedas, Upanishads), Smirti (Manu Smirti, Sutras, Puranas, Great epics: Ramayana, Mahabharata)',
              'Hindu Doctrines: Dharma, Vedanta, Karma, Transmigration of Souls, Moksha (Liberation)',
              'Ways to Liberation: Karma marga (Works/Rituals), Jnana marga (Wisdom), Bhakti marga (Devotion)',
              'Hindu gods: Brahma, Vishnu, Shiva, Trimurti, other gods and divinities',
              'Major Hindu Sects: Vaishavism (Manifestation avatars), Saivism (Supreme God & Phallic worship), Saktism (Goddess worship)',
              'Hindu society: Caste System, Ashramas (Stages of life)',
              'Hinduism in the Modern World: 19th century reform and revival movements, Contemporary Hindu Tendencies and movements'
            ]
          },
          {
            title: 'III. Buddhism',
            description: 'Study of Buddhism, its origins, teachings, and development across different schools.',
            topics: [
              'Historical Background: Life of Gautama Buddha, Formation and spread of Buddhism, Rivalry between Brahmanism and Buddhism',
              'Scriptures: Tripitaka (Sutta Pitaka, Vinaya Pitaka, Abhidhamma Pitaka)',
              'Teachings and Doctrines: Three Jewels of Buddhism (Buddha, Dhamma, Sangha), The four noble truths, Eight fold Path',
              'Buddhist Sects: Theravadas (Hinayana), Mahayana, other schools and sects',
              'Buddhism in the Modern world'
            ]
          },
          {
            title: 'IV. Judaism',
            description: 'Comprehensive study of Judaism, its history, scriptures, and contemporary movements.',
            topics: [
              'A brief history of Jews and Judaism: From Abraham to Moses, From Moses to establishment of Jewish rule, Destruction of Jerusalem and dispersion of Jews in the world',
              'Jewish Scriptures: Tanakh (The Torah, the Prophets, and the Writings), Mishnah and Talmud',
              'Articles of faith and basic teachings: Ten Commandments, The thirteen principles of faith propounded by Moses Maimonides (1138-1204)',
              'Jewish holidays and festivals: Yom Kippur (The Day of Atonement), Pesach (Passover), Sukkot (Tabernacles) Purim',
              'Jewish Worship: Daily prayer, fasting, Sabbath',
              'Jewish sects and movements: Orthodox Judaism, Conservative Judaism, Reform Judaism, Zionism, Kabbalah, Hasidism'
            ]
          },
          {
            title: 'V. Christianity',
            description: 'Study of Christianity, its historical development, doctrines, and modern trends.',
            topics: [
              'Historical background: Jewish background of Christianity, Life and of Jesus Christ (Through the Four Gospels), Life and the role of Paul (Through the Letters of Paul), Formation and spread of the Christian Church, Christianization of the Roman Empire, Reform movement',
              'Scriptures: The Holy Bible (Old Testament and New Testament)',
              'Basic Doctrines: Original Sin, Incarnation of God, Crucifixion and Resurrection of Jesus Christ, Atonement, Trinity',
              'Christian Sects: Catholicism, Eastern Orthodoxy, Protestantism (Sub-denominations: Lutherans, Reformed and Presbyterians, Anglicans, Baptists, Methodists, Unitarians)',
              'Christian Festivals and Holidays: Advent, Christmas, Easter, Pentecost',
              'Christian worship and Sacraments: Baptism, Eucharist, Communion, Lord\'s Supper, prayer, fasting, psalms, music',
              'Christianity in the Modern Times: Encounter with modernity, modern theological trends, Missionary movement, Dialogue and relationship with other religions'
            ]
          },
          {
            title: 'VI. Islam',
            description: 'Comprehensive study of Islam, its foundations, teachings, and contemporary movements.',
            topics: [
              'Introduction and Historical Background: Islamic concept of religion, universality of religion and diversity of shari\'ahs, Sirah (Life) of the Holy Prophet Muhammad, The era of rightly guided caliphs of Islam',
              'Sacred Scriptures: The Holy Quran, Hadith',
              'Basic Doctrines and Creed: Tawhid (Oneness of God), Risalah (Belief in Prophets and finality of the prophet-hood with the Prophet Muhammad), Akhirah (Belief in Hereafter and the final reckoning by Allah the Almighty), Belief in angels, previous scriptures, predestination and human responsibility before God, infallibility of the Quran',
              'Five Pillars of Islam: Utterance of Shahadatayn (To proclaim the Oneness of Allah and that Prophet Muhammad is his messenger), salah (five daily prayers), zakah (compulsory charity), sawm (fasting in the month of Ramadan) and Hajj (pilgrimage to Makkah who can afford travelling to it)',
              'Other Teachings of Islam: Equality of mankind, simplicity, spiritual purity and bodily hygiene, patience, contentment, moderation, social justice, Jihad, tolerance towards other religions',
              'Sects and Schools: Sunnis (mainstream Muslims), Shiahs (Special devotion for Hazrat Ali and Family of the Prophet), Khawarij (literalists), Mu\'tazilah (rationalists)',
              'Contemporary Islamic movements and tendencies: Ikwan al Muslimun (Muslim Brotherhood), Jama\'at-i-Islami, Tablighi Jama\'at, Salafi movement, Fethullah Gulen movement in Turkey, Iranian revolution, extremist groups'
            ]
          }
        ],
        recommendedBooks: [
          'Approaches to the Study of Religion, 1999 by Peter Connolly (ed.)',
          'The Penguin Hand Book of World\'s Living Religions, 2010 by John R. Hinnells (ed.)',
          'Dunya Kay Baray Mazahib (Major Religions of the World) by Imadul Hasan Azad Faruqi',
          'Hinduism: A Short Introduction, 2006 by Klaus K. Klostermaier',
          'Exploring Buddhism, 2012 by Christmas Humphreys',
          'Judaism: A Short Introduction, 1999 by Lavinia and Dan Cohn-Sherbok',
          'Christianity: An Introduction, 2006 by Alister E. McGrath',
          'The Messenger: The Meanings of the Life of Muhammad, 2008 by Tariq Ramadan',
          'Ideals and Realities of Islam, 1993 by Seyyed Hossein Nasr',
          'Towards Understanding Islam, 1992 by Syed Abul \'Ala Maududi'
        ],
        examPattern: 'Comprehensive coverage of 6 sections covering Introduction, Hinduism, Buddhism, Judaism, Christianity, and Islam (100 Marks)',
        preparationTips: [
          'Study the fundamental concepts and definitions of religion as an academic discipline',
          'Understand the historical development and scriptures of each major religion',
          'Learn about the core doctrines and teachings of Hinduism, Buddhism, Judaism, Christianity, and Islam',
          'Study the social and cultural aspects of each religion',
          'Understand the modern developments and contemporary movements within each religion',
          'Practice comparative analysis between different religious traditions',
          'Read recommended books for comprehensive understanding of each religion',
          'Study the historical context and geographical spread of each religion',
          'Understand the philosophical and theological foundations of each faith',
          'Learn about religious practices, rituals, and festivals of each tradition',
          'Study the impact of religions on society, culture, and politics',
          'Understand contemporary challenges and interfaith dialogue',
          'Practice writing analytical essays comparing different religious traditions',
          'Stay updated with current developments in religious studies',
          'Develop an objective and academic approach to studying religions'
        ]
      },
      'accountancy-auditing': {
        subjectId: 'accountancy-auditing',
        subjectName: 'Accountancy & Auditing',
        subjectType: 'optional',
        subjectGroup: 'group1',
        code: 'OG1-1',
        marks: 200,
        duration: '6 Hours (2 Papers)',
        sections: [
          {
            title: 'PAPER-I (100 Marks)',
            description: 'Complete Paper-I covering Financial Accounting and Cost & Managerial Accounting.',
            topics: [
              'Part (A) Financial Accounting (50 Marks): I. Fundamental Accounting Principles, II. Accounting Cycle and Financial Statements, III. Attributes of Accounting Information, IV. Accounting for Legal Forms of Business, V. Accounting for Not-for-profit and Public Sector, VI. Accounting for Non-current Tangible Assets, VII. Fundamental and Technical Analysis',
              'Part (B) Cost and Managerial Accounting (50 Marks): VIII. Fundamental Cost Accounting Principles, IX. Accounting for Material, Labour and FOH, X. Job and Process Costing, XI. Management Accounting for Planning and Control'
            ]
          },
          {
            title: 'PAPER-II (100 Marks)',
            description: 'Complete Paper-II covering Auditing, Business Taxation, and Business Studies & Finance.',
            topics: [
              'Part (A) Auditing (40 Marks): I. Fundamental Auditing Principles and Concepts, II. Audit Considerations, Dimensions and Conduct, III. Role and Responsibilities of an Auditor',
              'Part (B) Business Taxation (30 Marks): IV. Tax Structure and Fundamental Concepts, V. Income Tax and Sales Tax Principles and Applications',
              'Part (C) Business Studies, and Finance (30 Marks): VI. Business Studies, VII. Finance'
            ]
          }
        ],
        recommendedBooks: [
          'Financial Accounting: An Introduction by Pauline Weetman',
          'Financial Accounting by Walter T. Harrison Jr.',
          'Cost Accounting: A Managerial Emphasis by Charles T. Horngren',
          'Management Accounting by Colin Drury',
          'International Financial Reporting Standards (IFRS) by various authors',
          'Accounting Principles by Jerry J. Weygandt',
          'Advanced Financial Accounting by Richard E. Baker',
          'Cost and Management Accounting by M.N. Arora',
          'Financial Statement Analysis by Martin Fridson',
          'Managerial Accounting by Ray H. Garrison',
          'Auditing: A Practical Approach by Robyn Moroney',
          'Principles of Auditing by Rick Hayes',
          'Contemporary Auditing by Michael C. Knapp',
          'Audit and Assurance Services by Alvin A. Arens',
          'Internal Auditing: Principles and Techniques by Richard L. Ratliff',
          'Income Tax Ordinance 2001 and related rules',
          'Sales Tax Act and related regulations',
          'Companies Ordinance 1984',
          'Business Finance by Eugene F. Brigham',
          'Financial Management: Theory and Practice by Eugene F. Brigham and Michael C. Ehrhardt'
        ],
        examPattern: 'Paper-I: Financial Accounting (50 Marks) + Cost & Managerial Accounting (50 Marks) = 100 Marks | Paper-II: Auditing (40 Marks) + Business Taxation (30 Marks) + Business Studies & Finance (30 Marks) = 100 Marks | Total: 200 Marks',
        preparationTips: [
          'Master fundamental accounting principles, concepts, and conventions',
          'Understand the complete accounting cycle and financial statement preparation',
          'Study International Financial Reporting Standards (IFRS) and local regulations',
          'Learn cost accounting principles and techniques for different business forms',
          'Practice financial statement analysis including ratio analysis',
          'Understand management accounting for planning, decision-making, and control',
          'Study budgeting techniques and variance analysis',
          'Learn about different costing methods: job costing and process costing',
          'Master fundamental auditing principles and concepts',
          'Understand audit planning, execution, and reporting procedures',
          'Study internal control systems and risk assessment',
          'Learn about auditor responsibilities and professional ethics',
          'Master income tax and sales tax principles and applications',
          'Study business entity forms and their characteristics',
          'Understand financial management techniques and capital budgeting',
          'Practice solving accounting, auditing, and taxation problems',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current accounting, auditing, and tax standards',
          'Practice case studies and real-world applications',
          'Understand the integration of accounting, auditing, and business concepts'
        ]
      },
      'agriculture-forestry': {
        subjectId: 'agriculture-forestry',
        subjectName: 'Agriculture & Forestry',
        subjectType: 'optional',
        subjectGroup: 'group5',
        code: 'OG5-3',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Part-I: Agriculture (50 Marks)',
            description: 'Comprehensive study of agricultural principles, challenges, and practices in Pakistan.',
            topics: [
              'I. Concept of Integrated Agriculture: Natural resources (Land, Water, biological, Environmental, Solar, Energy) as foundations for agricultural production',
              'II. Challenges in Pakistan\'s Agriculture: Current scenario, future prospects, issues, and strategies for improving crop management, livestock, fisheries, cottage industry, resource management, and rural development, including institutional and policy aspects',
              'III. Elements of Climate and their Relationship with Crop Growth: Farming systems, biological nitrogen fixation, soil profile, structure and texture, soil fertility, soil erosion and conservation, water logging, and salinity',
              'IV. Genetic Improvement for Crop Production: GMO crops and seed production technology',
              'V. Horticulture: Floriculture, landscaping, pests and diseases of agricultural crops, their control, and integrated pest management',
              'VI. Rainfed and Irrigated Agriculture: Agriculture mechanization, land tenure, land reforms, and the role of agriculture in the national economy'
            ]
          },
          {
            title: 'Part-II: Forestry (50 Marks)',
            description: 'Study of forestry, wildlife, and environmental management principles.',
            topics: [
              'I. Forest, rangelands and wildlife importance and significance',
              'II. Forest management and utilization, wood based industries in Pakistan, silviculture',
              'III. Range management and utilization',
              'IV. National and international forest wealth statistics',
              'V. Role of wildlife as value addition to forestry',
              'VI. Forest based wildlife resources of Pakistan and their management, eco-tourism',
              'VII. Forestry, agroforestry, social forestry and forest biometrics',
              'VIII. Socio-economic and ecological impact of man made forests',
              'IX. Watershed Management and role of forests in prevailing climate change dilemma',
              'X. National forest laws and policies at national level, biodiversity & environment'
            ]
          }
        ],
        recommendedBooks: [
          'Shaping the Future of Water for Agriculture by World Bank, USA',
          'Participatory Rural Development in Pakistan by Khan, M. H',
          'Fundamentals of Soil Science by Henry D. Foth',
          'Diseases of Field Crops by Dickson, J.G',
          'Forest Types of Pakistan by Champion, H.G., S.K. Seth and G.M.Khattak',
          'Trees of Pakistan by M.I. Sheikh',
          'Wildlife Ecology, Conservation and Management by A. R. E. Sinclair, J. M. Fryxell, G. Caughley',
          'Basics of Forestry & Allied Sciences by Dr. Masood A.A. Qureshi',
          'Agricultural Extension and Rural Development by various authors',
          'Crop Production and Management by various authors',
          'Soil Conservation and Management by various authors',
          'Horticulture: Principles and Practices by various authors',
          'Plant Pathology and Disease Management by various authors',
          'Agricultural Economics and Policy by various authors',
          'Rural Development and Agricultural Extension by various authors',
          'Forest Ecology and Management by various authors',
          'Wildlife Conservation and Management by various authors',
          'Environmental Science and Natural Resource Management by various authors',
          'Climate Change and Agriculture by various authors',
          'Agricultural Biotechnology and GMO Crops by various authors',
          'Integrated Pest Management by various authors',
          'Water Management in Agriculture by various authors'
        ],
        examPattern: 'Part-I: Agriculture (50 Marks) + Part-II: Forestry (50 Marks) = 100 Marks',
        preparationTips: [
          'Study the concept of integrated agriculture and natural resource management',
          'Understand the challenges facing Pakistan\'s agriculture sector',
          'Learn about climate elements and their relationship with crop growth',
          'Study soil science, fertility, and conservation practices',
          'Understand genetic improvement and GMO crop technology',
          'Learn about horticulture, floriculture, and landscaping',
          'Study integrated pest management and disease control',
          'Understand rainfed and irrigated agriculture systems',
          'Learn about agriculture mechanization and land reforms',
          'Study forest ecology, management, and utilization',
          'Understand wildlife conservation and eco-tourism',
          'Learn about agroforestry and social forestry practices',
          'Study watershed management and climate change impacts',
          'Understand national forest laws and biodiversity policies',
          'Practice solving agricultural and forestry problems',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current agricultural and forestry practices',
          'Study case studies of successful agricultural and forestry projects',
          'Understand the integration of agriculture and forestry systems',
          'Learn about sustainable development practices in both fields'
        ]
      },
      'anthropology': {
        subjectId: 'anthropology',
        subjectName: 'Anthropology',
        subjectType: 'optional',
        subjectGroup: 'group7',
        code: 'OG7-5',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Anthropology',
            description: 'Introduction to anthropology, its definition, historical development, and recent trends.',
            topics: [
              'Definition of anthropology, its historical development, and recent trends',
              'Relationship of anthropology with other social sciences',
              'Sub-fields of anthropology: Biological Anthropology, Archaeology, Linguistic Anthropology, and Socio-Cultural Anthropology'
            ]
          },
          {
            title: 'II. Social Anthropology',
            description: 'Comprehensive study of culture, social institutions, and human societies.',
            topics: [
              'Definition of culture, its characteristics, and functions',
              'Institution of Family and Marriage: Definitions, types, structures, functions, and family organization',
              'Kinship and Social Organization: Definitions, types, functions, and kinship terminology',
              'Economic Organization: Definitions, evolution, substantivism versus formalism, reciprocity, production, consumption, distribution, barter, and primitive economic systems',
              'Political Organization: Definitions, evolution of political systems (band, tribal, chiefdom, state societies), theories of the origin of state societies (internal conflict, external conflict, population and irrigation, institutionalization of leadership, emergence of state, system theories), origin of civilization, politics of identity, ethnicity and ethnic relations, nationalism, modernism, and post-modernism',
              'Religion: Definitions, evolution of primitive religions, functions of religion, and comparison of divine religions and other world religions such as Hinduism, Buddhism, Jainism',
              'Contemporary Human Problems: Poverty, social inequality, political instability, population problems, ethnic violence, and terrorism'
            ]
          },
          {
            title: 'III. Urban Anthropology',
            description: 'Study of urban societies, migration, and urban development issues.',
            topics: [
              'Rural-urban migration, expansion of cities, environmental issues, sanitation problems',
              'Urbanization and development, slums and squatter settlements, refugees',
              'Various social groups (yankees, betties, gypsies), wars and conflict',
              'Conversion of power from feudal to industrial, institutionalization, education system',
              'Changes in mode of production (agriculture to capitalists), poverty (theories and remedies)',
              'Management of city life (psychological, cultural, economic, political, religious, physical, environmental, ecological, demographical, lingual aspects)',
              'Karl Marx and conflict theory, problems created by mechanization and automation'
            ]
          },
          {
            title: 'IV. Socio-Cultural Change',
            description: 'Understanding social and cultural change dynamics and barriers.',
            topics: [
              'Definitions, differences between social and cultural change',
              'Various dimensions of cultural change, barriers to cultural change (culture, psychological, political)',
              'Internal and external dynamics for change, population increase and change',
              'Diffusion of innovations, socio-religious barriers in accepting innovations and new ideas',
              'Media and cultural change, dynamics of change in Pakistan (trends and prospects)'
            ]
          },
          {
            title: 'V. Ethnicity and Race',
            description: 'Study of ethnicity, race, and social stratification.',
            topics: [
              'Theories related to ethnicity and race, ethnicity and racism',
              'Nations and nationality, ethnic conflict, degree of social variation',
              'Rank societies, caste and class societies, social stratification'
            ]
          },
          {
            title: 'VI. Anthropological Theories',
            description: 'Comprehensive study of classical and modern anthropological theories.',
            topics: [
              'Contributors: Edward Burnett Taylor, Lewis Henry Morgan, James Frazer, Karl Marx, Edmund Leach, Franz Boas, Margaret Mead, Ruth Benedict, Alfred L. Kroeber, Alfred Reginald Radcliffe-Brown, Bronislaw Kasper Malinowski, Clifford Geertz, Talal Asad, Akbar S. Ahmed, Ibn Khaldun, and Shah Waliullah',
              'Classical Theories: Degenerations, Evolutionism, Neo-Evolutionism, and Diffusions',
              'Modern Theories: Functionalism, Structural-functionalism, Class struggle, Structuralism, Historical Particularism, Feminism, and Culture and personality',
              'Current Trends in Anthropological Thoughts: Post Modernism, Romanticism, Poetics, and Politics of Ethnography'
            ]
          },
          {
            title: 'VII. Anthropological Research Methods',
            description: 'Study of research methodologies and data collection techniques in anthropology.',
            topics: [
              'Meaning, definition, types, and aims of anthropological research',
              'Qualitative and Quantitative research, purpose of research, research question, variables, hypothesis',
              'Research objective(s), research design, sampling, field data collection',
              'Tools of data collection (questionnaire, interview, participant observation)',
              'Data classification, data analysis, and reporting'
            ]
          }
        ],
        recommendedBooks: [
          'Anthropology by William A Haviland',
          'Cultural Anthropology by Conrad Philip Kottak',
          'Diffusion of Innovation by Evert M. Roger',
          'Socio Cultural Dynamics and impact of Technological Change by G. M. Foster',
          'Pakistani Society by Akber S. Ahmed',
          'Economic Anthropology by Sutti Ortiz',
          'Political Anthropology: An introduction by Ted. C. Lewellen',
          'Pukhtun economy and society by Akber S. Ahmed',
          'Principles of Anthropology by Eliot Dismore Chapple and Carleton Stevens Coon',
          'Anthropology and Modern life by Franz Boas',
          'Anthropology and Contemporary Human Problem by John H. Bodley',
          'Sindh and the Races that inhabit the Valley of the Indus by Richard Burton',
          'The People of Pakistan by Yu. V. Gankorvsky',
          'Anthropology and Development by Jean-Pierre Olivier de Sardan',
          'An Introduction to Theory in Anthropology by Robert Layton',
          'Anthropological Theory by John R. McGee and Richard L. Warms',
          'Anthropology in Pakistan by Stephen Pastner and Louis Flam',
          'Anthropology (13th edition) by Carol R. Ember, Melvin R Ember and Pet N Peregrine',
          'Other Cultures by John Beattie',
          'A Hand Book of Social Science Research by Beverly R. Dixon, Gary D Bouma and G.B.J. Alinson',
          'Frontier Perspectives: Essays in Comparative Anthropology by Charles Lindholm',
          'Generosity and Jealousy: The Swat Pukhtun of Northern Pakistan by Charles Lindholm',
          'Friend by Day and Enemy by Night: Organized Vengeance in a Kohistani Community by Lincoln Keiser',
          'A Punjabi Village in Pakistan by Zekiye Eglar',
          'The social organization of the Marri Baluch by Robert Niel Pehrson',
          'Introducing Anthropology by Park, MA 2007',
          'Peoples and Cultures of Asia by Scupin, R 2005',
          'Outlines and Highlights for Anthropology by Scupin, R and Decorse, CR 2010',
          'Economic Anthropology by Stuart Plattner',
          'Economies and Culture by Richard Wilk',
          'Introduction to Anthropology of Religion by Brian Moris'
        ],
        examPattern: 'Comprehensive coverage of 7 sections covering anthropology fundamentals, social anthropology, urban anthropology, socio-cultural change, ethnicity and race, anthropological theories, and research methods (100 Marks)',
        preparationTips: [
          'Study the fundamental concepts and definition of anthropology',
          'Understand the historical development and recent trends in anthropology',
          'Learn about the relationship between anthropology and other social sciences',
          'Study the four sub-fields of anthropology: Biological, Archaeological, Linguistic, and Socio-Cultural',
          'Understand social institutions: family, marriage, kinship, economic and political organization',
          'Learn about religion and its evolution, functions, and comparative study',
          'Study contemporary human problems and their anthropological perspectives',
          'Understand urban anthropology and issues of urbanization',
          'Learn about socio-cultural change dynamics and barriers',
          'Study ethnicity, race, and social stratification theories',
          'Master classical and modern anthropological theories',
          'Learn about prominent anthropologists and their contributions',
          'Understand current trends in anthropological thought',
          'Master anthropological research methods and data collection techniques',
          'Practice qualitative and quantitative research methodologies',
          'Study Pakistani society and culture from anthropological perspective',
          'Read recommended books for comprehensive understanding',
          'Practice writing anthropological research papers and case studies',
          'Stay updated with current anthropological research and developments',
          'Understand the application of anthropology in development and policy-making'
        ]
      },
      'applied-mathematics': {
        subjectId: 'applied-mathematics',
        subjectName: 'Applied Mathematics',
        subjectType: 'optional',
        subjectGroup: 'group2',
        code: 'OG2-3',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Vector Calculus (10%)',
            description: 'Study of vector algebra, calculus, and integral theorems.',
            topics: [
              'Vector algebra, scalar and vector products',
              'Gradient, divergence, curl of a vector',
              'Line, surface, and volume integrals',
              'Green\'s, Stokes\', and Gauss theorems'
            ]
          },
          {
            title: 'II. Statics (10%)',
            description: 'Study of forces in equilibrium and static systems.',
            topics: [
              'Composition and resolution of forces',
              'Parallel forces and couples',
              'Equilibrium of a system of coplanar forces',
              'Centre of mass of a system of particles and rigid bodies',
              'Equilibrium of forces in three dimensions'
            ]
          },
          {
            title: 'III. Dynamics (10%)',
            description: 'Study of motion, forces, and energy principles.',
            topics: [
              'Motion in a straight line with constant and variable acceleration',
              'Simple harmonic motion',
              'Conservative forces and principles of energy',
              'Tangential, normal, radial and transverse components of velocity and acceleration',
              'Motion under central forces, planetary orbits, and Kepler laws'
            ]
          },
          {
            title: 'IV. Ordinary Differential Equations (20%)',
            description: 'Study of differential equations and their solutions.',
            topics: [
              'Equations of first order: separable, exact, linear, orthogonal trajectories, nonlinear reducible to linear, Bernoulli, and Riccati equations',
              'Equations with constant coefficients: homogeneous, inhomogeneous, Cauchy-Euler, variation of parameters',
              'Ordinary and singular points of a differential equation, solution in series',
              'Bessel and Legendre equations, and properties of the Bessel functions and Legendre polynomials'
            ]
          },
          {
            title: 'V. Fourier Series and Partial Differential Equations (20%)',
            description: 'Study of Fourier series and partial differential equations.',
            topics: [
              'Trigonometric Fourier series (sine and cosine series)',
              'Bessel inequality, summation of infinite series, convergence of the Fourier series',
              'First-order partial differential equations',
              'Classification of second-order partial differential equations',
              'Boundary value problems, solution by the method of separation of variables',
              'Problems associated with Laplace equation, wave equation, and the heat equation in Cartesian coordinates'
            ]
          },
          {
            title: 'VI. Numerical Methods (30%)',
            description: 'Study of numerical techniques for solving mathematical problems.',
            topics: [
              'Solution of nonlinear equations: bisection, secant, Newton-Raphson methods, fixed-point iterative method, order of convergence',
              'Solution of a system of linear equations: diagonally dominant systems, Jacobi and Gauss-Seidel methods',
              'Numerical differentiation and integration: trapezoidal rule, Simpson\'s rules, Gaussian integration formulas',
              'Numerical solution of an ordinary differential equation: Euler and modified Euler methods, Runge-Kutta methods'
            ]
          }
        ],
        recommendedBooks: [
          'An Introduction to Vector Analysis by Khalid Latif',
          'Introduction to Mechanics by Q.K. Ghori',
          'An Intermediate Course in Theoretical Mechanics by Khalid Latif',
          'Differential Equations with Boundary Value Problems by D. G. Zill and M. R. Cullen',
          'Elementary Differential Equations by E.D. Rainville, P.E. Bedient and R.E. Bedient',
          'Introduction to Ordinary Differential Equations by A.L.Rabenstein',
          'Advanced Engineering Mathematics by E. Kreyszig',
          'An Introduction to Numerical Analysis by Mohammad Iqbal',
          'Numerical Analysis by R.L Burden and J.D Faires',
          'Elements of Numerical Analysis by F. Ahmad and M.A Rana',
          'Mathematical Methods by S. M. Yousaf, Abdul Majeed and Muhammad Amin'
        ],
        examPattern: 'Vector Calculus (10%) + Statics (10%) + Dynamics (10%) + Ordinary Differential Equations (20%) + Fourier Series and Partial Differential Equations (20%) + Numerical Methods (30%) = 100 Marks',
        preparationTips: [
          'Master vector algebra, calculus, and integral theorems',
          'Understand forces in equilibrium and static systems',
          'Study motion, forces, and energy principles',
          'Learn differential equations and their solution methods',
          'Master Fourier series and partial differential equations',
          'Practice numerical methods for solving mathematical problems',
          'Focus on the highest weightage topics: Numerical Methods (30%) and Differential Equations (20%)',
          'Practice solving problems in each section regularly',
          'Understand the theoretical foundations before applying numerical methods',
          'Study boundary value problems and their applications',
          'Learn about convergence and error analysis in numerical methods',
          'Practice integration and differentiation techniques',
          'Understand the physical applications of mathematical concepts',
          'Read recommended books for comprehensive understanding',
          'Practice solving previous year questions and mock tests',
          'Focus on problem-solving skills and computational accuracy',
          'Understand the relationship between different mathematical concepts',
          'Practice time management for different sections based on weightage',
          'Stay updated with current mathematical methods and applications'
        ]
      },
      'arabic': {
        subjectId: 'arabic',
        subjectName: 'Arabic',
        subjectType: 'optional',
        subjectGroup: 'group7',
        code: 'OG7-2',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'A. Pre-Islamic Period (العصر الجاهلي)',
            description: 'Study of Arabic literature and poetry in the pre-Islamic era.',
            topics: [
              'Influence of poets and poetry in Jahiliia period (أثر الشعر والشعراء في العصر الجاهلي)',
              'Literary markets in pre-Islamic Arabs especially Ukkaz (أسواق الأدب في العصر الجاهلي خاصة سوق عكاظ)',
              'Purposes and features of pre-Islamic poetry with special reference to Mu\'allaqat (أغراض الشعر الجاهلي ومزاياه مع التركيز على المعلقات)'
            ]
          },
          {
            title: 'B. Dawn of Islam (عصر صدر الإسلام)',
            description: 'Study of Arabic literature during the early Islamic period.',
            topics: [
              'Eloquence and Rhetoric of Holy Quran with examples from Quranic verses (الفصاحة القرآن و بلاغته مع الأمثلة من القرآن الكريم)',
              'Impact of Quran and Hadith on the subsequent literature (أثر القرآن والحديث في الأدب العربي)',
              'Poetry at the Dawn of Islam (الشعر في عصر صدر الإسلام)'
            ]
          },
          {
            title: 'C. Umayyad Period (العصر الأموى)',
            description: 'Study of Arabic literature during the Umayyad dynasty.',
            topics: [
              'Art of Flyting (فن النقائض)',
              'Erotic and platonic ghazal (الغزل الصريح والغزل العذري)'
            ]
          },
          {
            title: 'D. Abbasid and Spanish Period (العصر العباس والأندلسي)',
            description: 'Study of Arabic literature during the Abbasid and Spanish periods.',
            topics: [
              'Purposes and features of Abbasid poetry with special emphasis on the poetry of Mutanabbi, Abu Tammam, Abu Nuwas, AbulAtahia (أغراض الشعر العباسي و ميزاته مع التركيز على شعر المتنبي و أبي تمام و أبي نواس وأبي العتاهية)',
              'Prose and its different styles with special emphasis on style of Ibnul Ameed, IbnulMuqaffa, Al-Jahiz and Al-Qazi al Fazil (النثر و أساليبه المختلفة خاصة أسلوب ابن العميد و ابن المقفع والجاحظ و القاضي الفاضل)',
              'Spanish poetry, with special reference to poetry of Ibn e Zaidoon (الشعر الأندلسي خاصة شعر ابن زيدون)'
            ]
          },
          {
            title: 'E. Contemporary Arabic Literature (الأدب العربي المعاصر)',
            description: 'Study of modern Arabic literature and its development.',
            topics: [
              'Development of Drama with special focus on services of Toufeeq al Hakeem (تطور المسرحية مع التركيز على أعمال توفيق الحكيم)',
              'Development of Novel with special reference to the novels of Taha Husain and Nageeb Mahfooz (تطور الرواية مع التركيز على روايات طه حسین و نجیب محفوظ)',
              'Development of short story with special focus on short stories of MahmoodTaimoor (تطور القصة القصيرة مع نموذج من القصص القصيرة عند محمود تيمور)',
              'Poetry with special focus on poetry of Ahmad Shouqi and Hafiz Ibraheem (الشعر مع التركيز على شعر أحمد شوقي و حافظ إبراهيم)'
            ]
          },
          {
            title: 'F. Common Topics of Different Periods',
            description: 'Study of common themes and developments across different periods.',
            topics: [
              'Criticism from pre-Islamic era to the 4th Islamic Century (النقد في الأدب العربي من العصر الجاهلي إلى القرن الرابع الهجري)',
              'Art of Oratory from pre-Islamic era to Umayyad period (الخطابة من العصر الجاهلي إلى العصر الأموي)',
              'Development of Arabic literature in the Sub-Continent: (Ghulam Ali Azad in poetry and Shah Waliullah in prose) (تطور الأدب العربي في شبه القارة الهندية غلام على أزاد في الشعر و شاه ولي الله في النثر)'
            ]
          },
          {
            title: 'G. Poetry for Arabic Paper',
            description: 'Specific verses and odes from various Arabic poets.',
            topics: [
              'Verses from ode of Imraul Qais (1-10)',
              'Verses from Qaseedah of Zuhair bin AbiSulma (50-62)',
              'Verses from poetry of Hassan bin Thabit (14-28)',
              'Verses from poetry of Ka\'b bin Zuhair (33-40)',
              'Verses from poetry of Hafiz Ibrahim (1-10)',
              'Verses from ode of Ahmad Shouqi (1-10)',
              'Verses from Qaseedah of Imam Al Booseri (15-24)'
            ]
          },
          {
            title: 'H. Arabic Grammar (قواعد العربية)',
            description: 'Study of Arabic syntax and morphology.',
            topics: [
              'Syntax (النحو): Kinds of Sentence (Nominal and Verbal), kinds of Noun ("Proper and Common", "Masculine and Feminine", "Singular, Dual and Plural", "Mu\'rab and Mabni"), Case-Ending (أقسام الجملة الفعلية والإسمية أقسام الإسم: "المعرفة والفكرة ", "المؤنث و المذكر" "المفرد والتثنية والجمع". "المعرب والمبني الإعراب)',
              'Morphology (الصرف): Etymology (roots), Mujarrad, Mazeed-feeh, Transitive and Intransitive verb, Active and passive voice (الإشتقاق المجرد والمزيد فيه الفعل اللازم والمتعدي الفعل المبني المعلوم والمبني المجهول)'
            ]
          }
        ],
        recommendedBooks: [
          'A Literary History of the Arabs by Reynold A. Nicholson, Published by Cambridge University Press',
          'History of Arabic Literature (تاريخ الأدب العربي) by Ahmad Hasan Zayyat, Published by Darul Marifat دار المعرفة Beirut Lubnan',
          'The Contribution of India to the Arabic Literature by Dr. Zubaid Ahmad, Published by Idara Saqafat Islamia, Lahore',
          'Muallim-ul-Insha\'a (معلم الانشاء) by Maulana Abdul Majid Nadavi, Majlis Nashriyat islami, Karachi',
          'Arthur J. Arberry, Modern Arabic Poetry, Cambridge University Press London 1962',
          'Selections from Arabic Poetry & Prose (شذرات من الشعر والنثر العربي) by Dr. Khaliq Dad Malik, Published by Azad Book Depot, Lahore',
          'Applied Arabic Grammar (تطبيق القواعد العربية) by Dr. Khaliq Dad Malik, Published by Azad Book Depot, Lahore',
          'Tasheel Al-sarf wa Al-Nahv (تسهيل الصرف وتسهيل النحو) by Khan Muhammad, Published by Zia ul Quran Lahore',
          'جواهر الشعر (Jawahir Al-Shi\'r) جمع وترتيب وشرح الشاعر الشربيني شريدة, Published by Darul Hadith Cairo',
          'Arabic Literature (الأدب العربي) (Elective Arabic Course B.A. Punjab University Lahore)',
          'الجامع في تاريخ الأدب العربي (Al-Jami\' fi Tarikh Al-Adab Al-Arabi), حنا الفاخوري دار الكتب العلمية، بيروت',
          'تاريخ الأدب العربي (Tarikh Al-Adab Al-Arabi), الدكتور شوقي ضيف، دار المعارف، مصر'
        ],
        examPattern: 'Comprehensive coverage of 8 sections covering Arabic literature from pre-Islamic period to contemporary times, including poetry, prose, grammar, and literary criticism (100 Marks)',
        preparationTips: [
          'Study the historical development of Arabic literature from pre-Islamic to contemporary periods',
          'Understand the influence of Quran and Hadith on Arabic literature',
          'Learn about different literary periods: Jahili, Umayyad, Abbasid, Spanish, and contemporary',
          'Master Arabic grammar including syntax (النحو) and morphology (الصرف)',
          'Study the works of prominent Arabic poets and writers',
          'Understand the development of different literary genres: poetry, prose, drama, novel, short story',
          'Learn about literary criticism and its evolution in Arabic literature',
          'Study the art of oratory and its significance in Arabic culture',
          'Understand the development of Arabic literature in the Sub-Continent',
          'Master the specific verses and odes mentioned in the syllabus',
          'Practice reading and understanding Arabic texts from different periods',
          'Study the linguistic features and rhetorical devices in Arabic literature',
          'Learn about the cultural and historical context of each literary period',
          'Understand the relationship between Arabic literature and Islamic civilization',
          'Practice writing in Arabic and analyzing literary texts',
          'Study the recommended books for comprehensive understanding',
          'Focus on the works of specific authors mentioned in the syllabus',
          'Understand the evolution of Arabic poetry and its various forms',
          'Learn about the development of Arabic prose and its different styles',
          'Stay updated with contemporary Arabic literature and its trends'
        ]
      },
      'botany': {
        subjectId: 'botany',
        subjectName: 'Botany',
        subjectType: 'optional',
        subjectGroup: 'group5',
        code: 'OG5-2',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Algae, Fungi and Bryophytes',
            description: 'Study of lower plants including algae, fungi, and bryophytes.',
            topics: [
              'Phycology: Distribution, Classification, Structure, Life History and Economic importance of the main groups of Algae',
              'Mycology and Plant Pathology: Structure, Reproduction, Classification and Economic importance of the main groups of Fungi. Diseases of economically important crops and general principles of their control',
              'Bryology: Structure and reproduction of bryophytes, Evolution of Gametophyte and Sporophyte'
            ]
          },
          {
            title: 'II. Pteridophyta and Gymnosperms',
            description: 'Study of vascular cryptogams and gymnosperms.',
            topics: [
              'General account with special reference to structure, life history and affinities of both Pteridophytes and Gymnosperms',
              'Ontogeny and structure of seed, classification and economic importance of Gymnosperms'
            ]
          },
          {
            title: 'III. Anatomy and Embryology',
            description: 'Study of plant structure and reproductive development.',
            topics: [
              'Primary and secondary tissues. Meristems. Secondary growth in dicot stem. Anatomy of leaf, stem and root',
              'Micro and megasporogenesis, pollination mechanism, fertilization, development of Embryo and Endosperm, Seed dispersal'
            ]
          },
          {
            title: 'IV. Taxonomy of Angiosperms',
            description: 'Study of flowering plant classification and modern taxonomic approaches.',
            topics: [
              'Systems of classification. Rules of botanical nomenclature. Concepts of speciation',
              'Introduction to modern trends in plant taxonomy: bio-systematic, chemotaxonomy and numerical taxonomy',
              'General characters and economic importance of common angiosperm families'
            ]
          },
          {
            title: 'V. Plant Physiology',
            description: 'Study of plant functions and metabolic processes.',
            topics: [
              'Plant water relations, Osmotic Quantities, component potentials of water and their role in transport, water absorption by roots, transpiration',
              'Role of essential mineral elements and their uptake. Plant hormones. Photoperiodism, Vernalization. Dormancy and Seed germination. Enzymes',
              'Photosynthesis: Plant pigments, Light reaction, CO2 fixation, Mechanism of photophosphorylation',
              'Respiration: Glycolysis, Kreb cycle, Mechanism of oxidative phosphorylation'
            ]
          },
          {
            title: 'VI. Ecology',
            description: 'Study of plant-environment interactions and ecosystem dynamics.',
            topics: [
              'Influence of climatic, edaphic and biotic factors on plant growth. Vegetation sampling techniques',
              'Concepts of ecosystems and their productivity, ecological energetics, Pyramids (of numbers, biomass and energy), trophic levels, food chains and food webs',
              'Biogeochemical cycles (Hydrological and Nitrogen). Succession',
              'Causes and reclamation of soil salinity and water logging in Pakistan. Soil erosion, its control and soil conservation methods. Deforestation. Biodiversity conservation. Pollution'
            ]
          },
          {
            title: 'VII. Cytology',
            description: 'Study of cell structure and function.',
            topics: [
              'Cell cycle, cellular morphology, chemistry of cell wall and cell membrane, cell to cell communication, plant tissue and cell culture, cell senescence and cell death',
              'Ultra-structure of various cell organelles: Mitochondria, Golgi bodies, Endoplasmic reticulum, Plastids, Ribosomes, Glyoxysomes, Vacuoles, Nucleus'
            ]
          },
          {
            title: 'VIII. Genetics',
            description: 'Study of inheritance and genetic variation in plants.',
            topics: [
              'Mendelian Genetics, Multiple Alleles, Polygenic inheritance, Gene interaction, Epistasis and pleiotropy, Sex-linked inheritance',
              'Chromosomal aberrations, Mutations, DNA repair'
            ]
          },
          {
            title: 'IX. Evolution',
            description: 'Study of evolutionary processes and plant evolution.',
            topics: [
              'Introduction of Evolution, Evolutionary history, Evolution of life',
              'Convergent Evolution, Divergent Evolution, Parallel Evolution and Natural selection'
            ]
          },
          {
            title: 'X. Molecular Biology',
            description: 'Study of molecular processes in plants and genetic engineering.',
            topics: [
              'Nucleic acids, DNA as hereditary material, DNA replication, Transcription, Genetic code, Protein synthesis',
              'Genetic engineering and its application, Genetically Modified Organisms (GMO)'
            ]
          }
        ],
        recommendedBooks: [
          'Esau\'s Plant Anatomy: Meristems, Cells and Tissues of the Plant Body: Their Structure, Function and Development by Evert, F.F. and S. Hichhorn (2006)',
          'Cryptogamic Botany-Algae and Fungi by Smith, G. M. (2001)',
          'Cryptogamic Botany-Bryophyte and Pteridophyte by Smith. G. M. (2001)',
          'Comparative Morphology of the Vascular Plants by Foster, A.S. and E.H. Gifford. (1989)',
          'Plant and Environment by Daubermine, R, F, (1974)',
          'Plant Taxonomy and Biosystematics by Stac, C. A. (1980)',
          'Plant Physiology by Taiz, L.& E. Zeiger (2006)',
          'Genetics: A Conceptual Approach. 4th edition by Pierce, B. A. (2012)',
          'Molecular Cell Biology by Lodish, H., A. Berk, S.L. Zipursky, P. Matsudaira, D. Baltimore and J. Darnell (2000)',
          'Concepts of Genetics. 10th edition by William S. Klug. (2012)',
          'Ilmi Biomolecules, Cell Biology and Genetics. by Cheema, T.A. and Cheema Z.T. (2009)',
          'Carvan Textbook of Botany Paper "A" (Morphology of Plants) by Malik, T. A. (2006)',
          'Ecology (Principles and applications). 1st ed. Cambridge University Press UK. by Chapman, J.L. and Reiss, M.J. (1992)',
          'Fundamentals of Ecology by Odum, E.P. and Barrett, G.W. (2004)',
          'Advanced Plant Taxonomy by Mondal, A. Κ., (2009)',
          'Growth and Differentiation in Plants by Phillips and Wareings'
        ],
        examPattern: 'Comprehensive coverage of 10 sections covering all aspects of botany from lower plants to molecular biology, including practical applications and environmental issues (100 Marks)',
        preparationTips: [
          'Study the classification and characteristics of algae, fungi, and bryophytes',
          'Understand the structure and life cycles of pteridophytes and gymnosperms',
          'Master plant anatomy including tissue types and secondary growth',
          'Learn about plant embryology and reproductive processes',
          'Study angiosperm taxonomy and modern classification systems',
          'Understand plant physiology including water relations, photosynthesis, and respiration',
          'Learn about plant hormones and their role in growth and development',
          'Master ecological concepts and their application to plant communities',
          'Study cytology and understand cell structure and function',
          'Learn Mendelian genetics and its application to plants',
          'Understand evolutionary processes and their impact on plant diversity',
          'Study molecular biology and genetic engineering applications',
          'Focus on practical applications in agriculture and environmental conservation',
          'Understand the relationship between plants and their environment',
          'Study plant diseases and their control methods',
          'Learn about biodiversity conservation and environmental issues',
          'Practice identifying different plant groups and families',
          'Understand the economic importance of various plant groups',
          'Study the latest developments in plant biotechnology',
          'Focus on environmental problems specific to Pakistan and their solutions',
          'Read recommended books for comprehensive understanding',
          'Practice laboratory techniques and plant identification',
          'Stay updated with current research in plant sciences',
          'Understand the interdisciplinary nature of botany'
        ]
      },
      'british-history': {
        subjectId: 'british-history',
        subjectName: 'British History',
        subjectType: 'optional',
        subjectGroup: 'group4',
        code: 'OG4-1',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Part-I: The Glorious Revolution to Victorian Era (50 Marks)',
            description: 'Study of British history from the late 17th century to the early 20th century.',
            topics: [
              'I. The Glorious Revolution (1688): Causes and Results, William III and Mary II (1689-1702), Queen Anne (1702-1714)',
              'II. Hanoverian Era (1714-1790): Jacobite Rebellions (1715 and 1745), Robert Walpole and Whig Oligarchy, American War of Independence (1776)',
              'III. The Union of England and Scotland',
              'IV. Union of England and Ireland',
              'V. The Old Colonial system',
              'VI. The French Revolution and Napoleonic Wars: Causes, Britain and Napoleonic Wars, Impact on Britain',
              'VII. Industrial and Agricultural Revolution: Causes, Effects on Political and Social Life of Britain, Party Politics, The Methodist Movement, Socialism, Liberalism, Colonization, Chartist Movement',
              'VIII. Robert Peel and return of Tories: Internal policies, Irish Problem',
              'IX. Victorian Era (1837-1901): Internal Reforms, Liberals, Foreign Policy, Disraeli, Gladstone and Problems in Ireland, Great Britain and Free Trade'
            ]
          },
          {
            title: 'Part-II: Edwardian Era to Modern Britain (50 Marks)',
            description: 'Study of British history from the early 20th century to the early 21st century.',
            topics: [
              'X. Edwardian Era (1901-1910): Domestic and Foreign Policies (1901-1910), The Origins of Labor Party',
              'XI. Britain, World War I and its Aftermath: Causes, Britain and Peace settlement, Effects of War on Britain, League of Nations, The Great Depression, Appeasement and Rearmament',
              'XII. Britain, World War II and its Aftermath: Causes and events, Churchill, War Conferences, Creation of U.N.O, Effects of war, Reforms of Labour Government',
              'XIII. Great Britain and Cold War: Creation of Commonwealth, NATO, Decolonization of the British Empire, Internal Policies and EEC, Foreign Policy',
              'XIV. Thatcherism to Cameron (1979-2012): Internal Policy, Society and culture, Foreign Policy, Falkland War, John Major and his Policies, European Common Market and the Great Britain, Formation of EU, Tony Blair "New Labour" Economic Crunch, War on Terror and his Policies, Global Financial Crisis 2008 and the Great Britain, Reforms under Cameron'
            ]
          }
        ],
        recommendedBooks: [
          'The Conservative Party from Peel to Thatcher by Blake, Robert, 1985',
          'A New History of England, 410-1975. by Oxford, New York, Pergamum Press, 1968',
          'Trends in Britain Politics since 1945 by Cook, Chris and John Ramsden eds. 1978',
          'The Hanoverians, 1714-1815 by Green, V.H. 1976',
          'The People\'s Peace: British History 1945-1990 by Morgan, Kenneth O, 1992',
          'Textbook of Modern English History 1714-1960 by Southgate, G.W.A, 1961',
          'English History, 1914-1945 by Taylor, A.J.P. 1965',
          'Europe Since Napoleon by Thompson, David. 1983',
          'English Social History by Trevelyan, G.M.',
          'Britain and Empire. by L.J. Butler.',
          'Democracy: Great Britain 1815-1914 by Bentley, Michael',
          'England in the Eighteenth Century by Serlley, W.T.',
          'History of Britain by Carter, E.H.',
          'Mastering Modern British History by Norman Lowe',
          'The Struggle for Mastery in Europe 1848-1918 by Taylor, A.J.P.'
        ],
        examPattern: 'Part-I (50 Marks): The Glorious Revolution to Victorian Era + Part-II (50 Marks): Edwardian Era to Modern Britain = 100 Marks',
        preparationTips: [
          'Study the causes and consequences of the Glorious Revolution (1688)',
          'Understand the Hanoverian succession and its impact on British politics',
          'Learn about the Jacobite rebellions and their significance',
          'Study the American War of Independence and its impact on Britain',
          'Understand the formation of the United Kingdom through unions with Scotland and Ireland',
          'Master the Industrial and Agricultural Revolutions and their social effects',
          'Study the development of political parties and parliamentary reforms',
          'Learn about the Victorian Era and its reforms',
          'Understand Britain\'s role in the French Revolution and Napoleonic Wars',
          'Study the Chartist Movement and working-class politics',
          'Learn about the Edwardian Era and the origins of the Labour Party',
          'Master Britain\'s involvement in both World Wars',
          'Understand the post-war reforms and the creation of the welfare state',
          'Study Britain\'s role in the Cold War and decolonization',
          'Learn about Thatcherism and its impact on British society',
          'Understand Britain\'s relationship with Europe and the EU',
          'Study the Blair era and New Labour policies',
          'Learn about the 2008 financial crisis and its impact on Britain',
          'Focus on key political figures: Walpole, Peel, Disraeli, Gladstone, Churchill, Thatcher, Blair',
          'Understand the evolution of British foreign policy',
          'Study the development of British democracy and constitutional monarchy',
          'Learn about social movements and their impact on British society',
          'Understand the economic transformations and their political consequences',
          'Read recommended books for comprehensive understanding',
          'Practice analyzing historical events and their long-term consequences',
          'Stay updated with current British political developments',
          'Understand the relationship between British history and global events'
        ]
      },
      'business-administration': {
        subjectId: 'business-administration',
        subjectName: 'Business Administration',
        subjectType: 'optional',
        subjectGroup: 'group3',
        code: 'OG3-1',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Management',
            description: 'Study of organizational management principles, functions, and processes.',
            topics: [
              'Defining Organization, Management, and Management in Organizations',
              'Four Management Functions, Management Roles, Management Skills',
              'Organizational Internal-External Environment',
              'Management Planning, Goal Setting, and Decision Making',
              'Strategic Management Process: Strategy Formulation and Implementation',
              'Developing Organizational Structure and Design',
              'Designing Adaptive Organizations',
              'Managing Change and Innovation',
              'Leadership and Motivation'
            ]
          },
          {
            title: 'II. HR Management',
            description: 'Study of human resource management functions and processes.',
            topics: [
              'Role of Human Resource Management in Organizational Performance',
              'Functions of HRM',
              'Process and Methods of Job Analysis',
              'Planning and Forecasting Personnel Needs',
              'Recruitment and Selection',
              'Training and Development',
              'Performance Management and Appraisal: Methods and Processes',
              'Establishing Strategic Pay Plans',
              'Compensation and Benefits',
              'Ethics, Justice, and Fair Treatment in HR Management',
              'Labor Relations and Collective Bargaining'
            ]
          },
          {
            title: 'III. Financial Management',
            description: 'Study of financial management principles and practices.',
            topics: [
              'An overview of Financial Management: Introduction and significance of financial markets, Differentiation between real assets and financial assets, Types of Financial Markets, Role of capital and money markets in economic development, Organizational goals and shareholder wealth maximization perspective',
              'Time Value of Money: Cost of money and the factors effecting the cost, Interest rate fundamentals and determinants of market interest rate, Role of Time value of money in finance, Concept of future value and present value, Making timelines, Annuities, Perpetuities and mixed stream of cash flows, with and without growth, Present value and future value of cash flow streams, Compounding Interest: discrete and continuous, Loan amortization',
              'Analysis and Interpretation of Financial Statements: Reading the financial statements, Horizontal and vertical analysis including common size, ratio, comparative and index number trend analysis, Forecasting financials for future decision making, Evaluating credit, management, profitability, risk etc using financial statements',
              'Risk, Return and Introduction to Pricing: Measures of Risks and return, Investment return and expected rate of return, Standalone risk: standard deviation and coefficient of variation, Risk aversion and required rate of return, Portfolio risk Diversifiable vs. Market risk, Security Market Line and CAPM, Calculating WACC. Discounting process for price determination, Relevant risk and return for valuation',
              'Cash flow and Budgeting: Significance of budgeting, Making cash budgets, Making financial forecasts, Difference between profit and cash flow, Read and analyze Statement of Cash flow',
              'Capital Budgeting: Significance of Capital budgeting, Cash flow calculations: incremental cash flows, Capital budgeting decision rules: NPV, IRR, MIRR, Return, Finding optimal capital structure, calculating appropriate discount rate, Capital Rationing'
            ]
          },
          {
            title: 'IV. Operations and Supply Chain Management',
            description: 'Study of operations management and supply chain processes.',
            topics: [
              'Operations Management: Operations & Productivity, Operations Management (OM) as one of the Three Core Functions in an Organization, Significance and contributions of OM in the field of management, Future trends in OM and differences between goods and services',
              'Operations Strategy in Global Environment: Developing mission & OM strategies, Critical Success Factors (CSF), Aligning Core Competencies with CSF',
              'Process Strategy: Four Process Strategies, Process Analysis and Design, Process Mapping, Flow Diagrams, Process Charts, Service process design, Process Re-engineering',
              'Capacity Planning: Design & Effective Capacity, Capacity Cushion, Capacity considerations, Managing demand, Capacity Planning, Leading vs Lagging Strategies, Single & Multiple Product Break Even Analysis for Capacity Planning',
              'Location Strategies: Factors Affecting Location Decisions, Methods for Evaluating Location Alternatives, Factor Rating Method, Load-Distance Methods, Center of Gravity Method, Service location Strategy',
              'Layout Strategies: Types of Layout, Layout Design, Fixed Position Layout, Process-Oriented Layouts, Office Layout, Retail Layout, Assembly Line Balancing',
              'Inventory Management: Role of Inventory in Operations, ABC analysis, Record accuracy, Cycle counting, Inventory Models, Fixed Period Systems, Continuous Review Systems, Basic EOQ Inventory Model, Safety Stock, Service Level',
              'Supply Chain Management: Introduction to supply chain management and logistics management, What is supply chain management and logistics management, Objectives, importance, Examples of supply chain management and logistics management, Decision phases in supply chains',
              'Supply chain performance: Achieving strategic fit, Challenges in achieving strategic fit, Supply chain cost, Supply chain quality, Supply chain lead time',
              'Supply chain drivers: Facilities as a driver, Inventory as a driver, Information as a driver, Transportation as a driver, Sourcing as a driver, Pricing as a driver',
              'Balancing supply and demand: Bullwhip effect, Demand collaboration, Information sharing in supply chains, accurate response strategy',
              'Supply chain coordination: Obstacles in coordination, Vendor managed inventory, Collaborative planning forecasting and replenishment, Managerial levers to achieve coordination',
              'IT in supply chain management: Role of IT in supply chain management, Customer relationship management, Supplier relationship management, Risk management in IT, Supply chain IT in practice'
            ]
          },
          {
            title: 'V. Marketing',
            description: 'Study of marketing principles and strategies.',
            topics: [
              'Introduction to marketing',
              'Developing marketing strategies and plans',
              'Scanning the marketing environment',
              'Analyzing consumer markets',
              'Market segmentation',
              'Managing marketing information',
              'Branding',
              'Product life cycle',
              'Pricing',
              'Managing distribution channels',
              'Integrated marketing communications'
            ]
          }
        ],
        recommendedBooks: [
          'Management by Stephen P. Robbins and Mary Coulter',
          'Human Resource Management by Gary Dessler',
          'Fundamentals of Financial Management by Eugene F. Brigham and Joel F. Houston',
          'Operations Management by William J. Stevenson',
          'Supply Chain Management: Strategy, Planning, and Operation by Sunil Chopra and Peter Meindl',
          'Marketing Management by Philip Kotler and Kevin Lane Keller',
          'Strategic Management: Concepts and Cases by Fred R. David',
          'Organizational Behavior by Stephen P. Robbins and Timothy A. Judge',
          'Business Research Methods by Donald R. Cooper and Pamela S. Schindler',
          'International Business: The Challenge of Global Competition by Donald A. Ball and Wendell H. McCulloch Jr.',
          'Business Ethics: Concepts and Cases by Manuel G. Velasquez',
          'Project Management: A Managerial Approach by Jack R. Meredith and Samuel J. Mantel Jr.',
          'Quality Management by David L. Goetsch and Stanley B. Davis',
          'Business Communication Today by Courtland L. Bovee and John V. Thill',
          'Managerial Economics by William F. Samuelson and Stephen G. Marks',
          'Business Statistics by Ken Black',
          'Corporate Finance by Stephen A. Ross, Randolph W. Westerfield, and Jeffrey F. Jaffe',
          'Investment Analysis and Portfolio Management by Frank K. Reilly and Keith C. Brown',
          'Marketing Research by Alvin C. Burns and Ronald F. Bush',
          'Consumer Behavior by Leon G. Schiffman and Leslie Lazar Kanuk',
          'Services Marketing by Christopher Lovelock and Jochen Wirtz',
          'Digital Marketing by Dave Chaffey and Fiona Ellis-Chadwick'
        ],
        examPattern: 'Management (20 Marks) + HR Management (20 Marks) + Financial Management (25 Marks) + Operations and Supply Chain Management (25 Marks) + Marketing (10 Marks) = 100 Marks',
        preparationTips: [
          'Study the fundamental principles of management and organizational behavior',
          'Understand the four management functions: planning, organizing, leading, and controlling',
          'Learn about strategic management and decision-making processes',
          'Master human resource management functions and processes',
          'Understand recruitment, selection, training, and performance management',
          'Study compensation systems and labor relations',
          'Learn financial management principles including time value of money',
          'Master financial statement analysis and interpretation',
          'Understand risk and return concepts in finance',
          'Study capital budgeting techniques and investment decisions',
          'Learn operations management principles and productivity',
          'Understand process strategy and capacity planning',
          'Master inventory management and supply chain concepts',
          'Study location and layout strategies',
          'Learn about supply chain coordination and IT applications',
          'Understand marketing principles and consumer behavior',
          'Study market segmentation and targeting strategies',
          'Learn about product life cycle and branding',
          'Understand pricing strategies and distribution channels',
          'Master integrated marketing communications',
          'Focus on practical applications and case studies',
          'Practice solving business problems and decision-making scenarios',
          'Understand the interconnections between different business functions',
          'Stay updated with current business trends and practices',
          'Read recommended books for comprehensive understanding',
          'Practice analyzing business cases and real-world scenarios',
          'Understand the global business environment and challenges',
          'Focus on ethical considerations in business decision-making',
          'Learn about digital transformation and technology in business',
          'Understand sustainability and corporate social responsibility'
        ]
      },
      'constitutional-law': {
        subjectId: 'constitutional-law',
        subjectName: 'Constitutional Law',
        subjectType: 'optional',
        subjectGroup: 'group6',
        code: 'OG6-1',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Definition and Scope of Constitutional Law',
            description: 'Study of basic constitutional concepts and structures.',
            topics: [
              'Basic Constitutional Concepts: Constitutional Conventions, Rule of Law, Due Process',
              'Constitutional Structures: Parliamentary, Presidential, Separation of Powers',
              'Judiciary: Independence of Judiciary, Judicial Review, Theories of Constitutional Interpretation',
              'Fundamental Human and Political Rights and Civil Liberties: freedom of speech, association, assembly, movement, Right to Counsel, life, property, religion, privacy, self-incrimination, double jeopardy'
            ]
          },
          {
            title: 'II. Principles of Constitutional Law',
            description: 'Study of constitutional principles with special reference to various countries.',
            topics: [
              'Principles of Constitutional Law with special reference to the United Kingdom, United States of America, France, Russia, China, Pakistan, India, and Turkey'
            ]
          },
          {
            title: 'III. Constitutional History of Pakistan',
            description: 'Study of Pakistan\'s constitutional development and evolution.',
            topics: [
              'Principles of Constitutional Law of Pakistan',
              'Salient feature of the Government of India Act, 1935',
              'Indian Independence Act 1947',
              'Objectives Resolution 1949',
              'Constitutions of 1956, 1962 and 1973',
              'Abrogation and Suspension of the Constitutions and the Martial Laws',
              'Legal Framework Order, 1970',
              'The PCO of 1981',
              'The RCO of 1985',
              'The LFO-2002',
              'Amendments in the 1973 Constitution'
            ]
          },
          {
            title: 'IV. Legal Development',
            description: 'Study of important constitutional cases and their impact.',
            topics: [
              'Maulvi Tamizuddin Khan v. Federation of Pakistan PLD 1955 Sindh 96',
              'Federation of Pakistan vs. Maulvi Tamizuddin Khan, PLD 1955 FC 240',
              'Reference by the Governor-General PLD 1955 FC 435',
              'State v. Dosso PLD 1958 SC 533',
              'Usif Patel v. Crown PLD 1955 FC 387',
              'Begum Nusrat Bhutto v. Chief of the Army Staff PLD 1977 SC 657',
              'Hakim Khan v. Government of Pakistan PLD 1992 SC 595',
              'Nawaz Sharif v. President of Pakistan PLD 1993 SC 473',
              'Benazir Bhutto v. the President of Pakistan PLD 1992 SC 492',
              'Khawaja Muhammad Sharif, PLD 1988 Lah. 725',
              'Federation of Pakistan v. Haji Saifullah Khan PLD 1989 SC 166',
              'Khawaja Ahmad Tariq Rahim PLD 1992 SC 646',
              'Benazir Bhutto v. President of Pakistan, PLD 1998 SC 388',
              'Asma Jilani v. Government of the Punjab PLD 1972 SC 139',
              'State v. Zia ur Rehman PLD 1973 SC 49',
              'Mahmood Khan Achakzai v. Fed. of Pakistan PLD 1997 SC 426',
              'Zafar Ali Shah v. General Pervez Musharraf, PLD 2000 SC 869',
              'Sindh High Court Association v. Federation of Pakistan, PLD 2009 SC 879'
            ]
          }
        ],
        recommendedBooks: [
          'Comparative Constitutional Law by Hamid Khan & M.W. Rana',
          'Constitution of Pakistan 1973 by Shabbar Raza Rizvi',
          'Introduction to the Study of the Law of the Constitution by Dicey',
          'Elgar Encyclopedia of Comparative Law by J.M. Smits',
          'Constitutional & Political History of Pakistan by Hamid Khan, Advocate',
          'Human Rights in Constitutional Law by SR. Bansali',
          'Constitutional Documents of Pakistan by Safdar Mahmood',
          'The Leading Cases in Constitutional Law by A.G.Chaudhry'
        ],
        examPattern: 'Definition and Scope (25 Marks) + Principles of Constitutional Law (25 Marks) + Constitutional History of Pakistan (25 Marks) + Legal Development (25 Marks) = 100 Marks',
        preparationTips: [
          'Study the fundamental concepts of constitutional law and their application',
          'Understand the rule of law and its significance in constitutional governance',
          'Learn about different constitutional structures: parliamentary, presidential, and separation of powers',
          'Master the concept of judicial independence and judicial review',
          'Study fundamental rights and civil liberties in constitutional context',
          'Understand constitutional principles across different countries',
          'Learn about Pakistan\'s constitutional development from 1935 to present',
          'Study the Government of India Act, 1935 and its impact on Pakistan\'s constitution',
          'Understand the Objectives Resolution and its significance',
          'Master the features of Pakistan\'s constitutions: 1956, 1962, and 1973',
          'Study the impact of martial laws and constitutional suspensions',
          'Learn about various constitutional orders: LFO, PCO, RCO',
          'Understand constitutional amendments and their implications',
          'Study important constitutional cases and their legal principles',
          'Learn about the doctrine of necessity and its application',
          'Understand the role of judiciary in constitutional interpretation',
          'Study the relationship between executive, legislature, and judiciary',
          'Learn about fundamental rights enforcement and constitutional remedies',
          'Understand the concept of constitutional conventions',
          'Study comparative constitutional law principles',
          'Focus on Pakistan\'s constitutional challenges and developments',
          'Learn about constitutional interpretation methods and theories',
          'Understand the role of constitutional law in protecting democracy',
          'Study the impact of constitutional cases on governance',
          'Read recommended books for comprehensive understanding',
          'Practice analyzing constitutional cases and their implications',
          'Stay updated with current constitutional developments in Pakistan',
          'Understand the relationship between constitutional law and human rights',
          'Study the role of constitutional law in federalism and provincial autonomy',
          'Learn about constitutional safeguards and checks and balances'
        ]
      },
      'criminology': {
        subjectId: 'criminology',
        subjectName: 'Criminology',
        subjectType: 'optional',
        subjectGroup: 'group6',
        code: 'OG6-2',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Section-I: Introduction to Criminology (25 Marks)',
            description: 'Study of basic criminological concepts and theoretical perspectives.',
            topics: [
              'I. Introduction: Basic concepts used in understanding crime, criminality and criminal behaviour',
              'II. Understanding Criminology: Definition, meaning and scope of criminology; Criminology and criminal law; Crime as social problem; Deviance, Sin Vice, Evil, Norms, Values; Security (Physical, Social, Economic)',
              'III. Crime and Criminals: Occasional criminals, Habitual criminals, Professional criminals, White-collar crime, Organized crime, corporate crimes',
              'IV. Crime and Criminality: Theoretical Perspectives: Early explanation of criminal behavior, Biological Theories, Psychological Theories, Sociological Theories (Social Disorganization theory, Strain theory, Social Control theory, Learning theory, Labeling Theory), Islamic perspective on deviance and crime'
            ]
          },
          {
            title: 'Section-II: Juvenile Justice and Criminal Justice System (25 Marks)',
            description: 'Study of juvenile delinquency and the criminal justice system.',
            topics: [
              'V. Juvenile Delinquency: Meaning, definitions (Behavioral Vs Legal), Juvenile delinquent Vs status offender, Official statistics of juvenile delinquency',
              'VI. Juvenile Justice System: Role of police, Juvenile court process (pretrial, trial and sentencing), Role of prosecutor, defense counsel, juvenile judge, juvenile probation officer, Juvenile correctional institutions; probation and non-punitive alternatives',
              'VII. The Criminal Justice System: Police and its role, Trial and Conviction of Offenders (Agencies: formal and informal, Criminal courts: procedures and problems, Role of prosecutors), Prisons, Probation and Parole',
              'VIII. Punitive and Reformative Treatment of Criminals: Corporal punishment, Imprisonment, Rehabilitation of criminals'
            ]
          },
          {
            title: 'Section-III: Criminal Investigation and International Policing (25 Marks)',
            description: 'Study of criminal investigation techniques and international policing organizations.',
            topics: [
              'IX. Criminal Investigation: Principles of criminal investigation, Manual of preliminary investigation, Intelligence operations, Data base investigation, Electronic investigation, Forensic Investigation',
              'X. Techniques of Investigations: Gathering information from persons, Interviewing and interrogation techniques, Criminal investigation analysis',
              'XI. Legal and Ethical Guidelines for Investigators: Stop and frisk operations, Arrest procedures, Search and seizure',
              'XII. International Policing and Criminal Justice Monitoring Organizations: UNAFEI, INTERPOL, EUROPOL, UNODC, UNICEF, IPA, etc.'
            ]
          },
          {
            title: 'Section-IV: Modern Concepts in Contemporary Criminology (25 Marks)',
            description: 'Study of modern criminological concepts and contemporary challenges.',
            topics: [
              'XIII. Modern Concepts in Contemporary Criminology: Terrorism, Radicalism and War on Terror, Media\'s representation of Crime and the Criminal Justice System',
              'Modern Law Enforcement and Crime Prevention: Intelligence-led Policing, Community Policing, Private Public Partnership',
              'Gender and Crime in Urban and Rural Pakistan, Crime and Urbanization, Organized Crime and White-Collar Crime',
              'Human Rights Abuses and Protection, especially of Children; Women and Minorities: The role of civil society and NGOs',
              'Money-laundering, Cyber Crime, Role of NAB, FIA, ANF'
            ]
          }
        ],
        recommendedBooks: [
          'New Perspectives in Criminology by Conklin, J.E',
          'Criminal Interrogation and Confessions by Fred, E.I., John, E.R., Joseph, P.B. and Brian, C.J.',
          'Theoretical Criminology by George B. Vold, Thomas J. Bernard, Jeffrey B. Snipes',
          'Modern Criminology: Crime, Criminal Behavior and its Control by Hagan, J.',
          'Juvenile Delinquency: An Integrated Approach by James, B.',
          'Security Studies: An Introduction by Paul, D.W.',
          'Crime, Justice and Society: An Introduction to Criminology by Ronald, J.B., Marvin, D.F. and Patricia, S.',
          'Juvenile Delinquency: Theory, Practice, and Law by Seigel, L.J.',
          'Crime Prevention: Theory and Practice by Stephen, S.'
        ],
        examPattern: 'Section-I: Introduction to Criminology (25 Marks) + Section-II: Juvenile Justice and Criminal Justice System (25 Marks) + Section-III: Criminal Investigation and International Policing (25 Marks) + Section-IV: Modern Concepts in Contemporary Criminology (25 Marks) = 100 Marks',
        preparationTips: [
          'Study the fundamental concepts of criminology and their application',
          'Understand the relationship between crime, criminality, and criminal behavior',
          'Learn about different types of criminals: occasional, habitual, professional, white-collar',
          'Master criminological theories: biological, psychological, and sociological perspectives',
          'Study Islamic perspective on deviance and crime',
          'Understand juvenile delinquency and the juvenile justice system',
          'Learn about the role of police in juvenile justice',
          'Study the criminal justice system and its components',
          'Understand punitive and reformative treatment approaches',
          'Master criminal investigation principles and techniques',
          'Learn about interviewing and interrogation techniques',
          'Study legal and ethical guidelines for investigators',
          'Understand international policing organizations and their roles',
          'Learn about modern law enforcement approaches: intelligence-led policing, community policing',
          'Study terrorism, radicalism, and the war on terror',
          'Understand the role of media in crime representation',
          'Learn about gender and crime in Pakistan',
          'Study organized crime and white-collar crime',
          'Understand human rights protection in criminal justice',
          'Learn about money-laundering and cyber crime',
          'Study the role of NAB, FIA, and ANF in Pakistan',
          'Focus on Pakistan-specific criminological issues',
          'Understand the role of civil society and NGOs in crime prevention',
          'Learn about crime prevention strategies and their effectiveness',
          'Study the relationship between urbanization and crime',
          'Understand the impact of technology on crime and law enforcement',
          'Read recommended books for comprehensive understanding',
          'Practice analyzing criminal cases and their criminological aspects',
          'Stay updated with current criminological research and trends',
          'Understand the interdisciplinary nature of criminology',
          'Study the relationship between criminology and criminal justice policy'
        ]
      },
      'economics': {
        subjectId: 'economics',
        subjectName: 'Economics',
        subjectType: 'optional',
        subjectGroup: 'group1',
        code: 'OG1-2',
        marks: 200,
        duration: '6 Hours (2 Papers)',
        sections: [
          {
            title: 'Paper-I: Economic Theory (100 Marks)',
            description: 'Study of fundamental economic theories and principles.',
            topics: [
              'I. Micro Economics: Consumer behaviour, Market demand and supply (elasticity), Static and comparative static analysis, Partial and general equilibrium, Theory of the firm, Producer\'s equilibrium, Pricing of factors of production',
              'II. Macro Economics: Basic economic concepts, National income accounting, Consumption function, Multiplier, Accelerator, Aggregate demand, Labour demand and supply, Unemployment, Determination of equilibrium income and output (with reference to different schools of thought), Inflation',
              'III. Money and Banking: Functions of money, Quantity theory of money (Fisher and Cambridge formulations), Systems of note issue, Credit creation, Functions of central banks, Instruments of credit control, Goals and intermediate targets of central bank policy, Reserves, Liquidity premium, Term structure of interest rates, Transmission mechanisms of monetary policy, Theory of liquidity preference, Time value of money (TVM), Capital structure, Capital restructuring, IS-LM analysis, Money demand and supply',
              'IV. Public Financing: Government expenditure, Sources of government revenue, Privatization, Taxes and non-taxes, Incidence of taxes, Public debt (objectives and repayment methods), Deficit financing, General equilibrium analysis, Welfare economics, Fiscal policy',
              'V. International Trade: Theories of comparative advantage and factor endowments, Trade and growth, Colonialism, imperialism and international trade, Trade restrictions, Economic integration, Trade policy, Balance of payments, Foreign exchange, International monetary system, Custom unions'
            ]
          },
          {
            title: 'Paper-II: Economics of Pakistan (100 Marks)',
            description: 'Study of Pakistan\'s economic development and contemporary issues.',
            topics: [
              'VI. Economic Development: Concepts of development, Human development, Historical growth processes, Theories of development, Structural issues, Income distribution and poverty, Sectoral issues (agricultural, industrial, trade, and finance), Environmental development',
              'I. Definition and Measurement of Development: Characteristics of underdevelopment, Rethinking development concepts (growth vs. redistributive justice), Absolute and relative poverty, Basic needs approach, Sustainable development, Environmental degradation',
              'II. Planning Experience of Pakistan: A critical evaluation of economic planning strategy, Governance, and institutions',
              'III. Agricultural Development in Pakistan: Changes in agricultural policies, Monetary and fiscal measures for agricultural development, Green Revolution strategy and its implications, Land reforms (1950-1980), Cooperative farming, Rural development',
              'IV. Industrial Development in Pakistan: Early industrialization strategy, Creation of financial and development institutions, Monetary and fiscal measures for industrial development, Changing role of the public sector, Evaluation of nationalization policy, Concentration of industrial income and wealth, Evaluation of import substitution and export-led growth strategies',
              'V. Role of Foreign Trade and Aid in Economic Development: Trends in Pakistan\'s balance of payments, Terms of trade, Changes in trade direction, Major exports and imports, Causes of trends, Role of migration and remittances, Costs and benefits of foreign aid, Role of foreign investment',
              'VI. Privatization, Denationalization, Deregulation: Conceptual and operational aspects, International comparisons, Pakistan\'s experience',
              'VII. Interest Free Banking in Pakistan',
              'VIII. Energy Policy of Pakistan',
              'IX. Social Sector Development in Pakistan',
              'X. Major Issues in Pakistan Economy: Energy crisis, Corruption, Bad governance, External debt accumulation and dependency, Unemployment, Income inequality, Inflation, Fiscal and trade deficits, Balance of payment issues, Shortage of irrigation water'
            ]
          }
        ],
        recommendedBooks: [
          'Economic Theory by Ferguson and Gould',
          'Development Economics by Meier and Baldwin',
          'Islamic Economics by M. Umer Chapra',
          'Public Finance by Musgrave and Musgrave',
          'International Economics by Kindleberger and Lindert',
          'Microeconomics by Pindyck and Rubinfeld',
          'Macroeconomics by Dornbusch and Fischer',
          'Population Problems by Thompson and Lewis',
          'History of International Trade by Condliffe',
          'Colonialism by Fieldhouse',
          'Economic Survey of Pakistan (Latest Edition)',
          'Pakistan Economic and Social Review',
          'Journal of Economic Development',
          'International Economic Review',
          'Economic Development and Cultural Change',
          'World Development',
          'Journal of Development Economics'
        ],
        examPattern: 'Paper-I: Economic Theory (100 Marks) + Paper-II: Economics of Pakistan (100 Marks) = 200 Marks',
        preparationTips: [
          'Study fundamental microeconomic concepts: consumer behavior, demand and supply, elasticity',
          'Master macroeconomic principles: national income, consumption function, multiplier, inflation',
          'Understand money and banking: quantity theory, credit creation, central bank functions',
          'Learn public finance: government expenditure, taxation, public debt, fiscal policy',
          'Study international trade: comparative advantage, trade restrictions, balance of payments',
          'Master economic development concepts and measurement approaches',
          'Understand Pakistan\'s planning experience and economic strategies',
          'Study agricultural development: Green Revolution, land reforms, rural development',
          'Learn industrial development: industrialization strategies, public sector role, import substitution',
          'Understand foreign trade and aid: balance of payments, remittances, foreign investment',
          'Study privatization and deregulation in Pakistan',
          'Learn about interest-free banking and Islamic economics',
          'Understand Pakistan\'s energy policy and challenges',
          'Study social sector development in Pakistan',
          'Focus on major economic issues: energy crisis, corruption, governance, debt',
          'Understand income inequality, unemployment, and poverty in Pakistan',
          'Study fiscal and trade deficits and balance of payment issues',
          'Learn about environmental degradation and sustainable development',
          'Master IS-LM analysis and monetary policy transmission',
          'Understand welfare economics and general equilibrium analysis',
          'Study the role of institutions in economic development',
          'Focus on Pakistan-specific economic challenges and solutions',
          'Read Economic Survey of Pakistan for current data and trends',
          'Practice solving economic problems and numerical questions',
          'Stay updated with current economic developments in Pakistan',
          'Understand the relationship between economic theory and policy',
          'Study comparative economic systems and international experiences',
          'Learn about economic modeling and forecasting techniques',
          'Understand the role of technology in economic development',
          'Study the impact of globalization on Pakistan\'s economy'
        ]
      },
      'english-literature': {
        subjectId: 'english-literature',
        subjectName: 'English Literature',
        subjectType: 'optional',
        subjectGroup: 'group5',
        code: 'OG5-4',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Essays (10 Marks)',
            description: 'Study of influential essays by prominent authors.',
            topics: [
              'Bertrand Russell: The Conquest of Happiness',
              'George Orwell: Politics and the English Language; The Prevention of Literature',
              'Ralph Waldo Emerson: The Transcendentalist; Self-Reliance'
            ]
          },
          {
            title: 'II. Short Stories (10 Marks)',
            description: 'Study of classic short stories by renowned authors.',
            topics: [
              'Somerset Maugham: The Lotus-Eater',
              'G.K. Chesterton: A Somewhat Improbable Story',
              'O\'Henry: The Gift of the Magi'
            ]
          },
          {
            title: 'III. Poetry (20 Marks)',
            description: 'Study of poetry from Romantic to Modern periods.',
            topics: [
              'William Wordsworth: Resolution and Independence; Lines Composed Few Miles Above, Tintern Abbey',
              'John Keats: Ode to a Nightingale; Ode to Autumn',
              'Lord Alfred Tennyson: Ulysses; The Lady of Shalott',
              'Yeats: A Dialogue of Self and Soul; The Second Coming',
              'Eliot: The Wasteland; Love Song of J. Alfred Prufrock',
              'Philip Larkin: Maturity; Continuing to Live; The Trees',
              'Wallace Stevens: A Postcard from the Volcano; Continual Conversation with a Silent Man; Dry Loaf OR Walt Whitman: As I Ponder\'d in Silence; Are You the New Person Drawn Toward Me?; This Moment Yearning and Thoughtful'
            ]
          },
          {
            title: 'IV. Drama (20 Marks)',
            description: 'Study of drama from Shakespeare to modern playwrights.',
            topics: [
              'Shakespeare: Hamlet; King Lear; Twelfth Night',
              'William Congreve: The Way of the World',
              'Shaw: Pygmalion; Heartbreak House',
              'Harold Pinter: The Caretaker',
              'Samuel Beckett: Waiting for Godot',
              'Eugene O\'Neill: Long Day\'s Journey into Night'
            ]
          },
          {
            title: 'V. Novels (20 Marks)',
            description: 'Study of classic novels from different periods.',
            topics: [
              'Thomas Hardy: Far from the Madding Crowd',
              'D.H. Lawrence: Sons and Lovers',
              'George Orwell: Nineteen Eighty-four',
              'James Joyce: A Portrait of the Artist as a Young Man',
              'Iris Murdoch: Under the Net',
              'Nathaniel Hawthorne: The Scarlet Letter OR William Faulkner: The Sound and the Fury'
            ]
          },
          {
            title: 'VI. Literary Theory & Criticism (20 Marks)',
            description: 'Study of modern literary theories and critical approaches.',
            topics: [
              'Structuralism',
              'Marxism',
              'Deconstructionism',
              'Psychoanalytic criticism',
              'Feminist criticism',
              'Postcolonial Criticism'
            ]
          }
        ],
        recommendedBooks: [
          'The basics Literary Theory. (Second edition). Routledge by Bertens, H. (2008)',
          'Literary Theory: An Introduction. (Anniversary Edition) by Eagleton, E. (2008)',
          'A New Handbook of Literary Terms by Mikics, W. (2007)',
          'A Companion to Twentieth Century Poetry by Roberts, N. (2003)',
          'A Reader\'s Guide to Contemporary Literary Theory. (Fifth edition) by Selden, R., Widdowson, P., & Brooker, P. (2005)',
          'Twentieth Century British Drama by Smart, J. (2001)',
          'Modern Critical Views & Interpretations, ed: 80\'s and 90\'s editions by Harold Bloom',
          'A Companion to 20th Century Drama Oxford: Blackwell by Krasner David. 2005'
        ],
        examPattern: 'Essays (10 Marks) + Short Stories (10 Marks) + Poetry (20 Marks) + Drama (20 Marks) + Novels (20 Marks) + Literary Theory & Criticism (20 Marks) = 100 Marks',
        preparationTips: [
          'Study the essays of Bertrand Russell, George Orwell, and Ralph Waldo Emerson thoroughly',
          'Understand the themes and style of each essayist',
          'Read and analyze the short stories by Maugham, Chesterton, and O\'Henry',
          'Master the poetry of Wordsworth, Keats, Tennyson, Yeats, and Eliot',
          'Understand the Romantic movement and its characteristics',
          'Study modern poetry and its experimental forms',
          'Read Shakespeare\'s plays: Hamlet, King Lear, and Twelfth Night',
          'Understand Elizabethan drama and Shakespeare\'s dramatic techniques',
          'Study modern drama: Shaw, Pinter, Beckett, and O\'Neill',
          'Understand the evolution of drama from classical to modern forms',
          'Read the novels thoroughly and understand their themes and characters',
          'Study the historical and social context of each novel',
          'Understand different narrative techniques and styles',
          'Master the major literary theories: Structuralism, Marxism, Deconstruction',
          'Study psychoanalytic criticism and its application to literature',
          'Understand feminist criticism and its perspectives',
          'Learn about postcolonial criticism and its relevance',
          'Practice close reading and textual analysis',
          'Develop critical thinking and analytical skills',
          'Understand the relationship between form and content in literature',
          'Study the historical development of English literature',
          'Learn about different literary movements and periods',
          'Understand the cultural and social context of literary works',
          'Practice writing critical essays and literary analysis',
          'Read recommended books for theoretical understanding',
          'Stay updated with contemporary literary criticism',
          'Understand the interdisciplinary nature of literary studies',
          'Study the relationship between literature and society',
          'Learn about different approaches to literary interpretation',
          'Understand the role of language and style in literature',
          'Study comparative literature and cross-cultural influences'
        ]
      },
      'european-history': {
        subjectId: 'european-history',
        subjectName: 'European History',
        subjectType: 'optional',
        subjectGroup: 'group4',
        code: 'OG4-2',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Part-I: French Revolution to World War I (50 Marks)',
            description: 'Study of European history from the French Revolution to the outbreak of World War I.',
            topics: [
              'I. The French Revolution and Napoleonic Era (1789-1815): Causes, consequences, Napoleon\'s rise and fall, creation of empire, and the Continental system',
              'II. The Concert of Europe (1815-1830): Congress of Vienna, Metternich\'s Era, the Concert of Europe and Congress System, and Balance of Power',
              'III. Forces of Continuity and Change in Europe (1815-1848): Nationalism, Liberalism, Romanticism, Socialism, Industrial Revolution, Colonialism, and their consequences',
              'IV. The Eastern Question (1804-1856): Its nature, the Crimean War, Russo Turkish War 1877, and consequences',
              'V. Unification of Italy: Effects of the 1848 revolution, obstacles to unification, Cavour\'s role, and the process of Italian unification (1859-1871)',
              'VI. Unification of Germany: Rise of Bismarck, diplomatic events, the Austro-Prussian War (1866), the Franco-Prussian War (1870-1871), and the triumph of Bismarck and process of unification',
              'VII. The Origins of First World War (1890-1914): Formation of Alliances and Counter Alliances, The Balkans War (1912-1913), and the outbreak of World War I'
            ]
          },
          {
            title: 'Part-II: World War I to Contemporary Europe (50 Marks)',
            description: 'Study of European history from World War I to contemporary developments.',
            topics: [
              'VIII. The First World War and its aftermath: The War (1914-1918) and peace treaties, and The League of Nations',
              'IX. Dictatorships in Europe: Fascism in Italy under Mussolini, Hitler, Nazism and Germany, Russia, Marxism Revolution and its working under Stalin, Great Depression and its effects on Europe, Appeasement, The Arm race, The Sudetenland Crisis (1938), and The distraction of Czechoslovakia (1939)',
              'X. The Second World War and its Effects on Europe: Main Events of the War and Impact of war',
              'XI. Post-War Europe: Post-war settlements, The United Nations, Economic Recovery of Europe (Marshal Plan), German Question, NATO, and Decolonization',
              'XII. Cold War Europe (1955-1991): Effects of cold war, Warsaw Pact (1955), The European Economic Community (EEC), Nuclear Non-Proliferation Agreement, Charles DeGaulle and France, and Spread of communist regimes in Europe',
              'XIII. Europe (1991-2012): The Gorbachev and Disintegration of USSR, The reunification of Germany, The Balkan crisis of 1990s, The European Union, Role of Europe in War against terrorism, and Global Economic Crisis and Europe'
            ]
          }
        ],
        recommendedBooks: [
          'Europe Since Napoleon by David Thomson',
          'A History of Modern Europe by John Merriman',
          'The Age of Revolution by Eric Hobsbawm',
          'The Age of Capital by Eric Hobsbawm',
          'The Age of Empire by Eric Hobsbawm',
          'The Age of Extremes by Eric Hobsbawm',
          'The Origins of the First World War by James Joll',
          'The Origins of the Second World War by A.J.P. Taylor',
          'The Cold War by John Lewis Gaddis',
          'Postwar: A History of Europe Since 1945 by Tony Judt',
          'The Fall of the Berlin Wall by William F. Buckley Jr.',
          'The European Union: A Very Short Introduction by John Pinder',
          'The Balkans: A Short History by Mark Mazower',
          'The Soviet Union: A Very Short Introduction by Stephen Lovell'
        ],
        examPattern: 'Part-I: French Revolution to World War I (50 Marks) + Part-II: World War I to Contemporary Europe (50 Marks) = 100 Marks',
        preparationTips: [
          'Study the causes and consequences of the French Revolution',
          'Understand Napoleon\'s rise, empire, and fall',
          'Learn about the Congress of Vienna and the Concert of Europe',
          'Master the forces of change: nationalism, liberalism, socialism',
          'Understand the Industrial Revolution and its impact on Europe',
          'Study the Eastern Question and the Crimean War',
          'Learn about the unification of Italy and the role of Cavour',
          'Master Bismarck\'s role in German unification',
          'Understand the alliance system and origins of World War I',
          'Study the course and consequences of World War I',
          'Learn about the rise of dictatorships: Fascism, Nazism, Stalinism',
          'Understand the Great Depression and its effects',
          'Study the policy of appeasement and road to World War II',
          'Master the main events and impact of World War II',
          'Understand post-war settlements and the United Nations',
          'Learn about the Marshall Plan and European recovery',
          'Study the origins and development of the Cold War',
          'Understand the formation of NATO and Warsaw Pact',
          'Learn about European integration and the EEC',
          'Study the fall of communism and disintegration of USSR',
          'Understand German reunification and its significance',
          'Learn about the Balkan crisis of the 1990s',
          'Study the development of the European Union',
          'Understand Europe\'s role in contemporary global issues',
          'Focus on key historical figures: Napoleon, Bismarck, Hitler, Stalin, DeGaulle, Gorbachev',
          'Understand the relationship between political, economic, and social developments',
          'Study the impact of wars on European society and politics',
          'Learn about the role of ideology in European history',
          'Understand the process of European integration and its challenges',
          'Read recommended books for comprehensive understanding',
          'Practice analyzing historical events and their long-term consequences',
          'Stay updated with current European developments',
          'Understand the relationship between European history and global events'
        ]
      },
      'gender-studies': {
        subjectId: 'gender-studies',
        subjectName: 'Gender Studies',
        subjectType: 'optional',
        subjectGroup: 'group5',
        code: 'OG5-5',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Introduction to Gender Studies',
            description: 'Foundation concepts and theoretical framework of Gender Studies.',
            topics: [
              'Definition of Gender Studies',
              'Difference between Gender and Women Studies',
              'Multi-disciplinary nature of Gender Studies',
              'Autonomy vs. Integration debate',
              'Status of Gender Studies in Pakistan'
            ]
          },
          {
            title: 'II. Social Construction of Gender',
            description: 'Understanding how gender is socially constructed and its implications.',
            topics: [
              'Historicizing constructionism',
              'Problematizing "Sex" (Queer Theory)',
              'Whether "Sex" is socially determined',
              'Masculinities and femininity',
              'Nature versus culture debate in gender development'
            ]
          },
          {
            title: 'III. Feminist Theories and Practice',
            description: 'Various feminist theoretical approaches and their practical applications.',
            topics: [
              'Liberal Feminism',
              'Radical Feminism',
              'Marxist/Socialist Feminism',
              'Psychoanalytical Feminism',
              'Men\'s Feminism',
              'Postmodern Feminism'
            ]
          },
          {
            title: 'IV. Feminist Movements',
            description: 'Historical development of feminist movements globally and in Pakistan.',
            topics: [
              'Feminist movements in the West: First, Second, and Third Wave',
              'United Nation Conferences on Women',
              'Feminist movements in Pakistan'
            ]
          },
          {
            title: 'V. Gender and Development',
            description: 'Gender analysis of development theories and approaches.',
            topics: [
              'Colonial and capitalistic perspectives',
              'Gender analysis of development theories: Modernization, World System, Dependency, Structural Functionalism',
              'Gender approaches: WID, WAD, GAD',
              'Gender critique of Structural Adjustment Policies (SAPs)',
              'Globalization and gender'
            ]
          },
          {
            title: 'VI. Status of Women in Pakistan',
            description: 'Comprehensive analysis of women\'s status in various sectors in Pakistan.',
            topics: [
              'Women\'s health in Pakistan',
              'Women\'s education in Pakistan',
              'Women\'s employment in Pakistan',
              'Women\'s law in Pakistan'
            ]
          },
          {
            title: 'VII. Gender and Governance',
            description: 'Gender dimensions in governance and political participation.',
            topics: [
              'Definition of governance',
              'Suffragist Movement',
              'Gender issues for women as voters, candidates, and representatives',
              'Impact of political quota in Pakistan'
            ]
          },
          {
            title: 'VIII. Gender Based Violence',
            description: 'Understanding and addressing gender-based violence.',
            topics: [
              'Defining gender-based violence',
              'Theories of violence against women',
              'Structural and direct forms of violence',
              'Strategies to eliminate violence against women'
            ]
          },
          {
            title: 'IX. Case Studies',
            description: 'Analysis of prominent case studies in gender studies.',
            topics: [
              'Mukhtaran Mai case study',
              'Malala Yousafzai case study',
              'Sharmeen Obaid-Chinoy case study'
            ]
          }
        ],
        recommendedBooks: [
          'Theories of Women Studies by Gloria Bowles and Renate D. Klein',
          'Introduction: Theories of Women Studies and the Autonomy/Integration Debate by Gloria Bowles and Renate D. Klein',
          'The State of the Discipline of Women Studies in Pakistan by Rubina Saigol',
          'Women\'s Law in Legal Education and Practice in Pakistan by Farzana Bari',
          'Locating the self: Perspectives on Women and Multiple Identities by F. Shaheed, R. Mehdi, N.S. Khan',
          'The Social Construction of Gender by Judith Lorber',
          'Queer Theory by Harriet Bradley',
          'Gender, USA by Khawar Mumtaz and Farida Shaheed',
          'Women of Pakistan: Two Steps Forward, One Step Back by Khawar Mumtaz and Farida Shaheed',
          'Feminism and its Relevance in South Asia by Nighat Saeed',
          'Feminist Thoughts by Kamla Bahsin',
          'Reversed Realities by Rosemarie Tong',
          'Gender Planning and Development by Naila Kabeer',
          'Electoral Politics: Making Quotas Work For Women by Caroline Moser',
          'The Gender face of Asian Politics by Homa Hoodfar',
          'Performance Assessment of Women Parliamentarians in Pakistan by Mona Tajali',
          'Base line Report: Women\'s Participation in Political and Public Life by Aazar Ayaz',
          'Freedom from Violence by Andrea Fleschenberg',
          'Human Rights Commission of Pakistan Report by Farzana Bari, Shahla Zia, Margarte Schuler'
        ],
        examPattern: '9 comprehensive sections covering Introduction to Gender Studies, Social Construction, Feminist Theories, Movements, Development, Status in Pakistan, Governance, Violence, and Case Studies = 100 Marks',
        preparationTips: [
          'Understand the fundamental difference between Gender Studies and Women Studies',
          'Master the concept of social construction of gender',
          'Study the various feminist theories: Liberal, Radical, Marxist, Psychoanalytical, Men\'s, and Postmodern',
          'Learn about the historical development of feminist movements',
          'Understand the three waves of feminism and their characteristics',
          'Study the role of United Nations in women\'s rights',
          'Analyze feminist movements specific to Pakistan',
          'Master gender analysis of development theories',
          'Understand the differences between WID, WAD, and GAD approaches',
          'Study the impact of globalization on gender relations',
          'Analyze the status of women in Pakistan across different sectors',
          'Understand gender dimensions in governance and politics',
          'Study the Suffragist Movement and its significance',
          'Analyze the impact of political quotas for women in Pakistan',
          'Master theories of gender-based violence',
          'Understand structural and direct forms of violence',
          'Study strategies for eliminating violence against women',
          'Analyze the case studies of Mukhtaran Mai, Malala Yousafzai, and Sharmeen Obaid-Chinoy',
          'Understand the intersectionality of gender with other social categories',
          'Study the relationship between gender and development',
          'Learn about gender planning and development approaches',
          'Understand the role of gender in political participation',
          'Study the impact of structural adjustment policies on women',
          'Analyze the role of women in governance and decision-making',
          'Understand the challenges faced by women in various sectors',
          'Study the legal framework for women\'s rights in Pakistan',
          'Learn about gender-sensitive policy making',
          'Understand the role of civil society in gender advocacy',
          'Study international conventions on women\'s rights',
          'Analyze the relationship between gender and economic development',
          'Understand the role of education in gender equality',
          'Study the impact of cultural factors on gender relations',
          'Learn about gender mainstreaming in development projects',
          'Understand the role of media in gender representation',
          'Study the relationship between gender and health',
          'Analyze gender dimensions in conflict and peace-building',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current gender issues and developments',
          'Practice analyzing gender issues from multiple perspectives'
        ]
      },
      'geography': {
        subjectId: 'geography',
        subjectName: 'Geography',
        subjectType: 'optional',
        subjectGroup: 'group7',
        code: 'OG7-3',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Part-I: Physical Geography (50 Marks)',
            description: 'Study of physical processes and landforms of the Earth.',
            topics: [
              'I. Factors controlling landform development: Endogenic and exogenic forces, earth\'s crust evolution, physical conditions of the earth\'s interior, geosynclines, continental drift, isostasy, sea-floor spreading, plate tectonics, mountain building, volcanicity, earthquakes, concepts of geomorphic cycles, and landforms associated with fluvial, arid, glacial, coastal, Karst cycle, and groundwater',
              'II. Elements and Factors of climate: Structure and composition of atmosphere, insolation, temperature, pressure belts, heat budget, atmospheric circulation (planetary, monsoon, local winds), air masses and fronts, hydrological cycle, types of condensation and precipitation, and factors of global precipitation distribution',
              'III. Origin of oceans and seas: Characteristic features of ocean basins, temperature, salinity distribution (cause and effects), ocean floor deposits (characteristics and classification), ocean circulation, waves, currents, and tides (nature, causes, and effects)',
              'IV. Factors of climate and Environmental change: Transformation of nature by man, environmental degradation and conservation, nature and types of pollution, problems caused by pollution, Global Warming, Global Environment Patterns, and Environmental Hazards and Risk Management'
            ]
          },
          {
            title: 'Part-II: Human Geography (50 Marks)',
            description: 'Study of human activities and their spatial patterns.',
            topics: [
              'V. Origin and Diffusion of Culture: Geographic patterns of culture, classification and world distribution of languages (including Indo-European), origins and diffusion of religions, global distribution, regional conflicts, ethnicities and nationalities, ethnic conflicts, ethnic diversity, factors of ethnic cleansing, development indicators (economic, social, health), development through trade, and impacts of development indicators',
              'VI. Factors effecting Agriculture: Subsistence agriculture and population growth, commercial agriculture and market forces, sustainable agriculture, types and distribution of agriculture, factors of industrial locations, the Industrial Revolution, industrial theories, distribution of industries and industrial estates, renewable resources, recycling resources, and sustainable resources',
              'VII. Factors of Population Growth: Components of change, population structure, the demographic transition, world distribution of population, over and under population threats and consequences, models of internal structure of cities, world urban patterns, settlement theories, and patterns and problems within urban areas',
              'VIII. Politics, Geography and Political Geography: The state as a politico-territorial phenomenon, state, nation and the nation-state, world politics and international relations, geopolitics of uneven development and globalization of capital, geography of tourism and recreation (demand, supply, socio-economic and physical-environmental impacts), global patterns in health and diseases, models in medical geography, and recent issues and developments'
            ]
          }
        ],
        recommendedBooks: [
          'Discovering Physical Geography by Alan F. Arbogast (2011)',
          'Introducing Physical Geography by Alan Strahler (2011)',
          'Atmosphere, Weather and Climate by Barry. R. (1998)',
          'Text Book of Population Geography by Dr. Martin Ardagh (2013)',
          'Economic Geography by Philip Emeral (2013)',
          'Human Geography by Blij, H. J. (2000)',
          'Political Geography: The Spatiality of Politics by Dikshit, R. D. (2001)',
          'The Geography of Tourism and Recreation by Hall, C. M: & Page. S. J. (1999)',
          'Urban Geography by Kaplan, Wheeler (2009)',
          'Physical Geography: A Landscape Appreciation by McKnight, T. L. & Hess, D. (2008)',
          'The Dictionary of Human Geography by Johnston, R. J. (2000)',
          'Geography: Realms, Regions and Concepts by de Blij, H. J. & Muller, P. O. (2010)',
          'Environmental Geography: Science, Land Use, and Earth Systems by Marsh, W. M. & Grossa, J. M. (2005)',
          'Cultural Geography: A Critical Introduction by Mitchell, D. (2000)',
          'Economic Geography: A Contemporary Introduction by Coe, N. M., Kelly, P. F. & Yeung, H. W. (2007)',
          'Population Geography: Problems, Concepts and Prospects by Clarke, J. I. (1972)',
          'Medical Geography by Meade, M. S. & Earickson, R. J. (2000)',
          'The Geography of Transport Systems by Rodrigue, J. P., Comtois, C. & Slack, B. (2009)',
          'Agricultural Geography by Grigg, D. (1995)',
          'Industrial Location and Regional Development by Chapman, K. & Walker, D. F. (1991)',
          'Urban Geography: An Introductory Analysis by Carter, H. (1995)',
          'Rural Geography: Processes, Responses and Experiences in Rural Restructuring by Woods, M. (2005)',
          'Political Geography: World-Economy, Nation-State and Locality by Taylor, P. J. & Flint, C. (2000)',
          'Social Geography: An Introduction to Contemporary Issues by Jackson, P. & Smith, S. J. (1984)',
          'Historical Geography: Through the Gates of Space and Time by Baker, A. R. H. (2003)',
          'Geographic Information Systems and Science by Longley, P. A., Goodchild, M. F., Maguire, D. J. & Rhind, D. W. (2005)',
          'Remote Sensing and Image Interpretation by Lillesand, T. M., Kiefer, R. W. & Chipman, J. W. (2008)',
          'Cartography: Thematic Map Design by Dent, B. D., Torguson, J. S. & Hodler, T. W. (2009)',
          'Quantitative Methods in Geography by Ebdon, D. (1985)',
          'Qualitative Research Methods in Human Geography by Hay, I. (2005)',
          'Geography and Geographers: Anglo-American Human Geography since 1945 by Johnston, R. J. & Sidaway, J. D. (2004)',
          'The Power of Place: Bringing Together Geographical and Sociological Imaginations by Agnew, J. A. & Duncan, J. S. (1989)',
          'Space and Place: The Perspective of Experience by Tuan, Y. F. (1977)',
          'The Production of Space by Lefebvre, H. (1991)',
          'Postmodern Geographies: The Reassertion of Space in Critical Social Theory by Soja, E. W. (1989)',
          'Thirdspace: Journeys to Los Angeles and Other Real-and-Imagined Places by Soja, E. W. (1996)',
          'The Condition of Postmodernity: An Enquiry into the Origins of Cultural Change by Harvey, D. (1989)',
          'Justice, Nature and the Geography of Difference by Harvey, D. (1996)',
          'Spaces of Hope by Harvey, D. (2000)'
        ],
        examPattern: 'Part-I: Physical Geography (50 Marks) + Part-II: Human Geography (50 Marks) = 100 Marks',
        preparationTips: [
          'Master the fundamental concepts of physical geography',
          'Understand endogenic and exogenic forces in landform development',
          'Study plate tectonics and continental drift theory',
          'Learn about geomorphic cycles and landform processes',
          'Master atmospheric circulation and climate systems',
          'Understand the hydrological cycle and precipitation patterns',
          'Study oceanography: currents, waves, tides, and ocean floor',
          'Learn about environmental change and global warming',
          'Master cultural geography and diffusion processes',
          'Understand language and religion distribution patterns',
          'Study ethnic conflicts and development indicators',
          'Learn about agricultural systems and sustainability',
          'Master industrial location theories and factors',
          'Understand population geography and demographic transition',
          'Study urbanization patterns and settlement theories',
          'Learn about political geography and nation-states',
          'Master tourism geography and its impacts',
          'Understand medical geography and health patterns',
          'Study the relationship between physical and human geography',
          'Learn about environmental degradation and conservation',
          'Master geographic information systems (GIS)',
          'Understand remote sensing and cartography',
          'Study quantitative and qualitative research methods',
          'Learn about contemporary geographic theories',
          'Master the spatial analysis approach',
          'Understand the role of geography in policy making',
          'Study global patterns and regional variations',
          'Learn about sustainable development and resources',
          'Master the interdisciplinary nature of geography',
          'Understand the impact of globalization on geography',
          'Study case studies from different regions',
          'Learn about geographic perspectives on current issues',
          'Practice map reading and interpretation',
          'Understand the relationship between space and society',
          'Study the evolution of geographic thought',
          'Learn about applied geography and problem-solving',
          'Master the integration of physical and human processes',
          'Understand the role of technology in modern geography',
          'Study the future challenges in geography',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current geographic research and developments',
          'Practice analyzing spatial patterns and relationships'
        ]
      },
      'geology': {
        subjectId: 'geology',
        subjectName: 'Geology',
        subjectType: 'optional',
        subjectGroup: 'group2',
        code: 'OG2-4',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Part-I: Physical Geology and Earth Sciences (50 Marks)',
            description: 'Foundation concepts of geology and earth sciences.',
            topics: [
              'I. Introduction to Physical Geology: Scope and importance of geology, relation to other sciences, Earth\'s origin, age, composition, internal structure, introduction to rocks and minerals, weathering and erosion, isostasy, geological time scale',
              'II. Stratigraphy and Paleontology: Principles of stratigraphy, laws of superposition, faunal succession, geological time scale divisions, classification of stratigraphic units (lithostratigraphic, biostratigraphic, chronostratigraphic), fossils and their significance, modes of fossilization, morphology, classification of major invertebrate phyla, microfossils, paleobotany, major vertebrates, micropaleontology',
              'III. Mineralogy: Classification of minerals, study of internal structure, polymorphism, isomorphism, paragenesis, physical and optical properties of common silicate and non-silicate mineral groups, introduction to crystallography, elements of symmetry, normal classes of crystallographic systems',
              'IV. Structural Geology and Tectonics: Stress-strain concepts, factors controlling mechanical behavior of materials, folds, faults, joints, foliation terminology, classification, relationship with bedding, lineation, unconformity, plate tectonics theory, geological evidence for continental drift, sea-floor spreading, oceanic ridges, continental rifts, intra-oceanic islands, hot spots, mantle plumes, Wilson Cycle, tectonic framework of Pakistan',
              'V. Petrology and Petrography: Introduction, classification, description of sedimentary rocks, origin, transportation, deposition, texture, sedimentary structures, classification, morphology, significance, composition, origin, differentiation, evolution of magma, classification of igneous rocks, modes of occurrence, types of extrusive rocks, texture/structure of igneous rocks, introduction to metamorphism, types, grades, zones, facies of metamorphism, metamorphic diffusion and differentiation, metamorphism in relation to Plate Tectonics, differentiation between metamorphism and metasomatism, introduction to polarizing microscopes, optical properties of opaque and non-opaque minerals in plane polarized light and under crossed nicol (including metallic under reflected light), description of optical properties of common rock-forming minerals'
            ]
          },
          {
            title: 'Part-II: Applied Geology and Resources (50 Marks)',
            description: 'Applied aspects of geology and natural resources.',
            topics: [
              'I. Introduction to Geophysics: Definition of geophysics, relation to other sciences, brief description of various branches (seismology, geomagnetism, geoelectricity, tectonophysics, gravimetry, geo-thermy, geodesy), various geophysical techniques for exploration of mineral deposits, oil and gas, subsurface water, engineering works',
              'II. Sequence Stratigraphy: History, concept, significance of sequence stratigraphy, data sources (seismic reflections, outcrops, well logs, core, seismic facies), sea level changes (causes, effects, accommodation, eustatic, relative sea curve), hierarchy of sequence stratigraphic elements, types of sequences and systems tracts',
              'III. Petroleum Geology: Nature and classification of petroleum hydrocarbons, origin, migration, accumulation, source sediments, reservoir rocks, trapping mechanisms for oil and gas, prospecting and exploration of oil and gas, reservoir characteristics, drive mechanism, energy and pressure maintenance, secondary and enhanced recovery, introduction to Sedimentary Basins of Pakistan',
              'IV. Engineering and Environmental Geology: Rock and soil mechanics and application in civil engineering, rock mass characteristics, geotechnical studies of rocks and soils, geological factors affecting rock strength, geological factors related to construction of building foundations, roads, highways, tunnels, dams, bridges, application of geophysical methods for site investigation, construction materials, mass movement (causes and prevention), environmental geology, management of natural resources, global climatic changes, environmental controls for erosion, desertification, coastal degradation, geological hazards (floods, landslides, earthquakes, tsunamis, volcanoes, glaciers, shoreline processes), remedial measures, clean sources of energy, industrial pollution, solid and liquid waste disposal, introduction to environmental impact assessment and initial environmental examination',
              'V. Mineral and Energy Resources: Introduction to geological exploration/prospecting, brief description of various resources (hydrocarbons, coal, gemstones, copper, lead, zinc, iron, gold, chromite, manganese, salt, gypsum, bauxite, sulphur, barite, fluorite, clays, phosphorite, building and dimension stones, industrial rocks and minerals, radioactive minerals and rocks), special reference to economic mineral deposits in Pakistan, origin, occurrence, depositional environments of coal, coal constitution and kinds, coal rank, grade, calorific value, coal deposits of Pakistan (with reference to Thar Coal), geothermal energy resources of Pakistan',
              'VI. Economic and Applied Geology: Metallic and non-metallic mineral resources of Pakistan and mineral-based industries, overview of Recodec Copper, radioactive minerals and occurrences in Pakistan, gemstones of Pakistan, geology of reservoirs, dams, highways, tunnels, major natural hazards and impacts on environment, special reference to Pakistan'
            ]
          }
        ],
        recommendedBooks: [
          'Physical Geology by Charles Plummer, David McGeary, Diane Carlson',
          'Principles of Paleontology by Raup, D.M. & Stanley, S.M.',
          'Igneous and Metamorphic Petrology by Best, M.G.',
          'Plate Tectonics – Geodynamics by Moores, E.M. & Twiss, R.J.',
          'Geology of Pakistan by Bender, F.K. & Raza, H.A.',
          'Engineering Geology: Principles and Practice by David George Price, Michael de Freitas',
          'Environmental Geology by Montgomery, C.W.',
          'Energy Resources by Brown and Skipsey',
          'Pakistan Energy Yearbook 2012 by Ministry of Petroleum and Natural Resources, Hydrocarbon Development Institute of Pakistan, Islamabad',
          'Introduction to Mineralogy by William D. Nesse',
          'Structural Geology by Haakon Fossen',
          'Sedimentary Petrology by Maurice E. Tucker',
          'Principles of Sedimentology and Stratigraphy by Sam Boggs Jr.',
          'Invertebrate Paleontology and Evolution by E.N.K. Clarkson',
          'Vertebrate Paleontology by Michael J. Benton',
          'Crystallography and Crystal Chemistry by F. Donald Bloss',
          'Optical Mineralogy by William D. Nesse',
          'Geophysical Exploration by Milton B. Dobrin',
          'Applied Geophysics by W.M. Telford, L.P. Geldart, R.E. Sheriff',
          'Seismic Data Analysis by Öz Yilmaz',
          'Sequence Stratigraphy by Emery, D. & Myers, K.J.',
          'Petroleum Geology by F.K. North',
          'Elements of Petroleum Geology by Richard C. Selley',
          'Petroleum Formation and Occurrence by B.P. Tissot & D.H. Welte',
          'Fundamentals of Petroleum Geology by John Gluyas & Richard Swarbrick',
          'Engineering Geology by F.G. Bell',
          'Rock Mechanics and Engineering by Charles Jaeger',
          'Soil Mechanics and Foundations by B.M. Das',
          'Environmental Geology by Carla W. Montgomery',
          'Natural Hazards by Edward A. Keller',
          'Mineral Resources Economics and the Environment by Stephen E. Kesler',
          'Economic Geology by Walter L. Pohl',
          'Mineral Deposits of Pakistan by S.M. Ibrahim Shah',
          'Coal Geology by Larry Thomas',
          'Geothermal Energy by Mary H. Dickson & Mario Fanelli',
          'Nuclear Energy by David Bodansky',
          'Gemstones of the World by Walter Schumann',
          'Industrial Minerals and Rocks by Jessica Elzea Kogel',
          'Building Stones by J. Ashurst & F.G. Dimes',
          'Dimension Stone by M. Primavori',
          'Radioactive Minerals by Peter C. Burns',
          'Uranium Geology by Franz J. Dahlkamp',
          'Rare Earth Elements by Ismar Borges de Lima & Walter Leal Filho',
          'Geological Hazards in Pakistan by M. Asif Khan',
          'Earthquake Engineering by Anil K. Chopra',
          'Landslide Hazards by David Cruden & David Varnes',
          'Volcanic Hazards by John P. Lockwood & Richard W. Hazlett',
          'Coastal Geology by Miles O. Hayes & Jacqueline Michel',
          'Environmental Impact Assessment by John Glasson, Riki Therivel & Andrew Chadwick',
          'Geological Field Techniques by Angela L. Coe',
          'Geological Maps by Alex Maltman',
          'Geological Field Mapping by John W. Barnes',
          'Geological Methods in Mineral Exploration and Mining by Roger Marjoribanks'
        ],
        examPattern: 'Part-I: Physical Geology and Earth Sciences (50 Marks) + Part-II: Applied Geology and Resources (50 Marks) = 100 Marks',
        preparationTips: [
          'Master the fundamental concepts of physical geology',
          'Understand Earth\'s structure and composition',
          'Study the geological time scale and stratigraphy',
          'Learn about fossils and paleontology',
          'Master mineral classification and crystallography',
          'Understand optical properties of minerals',
          'Study structural geology and tectonic processes',
          'Learn about plate tectonics and continental drift',
          'Master the three rock types: igneous, sedimentary, metamorphic',
          'Understand petrology and petrography',
          'Learn about polarizing microscopes and optical mineralogy',
          'Study geophysical exploration methods',
          'Master sequence stratigraphy concepts',
          'Understand petroleum geology and hydrocarbon systems',
          'Learn about reservoir characteristics and trapping mechanisms',
          'Study engineering geology applications',
          'Master rock and soil mechanics',
          'Understand environmental geology and hazards',
          'Learn about geological factors in construction',
          'Study mineral and energy resources',
          'Master coal geology and Pakistan\'s coal deposits',
          'Understand geothermal and nuclear energy',
          'Learn about economic geology and mineral deposits',
          'Study Pakistan\'s mineral resources',
          'Master geological mapping and field techniques',
          'Understand geological hazards and risk assessment',
          'Learn about environmental impact assessment',
          'Study the relationship between geology and society',
          'Master the interdisciplinary nature of geology',
          'Understand the role of geology in resource management',
          'Learn about sustainable development and geology',
          'Study case studies from Pakistan and globally',
          'Practice geological field work and mapping',
          'Understand the role of technology in modern geology',
          'Learn about geological research methods',
          'Master the integration of theory and practice',
          'Understand the future challenges in geology',
          'Study the relationship between geology and climate change',
          'Learn about geological conservation and heritage',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current geological research',
          'Practice analyzing geological data and maps',
          'Understand the role of geology in policy making',
          'Study the economic importance of geological resources',
          'Learn about geological education and outreach',
          'Master the communication of geological concepts',
          'Understand the ethical aspects of geological practice'
        ]
      },
      'international-law': {
        subjectId: 'international-law',
        subjectName: 'International Law',
        subjectType: 'optional',
        subjectGroup: 'group6',
        code: 'OG6-3',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Nature, Origin and Basis of International Law',
            description: 'Foundation concepts and theoretical framework of international law.',
            topics: [
              'The Emergence of International Law',
              'Early European Authors',
              'The Nation-State System',
              'Enforcement, Effectiveness, Weakness',
              'Juridical Basis',
              'Future of International Law',
              'Material Sources'
            ]
          },
          {
            title: 'II. Relation between International Law and State Law',
            description: 'Understanding the relationship between international and domestic legal systems.',
            topics: [
              'Article 38 of the Statute of International Court of Justice',
              'Primary Sources',
              'Subsidiary Sources',
              'International Soft Law'
            ]
          },
          {
            title: 'III. State in General and Recognition',
            description: 'Statehood, personality, and recognition in international law.',
            topics: [
              'Personality and Statehood',
              'Subjects of International Law',
              'Recognition of State and Government in International Law',
              'Recognition of State and Government in National Law'
            ]
          },
          {
            title: 'IV. The Law and Practice as to Treaties',
            description: 'International treaty law and practice.',
            topics: [
              'The Vienna Convention on the Law of Treaties'
            ]
          },
          {
            title: 'V. The Settlement of International Disputes',
            description: 'Methods and mechanisms for resolving international disputes.',
            topics: [
              'Negotiation',
              'Mediation and Good Offices',
              'Inquiry',
              'Settlement by the United Nations',
              'Conciliation',
              'Arbitration',
              'The International Court of Justice'
            ]
          },
          {
            title: 'VI. International Humanitarian Law',
            description: 'Laws governing armed conflicts and protection of individuals.',
            topics: [
              'International and Non-International Armed Conflicts',
              '\'Combatant\' and \'Protected Persons\'',
              'Protection of Wounded, Sick and Ship-Wrecked Persons',
              'POWs, Civilians',
              'Limitations on the Conduct of War',
              'Limits on the Choice of Methods and Means of Warfare'
            ]
          },
          {
            title: 'VII. The Use of Force',
            description: 'Legal framework governing the use of force in international relations.',
            topics: [
              'The Law before the UN Charter',
              'The Law after the Charter',
              'The Collective Use of Force',
              'The Right of Self-Defence'
            ]
          },
          {
            title: 'VIII. International Institutions',
            description: 'Role and functioning of international organizations.',
            topics: [
              'United Nations and its organs',
              'Specialized agencies',
              'Regional organizations',
              'International financial institutions'
            ]
          },
          {
            title: 'IX. State Territorial Sovereignty',
            description: 'Territorial rights and sovereignty of states.',
            topics: [
              'Territorial acquisition',
              'Boundaries and frontiers',
              'Territorial waters',
              'Airspace and outer space'
            ]
          },
          {
            title: 'X. State Responsibility',
            description: 'International responsibility of states for wrongful acts.',
            topics: [
              'Elements of state responsibility',
              'Attribution of conduct',
              'Circumstances precluding wrongfulness',
              'Consequences of internationally wrongful acts'
            ]
          },
          {
            title: 'XI. State Jurisdiction',
            description: 'Jurisdictional powers and limitations of states.',
            topics: [
              'Territorial jurisdiction',
              'Personal jurisdiction',
              'Extraterritorial jurisdiction',
              'Immunities from jurisdiction'
            ]
          },
          {
            title: 'XII. Succession to Rights and Obligations',
            description: 'Legal consequences of state succession.',
            topics: [
              'State succession to treaties',
              'Succession to state property',
              'Succession to state debts',
              'Succession to state archives'
            ]
          },
          {
            title: 'XIII. The State and the Individual',
            description: 'Relationship between states and individuals under international law.',
            topics: [
              'Nationality and statelessness',
              'Human rights and fundamental freedoms',
              'Refugee law',
              'Extradition and asylum'
            ]
          },
          {
            title: 'XIV. The State and the Economic Interest',
            description: 'Economic aspects of international law.',
            topics: [
              'International economic law',
              'Investment protection',
              'Trade law',
              'Development law'
            ]
          },
          {
            title: 'XV. Diplomatic Envoys, Counsels and other Representatives',
            description: 'Diplomatic and consular law.',
            topics: [
              'Diplomatic privileges and immunities',
              'Consular functions and immunities',
              'Diplomatic missions',
              'Consular relations'
            ]
          },
          {
            title: 'XVI. War, Armed Conflicts and other Hostilities',
            description: 'Legal framework governing armed conflicts.',
            topics: [
              'Definition of war and armed conflict',
              'Laws of war',
              'War crimes',
              'Peace treaties'
            ]
          },
          {
            title: 'XVII. Neutrality',
            description: 'Legal status and rights of neutral states.',
            topics: [
              'Neutrality in war',
              'Rights and duties of neutral states',
              'Neutrality and international organizations',
              'Permanent neutrality'
            ]
          }
        ],
        recommendedBooks: [
          'International Law by Malcolm N. Shaw',
          'Principles of Public International Law by Ian Brownlie',
          'International Law by Dr. S.K. Kapoor',
          'Introduction to International Law by J.G. Starke, QC',
          'International Humanitarian Law by ICRC Pakistan',
          'Extradition Act, 1972',
          'The Diplomatic and Consular Privileges Act, 1972',
          'Territorial Waters and Maritime Zone Act, 1976',
          'U.N. Convention on Law of the Sea, 1984',
          'Cases and Materials on International Law by D.J. Harris'
        ],
        examPattern: '17 comprehensive sections covering all aspects of international law from nature and basis through neutrality = 100 Marks',
        preparationTips: [
          'Master the fundamental concepts and nature of international law',
          'Understand the relationship between international and domestic law',
          'Study the sources of international law under Article 38 of ICJ Statute',
          'Learn about statehood and recognition in international law',
          'Master the Vienna Convention on the Law of Treaties',
          'Understand various methods of international dispute settlement',
          'Study the International Court of Justice and its jurisdiction',
          'Learn about international humanitarian law and armed conflicts',
          'Master the legal framework governing the use of force',
          'Understand the role of international institutions and organizations',
          'Study state territorial sovereignty and jurisdiction',
          'Learn about state responsibility for internationally wrongful acts',
          'Master the concept of state succession',
          'Understand the relationship between states and individuals',
          'Study human rights and refugee law',
          'Learn about diplomatic and consular law',
          'Master the laws of war and neutrality',
          'Understand international economic law and investment protection',
          'Study Pakistan\'s international law obligations',
          'Learn about the UN Charter and collective security',
          'Master the concept of self-defense in international law',
          'Understand the role of regional organizations',
          'Study international environmental law',
          'Learn about international criminal law',
          'Master the law of the sea and maritime zones',
          'Understand international trade law and WTO',
          'Study international development law',
          'Learn about international organizations and their legal personality',
          'Master the concept of jus cogens and erga omnes obligations',
          'Understand the role of international law in conflict resolution',
          'Study the relationship between international law and politics',
          'Learn about the enforcement mechanisms of international law',
          'Master the interpretation of international treaties',
          'Understand the role of customary international law',
          'Study international law and human security',
          'Learn about international law and terrorism',
          'Master the concept of humanitarian intervention',
          'Understand the role of international law in development',
          'Study international law and climate change',
          'Learn about the future challenges of international law',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current international law developments',
          'Practice analyzing international law cases and scenarios',
          'Understand the role of international law in Pakistan\'s foreign policy',
          'Study the relationship between international law and national sovereignty',
          'Learn about international law and global governance',
          'Master the communication of international law concepts',
          'Understand the ethical dimensions of international law'
        ]
      },
      'international-relations': {
        subjectId: 'international-relations',
        subjectName: 'International Relations',
        subjectType: 'optional',
        subjectGroup: 'group1',
        code: 'OG1-3',
        marks: 200,
        duration: '6 Hours (2 Papers)',
        sections: [
          {
            title: 'Paper-I: Theoretical Foundations and Contemporary Issues (100 Marks)',
            description: 'Theoretical approaches and contemporary issues in international relations.',
            topics: [
              'I. Introduction: The Definition and Scope of International Relations, The Nation-State System, Evolution of International Society',
              'II. Theories and Approaches: The Classical Approaches-Realism and Idealism, The Scientific Revolution-Behavioral Approach, System Approach, Neo-realism, Neo-liberalism, Post-modernism, Critical Theory, Feminism, Constructivism',
              'III. International Political Security: Conceptualization of security in the Twenty-First century, Power: Elements of National Power, Balance of Power, Foreign Policy: Determinants, Decision Making and Analysis, Sovereignty, National Interest',
              'IV. Strategic Approach to International Relation: War: Causation of War, Total War, Limited War, Asymmetric Warfare, Civil War, Guerilla Warfare, Strategic Culture: Determinants of Pakistani Strategic Culture, Deterrence: Theory and practice with special reference to India and Pakistan',
              'V. International Political Economy: Theories in IPE: Mercantilism, Economic Liberalism, and Neo-Marxism, Theories of Imperialism, Dependence and Interdependence discourse',
              'VI. International political community: Nationalism, Internationalism, Globalization',
              'VII. Approaches to Peace: Diplomacy, International Law, Arms Control/Disarmament and Nuclear Non-proliferation Regime',
              'VIII. International Political Institution: United Nations, International Monetary Fund (IMF), World Bank, International Court of Justice'
            ]
          },
          {
            title: 'Paper-II: Historical Development and Regional Analysis (100 Marks)',
            description: 'Historical development of international relations and regional analysis.',
            topics: [
              'I. International Relation between two Wars: Russian Revolution, Fascism, League of Nations, Second World War',
              'II. Cold War: Decolonization in Asia and Africa, Rise of United States and Soviet Union, Era of Tight Bipolarity, Détente and Loose Bipolarity, Revival of Cold War',
              'III. Post Cold War: End of History, Clash of Civilizations, Terrorism, Globalization, Unipolarity (New World Order) and Revival of Multi-Polarity',
              'IV. International and Regional Organizations: League of Nations, United Nations, Regional Organizations, EU, ASEAN, NAFTA, SAARC, SCO, OIC, ECO, WTO, Reforms in the United Nations, World Bank and the IMF',
              'V. Foreign Policy of Selected Countries: USA, Russia, China, UK, India, Pakistan and EU',
              'VI. South Asia: Peace-making and Peace-Building in South Asia: Analytical overview of peace processes between/among the states of South Asia especially between India and Pakistan, India and Pakistan: Overview of agreements and accords, Indus Water Treaty, Composite Dialogue, Sir Creek & Siachen border, Visa and People to people contact; Trade; and Role of civil society, Afghanistan: Cold war theatre; Soviet Invasion and Mujahedeen; Geneva Accord; Post Cold War situation—Rise of Taliban, AL-Qaeda & 9/11; Operation Enduring Freedom; The Bonn Process- Withdrawal',
              'VII. Weapons of Mass Destruction: Proliferation of Nuclear Weapons, Nuclear Weapon States- Programs and Postures: Indian-Pakistan Nuclear Doctrines, Nuclear Non-Proliferation Regime: International Atomic Energy Agency, Nuclear Non-Proliferation Treaty; Nuclear Supplier Group; Partial Test Ban Treaty; Comprehensive Test Ban Treaty; Fissile Material Cut-off Treaty, Challenges of Non-Proliferation, Cooperation for Nuclear Energy, The Missile Defence Systems and their impact on global strategic environment, Militarization and Weaponization of Space',
              'VIII. Contemporary Issues: Euro-Atlantic Vs. Asia Pacific: Great Power Policies, Kashmir Issue, Palestine Issue'
            ]
          }
        ],
        recommendedBooks: [
          'World Politics: Trend and Transformation by Charles W. Kegley Jr. & Eugene R. Wittkopf',
          'Politics Among Nations by Hans J. Morgenthau',
          'The Globalization of World Politics by John Baylis & Steve Smith',
          'Theory of International Politics by Kenneth N. Waltz',
          'International Relations Theory by Tim Dunne, Milja Kurki & Steve Smith',
          'The Anarchical Society by Hedley Bull',
          'Power and Interdependence by Robert O. Keohane & Joseph S. Nye',
          'Man, the State and War by Kenneth N. Waltz',
          'The Tragedy of Great Power Politics by John J. Mearsheimer',
          'Social Theory of International Politics by Alexander Wendt',
          'International Relations: A Very Short Introduction by Paul Wilkinson',
          'The Twenty Year\'s Crisis: 1919-1939 by E.H. Carr',
          'Bomb Scare: The History and Future of Nuclear Weapons by Joseph Cirincione',
          'Pakistan\'s Foreign Policy: An Historical Analysis by S.M. Burke',
          'Nuclear Pakistan: Strategic Dimensions by Zulfqar Khan',
          'The Future of Power by Joseph S. Nye',
          'Soft Power: The Means to Success in World Politics by Joseph S. Nye',
          'The Clash of Civilizations by Samuel P. Huntington',
          'The End of History and the Last Man by Francis Fukuyama',
          'Globalization and its Discontents by Joseph E. Stiglitz',
          'The World is Flat by Thomas L. Friedman',
          'International Political Economy by Thomas Oatley',
          'Global Political Economy by John Ravenhill',
          'The Political Economy of International Relations by Robert Gilpin',
          'International Organizations: Politics, Law, Practice by Ian Hurd',
          'The United Nations: A Very Short Introduction by Jussi M. Hanhimäki'
        ],
        examPattern: 'Paper-I: Theoretical Foundations and Contemporary Issues (100 Marks) + Paper-II: Historical Development and Regional Analysis (100 Marks) = 200 Marks',
        preparationTips: [
          'Master the fundamental concepts and scope of international relations',
          'Understand the evolution of the nation-state system',
          'Study classical theories: Realism, Idealism, and their variants',
          'Learn about modern approaches: Neo-realism, Neo-liberalism, Constructivism',
          'Master the concept of power and national interest',
          'Understand balance of power and security dynamics',
          'Study foreign policy analysis and decision-making processes',
          'Learn about strategic culture and deterrence theory',
          'Master international political economy theories',
          'Understand globalization and interdependence',
          'Study the role of international organizations',
          'Learn about diplomacy and conflict resolution',
          'Master the historical development of international relations',
          'Understand the Cold War and its impact',
          'Study post-Cold War developments and new world order',
          'Learn about regional organizations and their roles',
          'Master the foreign policies of major powers',
          'Understand South Asian regional dynamics',
          'Study India-Pakistan relations and peace processes',
          'Learn about Afghanistan and its regional implications',
          'Master nuclear proliferation and non-proliferation regimes',
          'Understand contemporary security challenges',
          'Study the Kashmir and Palestine issues',
          'Learn about terrorism and asymmetric warfare',
          'Master the role of civil society in international relations',
          'Understand the impact of technology on international relations',
          'Study international law and its relationship with IR',
          'Learn about humanitarian intervention and R2P',
          'Master the concept of soft power and public diplomacy',
          'Understand the role of media in international relations',
          'Study international trade and economic diplomacy',
          'Learn about climate change and international cooperation',
          'Master the analysis of international conflicts',
          'Understand the role of intelligence in foreign policy',
          'Study international migration and refugee issues',
          'Learn about cyber security and international relations',
          'Master the concept of human security',
          'Understand the role of non-state actors',
          'Study international development and aid',
          'Learn about international justice and accountability',
          'Master the analysis of foreign policy documents',
          'Understand the role of think tanks and academia',
          'Study Pakistan\'s strategic environment',
          'Learn about the future of international relations',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current international developments',
          'Practice analyzing international events and policies',
          'Understand the relationship between theory and practice',
          'Master the communication of complex international issues',
          'Study the ethical dimensions of international relations'
        ]
      },
      'islamic-history-culture': {
        subjectId: 'islamic-history-culture',
        subjectName: 'Islamic History & Culture',
        subjectType: 'optional',
        subjectGroup: 'group4',
        code: 'OG4-3',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Part-I: Early Islamic History and Development (50 Marks)',
            description: 'Study of early Islamic history from pre-Islamic period to the end of Pious Caliphate.',
            topics: [
              'I. Pre-Islamic Near East: An Overview: Political, Social, Cultural, Religious, and Economic Conditions in the Near East including Arabia before the dawn of Islam',
              'II. The Dawn of Islam: The Prophetic Age (570-632): Biography of the Prophet Muhammad (PBUH): A Chronology of the Major Events in his Life, Prophet Muhammad (PBUH) as a Motivator (Daa\'i), Major points of his mission, Prophet Muhammad (PBUH) as a Military Leader/Strategist, Prophet Muhammad (PBUH) as a Political Leader/Head of the State',
              'III. The Pious Caliphate (632-660): Caliph Abu Bakr (632-34): Apostasy Wars and Consolidation of Islam, Caliph Umar b. Khattab (634-44): Establishment of Administrative System and Expansion of Muslim Empire, Caliph Uthman b. Affan (644-56): Problems and Issues in the Muslim Community, Caliph Ali b. Talib (656-660): Rise of Factionalism, Abdication of Imam Hasan and Establishment of Umayyad Dynasty (660)',
              'IV. Political System of Islam under the Prophet (PBUH) and the Pious Caliphate: Nature of Islamic State, Form of the Government, Functions of the Islamic State, Sovereignty of God, Caliphate or Vicegerency of Man, Appointment of Caliph, Shura or the Consultative Body and its Role',
              'V. Institutional Development of the Muslim Civilization: The Early Phase (622-660): Development of Law and Judiciary in Early Islam, Administration and State Conduct, Defense in Early Islam, Educational System, Propagation of Islam, Financial Administration, Heritage and Culture'
            ]
          },
          {
            title: 'Part-II: Islamic Empires and Contemporary Aspects (50 Marks)',
            description: 'Study of later Islamic empires and contemporary Islamic developments.',
            topics: [
              'VI. The Umayyads in Power (660-749): Political History of the Umayyad Dynasty, Statecraft and Administration under the Umayyads, Society and the Development of Arabic Literature, Cultural Achievements',
              'I. The Abbasids of Baghdad (749-1258): The Abbasid Revolution and the Establishment of the Abbasid Dynasty, Administrative Structure under the Abbasids, Development of Scientific Knowledge under the Abbasids, Muslim Philosophy under the Abbasids, Cultural Achievements',
              'II. Spain under the Muslim Rule: Spain under the rule of the Arabs and Moors (711-1492), Political Fragmentation and the Fall of Granada (1492), Muslim Contribution in the Realm of Culture, Arts, and Architecture',
              'III. The Crusades against Islam: Major Encounters and Actors (1092-1228), Impact of the Crusades on Muslim-Christian Relations',
              'IV. The Ottoman Empire: Rise and Fall of the Ottoman Turks (1299-1923), State, Society, and Economy under the Ottomans, Treatment with the Religious Minorities, Contribution towards Culture, Arts, and Architecture',
              'V. Sufism as an Institution of the Muslim Society: Origin and Development of Sufism, Contribution of the Sufis to the Muslim Civilization, Relationship of the Sufis with the State and Political Authorities, A Critical View of Sufism',
              'VI. Islam and Modernity in Contemporary World: The Emergence of Islamic Modernism, Intellectual, Political, Economic, Social, and Educational Aspects of Islamic Modernism, Dissemination of Muslim Learning in the West'
            ]
          }
        ],
        recommendedBooks: [
          'Discovering Islam—Making Sense of Muslim History and Society by Ahmad, Akbar',
          'The Spirit of Islam by Ali, S. Ameer',
          'The Preaching of Islam—A History of the Propagation of the Muslim Faith by Arnold, T.W.',
          'The History of Islamic Peoples by Brockelmann, Carl (ed)',
          'The Cambridge History of Islam by Holts, P. M., Lewis, Bernard, Ann KS Lambton',
          'Islam in History by Munir, Muhammad',
          'The Legacy of Islam by Schacht, Joseph & Bosworth, C.E (eds)',
          'Islamic History—A New Interpretation AD 750—1055 by Shaban, M.A.',
          'Sirat un Nabi Vol. I & II by Nomani, Shibli',
          'Rasol-e-Akram ki Siasi Zindagi by Hamidullah, Dr. Muhammad',
          'Khilafat-o-Malokiat by Syed Abul Aala Maudoodi',
          'History of Islam by Najeebabadi, Akbar Shah',
          'The Cultural Atlas of Islam by Ismall Raji al-Faruqi & Lois Lamya\' al-Faruqi',
          'The Venture of Islam by Hodgson, Marshall G.S.',
          'A History of the Arab Peoples by Hourani, Albert',
          'The Arabs in History by Lewis, Bernard',
          'The Middle East by Lewis, Bernard',
          'The Muslim Discovery of Europe by Lewis, Bernard',
          'Islam and the West by Lewis, Bernard',
          'The Crisis of Islam by Lewis, Bernard',
          'What Went Wrong? by Lewis, Bernard',
          'The Arabs by Mansfield, Peter',
          'A History of Islamic Societies by Lapidus, Ira M.',
          'Islamic Societies to the Nineteenth Century by Lapidus, Ira M.',
          'A History of the Islamic World by Saunders, J.J.',
          'The Prophet and the Age of the Caliphates by Kennedy, Hugh',
          'The Early Abbasid Caliphate by Kennedy, Hugh',
          'The Prophet\'s Pulpit by Kister, M.J.',
          'Studies in Early Islamic Tradition by Kister, M.J.',
          'The Formation of Islamic Art by Grabar, Oleg',
          'Islamic Art and Architecture by Hillenbrand, Robert',
          'Islamic Architecture by Michell, George',
          'The Art and Architecture of Islam by Ettinghausen, Richard',
          'Islamic Calligraphy by Schimmel, Annemarie',
          'Mystical Dimensions of Islam by Schimmel, Annemarie',
          'The Sufi Orders in Islam by Trimingham, J. Spencer',
          'Islamic Science and Engineering by Hill, Donald R.',
          'Science and Civilization in Islam by Nasr, Seyyed Hossein',
          'Islamic Philosophy by Fakhry, Majid',
          'A History of Islamic Philosophy by Corbin, Henry',
          'Islamic Theology by Watt, W. Montgomery',
          'Islamic Philosophy and Theology by Watt, W. Montgomery',
          'The Faith and Practice of Al-Ghazali by Watt, W. Montgomery',
          'Muslim Intellectual by Watt, W. Montgomery'
        ],
        examPattern: 'Part-I: Early Islamic History and Development (50 Marks) + Part-II: Islamic Empires and Contemporary Aspects (50 Marks) = 100 Marks',
        preparationTips: [
          'Master the pre-Islamic conditions in the Near East and Arabia',
          'Study the life and mission of Prophet Muhammad (PBUH) comprehensively',
          'Understand the Prophet\'s role as a military leader and political head',
          'Learn about the Pious Caliphate and its administrative achievements',
          'Master the political system of Islam under the Prophet and Caliphs',
          'Study the institutional development of early Muslim civilization',
          'Understand the Umayyad dynasty and its contributions',
          'Learn about the Abbasid revolution and its impact',
          'Study Muslim Spain and its cultural achievements',
          'Master the history of the Crusades and their impact',
          'Understand the rise and fall of the Ottoman Empire',
          'Learn about Sufism and its role in Muslim society',
          'Study Islamic modernism and contemporary developments',
          'Focus on the development of Islamic law and judiciary',
          'Understand the concept of Islamic state and governance',
          'Study the role of Shura in Islamic political system',
          'Learn about the expansion of Muslim empire under early caliphs',
          'Master the cultural and scientific achievements of Muslim civilization',
          'Understand the relationship between religion and politics in Islam',
          'Study the treatment of religious minorities in Islamic states',
          'Learn about Islamic art, architecture, and calligraphy',
          'Understand the philosophical developments in Islamic thought',
          'Study the impact of Islamic civilization on the West',
          'Master the chronological development of Islamic history',
          'Learn about the major historical figures and their contributions',
          'Understand the economic and social systems in Islamic societies',
          'Study the educational and scientific institutions in Muslim history',
          'Learn about the role of women in Islamic history',
          'Understand the concept of jihad and its historical context',
          'Study the development of Islamic theology and philosophy',
          'Master the relationship between Sufism and orthodox Islam',
          'Learn about the impact of colonialism on Islamic societies',
          'Understand the challenges of modernity to Islamic tradition',
          'Study the contemporary Islamic movements and their goals',
          'Learn about the role of Islamic scholars and intellectuals',
          'Understand the concept of Islamic unity and diversity',
          'Study the economic and trade networks in Islamic history',
          'Learn about the role of Islamic institutions in society',
          'Understand the concept of Islamic ethics and morality',
          'Study the impact of Islamic civilization on world history',
          'Learn about the preservation and transmission of Islamic knowledge',
          'Understand the role of Islamic education and learning',
          'Study the relationship between Islam and other religions',
          'Learn about the concept of Islamic social justice',
          'Master the chronological sequence of Islamic historical events',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current research in Islamic history',
          'Practice analyzing historical events and their significance',
          'Understand the relationship between Islamic history and contemporary issues',
          'Study the role of Islamic history in shaping Muslim identity'
        ]
      },
      'journalism-mass-communication': {
        subjectId: 'journalism-mass-communication',
        subjectName: 'Journalism & Mass Communication',
        subjectType: 'optional',
        subjectGroup: 'group7',
        code: 'OG7-4',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Introduction to Mass Communication',
            description: 'Foundation concepts and models of mass communication.',
            topics: [
              'Concept - Definitions, Need/Importance/Purposes, Types of Communication, Process of Communication, Basic Models',
              'Functions of a model, Evaluation of a model',
              'Basic models in Mass Communication: Lasswell\'s Model (1948), Shannon-Weaver model (1948), Osgoods model (1954), Schramm\'s model (1954), Newcomb\'s symmetry theory (1953), Westley-McLean\'s model (1976), Gerbner model (1956)'
            ]
          },
          {
            title: 'II. Mass Communication Theories',
            description: 'Theoretical frameworks and models in mass communication.',
            topics: [
              'Normative theories of the press: Schramm\'s four theories and criticism on these theories',
              'Media as agents of power',
              'The Spiral of silence',
              'Media Usage and gratifications',
              'Media hegemony',
              'Diffusion of innovations',
              'Powerful effects model: hypodermic needle, magic bullet theory',
              'Moderate effects model: two-step and multi-step flow of communication',
              'Powerful media revisited: Marshal McLuhan\'s media determinism'
            ]
          },
          {
            title: 'III. Global / International Communication',
            description: 'International communication and global media dynamics.',
            topics: [
              'The Historical Context of International Communication',
              'Globalization, technology, and the mass media',
              'Communication and Cultural imperialism',
              'Communication Flow in Global Media: Imbalance in the flow of information between North and South',
              'McBride commission and its recommendations',
              'International Communication in the Internet Age: the new social media and its effects on developing world'
            ]
          },
          {
            title: 'IV. Media and Society',
            description: 'Role and impact of media in society.',
            topics: [
              'Mass media and social change',
              'Media as a social system: The balance between interrelation and interdependence',
              'Media freedom and its role for democracy',
              'The functional approach to mass media: four social functions of the media',
              'Media as an awareness agent',
              'Mass media and social representation'
            ]
          },
          {
            title: 'V. Mass Media in Pakistan',
            description: 'Media system and journalism in Pakistan.',
            topics: [
              'Media system in Pakistan: historical, chronological, and analytical review',
              'The system of journalism and the media system',
              'Employer-employee relations in Pakistani media',
              'Government-press relations',
              'Press in Pakistan: The newspaper industry, from mission to the market',
              'Electronic media: from total dependence to enormous power',
              'The new 24/7 television: uses and abuses',
              'The new radio: potential for change and the present performance',
              'The question of freedom and responsibility'
            ]
          },
          {
            title: 'VI. Development Support Communication',
            description: 'Communication for development and social change.',
            topics: [
              'Theories of development support communication with specific focus on the developing world',
              'The dominant paradigm of development: historical, analytical perspective',
              'The Alternative paradigm of development',
              'Small is beautiful: community development as a snowball effect',
              'Globalization vs Localization',
              'Glocalization',
              'Social Marketing: how to infuse new ideas into a developing population'
            ]
          },
          {
            title: 'VII. Public Relations',
            description: 'Public relations concepts and practices.',
            topics: [
              'Concept of Public Relations',
              'Historical development of public relations: from press agentry to PR',
              'Public relation in Pakistan',
              'Ministry of information',
              'Press Information Department (PID)',
              'Public relations and publicity',
              'PR as a tool for governance',
              'Private PR agencies and their structure',
              'Basic methods of PR: press release, press note, press conference',
              'PR Ethics'
            ]
          },
          {
            title: 'VIII. Media Laws and Ethics',
            description: 'Legal framework and ethical considerations in media.',
            topics: [
              'History of Media Laws in Pakistan',
              'Development of media regulations from British colonial era to independent Pakistan',
              'Libel, Defamation and relevant portions of PPC',
              'PPO, RPPPO',
              'PEMRA: establishment, development, and operational mechanisms',
              'Press Council of Pakistan (PCP)',
              'Citizens Media Commission: need, present status, and reasons for inactivity',
              'Press Code of Ethics',
              'Inability of the media to develop a code of ethics as an institution',
              'The media\'s quest for freedom and its inability to self regulate'
            ]
          }
        ],
        recommendedBooks: [
          'Broadcast Regulations: the German Example by Metzger, Herbert. FES 1993',
          'Communication Models for The Study of Mass Communication, 2nd Ed by McQuail, Dennis & Windhal, Swen, Longman, 1982',
          'Convergence Culture: Where old and new Media by Blackwell publishing Ltd, USA',
          'Communication Theories: Origins, Methods and Uses in the Mass Media 5th Ed by Werner J. Severin, James W. Tankard Jr. Longman, 1997',
          'Diffusion of Innovations 5th Ed by Rogers, Everett M. Free Press 2003',
          'Ethics in Journalism: A Reader on Their Perception in the Third World by Kunczik, Michael (Ed.). FES 1999',
          'Handbook of International and Intercultural Communication 2nd Ed by Gudykunst & Mody, Sage, 2001',
          'McQuail\'s Mass Communication Theory, 4th Ed by Denis McQuail. Sage, 2000',
          'Media And Society into the 21st Century: A Historical Introduction by Blackwell publishing Ltd, USA',
          'Media / Impact by Wads Worth/Thompson Learning, Belmont, CA',
          'Media Now: Communication Media in the Information Age by Wads Worth/Thompson Learning, Belmont, CA',
          'News Media and Journalism in Pakistan by Khan, Altaf. LAP Lambert Academic Publishing. June 2011',
          'News Media and Journalism in Pakistan and Germany (Ed.) by Khan, Altaf. Peshawar, 2003',
          'Participatory Development by Hasan, Arif, Oxford, 2010',
          'Political Communication in Britain: The Leader Debates, the Campaign and the Media in the 2010 General Election, (Ed) by Palgrave McMillan, UK',
          'Political Communication in Asia by Roultage, NY',
          'Precision Journalism: A Reporter\'s Introduction to Social and Science Methods, 4th Ed by Rowman and Littlefield, Lanham, MD',
          'Report and Recommendations of the Media Commission, appointed by the Supreme Court of Pakistan. 2013 by FES, Islamabad, 2013',
          'Reporting the Frontier: Media Capacity Building for Peace in Pakistan\'s Tribal Areas by Khan, Altaf. VDM Verlag Dr. Müllere. K. June 2011',
          'Writing, Directing, and Producing Documentary Films and Videos, 3rd edition by Carbondale: Southern Illinois Press, 2002',
          'Directing the Documentary, 4th edition by Focal Press, 2004',
          'Documentary Storytelling Making Stronger and More Dramatic Nonfiction Films, 2nd edition by Focal Press, 2007',
          'Principles of Editing by McGraw-Hill 1996',
          'Journalism-Principles and Practices by Vistaar Publications 2006',
          'The Hand Book of New Media by London: Sage',
          'Applying Communication Theory for Professional Life: An Introduction (2nd Edition) by London: Sage',
          'Controversies in Contemporary Advertising by Newbury Park: Sage Publications',
          'Public Relations-Writing & Media Techniques by Harper Collins College Publishers, NY',
          'Telecommunications Policy in Pakistan by Telematics and Informatics',
          'Guaranteeing Copyright- Media Manager\'s Guide to Pakistani Broadcast Law by Media Manager Companion Series, Internews Pakistan',
          'Model Freedom of Information Act, 2001 by Consumer rights Protection Commission of Pakistan'
        ],
        examPattern: '8 comprehensive sections covering Introduction to Mass Communication, Theories, Global Communication, Media and Society, Mass Media in Pakistan, Development Communication, Public Relations, and Media Laws & Ethics = 100 Marks',
        preparationTips: [
          'Master the fundamental concepts and definitions of mass communication',
          'Understand the process of communication and its basic models',
          'Study all major communication models: Lasswell, Shannon-Weaver, Schramm, etc.',
          'Learn about normative theories of the press and their criticisms',
          'Master media effects theories: powerful, moderate, and limited effects',
          'Understand the spiral of silence and media hegemony concepts',
          'Study media usage and gratifications theory',
          'Learn about diffusion of innovations and its applications',
          'Master Marshal McLuhan\'s media determinism',
          'Understand international communication and cultural imperialism',
          'Study the McBride commission and its recommendations',
          'Learn about the impact of social media on developing countries',
          'Understand the role of media in social change and democracy',
          'Study the four social functions of mass media',
          'Master the historical development of media in Pakistan',
          'Learn about government-press relations in Pakistan',
          'Understand the evolution of electronic media in Pakistan',
          'Study the challenges of 24/7 television and radio',
          'Learn about development support communication theories',
          'Master the dominant and alternative paradigms of development',
          'Understand the concept of glocalization',
          'Study social marketing and community development',
          'Learn about the historical development of public relations',
          'Master PR methods: press releases, press notes, press conferences',
          'Understand PR ethics and governance applications',
          'Study the history of media laws in Pakistan',
          'Learn about PEMRA and its operational mechanisms',
          'Understand the Press Council of Pakistan and its role',
          'Master the concepts of libel, defamation, and media regulations',
          'Study the Press Code of Ethics and self-regulation challenges',
          'Understand the balance between media freedom and responsibility',
          'Learn about the role of media in democracy and social change',
          'Study the impact of globalization on media systems',
          'Master the relationship between media and society',
          'Understand the challenges of media in developing countries',
          'Learn about the role of media in development communication',
          'Study the evolution of journalism from mission to market',
          'Understand the role of new media and digital communication',
          'Learn about media convergence and its implications',
          'Study the role of media in political communication',
          'Understand the challenges of media ethics and professionalism',
          'Learn about the role of media in conflict resolution',
          'Study the impact of technology on media practices',
          'Understand the role of media in public opinion formation',
          'Learn about media literacy and critical thinking',
          'Study the role of media in cultural preservation and change',
          'Understand the challenges of media ownership and control',
          'Learn about the role of media in education and awareness',
          'Study the relationship between media and power',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current developments in media and communication',
          'Practice analyzing media content and its effects',
          'Understand the role of media in Pakistan\'s development',
          'Study the challenges and opportunities in Pakistani media',
          'Learn about the future of journalism and mass communication'
        ]
      },
      'general-science': {
        subjectId: 'general-science',
        subjectName: 'General Science & Ability',
        subjectType: 'compulsory',
        code: 'CE-3',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Part-I: General Science (60 Marks)',
            description: 'Comprehensive coverage of physical sciences, biological sciences, environmental science, food science, and information technology.',
            topics: [
              'Physical Sciences: Universe, Galaxy, Solar System, Natural Processes, Energy Resources',
              'Biological Sciences: Cell Biology, Biomolecules, Human Physiology, Diseases',
              'Environmental Science: Pollution, Remote Sensing, GIS, Population Planning',
              'Food Science: Balanced Diet, Food Quality, Preservation',
              'Information Technology: Computer Systems, Networking, AI, Telecommunications'
            ]
          },
          {
            title: 'I. Physical Sciences',
            description: 'Study of matter, energy, and natural phenomena',
            topics: [
              'Constituents and Structure (Universe, Galaxy, Solar System)',
              'Process of Nature (Eclipses, Weather Variables)',
              'Natural Hazards and Disasters (Earthquakes, Floods, Cyclones)',
              'Energy Resources (Renewable and Non-Renewable)',
              'Atomic Structure and Chemical Bonding',
              'Electromagnetic Radiations',
              'Modern Materials/Chemicals (Ceramics, Plastics, Semiconductors, Antibiotics, Vaccines, Fertilizers, Pesticides)'
            ]
          },
          {
            title: 'II. Biological Sciences',
            description: 'Study of living organisms and biological processes',
            topics: [
              'The Basis of Life (Cell Structures, Organelles)',
              'Biomolecules (Proteins, Lipids, Carbohydrates, Enzymes)',
              'Plant and Animal Kingdom',
              'A Brief Account of Human Physiology',
              'Common Diseases and Epidemics (Polio, Malaria, Hepatitis, Dengue)',
              'New Model Concept of Producing BIO Fuel Method'
            ]
          },
          {
            title: 'III. Environmental Science',
            description: 'Understanding environmental systems and pollution',
            topics: [
              'Environment (Atmosphere, Hydrosphere, Biosphere, Lithosphere)',
              'Atmospheric Pollution (Types, Sources, Causes, Effects of pollutants like COx, NOx, SOx)',
              'Ozone Depletion, Greenhouse Effect, Acid-rain',
              'International agreements (Montreal and Kyoto Protocols)',
              'Water Pollution (Types, Sources, Causes, Effects of pollutants like Organic Chemicals, Heavy Metals)',
              'Land Pollution (Solid Waste Management)',
              'Role of Remote Sensing and GIS',
              'Population Planning'
            ]
          },
          {
            title: 'IV. Food Science',
            description: 'Study of food composition, quality, and preservation',
            topics: [
              'Concept of Balance Diet (Vitamins, Carbohydrates, Protein, Fats, Minerals, Fiber)',
              'Quality of Food (Bioavailability, Appearance, Texture, Flavor)',
              'Food Additives, Preservatives, Antioxidants',
              'Food Deterioration and its Control'
            ]
          },
          {
            title: 'V. Information Technology',
            description: 'Computer systems, networking, and modern technology',
            topics: [
              'Computer (Hardware & Software Fundamentals, I/O Processing)',
              'Networking, Internet Standards',
              'Application and Business Software, Social Media',
              'Information Systems, Artificial Intelligence',
              'Telecommunications (Wireless Communication, Mobile, Satellite, GPS, Fiber Optic)'
            ]
          },
          {
            title: 'Part-II: General Ability (40 Marks)',
            description: 'Assessment of quantitative, logical, and mental abilities',
            topics: [
              'Quantitative Ability/Reasoning: Mathematical Skills, Arithmetic, Algebra, Geometry',
              'Logical Reasoning: Systematic problem-solving',
              'Analytical Reasoning: Complex problem analysis',
              'Mental Abilities: Verbal, Mechanical, Numerical, Social ability measurement'
            ]
          },
          {
            title: 'VI. Quantitative Ability/Reasoning',
            description: 'Mathematical skills and quantitative reasoning',
            topics: [
              'Basic Mathematical Skills and Quantitative Reasoning',
              'Basic Arithmetic, Algebra and Geometry',
              'Average, Ratios, Rates, Percentage',
              'Angles, Triangles, Sets, Remainders',
              'Equations, Symbols, Rounding of Numbers',
              'Random Sampling'
            ]
          },
          {
            title: 'VII. Logical Reasoning and Analytical Reasoning/Ability',
            description: 'Systematic problem-solving and complex problem analysis',
            topics: [
              'Logical Reasoning as systematic problem-solving',
              'Analytical Reasoning as visualizing, articulating, and solving complex problems',
              'Using logical thinking to solve complex problems',
              'Critical thinking and analysis skills'
            ]
          },
          {
            title: 'VIII. Mental Abilities',
            description: 'Assessment of various mental capabilities',
            topics: [
              'Mental Abilities Scales',
              'Verbal ability measurement',
              'Mechanical ability measurement',
              'Numerical ability measurement',
              'Social ability measurement'
            ]
          }
        ],
        recommendedBooks: [
          'Science: A Very Short Introduction by John Gribbin',
          'Physics: A Very Short Introduction by Sidney Perkowitz',
          'Chemistry: A Very Short Introduction by Peter Atkins',
          'Life Science: A Very Short Introduction by John Postgate',
          'Physical Science: A Very Short Introduction by John Gribbin',
          'Animal Biology: A Very Short Introduction by Peter Holland',
          'Forensic Science: A Very Short Introduction by Jim Fraser',
          'Physical Geography: A Very Short Introduction by John Matthews',
          'Information Technology: A Very Short Introduction by Darrel Ince',
          'Management Information Systems by Kenneth Laudon',
          'Telecommunications: A Very Short Introduction by John Gribbin',
          'Environmental Science: A Very Short Introduction by James Lovelock',
          'Food Science: A Very Short Introduction by John Krebs',
          'Books for Logical Reasoning: Various titles covering reasoning and analytical skills'
        ],
        examPattern: 'Part-I (General Science - 60 Marks) + Part-II (General Ability - 40 Marks) = 100 Marks',
        preparationTips: [
          'Study fundamental concepts in physical sciences including universe, energy, and modern materials',
          'Understand biological processes, human physiology, and common diseases',
          'Learn about environmental issues, pollution types, and international agreements',
          'Master food science concepts including balanced diet and food preservation',
          'Stay updated with information technology, AI, and telecommunications',
          'Practice quantitative reasoning with arithmetic, algebra, and geometry',
          'Develop logical reasoning and analytical thinking skills',
          'Work on mental ability questions covering verbal, mechanical, numerical, and social skills',
          'Use recommended books for comprehensive study of each section',
          'Practice previous year questions and mock tests regularly'
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
  }, [subjectId]);

  useEffect(() => {
    if (subjectId) {
      fetchSubjectData();
      generateSyllabus();
    }
  }, [subjectId, fetchSubjectData, generateSyllabus]);

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
          
          <div className="space-y-4">
            {syllabus.sections.map((section, index) => {
              const isExpanded = expandedSections.has(index);
              return (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Section Header - Always Visible */}
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Section {index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                      </div>
                      <div className="flex items-center">
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {/* Section Content - Collapsible */}
                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      {section.description && (
                        <p className="text-gray-600 mb-4 leading-relaxed mt-4">{section.description}</p>
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
                  )}
                </div>
              );
            })}
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