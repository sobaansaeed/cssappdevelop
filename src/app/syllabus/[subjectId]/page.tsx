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
          'Peples and Cultures of Asia by Scupin, R 2005',
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
      'governance-policies': {
        subjectId: 'governance-policies',
        subjectName: 'Governance & Public Policies',
        subjectType: 'optional',
        subjectGroup: 'group3',
        code: 'OG3-3',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Basic Concepts of Governance',
            description: 'Foundations of governance and good governance.',
            topics: [
              'Origin and definition of Governance',
              'Definition and characteristics of Good Governance: participation, rule of law, transparency, responsiveness, equity, effectiveness and efficiency, accountability, strategic vision',
              'Collapse/Failure of Governance: indicators, diagnostic tools and effects'
            ]
          },
          {
            title: 'II. Governance Theories',
            description: 'Key theoretical approaches to governance and the state.',
            topics: [
              'Communitarianism and Decentralized Theory',
              'Libertarian Socialism',
              'Pluralism',
              'Marxism and Neo-liberalism',
              'Rational Choice Theory and Regulation Theory'
            ]
          },
          {
            title: 'III. Governance Indicators and Pakistan',
            description: 'Measurement and application of governance indicators with Pakistan focus.',
            topics: [
              'Indicators developed by World Bank/IMF/UN/ESCAP/UNDP/ADB',
              'Explanation and application level in Pakistan',
              'Voice and Accountability',
              'Political Stability and Absence of Violence/Terrorism',
              'Government Effectiveness',
              'Regulatory Quality and Rule of Law',
              'Control of Corruption'
            ]
          },
          {
            title: 'IV. Public Policy & Planning Institutions and the Role in Planning',
            description: 'Planning machinery and policy coordination in Pakistan.',
            topics: [
              'Institutional framework for policy coordination and planning at federal and provincial levels',
              'Economic Coordination Committee, Cabinet and Cabinet Committees; The Secretaries Committee; Ministries and attached departments',
              'Role of Planning Commission, The Finance Division, and line Ministries in development planning',
              'Public Policy and Implementation (IMF/World Bank/UNDP framework); Pakistan Vision, Five Year Plans and Medium Term Framework',
              'Public Policy and Implementation in key sectors (e.g., Health, Education)'
            ]
          },
          {
            title: 'V. Accountability',
            description: 'Standards and instruments of accountability in governance.',
            topics: [
              'General introduction to Accountability and its concepts/Standards',
              'Symbolism, regional and country-wise comparisons',
              'Types: Political, Administrative, Legal/Judicial, Social',
              'Administrative Accountability, Professional Accountability, Private vs Public',
              'Accountability strategies against corruption and remedial measures'
            ]
          },
          {
            title: 'VI. Bureaucracy',
            description: 'Role of bureaucracy and administrative culture.',
            topics: [
              'Historical evolution of bureaucracy; Weber, Wilson, and contemporary perspectives',
              'Bureaucracy in Pakistan: British legacy, neutrality, steel frame and administrative culture',
              'Rules of Business, code of ethics, effectiveness of the Establishment and the DMG/PCS debate',
              'Recruitment, training, promotions and compensation; politicization and reform'
            ]
          },
          {
            title: 'VII. Public Policy Formulation and Implementation',
            description: 'Policy cycle and challenges in Pakistan context.',
            topics: [
              'How policies are made: agenda setting, stakeholders, analysis, formulation, decision, implementation, evaluation',
              'Six thinking hats and diagnosis; evidence-based policy; policy learning',
              'Pitfalls: status quo bias, lack of coordination, weak capacity, political economy constraints',
              'Tools: problem structuring, policy instruments, regulatory impact analysis, M&E'
            ]
          },
          {
            title: 'VIII. Multi-level Governance in Pakistan',
            description: 'Institutions across tiers of government.',
            topics: [
              'Parliament and Provincial Assemblies; Senate',
              'Judiciary: Supreme Court, High Courts, Lower Courts',
              'Executive: Federal, Provincial and Local Government',
              'Police and civil administration; Office of Ombudsman',
              'Office of the President/Prime Minister; Federal Cabinet and Secretariat',
              'Local government system: District, Tehsil/Town, Union Administration; efficacy, performance and causes of success/failure'
            ]
          },
          {
            title: 'IX. Federalism, Devolution and Decentralization',
            description: 'Structures of the state and service delivery.',
            topics: [
              'Constitutional underpinnings of federal structure',
              'Principle of subsidiarity in service delivery',
              'Devolution model(s) in Pakistan and international comparisons'
            ]
          },
          {
            title: 'X. Role of Citizens in Governance',
            description: 'Citizen-centric governance and participation.',
            topics: [
              'Citizen charters and social accountability',
              'Right to Information and transparency',
              'Public participation, co-production and community monitoring'
            ]
          },
          {
            title: 'XI. Good Governance in Islam',
            description: 'Islamic guidance on governance and public policy.',
            topics: [
              'Quranic guidance on good governance',
              'Application of governance concepts in the light of Quran, Sunnah and Fiqh'
            ]
          }
        ],
        recommendedBooks: [
          'Governance by Anne Mette Kjaer',
          'Encyclopedia of Governance by Mark Bevir',
          'Implementing Public Policy by Hill & Hupe',
          'Economic Survey of Pakistan (latest) and Planning Commission documents',
          'Public Administration and Public Affairs by Nicholas Henry',
          'Local Government Reforms in Pakistan by Shah & Ghaus-Pasha',
          'Pakistan: Beyond the Crisis State by Maleeha Lodhi',
          'Power Dynamics, Institutional Instability and Economic Growth in Pakistan by Akmal Hussain',
          'Constitution of Islamic Republic of Pakistan (National Assembly of Pakistan)',
          'Governance: South Asian Perspective by Hasnat Abdul Hye',
          'Governance, Economic Policy and Reform in Pakistan by Abdus Samad'
        ],
        examPattern: 'Comprehensive 100-mark paper covering 11 sections from basic concepts and theories to accountability, policy, multi-level governance, federalism, citizen role, and Islamic perspective.',
        preparationTips: [
          'Map each section to current affairs examples in Pakistan',
          'Learn measurement frameworks (WGI) and practice interpreting indicators',
          'Study Pakistan\'s planning machinery and how policies travel from agenda to implementation',
          'Prepare short notes for theories of governance and their critiques',
          'Revise accountability institutions and legal frameworks (Ombudsman, RTI, anti-corruption bodies)',
          'Use recent policy cases in health/education to illustrate implementation challenges',
          'Understand federalism and the post-18th Amendment devolution architecture',
          'Incorporate Islamic principles of good governance with contemporary relevance'
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
      'chemistry': {
        subjectId: 'chemistry',
        subjectName: 'Chemistry',
        subjectType: 'optional',
        subjectGroup: 'group2',
        code: 'OG2-2',
        marks: 200,
        duration: '6 Hours (2 Papers)',
        sections: [
          {
            title: 'Paper-I: Physical, Analytical and Inorganic Chemistry (100 Marks)',
            description: 'Core physical chemistry, kinetics, thermodynamics and foundational analytical/inorganic topics.',
            topics: [
              'I. Atomic Structure and Quantum Chemistry: Electromagnetic spectrum, photoelectric effect, de Broglie equation, Heisenberg uncertainty principle, Schrödinger equation and its applications (particle in a box, hydrogen atom); quantum numbers, orbitals and shapes; Pauli principle, Hund’s rule and Aufbau principle',
              'II. Electrochemistry: Conductance in ionic solutions, transport number, ionic mobility, Debye–Hückel theory (qualitative), electrochemical cells, EMF and Nernst equation, standard electrode potential, reference electrodes, corrosion and its prevention, batteries and fuel cells',
              'III. Thermodynamics: Ideal and real gases, van der Waals equation, laws of thermodynamics, enthalpy, entropy, Helmholtz and Gibbs free energies, criteria of spontaneity, Maxwell relations, chemical equilibrium and phase equilibria (phase rule basics)',
              'IV. Chemical Kinetics: Rate of reaction, order and molecularity, integrated rate laws, temperature dependence (Arrhenius equation), activation energy, collision and transition state theories (qualitative), catalysts and enzyme kinetics, reaction mechanisms',
              'V. Fundamentals of Chemometrics and Data Analysis: Significant figures, measurement and systematic/random errors, accuracy vs precision, confidence limits, Gaussian distribution, least-squares fitting, analysis of variance (ANOVA), mean, median, mode, standard deviation',
              'VI. Separation Methods: Principles and applications of analytical separations; solvent extraction, paper and thin-layer chromatography, column chromatography, gas chromatography (GC), high-performance liquid chromatography (HPLC), ion-exchange chromatography, electrophoresis; qualitative and quantitative applications',
              'VII. Spectroscopic Methods: Basic principles, instrumentation and applications of UV–Visible, IR, NMR and Mass spectrometry for qualitative and quantitative analysis; structure elucidation basics',
              'VIII. Basic Inorganic Chemistry and Bonding: Ionic and covalent bonding, localized vs delocalized bonding, VBT, VSEPR and MO approaches, hydrogen bonding, resonance, electronegativity and periodic trends; HSAB concept',
              'IX. Acids and Bases: Arrhenius, Brønsted–Lowry and Lewis concepts; hard and soft acids and bases; buffer solutions, pH and pKa, acid–base titrations',
              'X. Chemistry of s-, p-, d- and f-Block Elements (overview): General periodic trends; transition elements – oxidation states, complex formation, magnetic properties; lanthanides and actinides – common oxidation states and applications; introduction to coordination chemistry – ligands, coordination number, isomerism, Werner’s theory, crystal field theory (octahedral/tetrahedral splitting), spectrochemical series, Jahn–Teller distortion (qualitative)'
            ]
          },
          {
            title: 'Paper-II: Organic, Biochemistry and Industrial Chemistry (100 Marks)',
            description: 'Fundamental and applied organic chemistry including stereochemistry, mechanisms, spectroscopy, biomolecules and industrial processes.',
            topics: [
              'I. Basic Concepts of Organic Chemistry: Bonding and hybridization (sp, sp2, sp3), bond polarity and dipole moment, resonance and hyperconjugation, inductive and mesomeric effects, aromaticity, acidity and basicity of organic compounds',
              'II. Stereochemistry: Structural, geometrical and optical isomerism; conformational analysis of alkanes and cyclohexane; chirality, enantiomers, diastereomers, racemization and resolution; R/S and E/Z nomenclature',
              'III. Chemistry of Aromatic Compounds: Benzene structure and aromaticity (Hückel rule); electrophilic aromatic substitution – mechanism and reactivity; directing effects, orientation and poly-substitution; polynuclear aromatics',
              'IV. Chemistry of Functional Groups: Preparation, properties and reactions of alkanes, alkenes, alkynes, alkyl halides, alcohols, phenols, ethers, epoxides, amines, nitro compounds, carbonyls (aldehydes and ketones), carboxylic acids and their derivatives',
              'V. Reaction Mechanisms: Nucleophilic substitution (SN1, SN2), elimination (E1, E2), addition to carbon–carbon multiple bonds, electrophilic and nucleophilic additions to carbonyls; overview of reactive intermediates (carbocations, carbanions, radicals)',
              'VI. Organic Spectroscopy: Principles and interpretation of UV–Visible, IR, 1H- and 13C-NMR and Mass spectra for structure determination of organic molecules',
              'VII. Biochemistry (Fundamentals): Carbohydrates (mono-, di- and polysaccharides), amino acids, peptides and proteins (primary to quaternary structure), lipids and fatty acids, nucleic acids (DNA/RNA) – basic structure and biological role; enzymes and vitamins (basics)',
              'VIII. Chemical Industries and Environmental Aspects: Basic processes and flow-sheets for manufacture of sugar, cement, glass, paper, fertilizers, soaps and detergents; petroleum refining basics; occupational safety and environmental considerations',
              'IX. Polymers and Macromolecules: Classification and nomenclature, tacticity and stereoregularity, mechanisms of polymerization (addition and condensation), average molecular weights and distributions, properties, additives and applications; common industrial polymers'
            ]
          }
        ],
        recommendedBooks: [
          'Atkins’ Physical Chemistry by P. Atkins & J. de Paula',
          'Physical Chemistry by P. W. Atkins & R. Friedman',
          'Elements of Physical Chemistry by P. Atkins',
          'Skoog, West, Holler & Crouch: Fundamentals of Analytical Chemistry',
          'Shriver & Atkins: Inorganic Chemistry',
          'Housecroft & Sharpe: Inorganic Chemistry',
          'Morrison & Boyd: Organic Chemistry',
          'Clayden, Greeves & Warren: Organic Chemistry',
          'Pavia, Lampman, Kriz & Vyvyan: Introduction to Spectroscopy',
          'Lehninger: Principles of Biochemistry',
          'Shreve’s Chemical Process Industries'
        ],
        examPattern: 'Two Papers: Paper-I (Physical/Analytical/Inorganic) 100 Marks + Paper-II (Organic/Biochemistry/Industrial) 100 Marks = 200 Marks',
        preparationTips: [
          'Master quantum basics, thermodynamics and kinetics with numerical practice',
          'Practice Nernst equation, electrochemical cells and electrode potentials problems',
          'Revise chromatographic and spectroscopic techniques with typical applications',
          'Consolidate bonding models (VBT, VSEPR, MO) and coordination chemistry fundamentals',
          'Build strong command over reaction mechanisms (SN1/SN2, E1/E2, additions) and reagent chemistry',
          'Drill stereochemistry: R/S, E/Z and conformational analysis problems',
          'Solve past questions on spectral interpretation (IR, NMR, MS) and multi-step structure elucidation',
          'Summarize biomolecule chemistry with emphasis on structure–function relationships',
          'Review common industrial processes and environmental/safety considerations',
          'Use high-yield summary sheets and attempt timed mock papers for both papers'
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
      'history-pakistan-india': {
        subjectId: 'history-pakistan-india',
        subjectName: 'History of Pakistan & India',
        subjectType: 'optional',
        subjectGroup: 'group4',
        code: 'OG4-1',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Muslim Rule and Heritage in India (712–1857)',
            description: 'Political and administrative history under Muslim dynasties to the end of Mughal rule.',
            topics: [
              'Arrival, foundation and consolidation of Muslim rule in India',
              'Important rulers of Slave, Khalji, Tughlaq, Sayyid, Lodi and Mughal dynasties',
              'Spirit and legacy of Muslim civilization: art, architecture and literature',
              'Public administration under Muslim rulers; social, judicial, civil and military systems',
              'Industry, trade and commerce under Muslim patronage; financial administration'
            ]
          },
          {
            title: 'II. British Rule in India (1857–1947)',
            description: 'From the rise of East India Company to end of British Raj.',
            topics: [
              'British imperialism; origin and growth of East India Company power',
              'Causes and effects of the downfall of Mughal Empire',
              'The War of Independence 1857: causes and effects'
            ]
          },
          {
            title: 'III. Constitutional and Political Reforms (1858–1947)',
            description: 'Evolution of British constitutional reforms and party politics.',
            topics: [
              'Acts and reforms from 1858 to 1947',
              'Growth of political parties with focus on Indian National Congress'
            ]
          },
          {
            title: 'IV. Muslim Struggle for Independence',
            description: 'Political awakening and Muslim nationalism.',
            topics: [
              'Role of Shah Waliullah, Syed Ahmad Shaheed and Sir Syed Ahmed Khan',
              'Muslim rule in South Asia and its legacy',
              'All India Muslim League; Partition of Bengal; Simla Deputation; Lucknow Pact',
              'Khilafat Movement; Nehru Report; Quaid-i-Azam’s Fourteen Points'
            ]
          },
          {
            title: 'V. Pakistan Movement',
            description: 'Towards independence.',
            topics: [
              'Allama Iqbal’s Allahabad Address (1930) and Round Table Conferences',
              'Congress Rule and policies; events of 1937–1939',
              'Lahore Resolution 1940 and subsequent developments',
              'Plans for partition of South Asia; major actors',
              'Quaid-i-Azam, Mohsin-ul-Mulk, Syed Ameer Ali, Ali Brothers, Sir Agha Khan, Chaudhry Rahmat Ali and others'
            ]
          },
          {
            title: 'VI. History of Pakistan (1947–to date)',
            description: 'Early challenges and constitutional development.',
            topics: [
              'Pakistan’s early challenges; Quaid-i-Azam as Governor General',
              'Constitution making attempts and milestones'
            ]
          },
          {
            title: 'VII. Military in Politics',
            description: 'Civil–military relations and regimes.',
            topics: [
              'Ayub Khan, Yahya Khan, Zia-ul-Haq and Pervez Musharraf regimes',
              'Civil–military relations in Pakistan'
            ]
          },
          {
            title: 'VIII. Separation of East Pakistan',
            description: 'Background, causes and consequences of 1971.',
            topics: [
              'Political, social and economic factors; war and aftermath'
            ]
          },
          {
            title: 'IX. Working of Democracy in Pakistan',
            description: 'Democratic eras, leadership and party politics.',
            topics: [
              'From Liaquat Ali Khan to Feroz Khan Noon (1947–1958)',
              'Zulfikar Ali Bhutto period (1971–1977)',
              'Benazir Bhutto and Nawaz Sharif eras; Restoration of Democracy (1988–1999)',
              'Restoration of Democracy (2008 to date)',
              'Role of major political parties and pressure groups'
            ]
          },
          {
            title: 'X. Foreign Policy of Pakistan (1947–1999)',
            description: 'Pakistan’s external relations and major phases.',
            topics: [
              'Key determinants, shifts and events in foreign policy during 1947–1999'
            ]
          }
        ],
        recommendedBooks: [
          'Political Parties in Pakistan: 1947–1958 by M. Rafique Afzal (1986)',
          'Government & Politics in Pakistan by Mushtaq Ahmad (1970)',
          'Party Politics in Pakistan: 1947–58 by K.K. Aziz (1976)',
          'India’s Struggle for Independence by Bipin Chandra (1989)',
          'Constitutional Development in Pakistan by G.W. Chaudhary (1959)',
          'Wavell and the Days of the Raj by Muhammad Iqbal Chawla (2011)',
          'Nationalism and Communal Politics in India by Mushirul Hassan (1991)',
          'The Charismatic Leader: Jinnah and the Creation of Pakistan by Sikandar Hayat (2007)',
          'The Culture of Power and Governance of Pakistan 1947–2008 by Ilhan Niaz (2011)',
          'Muslim Civilization of Indo-Pakistan by Shaikh Muhammad Ikram (1966)',
          'Pakistan’s Failure in National Integration by Rounaq Jahan (1972)',
          'Constitutional and Political History of Pakistan by Hamid Khan (2005)',
          'The Muslim Politics in Punjab by Qalb-i-Abid (1992)',
          'The Muslim Community of the Indo-Pak by Ishtiaq Hussain Qureshi (1962)',
          'The Struggle for Pakistan by Ishtiaq Hussain Qureshi (1965)',
          'Pakistan: The Formative Phase by Khalid bin Sayeed (1968)',
          'The Military and Politics in Pakistan 1947–86 by Hassan Askari Rizvi',
          'Pakistan: A New History by Ian Talbot (1999)',
          'Politics and the State in Pakistan by Mohammad Waseem (1989)',
          'Jinnah of Pakistan by Stanley Wolpert (1984)'
        ],
        examPattern: 'Single paper, 100 marks covering 10 sections from Muslim and British rule to Pakistan’s politics, democracy, foreign policy and key movements.',
        preparationTips: [
          'Build a chronological timeline from 712 to present for both India and Pakistan',
          'Link constitutional reforms to political movements and leadership',
          'Prepare short notes on key personalities and their contributions',
          'Use maps and primary documents where possible (acts, reports, speeches)',
          'Practice past papers focusing on analytical essays and cause–effect questions'
        ]
      },
      'history-usa': {
        subjectId: 'history-usa',
        subjectName: 'History of USA',
        subjectType: 'optional',
        subjectGroup: 'group4',
        code: 'OG4-5',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Introduction',
            topics: [
              'From ancient times to 1492',
              'Advent of the Europeans to British supremacy (1492–1606)'
            ]
          },
          { title: 'II. USA as a British Colony (1606–1783)', topics: [] },
          { title: 'III. USA as an Independent Country (1783–1819)', topics: [] },
          { title: 'IV. Expansion of USA: From 13 to 50 States (1820–1949)', topics: [] },
          { title: 'V. Constitution of the USA: Salient Features', topics: [] },
          { title: 'VI. Civil War between the North and the South (1850–1869)', topics: [] },
          { title: 'VII. Industrialization and Emergence as a World Power (1870–1916)', topics: [] },
          { title: 'VIII. USA’s Role in the Two World Wars (1914–1918 & 1939–1945)', topics: [] },
          { title: 'IX. Post-1945 Scenario and Emergence of USA and USSR as Two World Powers', topics: [] },
          { title: 'X. American Role in Patronizing UNO and International Organizations (1945–2012)', topics: [] },
          { title: 'XI. American Role in Cold War and Emergence as the Sole Super Power (1945–1990)', topics: [] },
          { title: 'XII. International Concerns of USA: An Overview', topics: [] },
          { title: 'XIII. The War on Terror: The Role of Pakistan and USA (2001–2012)', topics: [] },
          { title: 'XIV. Global Perceptions of the USA', topics: [] },
          { title: 'XV. Progressive Era: Reforms of Theodore Roosevelt and Woodrow Wilson', topics: [] },
          { title: 'XVI. The Great Depression and the New Deal', topics: [] },
          { title: 'XVII. Civil Rights Movement', topics: [] },
          { title: 'XVIII. United States’ Role in International Conflicts', topics: [] },
          { title: 'XIX. US Presidential Election', topics: [] },
          { title: 'XX. The US Congress: Role and Functions', topics: [] },
          { title: 'XXI. Separation of Powers: Checks and Balances', topics: [] }
        ],
        recommendedBooks: [
          'The Ideological Origins of the American Revolution by Bernard Bailyn (1992)',
          'A Pocket History of the United States by H. Commager and Allan Nevins (1967)',
          'Painless American History by Curt Lader (2009)',
          'The Politically Incorrect Guide to American History by Thomas E. Woods Jr. (2004)',
          'The Civil War: A Narrative by Shelby Foote (1986)',
          'The American Political Tradition and the Men Who Made It by Richard Hofstadter (1948)',
          'US–South Asian Relations 1784–1940: A History Perspective by Iftikhar H. Malik (2006)',
          'The Tragedy of Great Power Politics by John Mearsheimer (2001)',
          'Enlightenment Revolution and the Birth of Modern Nation (Thomas Paine) by Craig Nelson (2006)',
          'The USA: 1917–1980 by Nigel Smith (2006)',
          'American Colonies: The Selling of North America by Alan Taylor (2002)',
          'White Over Black: American Attitudes Toward the Negro 1550–1812 by Winthrop D. Jordan',
          'The Complete Book of U.S. Presidents by William A. DeGregorio (2005)',
          'A People’s History of the United States: 1492 to Present by Howard Zinn (1980)'
        ],
        examPattern: 'Single paper, 100 marks covering 21 sections from origins and colonial era to institutions, reforms, world role and checks and balances.',
        preparationTips: [
          'Build a periodized outline from colonial era to contemporary times',
          'Track territorial expansion, industrialization and institutional evolution',
          'Prepare concise briefs on the Civil War, Progressive reforms, New Deal and Civil Rights Movement',
          'Link US foreign policy phases (World Wars, Cold War, War on Terror) to domestic politics',
          'Understand constitutional structure: Congress, presidency, elections and checks and balances'
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
      'environmental-sciences': {
        subjectId: 'environmental-sciences',
        subjectName: 'Environmental Science',
        subjectType: 'optional',
        subjectGroup: 'group5',
        code: 'OG5-2',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. History of Environmental Thought',
            topics: [
              'Environment and Sustainable Development',
              'History of environmental movements',
              'Industrial and Agricultural Revolutions',
              'UN Conference on Human Environment 1972, Our Common Future 1987',
              'Rio Summit 1992, Agenda 21, World Summit on Sustainable Development 2002',
              'Rio+20 Summit 2012, Millennium Development Goals'
            ]
          },
          {
            title: 'II. Sustainable Development Issues',
            topics: [
              'Population growth and urbanization',
              'Poverty and food security',
              'Biodiversity loss and conservation',
              'Energy security and renewable energy',
              'Carrying capacity and ecological footprint',
              'Sustainable agriculture and climate-resilient development'
            ]
          },
          {
            title: 'III. Interdisciplinary Nature of Environmental Science',
            topics: [
              'Convergence of social and natural sciences',
              'Environmental biology, chemistry, physics and microbiology',
              'Environmental toxicology and health',
              'Environmental economics and policy',
              'Environmental geography and geology',
              'Environmental sociology'
            ]
          },
          {
            title: 'IV. Environmental Pollution',
            topics: [
              'Air, water and soil pollution',
              'Noise pollution',
              'Solid waste, water logging and salinity',
              'Deforestation, desertification and land degradation',
              'Eutrophication and global/regional air pollution',
              'Acid rain, photochemical smog and climate change linkages'
            ]
          },
          {
            title: 'V. Climate Change',
            topics: [
              'Climate patterns at local, regional and global scales',
              'Types and indicators of climate change',
              'Effects on natural and societal systems',
              'Carbon footprint; mitigation and adaptation',
              'CDM, REDD+ and global climate politics (role of India, China, USA; Copenhagen 2009)'
            ]
          },
          {
            title: 'VI. Environmental Governance',
            topics: [
              'Policy, legal and institutional frameworks in Pakistan',
              'National Conservation Strategy 1992; NEP 2005; PEPA 1997 and EIA/IEE rules',
              'Municipal and hazardous waste rules; drinking water policy',
              'National Climate Change Policy 2012'
            ]
          },
          {
            title: 'VII. Global Initiatives',
            topics: [
              'Convention on Biological Diversity (CBD) and Cartagena Protocol',
              'CITES and Ramsar Convention; World Heritage Convention',
              'UNFCCC and Kyoto Protocol; UNCCD',
              'Montreal Protocol on Substances that Deplete the Ozone Layer',
              'United Nations initiatives on sustainable development'
            ]
          },
          {
            title: 'VIII. Environmental Assessment and Management',
            topics: [
              'Environmental Impact Assessment (EIA) and Strategic Environmental Assessment (SEA)',
              'Environmental Management Systems (ISO 14000) and OHSAS 18000',
              'Participatory and technological approaches to environmental management',
              'Solid waste management; disaster risk management',
              'Pollution control technologies',
              'GIS & Remote Sensing; Natural resources management'
            ]
          }
        ],
        recommendedBooks: [
          'Environmental Economics in Theory and Practice by Hanley, Shogren & White',
          'Industrial Safety Health and Environmental Management by R.K. Jain & S.S. Rao',
          'Environmental Science: Earth as a Living Planet by Botkin & Keller (2014)',
          'Environmental Geology Facing the Challenges of Our Changing Earth by Erickson',
          'Environmental Geology by Keller & Edward',
          'Earth Science by Tarbuck, Lutgens & Frederick',
          'Environmental Science: A Study of Interrelationships by Enger & Smith',
          'Basics of Forestry & Applied Sciences by Masood A.A. Qureshi',
          'Environmental Science: Working with Earth by T.G. Miller',
          'Disaster Management: A Disaster Manager’s Handbook by Carter N.W.',
          'Disasters and Development by Cuny F.C.',
          'Disaster Management: Warning Response and Community Relocation by Perry & Mushkatel',
          'Energy: Crisis or Opportunity by Diana Schumacher',
          'Environmental Health: Ecological Perspective by Kathryn Hilgenkamp',
          'Official Website of Govt. of Pakistan (www.environment.gov.pk)',
          'Official Website of UN Environment Programme (www.unep.org)'
        ],
        examPattern: 'Single paper, 100 marks covering 8 sections from evolution of thought and sustainable development to governance, global initiatives, and assessment/management.',
        preparationTips: [
          'Prepare crisp definitions and current examples for each section',
          'Link Pakistan policies with global agreements (UNFCCC, CBD, CITES, Montreal Protocol)',
          'Practice diagram-based answers (pollution pathways, EIA flow, climate drivers)',
          'Build updated notes on climate policy, SDGs and National Climate Change Policy',
          'Use case studies in water, solid waste and air pollution for applied answers'
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
      'law': {
        subjectId: 'law',
        subjectName: 'Law',
        subjectType: 'optional',
        subjectGroup: 'group6',
        code: 'OG6-1',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Definitions of Crime',
            description: 'Fundamental definitions and concepts related to crime in legal context.',
            topics: [
              'Comprehensive understanding of crime definitions and legal terminology',
              'Elements of crime: actus reus and mens rea',
              'Classification of crimes: felonies, misdemeanors, and offenses',
              'Criminal liability and defenses',
              'Principles of criminal law and justice'
            ]
          },
          {
            title: 'II. All Provisions of',
            description: 'Comprehensive study of major legal codes and procedures in Pakistan.',
            topics: [
              'i. Concept of arbitration: Arbitration with or without court intervention and in civil suits',
              'ii. Establishment of Civil Courts: Original & Appellate Jurisdiction',
              'iii. The Code of Civil Procedure, 1908: Complete procedural framework for civil litigation',
              'iv. Pakistan Penal Code, 1860: Substantive criminal law and offenses',
              'v. Qanun-e-Shahadat Order, 1984: Law of evidence and proof',
              'vi. Criminal Procedure Code, 1898: Procedural framework for criminal cases'
            ]
          }
        ],
        recommendedBooks: [
          'Pakistan Penal Code, 1860 by M. Mahmood',
          'Criminal Procedure Code, 1898 by Shaukat Mahmood',
          'Law of Evidence by Justice (R) Khalil ur Rahman Khan as adapted from Principles and Digest of the Law of Evidence by M. Monir',
          'Qanun-e-Shahadat Order, 1984',
          'The Code of Civil Procedure, 1908 by Aamir Raza A. Khan',
          'The Arbitration Laws in Pakistan by M. Mahmood',
          'Civil Courts Ordinance, 1962 by Nisar Ahmad Nisar'
        ],
        examPattern: 'Part I: Definitions of Crime + Part II: All Provisions of (Arbitration, Civil Courts, Civil Procedure Code, Penal Code, Evidence Law, Criminal Procedure Code) = 100 Marks',
        preparationTips: [
          'Master the fundamental definitions and concepts of crime',
          'Understand the elements of crime: actus reus and mens rea',
          'Study the classification of crimes and criminal liability',
          'Learn about criminal defenses and principles of justice',
          'Master the concept of arbitration and its applications',
          'Understand arbitration with and without court intervention',
          'Study arbitration in civil suits and commercial disputes',
          'Learn about the establishment and jurisdiction of civil courts',
          'Master original and appellate jurisdiction of civil courts',
          'Understand the complete framework of Civil Procedure Code, 1908',
          'Study civil litigation procedures and court processes',
          'Learn about pleadings, evidence, and judgment in civil cases',
          'Master the Pakistan Penal Code, 1860 comprehensively',
          'Understand substantive criminal law and various offenses',
          'Study criminal liability, punishments, and sentencing',
          'Learn about special laws and their relationship with PPC',
          'Master the Qanun-e-Shahadat Order, 1984',
          'Understand the law of evidence and proof in legal proceedings',
          'Study admissibility of evidence and burden of proof',
          'Learn about different types of evidence and their evaluation',
          'Master the Criminal Procedure Code, 1898',
          'Understand procedural framework for criminal cases',
          'Study investigation, trial, and appeal procedures',
          'Learn about arrest, bail, and preventive measures',
          'Understand the relationship between substantive and procedural law',
          'Study the role of police, prosecution, and judiciary',
          'Learn about constitutional safeguards in criminal procedure',
          'Master the interplay between different legal codes',
          'Understand the hierarchy of courts and their jurisdictions',
          'Study the role of legal professionals in the justice system',
          'Learn about alternative dispute resolution mechanisms',
          'Understand the evolution of legal system in Pakistan',
          'Study the impact of constitutional law on criminal and civil procedures',
          'Learn about human rights and due process in legal proceedings',
          'Master the principles of natural justice',
          'Understand the role of precedent and case law',
          'Study the interpretation of statutes and legal texts',
          'Learn about legal drafting and documentation',
          'Understand the role of legal aid and access to justice',
          'Study the challenges and reforms in the legal system',
          'Learn about international law and its domestic application',
          'Master the principles of legal ethics and professional conduct',
          'Understand the role of technology in modern legal practice',
          'Study the relationship between law and society',
          'Learn about legal research and methodology',
          'Understand the role of legal education and training',
          'Study the future of legal profession and practice',
          'Read recommended books for comprehensive understanding',
          'Stay updated with recent legal developments and amendments',
          'Practice analyzing legal problems and case scenarios',
          'Understand the practical application of legal principles',
          'Study landmark judgments and their significance',
          'Learn about comparative legal systems and practices',
          'Master the art of legal argumentation and advocacy',
          'Understand the role of legal institutions in governance',
          'Study the relationship between law and public policy'
        ]
      },
      'mercantile-law': {
        subjectId: 'mercantile-law',
        subjectName: 'Mercantile Law',
        subjectType: 'optional',
        subjectGroup: 'group6',
        code: 'OG6-5',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Law of Contract, 1872',
            description: 'Comprehensive study of contract law principles and applications.',
            topics: [
              'Definitions and fundamental concepts of contract law',
              'Essentials of a valid contract: Proposal, Acceptance, Consideration, Free consent, Capacity of Parties, Not hereby declared to be Void',
              'Kinds of Contracts: Valid, Void, Voidable, Not Voidable',
              'Variety of Contracts: Contingent, Quasi Bailment, Pledge, Indemnity, Agency',
              'Performance of Contract, contracts that need not to be performed',
              'Breach of contract, consequences of breach, damages for breach of contract'
            ]
          },
          {
            title: 'II. Sales of Goods Act, 1930',
            description: 'Study of sale of goods and commercial transactions.',
            topics: [
              'Definitions and scope of sales law',
              'Differences: Sale & agreement to sell, conditions and warranties, express & implied conditions',
              'Doctrines: Caveat emptor, Nemo dat quod non habet',
              'Right and duties of seller & buyer, rights of unpaid seller',
              'Transfer of property and risk in goods',
              'Remedies for breach of contract of sale'
            ]
          },
          {
            title: 'III. Partnership Act, 1932',
            description: 'Understanding of partnership law and business relationships.',
            topics: [
              'Definitions and nature of partnership',
              'Essentials of partnership and partnership agreement',
              'Kinds of partnership: partnership at will, particular partnership, limited partnership',
              'Rights and duties of Partners',
              'Relation of partners to third persons: implied authority of partner, doctrine of holding out',
              'Incoming and outgoing partners, including minor partners',
              'Dissolution of firms: compulsory, by agreement, by court, by notice on happening of contingencies'
            ]
          },
          {
            title: 'IV. Negotiable Instrument Act, 1881',
            description: 'Study of negotiable instruments and banking law.',
            topics: [
              'Definitions and characteristics of negotiable instruments',
              'Types of negotiable instruments: Cheque, bill of exchange, promissory note',
              'Parties to instruments, holder & holder in due course',
              'Rules: as to negotiation, presentment, payment & interest, discharge, noting and protest, compensation, acceptance, payment for honour',
              'Special rules of evidence',
              'Special provisions relating to cheques & bills of exchange: dishonor, duties of banker',
              'Provisions as to foreign instruments'
            ]
          },
          {
            title: 'V. Competition Act, 2010',
            description: 'Modern competition law and anti-trust regulations.',
            topics: [
              'Definitions and objectives of competition law',
              'Prohibition and abuse of: dominant position, certain agreements, discipline, marketing practices',
              'Approval of mergers and acquisitions',
              'Competition Commission of Pakistan: establishment, composition, term',
              'Functions and powers of commission',
              'Provisions as to penalty and appeals'
            ]
          },
          {
            title: 'VI. Electronic Transaction Ordinance, 2002',
            description: 'Digital commerce and electronic transactions law.',
            topics: [
              'Definitions and scope of electronic transactions',
              'Recognition and presumption of electronic transactions: writing, signature, stamp duty, attestation etc.',
              'Electronic documents: attribution, acknowledgement, time and place of dispatch',
              'Certification of service providers',
              'Application to acts done outside Pakistan',
              'Offences & Nature: false information, false certificates, damage to information system etc'
            ]
          },
          {
            title: 'VII. The Arbitration Law in Pakistan',
            description: 'Alternative dispute resolution and arbitration procedures.',
            topics: [
              'Definitions and scope of arbitration law',
              'Appointment, number and removal of arbitrator',
              'Award by arbitrator and its enforcement',
              'Powers of court upon award: remittance, modification and setting aside of award',
              'Types of arbitration: with or without intervention of court',
              'Stay of legal proceedings in presence of arbitration agreement'
            ]
          },
          {
            title: 'VIII. Consumer\'s Protection Act, 2006',
            description: 'Consumer rights and protection mechanisms.',
            topics: [
              'Definitions and scope of consumer protection',
              'Consumer Commission: establishment, powers and functions, complaints before commission and disposal',
              'Provisions as to compulsory recall of goods',
              'Duties and liabilities of provider of goods: return and refund of goods',
              'Offences and penalties',
              'Contract between consumer and provider'
            ]
          },
          {
            title: 'IX. Companies Ordinance, 1984',
            description: 'Corporate law and company regulations.',
            topics: [
              'Definitions and types of companies',
              'Types of Companies: public, private, limited, unlimited',
              'Fundamental papers of company: Memorandum of association, articles of association, prospectus',
              'Transfer of shares and debentures',
              'Management and administration: promoters, shareholders, directors, chief executive, auditors',
              'Meeting\'s and proceedings: statutory, general, annual general meeting',
              'Winding up: voluntary, by court'
            ]
          },
          {
            title: 'X. Electronic Fund Transfer Act, 2007',
            description: 'Digital banking and electronic payment systems.',
            topics: [
              'Definitions and scope of electronic fund transfers',
              'Payment system and their operation: designation of payment system & revocation, real time gross settlement system, governance & operation arrangement',
              'Payment instruments: designation, issuing and prohibition of instruments',
              'Clearing and other obligations',
              'Supervisory Control of State Bank',
              'Documentation of transfers',
              'Notification of error and liabilities of parties',
              'Law relating to action before court'
            ]
          }
        ],
        recommendedBooks: [
          'Law of Contract by Agarwala, M. Mehmood',
          'Sales of Goods Act by Pollock & Mulla',
          'Contract Act, 1872 (Bare Act - Government of Pakistan)',
          'Negotiable Instrument Act, 1881 (Bare Act - Government of Pakistan)',
          'Sale of Goods Act, 1930 (Bare Act - Government of Pakistan)',
          'Companies Ordinance, 1964 (Bare Act - Government of Pakistan)',
          'Arbitration Act, 1940 (Bare Act - Government of Pakistan)',
          'Competition Act, 2010 (Bare Act - Government of Pakistan)',
          'Electronic Transactions Ordinance, 2002 (Bare Act - Government of Pakistan)',
          'Consumers\' Protection Act, 2006 (Bare Act - Government of Pakistan)',
          'Electronic Fund Transfer Act, 2007 (Bare Act - Government of Pakistan)'
        ],
        examPattern: '10 comprehensive sections covering Contract Law, Sales of Goods, Partnership, Negotiable Instruments, Competition Law, Electronic Transactions, Arbitration, Consumer Protection, Companies Ordinance, and Electronic Fund Transfer = 100 Marks',
        preparationTips: [
          'Master the fundamental principles of contract law',
          'Understand the essentials of a valid contract',
          'Study different types of contracts and their characteristics',
          'Learn about breach of contract and remedies',
          'Master the Sales of Goods Act and commercial transactions',
          'Understand the doctrines of caveat emptor and nemo dat',
          'Study partnership law and business relationships',
          'Learn about rights and duties of partners',
          'Master the Negotiable Instruments Act',
          'Understand different types of negotiable instrument',
          'Study banking law and duties of bankers',
          'Learn about the Competition Act and anti-trust regulations',
          'Understand abuse of dominant position and anti-competitive practices',
          'Master the Electronic Transaction Ordinance',
          'Study digital signatures and electronic documents',
          'Learn about cyber law and electronic commerce',
          'Understand arbitration law and alternative dispute resolution',
          'Study the appointment and powers of arbitrators',
          'Master the Consumer Protection Act',
          'Understand consumer rights and protection mechanisms',
          'Learn about the Companies Ordinance and corporate law',
          'Study company formation and management',
          'Understand corporate governance and meetings',
          'Master the Electronic Fund Transfer Act',
          'Study digital banking and payment systems',
          'Learn about State Bank regulations and supervision',
          'Understand the interplay between different commercial laws',
          'Study landmark case laws and their significance',
          'Learn about international commercial law principles',
          'Master the practical application of mercantile law',
          'Understand the role of courts in commercial disputes',
          'Study the evolution of commercial law in Pakistan',
          'Learn about modern challenges in commercial law',
          'Understand the relationship between law and commerce',
          'Study the role of regulatory bodies in commercial law',
          'Learn about compliance and enforcement mechanisms',
          'Master the interpretation of commercial statutes',
          'Understand the role of legal professionals in commercial law',
          'Study the future of commercial law and digital commerce',
          'Learn about international trade law and its impact',
          'Understand the role of arbitration in international commerce',
          'Study the protection of intellectual property in commerce',
          'Learn about insolvency and bankruptcy law',
          'Understand the role of insurance in commercial transactions',
          'Study the regulation of financial markets',
          'Learn about corporate social responsibility and law',
          'Master the drafting of commercial contracts',
          'Understand the role of due diligence in commercial transactions',
          'Study the enforcement of commercial judgments',
          'Learn about the role of mediation in commercial disputes',
          'Understand the impact of technology on commercial law',
          'Study the regulation of e-commerce platforms',
          'Learn about data protection in commercial transactions',
          'Read recommended books and bare acts for comprehensive understanding',
          'Stay updated with recent amendments and developments',
          'Practice analyzing commercial law problems and case scenarios',
          'Understand the practical application of commercial law principles',
          'Study landmark judgments and their commercial significance',
          'Learn about comparative commercial law and international practices',
          'Master the art of legal argumentation in commercial disputes',
          'Understand the role of commercial law in economic development',
          'Study the relationship between commercial law and public policy'
        ]
      },
      'muslim-law-jurisprudence': {
        subjectId: 'muslim-law-jurisprudence',
        subjectName: 'Muslim Law & Jurisprudence',
        subjectType: 'optional',
        subjectGroup: 'group6',
        code: 'OG6-4',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. The Sources of Islamic Law',
            topics: [
              'The Quran',
              'The Sunnah',
              'Ijma',
              'Qiyas',
              'Ijtehad'
            ]
          },
          { title: 'II. Principles of Islamic Jurisprudence', topics: [] },
          {
            title: 'III. Islamic Criminal Law',
            topics: [
              'Hadd',
              'Taz’ir',
              'Qisas and Diyat'
            ]
          },
          {
            title: 'IV. Islamic Family Law',
            topics: [
              'Marriage and Dower',
              'Divorce',
              'Separation by Repudiation (Talaq)',
              'Separation by Mutual Agreement (Khula)',
              'Judicial Separation (Faskh)',
              'Post-divorce maintenance',
              'Child custody',
              'Succession'
            ]
          },
          { title: 'V. Islamic Law of Contract', topics: [] },
          { title: 'VI. Islamic Banking and Insurance', topics: [] },
          { title: 'VII. Islamic International Law', topics: [] },
          { title: 'VIII. Islamic Law and Human Rights', topics: [] },
          { title: 'IX. Dissolution of Muslim Marriages Act, 1939', topics: [] },
          { title: 'X. Muslim Family Laws Ordinance 1961', topics: [] }
        ],
        recommendedBooks: [
          'An Introduction to the Study of Islamic Law by Hussain Hamid Hassan',
          'Principles of Islamic Jurisprudence by Mohammad Hashim Kamali',
          'Theories of Islamic Law by Imran Ahsan Nyazee',
          'Islamic Law of Contracts and Business Transactions by Tahir Mansuri',
          'Family Law in Islam by Mohammad Tahir Mansuri',
          'Outlines of Islamic Jurisprudence by Imran Ahsan Nyazee',
          'General Principles of Criminal Law by Imran Ahsan Nyazee',
          'State and Legislation in Islam by Mahmood Ahmad Gazi',
          'Mahomedan Jurisprudence by Abdur Rahim',
          'Islamic Law of Inheritance by Hamid Khan',
          'Munir Principles of Muhammadan Law by Munir Ahmad Siddiqui'
        ],
        examPattern: 'Single paper, 100 marks covering sources, usul al-fiqh, criminal and family law, contracts, banking and insurance, international law, human rights, and key Pakistani statutes.',
        preparationTips: [
          'Prepare concise notes of sources and principles with contemporary applications',
          'Use case-based approach for family law and criminal law doctrines',
          'Link Islamic banking concepts with modern finance instruments',
          'Review Pakistani statutes (DMMA 1939; MFLO 1961) with case law summaries',
          'Practice structured answers citing Quran, Sunnah and classical jurists where relevant'
        ]
      },
      'pashto': {
        subjectId: 'pashto',
        subjectName: 'Pashto',
        subjectType: 'optional',
        subjectGroup: 'group7',
        code: 'OG7-5',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Origin of Pashto Language, its Dialects and Alphabets',
            description: 'Study of Pashto language origins, regional variations, and writing systems.',
            topics: [
              'Historical development and origins of Pashto language',
              'Geographical distribution and regional dialects of Pashto',
              'Pashto alphabet system and writing conventions',
              'Phonological characteristics and sound patterns',
              'Linguistic classification and relationship with other languages',
              'Evolution of Pashto script and orthography'
            ]
          },
          {
            title: 'II. Pashto Grammar',
            description: 'Comprehensive study of Pashto grammar and linguistic structure.',
            topics: [
              'Morphology and word formation in Pashto',
              'Syntax and sentence structure',
              'Parts of speech and grammatical categories',
              'Verb conjugation and tense system',
              'Noun declension and case system',
              'Adjective and adverb formation',
              'Pronouns and their usage patterns'
            ]
          },
          {
            title: 'III. General Questions on History of Pashto Literature and Literary Movements',
            description: 'Overview of Pashto literary history and cultural movements.',
            topics: [
              'Historical development of Pashto literature',
              'Major literary movements and their characteristics',
              'Influence of cultural and political factors on literature',
              'Evolution of literary forms and genres',
              'Role of oral tradition in Pashto literature',
              'Impact of modernization on literary expression'
            ]
          },
          {
            title: 'IV. Essay on Prominent Aspects of Pashto Culture, Historical and Literary Personalities',
            description: 'Study of Pashto cultural heritage and notable figures.',
            topics: [
              'Key aspects of Pashto culture and traditions',
              'Historical personalities and their contributions',
              'Literary figures and their impact on Pashto literature',
              'Cultural values and social customs',
              'Role of tribal structure in Pashto society',
              'Influence of religion and spirituality on culture'
            ]
          },
          {
            title: 'V. Translation of Unseen Passages from Pashto into English or Urdu',
            description: 'Translation skills and language proficiency.',
            topics: [
              'Translation techniques and methodologies',
              'Understanding of Pashto texts and contexts',
              'Accuracy in translation and meaning preservation',
              'Cultural nuances and idiomatic expressions',
              'Grammar and syntax in translation',
              'Vocabulary and terminology management'
            ]
          },
          {
            title: 'VI. Translation of Unseen Passages of English or Urdu into Pashto',
            description: 'Reverse translation and language production skills.',
            topics: [
              'Translation from English/Urdu to Pashto',
              'Maintaining Pashto linguistic structure',
              'Cultural adaptation in translation',
              'Style and register in Pashto writing',
              'Grammar and vocabulary accuracy',
              'Preservation of original meaning and intent'
            ]
          },
          {
            title: 'VII. General Questions on Evolution and Criticism of Pashto Prose and Poetry',
            description: 'Critical analysis of Pashto literary forms.',
            topics: [
              'Evolution of Pashto prose forms and styles',
              'Development of Pashto poetry and poetic traditions',
              'Literary criticism and analytical approaches',
              'Modern trends in Pashto literature',
              'Comparative analysis of literary works',
              'Theoretical frameworks for literary analysis'
            ]
          },
          {
            title: 'VIII. Pashto Classic Poetry',
            description: 'Study of classical Pashto poets and their works.',
            topics: [
              'Khoshal Khan Khattak: Life, works, and literary contribution',
              'Rehman Baba: Poetry, themes, and spiritual influence',
              'Abdul Hamid Baba: Literary style and contributions',
              'Ali Khan: Poetic works and themes',
              'Kazim Khan Sheda: Literary achievements and impact',
              'Classical poetic forms and traditional themes'
            ]
          },
          {
            title: 'IX. Pashto Modern Poetry',
            description: 'Contemporary Pashto poetry and modern poets.',
            topics: [
              'Amir Hamza Khan Shinwari: Modern poetic innovations',
              'Ghani Khan: Philosophy and poetic expression',
              'Qalandar Momand: Contemporary themes and style',
              'Abdur Rahim Majzoob: Modern literary contributions',
              'Younas Khalil: Contemporary poetic voice',
              'Modern poetic forms and experimental styles'
            ]
          },
          {
            title: 'X. Pashto Folk Literature',
            description: 'Traditional folk literature and oral traditions.',
            topics: [
              'Tappa: Traditional Pashto folk poetry form',
              'Charbaita: Four-line folk poetry and its characteristics',
              'Neemakai: Folk songs and musical traditions',
              'Badala: Traditional storytelling and narrative forms',
              'Pashto proverbs and their cultural significance',
              'Oral tradition and its preservation in modern times'
            ]
          }
        ],
        recommendedBooks: [
          'Life and Works of the Illustrious Khushal Khan Khattak by Dr. Khadeeja Feroz Ud Deen',
          'The Pathans by Sir Olaf Careo',
          'Selected poems of Khushal Khan Khattak by Major Raverty',
          'The Rowshanites and Pashto Literature by Dr. Yar Muhammad Maghmoom',
          'History of Pashto Literature, Vol. 1 & 2 by Abdul Hayy Habibi',
          'In the Mirror of Pashtun History by Syed Bahadur Shah Zafar Kakakhail',
          'Morphology and Syntax/Grammar by Khayal Bukhari',
          'Roohi Literature by Professor Muhammad Nawaz Tair',
          'Pashto Literary Movements by Dr. Raj Wali Shah Khushk',
          'Roohi Songs by Salma Shabbin',
          'Pashto Writers, Vol. 1 & 2 by Bamesh Khalil',
          'Folk Songs of the Frontier by Farigh Bukhari',
          'Khushal Khan Khak (Urdu) by Dost Muhammad Khan Kamil Momand',
          'A Brief History of Pashto Language and Literature by Dr. Abdullah Jan Abid',
          'Pashto Social Study by Dakar Noor Muhammad Danish Bi Ne',
          'Pashto and Orientalists by Dr. Muhammad Javed Khalil',
          'Literature is 4 by Sahar Yousafzai',
          'You Are by Dawar Khan Daud',
          'A Historical and Critical Review of Pashto Prose by Bibi Maryam'
        ],
        examPattern: '10 comprehensive sections covering Language Origins, Grammar, Literature History, Culture, Translation Skills, Literary Criticism, Classic Poetry, Modern Poetry, and Folk Literature = 100 Marks',
        preparationTips: [
          'Master the fundamental structure and grammar of Pashto language',
          'Understand the historical development and origins of Pashto',
          'Study different dialects and regional variations of Pashto',
          'Learn about Pashto alphabet and writing conventions',
          'Master Pashto grammar including morphology and syntax',
          'Understand verb conjugation and tense system in Pashto',
          'Study noun declension and case system',
          'Learn about parts of speech and grammatical categories',
          'Master the history of Pashto literature and literary movements',
          'Understand the evolution of literary forms and genres',
          'Study the influence of cultural factors on Pashto literature',
          'Learn about oral tradition and its role in literature',
          'Master key aspects of Pashto culture and traditions',
          'Study historical and literary personalities',
          'Understand the role of tribal structure in Pashto society',
          'Learn about cultural values and social customs',
          'Master translation techniques from Pashto to English/Urdu',
          'Practice translation from English/Urdu to Pashto',
          'Understand cultural nuances and idiomatic expressions',
          'Study accuracy in translation and meaning preservation',
          'Master the evolution of Pashto prose and poetry',
          'Understand literary criticism and analytical approaches',
          'Study modern trends in Pashto literature',
          'Learn about theoretical frameworks for literary analysis',
          'Master the works of classical poets: Khoshal Khan Khattak, Rehman Baba',
          'Study Abdul Hamid Baba, Ali Khan, Kazim Khan Sheda',
          'Understand classical poetic forms and traditional themes',
          'Learn about modern poets: Amir Hamza Khan Shinwari, Ghani Khan',
          'Study Qalandar Momand, Abdur Rahim Majzoob, Younas Khalil',
          'Understand modern poetic forms and experimental styles',
          'Master Pashto folk literature: Tappa, Charbaita, Neemakai',
          'Study Badala and traditional storytelling forms',
          'Learn about Pashto proverbs and their cultural significance',
          'Understand oral tradition and its preservation',
          'Study the relationship between language and culture',
          'Learn about the impact of modernization on Pashto literature',
          'Understand the role of religion and spirituality in literature',
          'Master comparative analysis of literary works',
          'Study the influence of political factors on literature',
          'Learn about the preservation of cultural heritage',
          'Understand the role of education in language development',
          'Study the relationship between oral and written literature',
          'Learn about the impact of technology on language use',
          'Understand the role of media in language promotion',
          'Master the interpretation of complex literary texts',
          'Study the evolution of Pashto script and orthography',
          'Learn about phonological characteristics and sound patterns',
          'Understand linguistic classification and language relationships',
          'Study the role of translation in cultural exchange',
          'Learn about the challenges of preserving minority languages',
          'Understand the future of Pashto language and literature',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current developments in Pashto literature',
          'Practice reading and writing in Pashto regularly',
          'Understand the practical application of linguistic principles',
          'Study the cultural significance of literary works',
          'Learn about the role of Pashto in national identity',
          'Master the art of literary analysis and criticism',
          'Understand the relationship between language and power',
          'Study the role of literature in social change'
        ]
      },
      'persian': {
        subjectId: 'persian',
        subjectName: 'Persian',
        subjectType: 'optional',
        subjectGroup: 'group7',
        code: 'OG7-6',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Part-I: Language, Literature History, and Grammar (50 Marks)',
            description: 'Comprehensive study of Persian language development, literature history, and grammatical features.',
            topics: [
              'Pre-Islamic Persian languages: Avesta, Old Persian, Pahlavi',
              'Origin and development of New Persian including Revivalist and Purist movements',
              'Classical Persian literature from Samanid period to Mushrootah Movement',
              'Prose writers and poets from 4th to 10th century H',
              'Contemporary Persian literature: New Poetry and Fiction',
              'Persian language and literature in Afghanistan, Tajikistan, and Indo-Pakistan Subcontinent',
              'Significant grammatical features: nouns, verbs, pronouns, adjectives, adverbs, prepositions, interjections/sounds',
              'Classical styles: Khurasani, Iraqi, Hindi, Revivalist',
              'Short essay writing in Persian',
              'Translation of simple English passage into Persian'
            ]
          },
          {
            title: 'Part-II: Prescribed Texts - Prose Works (25 Marks)',
            description: 'Critical study of selected Persian prose works with specific chapters and sections.',
            topics: [
              'Kimiya-yi Sa\'ādat by Imam Muhammad Ghazali: On the Conduct of Subjects and Governance',
              'Kashf al-Mahjub by Ali bin Usman Hujwiri: Chapter on Sufism',
              'Siyasatnama by Nizam al-Mulk Tusi: Chapter 6 - On Judges, Orators, and Accountants',
              'Gulistan by Saadi Shirazi: Specific stories from Chapter 1 and Chapter 2',
              'Fawa\'id al-Fu\'ad by Hasan Sijzi: Volume 2, Eighth Session',
              'Seh Tar (Fiction) by Jalal Al-e Ahmad'
            ]
          },
          {
            title: 'Part-II: Prescribed Texts - Poetry (25 Marks)',
            description: 'Critical study of selected Persian poetry from classical to modern periods.',
            topics: [
              'Ferdowsi - Shahnameh: In Praise of Wisdom, In Praise of Justice',
              'Mawlana Rumi - Masnavi Ma\'navi: The Song of the Reed, Story of the Old Harpist with Umar (RA) - Book 1, The Villager Scratching the Lion in the Dark - Book 2, Moses\' Disapproval of the Shepherd\'s Prayer - Book 2, Disagreement on the Nature and Form of the Elephant - Book 3',
              'Mawlana Rumi - Divan-e Shams: 5 specific ghazals',
              'Amir Khusrow - Divan-e Ghazaliyat: 5 specific ghazals with opening lines',
              'Hafez - Divan-e Hafez: 5 specific ghazals with opening lines',
              'Ghalib - Divan-e Ghalib Dehlavi: 4 specific ghazals with opening lines',
              'Allama Iqbal - Masnavi Asrar-e Khudi: Secrets of the Self, Plato, and the reality of poetry',
              'Allama Iqbal - Zabur-e Ajam: 3 specific poems',
              'Allama Iqbal - Armaghan-e Hejaz: 5 specific poems',
              'Nima Yooshij: "O People" (Poem)',
              'Ahmad Shamlou: "Until the Red Blossom of a Shirt" (Poem)',
              'Forough Farrokhzad: "My Heart Burns for the Garden" (Poem)',
              'Shafiei Kadkani: "The Second Millennium of the Mountain Deer" (Poem)'
            ]
          }
        ],
        recommendedBooks: [
          'Kimiya-yi Sa\'ādat by Imam Muhammad Ghazali',
          'Kashf al-Mahjub by Ali bin Usman Hujwiri',
          'Siyasatnama by Nizam al-Mulk Tusi',
          'Gulistan by Saadi Shirazi',
          'Fawa\'id al-Fu\'ad by Hasan Sijzi',
          'Seh Tar by Jalal Al-e Ahmad',
          'Shahnameh by Ferdowsi',
          'Masnavi Ma\'navi by Mawlana Rumi',
          'Divan-e Shams by Mawlana Rumi',
          'Divan-e Ghazaliyat by Amir Khusrow',
          'Divan-e Hafez by Hafez Shirazi',
          'Divan-e Ghalib Dehlavi by Mirza Ghalib',
          'Masnavi Asrar-e Khudi by Allama Iqbal',
          'Zabur-e Ajam by Allama Iqbal',
          'Armaghan-e Hejaz by Allama Iqbal',
          'Selected Poems by Nima Yooshij',
          'Selected Poems by Ahmad Shamlou',
          'Selected Poems by Forough Farrokhzad',
          'Selected Poems by Shafiei Kadkani',
          'A History of Persian Literature by Various Authors',
          'Persian Grammar and Syntax by Various Authors',
          'Classical Persian Literature: An Introduction by Various Authors',
          'Modern Persian Literature: Trends and Movements by Various Authors',
          'Persian Language and Culture by Various Authors',
          'Translation Studies in Persian Literature by Various Authors'
        ],
        examPattern: 'Part-I: Language, Literature History, and Grammar (50 Marks) + Part-II: Prescribed Texts - Prose Works (25 Marks) + Part-II: Prescribed Texts - Poetry (25 Marks) = 100 Marks',
        preparationTips: [
          'Master the historical development of Persian language from pre-Islamic to modern periods',
          'Understand the evolution of Persian literature through different dynasties',
          'Study pre-Islamic Persian languages: Avesta, Old Persian, Pahlavi',
          'Learn about the origin and development of New Persian',
          'Understand Revivalist and Purist movements in Persian literature',
          'Master classical Persian literature from Samanid to Mushrootah period',
          'Study prose writers and poets from 4th to 10th century H',
          'Learn about contemporary Persian literature and modern trends',
          'Understand Persian literature in Afghanistan, Tajikistan, and Indo-Pakistan',
          'Master significant grammatical features: nouns, verbs, pronouns, adjectives',
          'Study classical styles: Khurasani, Iraqi, Hindi, Revivalist',
          'Practice essay writing in Persian',
          'Master translation from English to Persian',
          'Study Kimiya-yi Sa\'ādat by Imam Ghazali thoroughly',
          'Understand Kashf al-Mahjub by Hujwiri and Sufism concepts',
          'Master Siyasatnama by Nizam al-Mulk Tusi and governance principles',
          'Study Gulistan by Saadi and its moral teachings',
          'Understand Fawa\'id al-Fu\'ad by Hasan Sijzi',
          'Study Seh Tar by Jalal Al-e Ahmad and modern fiction',
          'Master Shahnameh by Ferdowsi and epic poetry',
          'Study Masnavi Ma\'navi by Rumi and mystical poetry',
          'Understand Divan-e Shams by Rumi and ghazal tradition',
          'Master Divan-e Ghazaliyat by Amir Khusrow',
          'Study Divan-e Hafez and classical ghazal poetry',
          'Understand Divan-e Ghalib Dehlavi and Indian Persian poetry',
          'Master Allama Iqbal\'s Persian works: Asrar-e Khudi, Zabur-e Ajam, Armaghan-e Hejaz',
          'Study modern Persian poets: Nima Yooshij, Ahmad Shamlou, Forough Farrokhzad, Shafiei Kadkani',
          'Understand the transition from classical to modern Persian poetry',
          'Learn about the influence of Persian literature on other cultures',
          'Study the role of Persian in Islamic civilization',
          'Master critical analysis of Persian literary texts',
          'Understand the relationship between Persian language and culture',
          'Study the impact of political and social changes on Persian literature',
          'Learn about the preservation and promotion of Persian language',
          'Understand the role of translation in Persian literature',
          'Study the influence of Persian on Urdu and other regional languages',
          'Master the interpretation of complex Persian texts',
          'Learn about the role of Persian in diplomacy and international relations',
          'Understand the future of Persian language and literature',
          'Study the relationship between Persian and other Iranian languages',
          'Learn about the role of Persian in education and scholarship',
          'Master the art of literary criticism in Persian',
          'Understand the role of Persian in religious and philosophical discourse',
          'Study the influence of Persian on art and architecture',
          'Learn about the role of Persian in science and medicine',
          'Understand the impact of technology on Persian language use',
          'Study the role of media in promoting Persian literature',
          'Learn about the challenges of preserving classical Persian texts',
          'Understand the role of Persian in cultural exchange',
          'Master the practical application of Persian grammar',
          'Study the evolution of Persian script and calligraphy',
          'Learn about the role of Persian in historical documentation',
          'Understand the influence of Persian on music and poetry',
          'Study the role of Persian in Sufi literature and practices',
          'Learn about the impact of colonialism on Persian literature',
          'Understand the role of Persian in modern education',
          'Master the interpretation of Persian poetry and its symbolism',
          'Study the relationship between Persian and Arabic literature',
          'Learn about the role of Persian in Islamic scholarship',
          'Understand the influence of Persian on South Asian literature',
          'Study the role of Persian in court and administrative language',
          'Learn about the preservation of Persian manuscripts',
          'Understand the role of Persian in cultural diplomacy',
          'Study the impact of globalization on Persian language',
          'Learn about the role of Persian in academic research',
          'Master the art of Persian composition and writing',
          'Understand the role of Persian in religious texts and commentary',
          'Study the influence of Persian on regional languages and cultures',
          'Learn about the challenges of teaching Persian as a foreign language',
          'Understand the role of Persian in cross-cultural communication',
          'Study the future prospects of Persian language and literature',
          'Read recommended books and original texts for comprehensive understanding',
          'Stay updated with current developments in Persian studies',
          'Practice reading and writing in Persian regularly',
          'Understand the practical application of Persian in various contexts',
          'Study the cultural significance of Persian literary works',
          'Learn about the role of Persian in national and cultural identity',
          'Master the art of literary analysis and criticism in Persian',
          'Understand the relationship between language and power in Persian context',
          'Study the role of Persian literature in social and cultural change'
        ]
      },
      'political-science': {
        subjectId: 'political-science',
        subjectName: 'Political Science',
        subjectType: 'optional',
        subjectGroup: 'group1',
        code: 'OG1-4',
        marks: 200,
        duration: '6 Hours (2 Papers)',
        sections: [
          {
            title: 'Paper-I: Political Thought and Concepts (100 Marks)',
            description: 'Comprehensive study of Western and Muslim political thought, political concepts, and ideologies.',
            topics: [
              'Part-A (50 Marks): Western Political Thought - Plato, Aristotle, Machiavelli, Montesquieu, Hobbes, Locke, Rousseau, Kant, Mill, Bentham, Hegel, Marx, Lenin, Mao, Gramsci, Karl Popper, Pierre Bourdieu, John Rawls, Frances Fukuyama, Foucault, Derrida, Kierkegaard, Jean Paul Sartre, Rene Descartes',
              'Part-A (50 Marks): Muslim Political Thought - Al-Farabi, Al-Mawardi, Ibn Rushd, Imam Ghazali, Ibn Taymiyyah, Nizam-ul-Mulk Tusi, Ibn Khaldun, Shah Waliullah, Allama Muhammad Iqbal, Jamaluddin Afghani, Rashid Rida',
              'Part-B (50 Marks): State System - Nature and emergence of modern nation-state system, Islamic concept of state and Ummah',
              'Part-B (50 Marks): Political Concepts - Sovereignty, Justice, Law, Liberty, Freedom, Equality, Rights and Duties, Human Rights, Political Authority, Power',
              'Part-B (50 Marks): Comparative Politics - Political Socialization, Political Culture, Political Development, Political Recruitment, Social Change, Civil Society, Violence and Terrorism in Politics, Gender and Politics, Women Empowerment',
              'Part-B (50 Marks): Political Participation - Political Change and Revolution, Elections, Electoral System, Public Opinion, Propaganda, Political Parties, Pressure Groups, Lobbies',
              'Part-B (50 Marks): Political Institutions - Legislature, Executive, Judiciary, Political Elites, Civil and Military Bureaucracy',
              'Part-B (50 Marks): Forms of Government - Monarchy, Democratic, Dictatorship, Totalitarian/Authoritarian, Unitary, Federal, Confederation, Presidential, Parliamentary',
              'Part-B (50 Marks): Political Ideologies - Capitalism, Marxism, Communism, Socialism, Totalitarianism, Fascism, Nationalism, Islamic Political Ideology'
            ]
          },
          {
            title: 'Paper-II: Comparative Politics and Pakistan (100 Marks)',
            description: 'Study of comparative political systems, Pakistan\'s political system, and international relations.',
            topics: [
              'Local Self Government - Theory and practice with special reference to Pakistan, comparative analyses of systems of local governance, Public Administration, Public Policy',
              'Part-A (30 Marks): Comparative Political Systems - U.S.A, U.K, France, Germany',
              'Part-A (30 Marks): Global and Regional Integration - Globalization and Politics, Global Civil Society, Regional politico-economic integration, European Union, SAARC, ECO, IMF, WTO',
              'Part-B (70 Marks): Comparative Political Systems - Turkey, Iran, Malaysia, India, China',
              'Part-B (70 Marks): Political Movements in India (Colonial Period) - Rise of Muslim Nationalism in South Asia, Pakistan Movement, Sir Syed Ahmed Khan, Allama Muhammad Iqbal, Quaid-i-Azam Mohammad Ali Jinnah',
              'Part-B (70 Marks): Government and Politics in Pakistan - Constitution making 1947-1956, comparative analysis of 1956, 1962, 1973 Constitutions, Constitutional Amendments, Federal Structure, Central-Provincial relations after 18th amendment, Political Culture, Political Developments, Role of Civil and Military Bureaucracy, Judiciary, Feudalism, Dynastic Politics, Political Parties and Interest Groups, Elections and Voting Behavior, Religion and Politics, Ethnicity, National Integration',
              'Part-B (70 Marks): International Relations - History of International Relations (Post World War-II Period), Foreign Policy of Pakistan, National Interests and Major Determinants (Size/Geography, Economic Development, Security, Advancement in Technology, National Capacity, Political Parties/Leadership, Ideology, National Interest, Role of Press/Bureaucracy, Social Structure, Public Opinion, Diplomacy, Foreign Policy-making Process), External Factors (International Power Structure, International Organizations, World Public Opinion, Reaction of other States)'
            ]
          }
        ],
        recommendedBooks: [
          'Pakistan\'s Foreign Policy, 1947-2005 by Abdul Sattar',
          'Democracy and Authoritarianism in South Asia by Ayesha Jalal',
          'Politics Among Nations: The Struggle for Power and Peace by Hans J. Morgenthau',
          'International Relations: Politics and Economy in the 21st Century by William Nester',
          'The Republic by Plato',
          'Politics by Aristotle',
          'The Prince by Niccolò Machiavelli',
          'The Spirit of the Laws by Montesquieu',
          'Leviathan by Thomas Hobbes',
          'Two Treatises of Government by John Locke',
          'The Social Contract by Jean-Jacques Rousseau',
          'Critique of Pure Reason by Immanuel Kant',
          'On Liberty by John Stuart Mill',
          'Introduction to the Principles of Morals and Legislation by Jeremy Bentham',
          'Elements of the Philosophy of Right by G.W.F. Hegel',
          'The Communist Manifesto by Karl Marx and Friedrich Engels',
          'State and Revolution by Vladimir Lenin',
          'Selected Works of Mao Tse-tung',
          'Prison Notebooks by Antonio Gramsci',
          'The Open Society and Its Enemies by Karl Popper',
          'Distinction: A Social Critique of the Judgement of Taste by Pierre Bourdieu',
          'A Theory of Justice by John Rawls',
          'The End of History and the Last Man by Francis Fukuyama',
          'Discipline and Punish by Michel Foucault',
          'Of Grammatology by Jacques Derrida',
          'Fear and Trembling by Søren Kierkegaard',
          'Being and Nothingness by Jean-Paul Sartre',
          'Discourse on Method by René Descartes',
          'The Virtuous City by Al-Farabi',
          'The Ordinances of Government by Al-Mawardi',
          'Averroes\' Commentary on Plato\'s Republic by Ibn Rushd',
          'The Revival of Religious Sciences by Imam Ghazali',
          'Public Duties in Islam by Ibn Taymiyyah',
          'The Book of Government by Nizam al-Mulk Tusi',
          'The Muqaddimah by Ibn Khaldun',
          'Hujjat Allah al-Baligha by Shah Waliullah',
          'The Reconstruction of Religious Thought in Islam by Allama Muhammad Iqbal',
          'Selected Works by Jamaluddin Afghani',
          'Selected Works by Rashid Rida',
          'Comparative Politics: A Global Introduction by Michael J. Sodaro',
          'Political Science: An Introduction by Michael G. Roskin',
          'The Oxford Handbook of Political Science by Robert E. Goodin',
          'Political Theory: An Introduction by Andrew Heywood',
          'International Relations Theory by Tim Dunne, Milja Kurki, and Steve Smith',
          'Global Politics by Andrew Heywood',
          'Theories of International Relations by Scott Burchill',
          'Pakistan: A Modern History by Ian Talbot',
          'The Struggle for Pakistan by Ayesha Jalal',
          'Pakistan: The Formative Phase by Khalid B. Sayeed',
          'Constitutional and Political History of Pakistan by Hamid Khan',
          'Pakistan: Democracy, Development and Security Issues by Rasul Bakhsh Rais',
          'Pakistan\'s Political Development by Lawrence Ziring',
          'The Military and Politics in Pakistan by Hasan Askari Rizvi',
          'Pakistan: The State in Crisis by Shahid Javed Burki',
          'Pakistan: A Hard Country by Anatol Lieven',
          'The Future of Pakistan by Stephen P. Cohen',
          'Pakistan: Between Mosque and Military by Husain Haqqani',
          'Pakistan: Eye of the Storm by Owen Bennett Jones',
          'Pakistan: A Personal History by Imran Khan',
          'Pakistan: A New History by Ian Talbot'
        ],
        examPattern: 'Paper-I: Political Thought and Concepts (100 Marks) + Paper-II: Comparative Politics and Pakistan (100 Marks) = 200 Marks',
        preparationTips: [
          'Master the fundamental concepts and theories of political science',
          'Understand the evolution of Western political thought from ancient to modern times',
          'Study classical political thinkers: Plato, Aristotle, Machiavelli',
          'Learn about modern political philosophers: Hobbes, Locke, Rousseau, Kant',
          'Master contemporary political theorists: Marx, Rawls, Foucault, Derrida',
          'Understand Muslim political thought and its contributions',
          'Study Islamic political concepts and their modern applications',
          'Learn about the nature and emergence of the modern nation-state',
          'Master political concepts: sovereignty, justice, liberty, equality',
          'Understand human rights and political authority',
          'Study comparative politics and political systems',
          'Learn about political socialization and political culture',
          'Master political development and political recruitment',
          'Understand civil society and social change',
          'Study violence and terrorism in politics',
          'Learn about gender and politics, women empowerment',
          'Master political participation and electoral systems',
          'Understand political parties and pressure groups',
          'Study political institutions: legislature, executive, judiciary',
          'Learn about forms of government and their characteristics',
          'Master political ideologies and their impact',
          'Understand local self-government and its practice in Pakistan',
          'Study comparative political systems: USA, UK, France, Germany',
          'Learn about global and regional integration',
          'Master international organizations: EU, SAARC, ECO, IMF, WTO',
          'Study political systems of Turkey, Iran, Malaysia, India, China',
          'Understand the Pakistan Movement and its key figures',
          'Master Pakistan\'s constitutional development from 1947 to present',
          'Study the 1956, 1962, and 1973 Constitutions comparatively',
          'Learn about constitutional amendments and their impact',
          'Understand Pakistan\'s federal structure and central-provincial relations',
          'Study Pakistan\'s political culture and developments',
          'Master the role of civil and military bureaucracy in Pakistan',
          'Learn about judiciary and its role in Pakistani politics',
          'Understand feudalism and dynastic politics in Pakistan',
          'Study political parties and interest groups in Pakistan',
          'Learn about elections and voting behavior in Pakistan',
          'Master the relationship between religion and politics in Pakistan',
          'Understand ethnicity and national integration in Pakistan',
          'Study the history of international relations post-World War II',
          'Learn about Pakistan\'s foreign policy and national interests',
          'Master the determinants of Pakistan\'s foreign policy',
          'Understand external factors affecting Pakistan\'s foreign policy',
          'Study Pakistan\'s relations with major powers and neighbors',
          'Learn about Pakistan\'s role in international organizations',
          'Master the foreign policy-making process in Pakistan',
          'Understand the impact of ideology on Pakistan\'s foreign policy',
          'Study the role of media and public opinion in foreign policy',
          'Learn about Pakistan\'s security concerns and strategic interests',
          'Understand the relationship between domestic and foreign policy',
          'Study Pakistan\'s economic diplomacy and trade relations',
          'Learn about Pakistan\'s nuclear policy and strategic deterrence',
          'Master the analysis of contemporary political issues',
          'Understand the challenges of democracy in Pakistan',
          'Study the role of civil society in political development',
          'Learn about political reforms and good governance',
          'Understand the impact of globalization on Pakistani politics',
          'Study the role of technology in modern politics',
          'Learn about political communication and media influence',
          'Master the art of political analysis and critical thinking',
          'Understand the relationship between theory and practice in politics',
          'Study the role of political science in policy-making',
          'Learn about research methods in political science',
          'Understand the ethical dimensions of political behavior',
          'Study the future of political systems and governance',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current political developments',
          'Practice analyzing political events and policies',
          'Understand the practical application of political theories',
          'Study the role of political science in addressing global challenges',
          'Learn about the relationship between politics and economics',
          'Master the communication of complex political concepts',
          'Understand the role of political science in social change',
          'Study the impact of political decisions on society',
          'Learn about the role of political leadership in development',
          'Understand the challenges of political stability and governance',
          'Study the role of political institutions in democracy',
          'Learn about the relationship between politics and development',
          'Master the analysis of political conflicts and resolution',
          'Understand the role of political science in international cooperation',
          'Study the future of political systems and governance models'
        ]
      },
      'physics': {
        subjectId: 'physics',
        subjectName: 'Physics',
        subjectType: 'optional',
        subjectGroup: 'group2',
        code: 'OG2-1',
        marks: 200,
        duration: 'Two papers, 3 hours each',
        sections: [
          {
            title: 'PAPER-I (100 Marks)',
            description: 'Mechanics, Fluid Mechanics, Waves & Oscillations, Optics, Heat and Thermodynamics.',
            topics: [
              'Mechanics: Vectors (dot, cross, triple products), gradient, divergence, curl and applications; Newtonian laws of motion (calculus-based kinematics and dynamics); conservation of energy and linear/angular momentum; dynamics of rigid body (spin, precession, gyroscope); gravitation (planetary motion, satellites, Kepler and centripetal forces); Special Relativity (Michelson–Morley experiment, Einstein postulates, Lorentz transformation, time dilation, length contraction, mass–energy equivalence).',
              'Fluid Mechanics: Surface tension, viscosity, elasticity; fluid motion and Bernoulli\'s theorem.',
              'Waves and Oscillations, Optics: Free, forced and damped oscillations; resonance and power transfer; travelling waves and energy transmission; phase and group velocity; standing waves; basics of acoustics; Reflection, Refraction, Interference, Diffraction and Polarization; interferometer and Newton\'s rings; diffraction gratings and resolving power; spectrometers; EM wave equation; normal and anomalous dispersion; coherence; lasers and applications.',
              'Heat and Thermodynamics: Perfect gas, real gas and van der Waals equation; laws of thermodynamics; internal energy, temperature and entropy; thermal properties of simple systems; kinetic theory of gases; Maxwellian distribution of velocities; Brownian motion; transport phenomena; Classical Maxwell–Boltzmann statistics and applications; Bose–Einstein and Fermi–Dirac statistics.'
            ]
          },
          {
            title: 'PAPER-II (100 Marks)',
            description: 'Electricity & Magnetism, Modern and Quantum Physics, Solid State Physics, Nuclear Physics.',
            topics: [
              'Electricity and Magnetism: Electric field of point charges; Gauss\'s law; electric potential; Poisson and Laplace equations; dielectrics and polarization; capacitance; moving charges and magnetic field; Ampere\'s law; magnetic properties of matter; Faraday\'s law and electromagnetic induction; AC circuits (LCR); Poynting theorem and vector; Maxwell\'s equations (integral and differential forms); scalar and vector potentials.',
              'Modern and Quantum Physics: Wave–particle duality and de Broglie hypothesis; operators and quantum states; observables; time-dependent and time-independent Schrödinger equation; angular momentum; spin-1/2 in magnetic field; wave mechanics; particle in a box; tunneling; 1D harmonic oscillator; Heisenberg uncertainty; commutation relations; Bohr model and quantum numbers including electron spin; Pauli exclusion principle; spectra of simple systems with one or two valence electrons; photoelectric effect; Compton scattering; pair production; Lande\'s g-factor and Zeeman effect; Raman effect.',
              'Solid State Physics: Crystal lattice and structure, Bravais lattices; free electron model; band theory; electron in periodic potential, Fermi energy and density of states; n- and p-type semiconductors; physics of transistor and MOSFET; dielectric properties; magnetic properties and origin of magnetism.',
              'Nuclear Physics: Nuclear structure; radioactivity (alpha, beta, gamma decay); detection of nuclear radiation; mass spectrometer; accelerators; fission and fusion with applications; reactor and nuclear power; elementary particles and their properties.'
            ]
          }
        ],
        recommendedBooks: [
          'Perspectives of Modern Physics - A. Beiser',
          'Fundamentals of Physics - Halliday & Resnick',
          'Introduction to Electromagnetic Fields and Waves - D. Corson & P. Lorrain',
          'Heat and Thermodynamics - D. Zemansky',
          'Introduction to Quantum Mechanics - D. J. Griffiths',
          'Modern Physics - Serway, Moses, Moyer',
          'Solid State Physics - C. Kittel'
        ],
        examPattern: 'Two Papers: Paper-I (Mechanics, Fluid Mechanics, Waves & Oscillations, Optics, Heat & Thermodynamics) 100 marks + Paper-II (Electricity & Magnetism, Modern & Quantum Physics, Solid State Physics, Nuclear Physics) 100 marks = 200 marks total',
        preparationTips: [
          'Master calculus-based mechanics and problem solving.',
          'Practice oscillations, waves and optics numericals regularly.',
          'Build strong intuition for thermodynamics and statistical mechanics.',
          'Derive and apply Maxwell\'s equations; practice AC circuit analysis.',
          'Solve standard quantum mechanics problems from Griffiths.',
          'Study semiconductor physics and basic devices (diode, BJT, MOSFET).',
          'Revise nuclear physics fundamentals and detection techniques.',
          'Solve past CSS physics papers under timed conditions.'
        ]
      },
      'psychology': {
        subjectId: 'psychology',
        subjectName: 'Psychology',
        subjectType: 'optional',
        subjectGroup: 'group7',
        code: 'OG7-7',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Nature and Scope of Psychology',
            description: 'Foundation concepts and scientific basis of psychology.',
            topics: [
              'Definition and scope of psychology',
              'Psychology as a science',
              'Different schools of thought in psychology',
              'Perspectives and models in psychology',
              'Recent trends in psychology',
              'Research methods in psychology'
            ]
          },
          {
            title: 'II. Biological Basis of Behaviour',
            description: 'Study of the biological foundations of human behavior.',
            topics: [
              'Nervous System: Structure and function',
              'Neuron and its function',
              'Central Nervous System (CNS)',
              'Peripheral Nervous System (PNS)',
              'Endocrine System and hormones',
              'Brain structure and function',
              'Neurotransmitters and their role'
            ]
          },
          {
            title: 'III. Sensation and Perception',
            description: 'Understanding sensory processes and perceptual mechanisms.',
            topics: [
              'Sensory processes and sensory organs',
              'Perception and perceptual processes',
              'Gestalt Principles of perception',
              'Binocular and Monocular cues',
              'Illusions and perceptual errors',
              'Extra Sensory Perception (ESP)',
              'Determinants of perception'
            ]
          },
          {
            title: 'IV. Learning and Memory',
            description: 'Study of learning processes and memory systems.',
            topics: [
              'Nature and forms of learning',
              'Classical Conditioning (Pavlov)',
              'Operant Conditioning (Skinner)',
              'Reinforcement and punishment',
              'Extinction and discrimination',
              'Observational Learning (Bandura)',
              'Theories of Learning',
              'Types of Memory: Sensory, Short-term, Long-term',
              'Process of Memory: Encoding, Storage, Retrieval',
              'Forgetting and Theories of Memory'
            ]
          },
          {
            title: 'V. Motivation and Emotion',
            description: 'Understanding motivational and emotional processes.',
            topics: [
              'Homeostasis and biological drives',
              'Factors affecting motivation',
              'Biogenic and Social motives',
              'Measurement of Human Motivation',
              'Theories of Motivation: Maslow, Herzberg, etc.',
              'Emotions and their nature',
              'Types of Emotions',
              'Physiological changes in Emotion',
              'Theories of Emotions'
            ]
          },
          {
            title: 'VI. Psychological Assessment',
            description: 'Methods and techniques of psychological evaluation.',
            topics: [
              'Attributes of Psychological Measures',
              'Validity and Reliability',
              'Item Analysis and test construction',
              'Norms and standardization',
              'Modern Test Theory',
              'Selection and Training assessment',
              'Educational and Clinical Assessment',
              'Ethical and Legal Issues in Assessment'
            ]
          },
          {
            title: 'VII. Personality',
            description: 'Study of personality development and assessment.',
            topics: [
              'Determinants of Personality',
              'Factors in Development of Personality',
              'Theoretical Perspectives: Psychoanalytic, Behavioral, Humanistic, Trait',
              'Personality Assessment and Techniques',
              'Cross-Cultural Issues in Personality',
              'Personality disorders and their characteristics'
            ]
          },
          {
            title: 'VIII. Intelligence',
            description: 'Understanding intelligence and its measurement.',
            topics: [
              'Theories of Intelligence: Spearman, Thurstone, Gardner, Sternberg',
              'Types of intelligence: IQ, EQ, Multiple Intelligences',
              'Assessing Intelligence: IQ tests, EQ measures',
              'Intelligence and creativity',
              'Nature vs. Nurture in intelligence',
              'Cultural factors in intelligence'
            ]
          },
          {
            title: 'IX. Social Influence and Group Dynamics',
            description: 'Study of social behavior and group processes.',
            topics: [
              'Social Facilitation and social loafing',
              'Attribution theory and processes',
              'Conformity and group pressure',
              'Obedience and authority (Milgram)',
              'Altruism and prosocial behavior',
              'Attitudes and attitude change',
              'Social Norms and their influence'
            ]
          },
          {
            title: 'X. Developmental Psychology',
            description: 'Study of human development across the lifespan.',
            topics: [
              'Physical development in Childhood, Adolescence, Adulthood, Old Age',
              'Cognitive development: Piaget, Vygotsky theories',
              'Social and Emotional development',
              'Moral development: Kohlberg\'s theory',
              'Identity development: Erikson\'s stages',
              'Developmental milestones and challenges'
            ]
          },
          {
            title: 'XI. Abnormal and Clinical Psychology',
            description: 'Study of psychological disorders and clinical interventions.',
            topics: [
              'Concept and causes of Abnormality',
              'Clinical Assessment and Intervention',
              'Schizophrenia and psychotic disorders',
              'Mood disorders: Depression, Bipolar disorder',
              'Anxiety disorders: GAD, Panic, Phobias',
              'Personality disorders',
              'Psychological treatment and therapeutic interventions',
              'Psychotherapy approaches: CBT, Psychodynamic, Humanistic'
            ]
          },
          {
            title: 'XII. Organizational/Industrial Psychology',
            description: 'Psychology in workplace and organizational settings.',
            topics: [
              'Leadership styles and theories',
              'Decision making processes',
              'Work motivation and job satisfaction',
              'Organizational Culture and climate',
              'Stress and Conflict at Work and its Management',
              'Organizational Socialization',
              'Job related Attitudes',
              'Sexual Harassment and workplace issues',
              'Glass Ceiling and gender issues',
              'Human Computer interaction'
            ]
          },
          {
            title: 'XIII. Health Psychology',
            description: 'Psychology of health, illness, and wellness.',
            topics: [
              'Beliefs and Behavior in health',
              'Models of Health Psychology',
              'Assessment and Intervention in health psychology',
              'Models of Stress and coping',
              'Chronic and Terminal Illness',
              'Role of Social Support in health',
              'Health behavior change',
              'Psychoneuroimmunology'
            ]
          },
          {
            title: 'XIV. Forensic Psychology',
            description: 'Psychology in legal and criminal justice contexts.',
            topics: [
              'Psychology and Law',
              'Investigation and criminal profiling',
              'Confession and interrogation techniques',
              'Eyewitness Testimony and memory',
              'Working with Offenders',
              'Juvenile Delinquents and rehabilitation',
              'Drug Addicts and treatment',
              'Sex Offenders and risk assessment',
              'Competency and insanity evaluations'
            ]
          }
        ],
        recommendedBooks: [
          'Applied Industrial/Organizational Psychology by Aamodt, M.',
          'Introduction to Psychology by Atkinson R. C., & Smith, E. E',
          'Social Psychology by Baron, R. A',
          'Introduction to Forensic Psychology by Bartol, C. R',
          'Foundation of Physiological Psychology by Carlson, N. R.',
          'Introduction to Psychology: Gateways to Mind and Behavior by Coon, D., & Mitterer, J.',
          'Development Across the Life Span by Feldman, R.',
          'Introduction to Psychology by Fernald, L. D., & Fernald, P.S',
          'Introduction to Psychology by Atkinson & Hilgard\'s, Fredrickson, B',
          'Forensic Psychology by Fulero, S. M., & Wrightsman',
          'Foundation of Psychology by Hayes, N',
          'Introduction to Psychology by Kalat, J. W',
          'Abnormal Psychology by Kring, A. M',
          'Psychology by Myers, D. G.',
          'Psychology: Concepts and Connections by Rathus, S.',
          'Life Span Development by Santrock, J. W.',
          'Organizational Psychology by Singh, P.'
        ],
        examPattern: '14 comprehensive sections covering all major areas of psychology from biological basis to applied fields = 100 Marks',
        preparationTips: [
          'Master the fundamental concepts and scope of psychology',
          'Understand psychology as a scientific discipline',
          'Study different schools of thought and perspectives',
          'Learn about recent trends and developments in psychology',
          'Master the biological basis of behavior',
          'Understand the nervous system and brain function',
          'Study neurons, neurotransmitters, and neural pathways',
          'Learn about the endocrine system and hormones',
          'Master sensation and perception processes',
          'Understand Gestalt principles and perceptual cues',
          'Study illusions and perceptual errors',
          'Learn about extra-sensory perception',
          'Master learning theories: Classical and Operant conditioning',
          'Understand reinforcement, punishment, and extinction',
          'Study observational learning and social learning theory',
          'Learn about memory processes and types',
          'Master theories of memory and forgetting',
          'Understand motivation and its theories',
          'Study Maslow\'s hierarchy of needs',
          'Learn about biogenic and social motives',
          'Master emotion theories and physiological changes',
          'Understand psychological assessment methods',
          'Study validity, reliability, and test construction',
          'Learn about ethical issues in psychological testing',
          'Master personality theories and assessment',
          'Understand personality development and determinants',
          'Study cross-cultural issues in personality',
          'Learn about personality disorders',
          'Master intelligence theories and measurement',
          'Understand IQ, EQ, and multiple intelligences',
          'Study nature vs. nurture in intelligence',
          'Learn about cultural factors in intelligence',
          'Master social influence and group dynamics',
          'Understand conformity, obedience, and social pressure',
          'Study attribution theory and social cognition',
          'Learn about altruism and prosocial behavior',
          'Master developmental psychology across lifespan',
          'Understand physical, cognitive, social, and emotional development',
          'Study Piaget, Vygotsky, Kohlberg, and Erikson theories',
          'Learn about developmental milestones and challenges',
          'Master abnormal and clinical psychology',
          'Understand psychological disorders and their causes',
          'Study schizophrenia, mood disorders, anxiety disorders',
          'Learn about personality disorders and treatment',
          'Master psychotherapy approaches and interventions',
          'Understand organizational and industrial psychology',
          'Study leadership, motivation, and workplace behavior',
          'Learn about organizational culture and stress management',
          'Master health psychology and wellness',
          'Understand stress models and coping mechanisms',
          'Study chronic illness and health behavior change',
          'Learn about psychoneuroimmunology',
          'Master forensic psychology and legal applications',
          'Understand criminal profiling and investigation',
          'Study eyewitness testimony and memory in legal contexts',
          'Learn about working with offenders and rehabilitation',
          'Understand the role of psychology in law enforcement',
          'Study competency and insanity evaluations',
          'Learn about risk assessment and treatment of offenders',
          'Master research methods in psychology',
          'Understand experimental design and statistical analysis',
          'Study ethical considerations in psychological research',
          'Learn about psychological measurement and assessment',
          'Understand the application of psychology in various fields',
          'Study the relationship between psychology and other disciplines',
          'Learn about the future of psychology and emerging trends',
          'Master critical thinking and analytical skills',
          'Understand the practical application of psychological principles',
          'Study case studies and real-world applications',
          'Learn about psychological interventions and their effectiveness',
          'Understand the role of psychology in addressing social issues',
          'Study the impact of technology on psychological practice',
          'Learn about cultural psychology and diversity',
          'Master the communication of psychological concepts',
          'Understand the role of psychology in education and learning',
          'Study the application of psychology in healthcare',
          'Learn about the role of psychology in business and marketing',
          'Understand the relationship between psychology and technology',
          'Study the future of psychological research and practice',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current research in psychology',
          'Practice applying psychological concepts to real situations',
          'Understand the ethical dimensions of psychological practice',
          'Study the role of psychology in promoting mental health',
          'Learn about the challenges and opportunities in psychology',
          'Master the interpretation of psychological research findings',
          'Understand the relationship between theory and practice',
          'Study the role of psychology in addressing global challenges',
          'Learn about the application of psychology in crisis intervention',
          'Understand the role of psychology in community development',
          'Study the future of psychological assessment and intervention',
          'Master the art of psychological counseling and therapy',
          'Understand the role of psychology in policy-making',
          'Study the application of psychology in sports and performance',
          'Learn about the role of psychology in environmental issues',
          'Understand the relationship between psychology and artificial intelligence',
          'Study the future of psychological research methodologies',
          'Master the communication of psychological findings to diverse audiences',
          'Understand the role of psychology in promoting well-being and happiness'
        ]
      },
      'public-administration': {
        subjectId: 'public-administration',
        subjectName: 'Public Administration',
        subjectType: 'optional',
        subjectGroup: 'group3',
        code: 'OG3-2',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. Public Administration: Concepts, Approaches and Context',
            description: 'Foundation concepts and theoretical approaches to public administration.',
            topics: [
              'Definitions and scope of public administration',
              'Role and scope of public administration',
              'Issues in theory and practice: Democracy vs. bureaucracy',
              'Politics vs. administration dichotomy',
              'Efficiency vs. equity in public administration',
              'Core values: Rule of law, efficiency, equity, fairness, responsiveness',
              'Traditional public administration',
              'New Public Management (NPM)',
              'New Public Service approach',
              'Governance approach to public administration',
              'Islamic concept of public administration',
              'Historical roots of public administration in Pakistan'
            ]
          },
          {
            title: 'II. Public Administration: Classical and Contemporary Theories and Concepts',
            description: 'Evolution of administrative theories and organizational concepts.',
            topics: [
              'Bureaucracy: Weber\'s theory and its application',
              'Scientific Management: Taylor\'s principles',
              'Human Relations approach and Hawthorne studies',
              'Leadership theories and styles in public administration',
              'Motivation theories in public sector',
              'Network governance and collaborative management',
              'Strategic management in public sector',
              'Public Choice theory and its implications',
              'Types of organizational structure',
              'Organization of federal government in Pakistan',
              'Organization of provincial government in Pakistan',
              'Organization of local government in Pakistan',
              'Administrative culture of Pakistan',
              'Inter-governmental relations at federal and provincial levels in Pakistan'
            ]
          },
          {
            title: 'III. Public Policy Planning, Implementation and Evaluation',
            description: 'Comprehensive policy cycle from planning to evaluation.',
            topics: [
              'Strategic planning and management',
              'Planning process and methodologies',
              'Policy analysis frameworks and tools',
              'Policy implementation strategies',
              'Program evaluation methods and techniques',
              'Planning machinery and institutional framework',
              'Role of donors and international institutions in public policy',
              'Role of international institutions in public management',
              'Policy making process in Pakistan',
              'Policy implementation challenges in Pakistan',
              'Monitoring and evaluation systems'
            ]
          },
          {
            title: 'IV. Budgeting and Financial Management',
            description: 'Financial management and budgeting systems in public sector.',
            topics: [
              'Budget as a policy and managerial tool',
              'Principles of budgeting and financial management',
              'Audit and accounting in government',
              'Line-item budgeting system',
              'Performance budgeting approach',
              'Program budgeting methodology',
              'Zero-base budgeting (ZBB)',
              'Outcome-based budgeting',
              'Planning and budgeting in Pakistan',
              'Financial accountability and transparency',
              'Public financial management reforms'
            ]
          },
          {
            title: 'V. Managing Human Resources',
            description: 'Human resource management in public sector organizations.',
            topics: [
              'Spoil system vs. merit system in public employment',
              'Personnel management vs. human resources management',
              'Close system vs. open system of public employment',
              'Functions of human resources management',
              'Recruitment and selection in public sector',
              'Training and development programs',
              'Performance management systems',
              'Implementation of HRM in public sector',
              'Key issues and challenges in public sector HRM',
              'Civil service reforms and modernization',
              'Employee motivation and job satisfaction'
            ]
          },
          {
            title: 'VI. Administrative Law',
            description: 'Legal framework and administrative justice system.',
            topics: [
              'Meaning, scope and significance of administrative law',
              'Nature and contents of administrative law',
              'Administrative ethics and code of conduct',
              'Delegation of authority and legislation',
              'Administrative tribunals and their functions',
              'Administrative law in Pakistan',
              'Judicial review of administrative actions',
              'Administrative discretion and its limits',
              'Natural justice principles',
              'Administrative accountability mechanisms'
            ]
          },
          {
            title: 'VII. Public Management Skills',
            description: 'Essential management skills for public administrators.',
            topics: [
              'Planning and strategic thinking',
              'Decision making processes and techniques',
              'Conflict management and resolution',
              'Leading and motivating teams',
              'Communication skills in public sector',
              'Administrative buffering and boundary spanning',
              'Managing change and organizational development',
              'Managing diversity in public organizations',
              'Stress management and work-life balance',
              'Delegation and empowerment',
              'Public service motivation',
              'Creativity and problem solving',
              'Issues of public management and leadership'
            ]
          },
          {
            title: 'VIII. The Civil Service of Pakistan',
            description: 'Structure, history, and role of Pakistan\'s civil service.',
            topics: [
              'Historical background of civil service in Pakistan',
              'Structure and organization of civil service',
              'History of civil service reform in Pakistan',
              'Management of civil service',
              'Institutional and cultural context of civil service',
              'Role of civil service in good governance',
              'Gender issues in civil service',
              'Civil service recruitment and training',
              'Performance evaluation and promotion systems',
              'Civil service ethics and integrity',
              'Civil service and political neutrality'
            ]
          },
          {
            title: 'IX. Organization of Provincial and Local Government',
            description: 'Structure and functioning of sub-national governance.',
            topics: [
              'Governance structure of provincial administration',
              'Organization of provincial secretariat',
              'Organization and functions of provincial authorities',
              'Functions of provincial agencies and their relationship with government departments',
              'Post-devolution local governance structure',
              'Organization and functions of district government',
              'Organization and functions of district administration',
              'Organization and structure of city district government',
              'Issues and challenges of local governance',
              'Devolution of powers and responsibilities',
              'Local government elections and representation'
            ]
          },
          {
            title: 'X. Governance and Administrative Reforms',
            description: 'Theories and implementation of administrative reforms.',
            topics: [
              'Theories and types of administrative reforms',
              'Privatization and public-private partnerships',
              'Regulation and regulatory frameworks',
              'De-regulation and market liberalization',
              'Decentralization and devolution',
              'Partnerships and collaboration models',
              'Business process re-engineering',
              'Quality assurance and performance management',
              'Administrative reform in Pakistan',
              'E-governance and digital transformation',
              'Public sector innovation and modernization'
            ]
          },
          {
            title: 'XI. Public Administration Accountability & Control',
            description: 'Mechanisms for ensuring accountability and control in public administration.',
            topics: [
              'Bureaucratic responsiveness and citizen engagement',
              'Representative bureaucracy concept',
              'Citizens engagement in public service delivery',
              'Accountability and control: concept and approaches',
              'Institutional framework for administrative accountability',
              'Legislative control over administration',
              'Executive control over administration',
              'Judicial control over administration',
              'Administrative corruption and its prevention',
              'Role of civil society in good governance',
              'Media, interest groups and civil society organizations',
              'Accountability situation in Pakistan',
              'Ombudsman and anti-corruption mechanisms'
            ]
          },
          {
            title: 'XII. Public Administration and Development',
            description: 'Role of public administration in national development.',
            topics: [
              'Role of public administration in development',
              'Concept of development administration',
              'Difference between development administration and development management',
              'Changing role of public administration in development',
              'Issues and challenges of public administration in Pakistan',
              'Public administration and sustainable development',
              'Development planning and implementation',
              'Public administration and poverty alleviation',
              'Public administration and social development',
              'Public administration and economic development',
              'International development cooperation and public administration'
            ]
          }
        ],
        recommendedBooks: [
          'Public Administration 7th Ed by Denhardt Robert',
          'Public Administration: Understanding Management, Politics and Law 8th Ed by David Rosenbloom',
          'Public Administration 2nd Ed by Caiden, Gerald E.',
          'Public Administration for the twenty first century by Cooper Et Al',
          'Organization Theory for Public Administration by Harmon Michael & Mayer Richard',
          'Public Administration and Public Affairs 12th Ed by Nicholas Henry',
          'Classics of Public Administration 7th Ed by Shafritz Jay',
          'Reinventing Government by Osbourne D',
          'Evolution of Pakistan\'s Administration System by Braibanti, Ralph',
          'Human Development in South Asia by Mahbub-ul-Haq',
          'Bureaucracy, basic books by Wilson, James Q',
          'Bureaucracy in Pakistan by Kennedy, Charles H',
          'Public Administration and Law by Julia Beckett',
              'Public Administration: A Comparative Perspective 6th ed. by Ferrel Heady',
          'Public Administration and Public Management: The Principle- Agent Perspective by Jan-Erik Lane',
          'Governance: South Asian Perspectives by Hasnat Abdul Hye',
          'Governance, economic policy and reform in Pakistan: Essay in political economy by Abdus Samad',
          'Government and Administration in Pakistan by Jameelur Rehman Khan',
          'Public Administration with special reference to Pakistan by Sultan Khan',
          'Public Administration in Asia Vol. I & II by Srinivasan Kalyanaraman',
          'Organizational Theory and the Public Sector by Tom Christensen Per Laegreid',
          'Public Administration in South Asia: India, Bangladesh and Pakistan by Meghna Sabharwal, Evan M. Berman'
        ],
        examPattern: '12 comprehensive sections covering all aspects of public administration from concepts to development = 100 Marks',
        preparationTips: [
          'Master the fundamental concepts and scope of public administration',
          'Understand the evolution of public administration theories',
          'Study classical theories: Weber\'s bureaucracy, Taylor\'s scientific management',
          'Learn about contemporary approaches: New Public Management, Governance',
          'Master the politics-administration dichotomy',
          'Understand efficiency vs. equity in public administration',
          'Study core values: rule of law, efficiency, equity, fairness, responsiveness',
          'Learn about Islamic concept of public administration',
          'Master organizational theories and structures',
          'Understand leadership and motivation in public sector',
          'Study strategic management and planning',
          'Learn about public choice theory and its implications',
          'Master policy planning, implementation and evaluation',
          'Understand policy analysis frameworks and tools',
          'Study program evaluation methods and techniques',
          'Learn about the role of international institutions in public policy',
          'Master budgeting and financial management systems',
          'Understand different budgeting approaches: line-item, performance, program, ZBB',
          'Study audit and accounting in government',
          'Learn about public financial management reforms',
          'Master human resource management in public sector',
          'Understand spoil system vs. merit system',
          'Study personnel vs. human resources management',
          'Learn about civil service reforms and modernization',
          'Master administrative law and its principles',
          'Understand administrative ethics and code of conduct',
          'Study administrative tribunals and judicial review',
          'Learn about natural justice principles',
          'Master public management skills and competencies',
          'Understand decision making and conflict management',
          'Study communication and leadership skills',
          'Learn about managing change and organizational development',
          'Master the structure and role of civil service in Pakistan',
          'Understand civil service reforms and modernization',
          'Study gender issues and representation in civil service',
          'Learn about civil service ethics and integrity',
          'Master provincial and local government organization',
          'Understand devolution and decentralization',
          'Study district government and administration',
          'Learn about local governance challenges and issues',
          'Master governance and administrative reforms',
          'Understand privatization and public-private partnerships',
          'Study regulation and deregulation',
          'Learn about e-governance and digital transformation',
          'Master accountability and control mechanisms',
          'Understand bureaucratic responsiveness',
          'Study representative bureaucracy concept',
          'Learn about citizen engagement in public service',
          'Master legislative, executive, and judicial control',
          'Understand administrative corruption and prevention',
          'Study role of civil society in good governance',
          'Learn about ombudsman and anti-corruption mechanisms',
          'Master public administration and development',
          'Understand development administration concept',
          'Study changing role of public administration in development',
          'Learn about sustainable development and public administration',
          'Master development planning and implementation',
          'Understand public administration and poverty alleviation',
          'Study social and economic development',
          'Learn about international development cooperation',
          'Master the application of public administration theories to Pakistan',
          'Understand Pakistan\'s administrative culture and challenges',
          'Study inter-governmental relations in Pakistan',
          'Learn about policy making and implementation in Pakistan',
          'Master the role of public administration in governance',
          'Understand the relationship between administration and democracy',
          'Study public service delivery and citizen satisfaction',
          'Learn about administrative efficiency and effectiveness',
          'Master the future of public administration',
          'Understand emerging trends and challenges',
          'Study the role of technology in public administration',
          'Learn about global governance and international cooperation',
          'Master the communication of administrative concepts',
          'Understand the practical application of administrative principles',
          'Study case studies and real-world applications',
          'Learn about administrative reforms and modernization',
          'Understand the role of public administration in crisis management',
          'Study emergency management and disaster response',
          'Learn about public administration and national security',
          'Master the role of public administration in social justice',
          'Understand equity and inclusion in public service',
          'Study public administration and environmental management',
          'Learn about sustainable governance and green administration',
          'Master the role of public administration in innovation',
          'Understand public sector innovation and creativity',
          'Study the future of work in public administration',
          'Learn about digital transformation and smart governance',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current administrative reforms and policies',
          'Practice applying administrative concepts to real situations',
          'Understand the ethical dimensions of public administration',
          'Study the role of public administration in promoting good governance',
          'Learn about the challenges and opportunities in public administration',
          'Master the interpretation of administrative policies and procedures',
          'Understand the relationship between theory and practice',
          'Study the role of public administration in addressing global challenges',
          'Learn about the application of public administration in crisis intervention',
          'Understand the role of public administration in community development',
          'Study the future of administrative assessment and intervention',
          'Master the art of administrative leadership and management',
          'Understand the role of public administration in policy-making',
          'Study the application of public administration in various sectors',
          'Learn about the role of public administration in environmental protection',
          'Understand the relationship between public administration and artificial intelligence',
          'Study the future of administrative research methodologies',
          'Master the communication of administrative findings to diverse audiences',
          'Understand the role of public administration in promoting transparency and accountability'
        ]
      },
      'punjabi': {
        subjectId: 'punjabi',
        subjectName: 'Punjabi',
        subjectType: 'optional',
        subjectGroup: 'group7',
        code: 'OG7-8',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'A. History of Language (15 Marks)',
            description: 'Comprehensive study of Punjabi language development and linguistics.',
            topics: [
              'Background of Punjabi Language (پنجابی بولی دا پچھوکڑ)',
              'Punjabi Linguistics (پنجابی لسانیات)',
              'Story of Punjabi Literature (پنجابی ادب دی کہانی)',
              'Evolution and development of Punjabi language',
              'Historical roots and cultural significance',
              'Linguistic features and characteristics',
              'Dialectal variations in Punjabi',
              'Punjabi language in different regions'
            ]
          },
          {
            title: 'B. Classical Poetry (15 Marks)',
            description: 'Study of classical Punjabi poetry and Sufi literature.',
            topics: [
              'Shalok Fareedi (شلوک فریدی) - Baba Farid Ganj Shakar',
              'Kafian Shah Hussain (کافیاں شاہ حسین) - Shah Hussain',
              'Si Harfi Sultan Bahu (سی حرفی سلطان باہو) - Sultan Bahu',
              'Kafian Bulleh Shah (کافیاں بلھے شاہ) - Bulleh Shah',
              'Heer (ہیر) - Waris Shah',
              'Saif-ul-Malook (سیف الملوک) - Mian Muhammad Bakhsh',
              'Sufi poetry and spiritual themes',
              'Classical poetic forms and meters',
              'Cultural and historical context of classical poetry',
              'Influence of classical poets on Punjabi literature'
            ]
          },
          {
            title: 'C. Modern Poetry (15 Marks)',
            description: 'Contemporary Punjabi poetry and modern literary trends.',
            topics: [
              'Tranjan (ترنجن) - Ahmad Rahi',
              'Kache Gharay (کچے گھڑے) - Baqi Siddiqui',
              'Kul Kalam (کل کلام) - Munir Niazi',
              'Mawate (مواتے) - Dr. Faqir Muhammad Faqir',
              'Kulliyat Peer Fazal Gujrati (کلیات پیر فضل گجراتی) - Compiled by Dr. Nabila Rehman',
              'Balda Shehr (بلدا شہر) - Rauf Sheikh',
              'Modern poetic techniques and styles',
              'Contemporary themes and social issues',
              'Evolution of modern Punjabi poetry',
              'Influence of modern poets on literature'
            ]
          },
          {
            title: 'D. Islamic Literature (10 Marks)',
            description: 'Islamic literature and religious texts in Punjabi.',
            topics: [
              'Mawaiz Nosha Ganj Bakhsh (مواعظ نوشہ گنج بخش) - Compiled by Syed Sharafat Noshahi',
              'Kachi Sarkar (Seerat) (کچی سرکار (سیرت)) - Hakeem Abdul Kareem Samar',
              'Islamic themes in Punjabi literature',
              'Religious poetry and prose',
              'Sufi literature and spiritual teachings',
              'Islamic cultural influence on Punjabi literature',
              'Religious texts and their literary value',
              'Islamic philosophy in Punjabi literature'
            ]
          },
          {
            title: 'E. Creative Prose (15 Marks)',
            description: 'Modern Punjabi prose including short stories, novels, and drama.',
            topics: [
              'Doonghiyan Shaaman (Short Story) (ڈونگھیاں شاماں (افسانہ)) - Nawaz',
              'Channay de Ohle (Short Story) (چنے دے اوہلے (افسانہ)) - Farkhanda Lodhi',
              'Dewate Darya (Novel) (دیواتے دریا (ناول)) - Afzal Ahsan Randhawa',
              'Bol Mitti Dya Bawaya (Drama) (بول مٹی دیا با ویا (ڈرامہ)) - Sajjad Haider',
              'Choonjran (Essay) (چو نجراں (انشائیہ)) - Arshad Mir',
              'Modern prose techniques and narrative styles',
              'Contemporary themes in Punjabi prose',
              'Development of Punjabi novel and short story',
              'Drama and theatrical literature',
              'Essay writing and literary criticism'
            ]
          },
          {
            title: 'F. Research & Criticism (15 Marks)',
            description: 'Literary research, criticism, and analytical studies.',
            topics: [
              'Jhatiyan (جھاتیاں) - Sharif Kanjahi',
              'Poorane (پورنے) - Hussain Shahid',
              'Saaran (ساراں) - Najm Hussain Syed',
              'Adab Samandar (ادب سمندر) - Dr. Ismatullah Zahid',
              'Parkh Parchol (پر کھ پڑچول) - Arif Abdul Mateen',
              'Literary criticism and analysis',
              'Research methodologies in Punjabi literature',
              'Critical approaches to Punjabi texts',
              'Literary theory and interpretation',
              'Historical and cultural analysis of texts'
            ]
          },
          {
            title: 'G. Genres of Literature & Folk Literature (15 Marks)',
            description: 'Various literary genres and folk literature forms.',
            topics: [
              'Poetry Genres: Shalok (شلوک), Ghazal (غزل)',
              'Prose Genres: Novel (ناول), Inshaiya (انشائیہ)',
              'Folk Literature: Mahiya (ماہیا), Tappay (ٹپے)',
              'Literary Forms: Jang Nama (جنگ نامه), Afsaana (افسانه), Boli (بولی), Dohra (دوہرا)',
              'Poetic Forms: Kafi (کافی), Nazm (نظم), Wahola (وحولا), Lori (لوری)',
              'Prose Forms: Drama (ڈرامہ), Safarnama (سفرنامه)',
              'Folk songs and traditional literature',
              'Oral tradition and cultural heritage',
              'Regional variations in folk literature',
              'Contemporary adaptations of folk forms'
            ]
          }
        ],
        recommendedBooks: [
          'Biography of Punjabi Poets (پنجابی شاعراں دا تذکرہ) by Maula Bakhsh Kushta',
          'Lalan di Pind (لعلاں دی پنڈ) by Iqbal Salahuddin',
          'Evolution of Punjabi Literature (پنجابی ادب دا ارتقاء) by Inam-ul-Haq Javed',
          'Five Ancient Punjabi Poets (پنجابی کے پانچ قدیم شاعر) by Shafiq Aqeel',
          'Pakistani Punjabi Poetry (پاکستانی پنجابی شاعری) by Sharif Kanjahi',
          'Unity of Being and Punjabi Poetry (وحدت الوجود تے پنجابی شاعری) by Syed Ali Abbas Jampuri',
          'Debate on Literature (ادب پر بہت) by Dr. Ismatullah Zahid',
          'Rang Sang (رنگ سنگ) by Dr. Aslam Rana',
          'History of Literature of Muslims of Pakistan and India Vol 13 (تاریخ ادبیات مسلمانان پاکستان و ہند (جلد 13)) by Group Captain Syed Fayyaz Mehmood',
          'Thematic Study of Punjabi Folk Songs (پنجابی لوک گیتاں دا موضوعاتی مطالعہ) by Dr. Naveed Shehzad',
          'Navees Azam (نویس اعظم) by Dr. Sarfaraz Hussain Qazi'
        ],
        examPattern: '7 comprehensive sections covering language history, classical and modern poetry, Islamic literature, creative prose, research, and folk literature = 100 Marks',
        preparationTips: [
          'Master the fundamental concepts of Punjabi language and literature',
          'Understand the historical development of Punjabi language',
          'Study Punjabi linguistics and linguistic features',
          'Learn about the evolution of Punjabi literature',
          'Master classical Punjabi poetry and Sufi literature',
          'Study the works of classical poets: Baba Farid, Shah Hussain, Sultan Bahu, Bulleh Shah',
          'Understand the cultural and spiritual themes in classical poetry',
          'Learn about classical poetic forms and meters',
          'Master modern Punjabi poetry and contemporary trends',
          'Study the works of modern poets: Ahmad Rahi, Munir Niazi, Dr. Faqir Muhammad Faqir',
          'Understand modern poetic techniques and styles',
          'Learn about contemporary themes and social issues in modern poetry',
          'Master Islamic literature in Punjabi',
          'Study religious texts and Sufi literature',
          'Understand Islamic themes and cultural influence',
          'Learn about religious poetry and spiritual teachings',
          'Master creative prose in Punjabi',
          'Study short stories, novels, and drama',
          'Understand modern prose techniques and narrative styles',
          'Learn about contemporary themes in Punjabi prose',
          'Master literary research and criticism',
          'Study critical approaches to Punjabi texts',
          'Understand research methodologies in Punjabi literature',
          'Learn about literary theory and interpretation',
          'Master various literary genres and forms',
          'Study poetry genres: Shalok, Ghazal, Kafi, Nazm',
          'Understand prose genres: Novel, Inshaiya, Drama',
          'Learn about folk literature: Mahiya, Tappay, Lori',
          'Master folk songs and traditional literature',
          'Understand oral tradition and cultural heritage',
          'Study regional variations in folk literature',
          'Learn about contemporary adaptations of folk forms',
          'Master the works of key authors and poets',
          'Study the literary contributions of major figures',
          'Understand the cultural and historical context of texts',
          'Learn about the influence of different literary movements',
          'Master the analysis of literary texts',
          'Understand critical interpretation and evaluation',
          'Study comparative analysis of different works',
          'Learn about the relationship between literature and society',
          'Master the communication of literary concepts',
          'Understand the practical application of literary analysis',
          'Study the role of literature in cultural preservation',
          'Learn about the future of Punjabi literature',
          'Understand emerging trends and developments',
          'Study the impact of technology on literature',
          'Learn about digital literature and modern platforms',
          'Master the preservation of literary heritage',
          'Understand the role of literature in education',
          'Study the application of literature in various fields',
          'Learn about the relationship between literature and other arts',
          'Master the interpretation of complex literary texts',
          'Understand the cultural significance of literary works',
          'Study the historical context of literary movements',
          'Learn about the influence of literature on society',
          'Master the analysis of poetic devices and techniques',
          'Understand the structure and form of different genres',
          'Study the evolution of literary styles and trends',
          'Learn about the role of criticism in literature',
          'Master the evaluation of literary quality and merit',
          'Understand the relationship between form and content',
          'Study the cultural and social themes in literature',
          'Learn about the representation of different social groups',
          'Master the analysis of character and plot development',
          'Understand the use of symbolism and metaphor',
          'Study the narrative techniques and storytelling',
          'Learn about the role of setting and atmosphere',
          'Master the interpretation of themes and messages',
          'Understand the cultural and historical background of texts',
          'Study the influence of different literary traditions',
          'Learn about the relationship between literature and identity',
          'Master the analysis of language and style',
          'Understand the use of literary devices and techniques',
          'Study the evolution of literary language',
          'Learn about the role of translation in literature',
          'Master the comparison of different literary works',
          'Understand the influence of authors and their backgrounds',
          'Study the reception and impact of literary works',
          'Learn about the role of literature in cultural exchange',
          'Master the analysis of literary movements and trends',
          'Understand the relationship between literature and politics',
          'Study the role of literature in social change',
          'Learn about the future directions of Punjabi literature',
          'Read recommended books for comprehensive understanding',
          'Stay updated with current developments in Punjabi literature',
          'Practice analyzing literary texts and works',
          'Understand the cultural and historical dimensions of literature',
          'Study the role of literature in preserving cultural heritage',
          'Learn about the challenges and opportunities in Punjabi literature',
          'Master the interpretation of complex literary themes',
          'Understand the relationship between literature and other disciplines',
          'Study the application of literary analysis in various contexts',
          'Learn about the role of literature in promoting cultural understanding',
          'Master the communication of literary insights and interpretations',
          'Understand the practical value of literary study',
          'Study the role of literature in personal and social development',
          'Learn about the future of literary studies and research',
          'Master the art of literary criticism and evaluation',
          'Understand the role of literature in shaping cultural identity',
          'Study the impact of literature on individual and collective consciousness',
          'Learn about the relationship between literature and human experience',
          'Master the analysis of literary works in their cultural context',
          'Understand the role of literature in promoting empathy and understanding',
          'Study the therapeutic and transformative power of literature',
          'Learn about the role of literature in education and learning',
          'Master the interpretation of literary symbols and meanings',
          'Understand the relationship between literature and philosophy',
          'Study the role of literature in moral and ethical development',
          'Learn about the future of literary expression and creativity'
        ]
      },
      'sindhi': {
        subjectId: 'sindhi',
        subjectName: 'Sindhi',
        subjectType: 'optional',
        subjectGroup: 'group7',
        code: 'OG7-7',
        marks: 100,
        duration: '3 Hours',
        sections: [
          { title: 'I. تاريخ، تَخليقيات ۽ ٻوليءَ جو پسمنظر', topics: ['سنڌي ٻوليءَ جي ابتدا ۽ ارتقا', 'سنڌي ادب جا اهم دور ۽ رجحان', 'صوفي روايتون ۽ سماجي-تاريخي پسمنظر'] },
          { title: 'II. لسانيات ۽ عربي/فارسي اثرات', topics: ['صرف و نحو جو جائزو', 'لفظي ذخيرو، املا ۽ آوازياتي خصوصيتون', 'عربي، فارسي ۽ سنسڪرت جا اثر'] },
          { title: 'III. صنفون: شاعري', topics: ['بيت، وايون، ڪافيون، غزل، نظم، دوها، گيت'] },
          { title: 'IV. صنفون: نثر', topics: ['افسانو، ناول، انشائيه، سفرنامو، ڊرامو، تنقيد'] },
          { title: 'V. قديم شاعرن جو مطالعو', topics: ['شاهه عبداللطيف ڀٽائي', 'سچل سرمست', 'عبدالرحيم گرڪ', 'روحل فقير', 'ڪلاسيڪي لوڪ ادب'] },
          { title: 'VI. جديد شاعرن ۽ تحريڪن', topics: ['شيخ اياز', 'نظم جديد ۽ آزاد شاعري', 'اهم جديد تحريڪون ۽ موضوعات'] },
          { title: 'VII. افسانه نگاري', topics: ['جديد افسانه نگارن جو جائزو', 'موضوعات، اسلوب ۽ فني حربا'] },
          { title: 'VIII. تنقيد ۽ تحقيق', topics: ['سنڌي تنقيد جا رُجحان', 'تحقيقي طريقا ۽ ڪتابيات', 'ادبي تاريخ نويسي'] },
          { title: 'IX. لوڪ ادب ۽ ثقافت', topics: ['لوڪ گيت، ڏند ڪٿائون، ريتون ۽ رسمون', 'لوڪ ڪهاڻيون ۽ ڊوها', 'سنڌي ثقافتي سرمايو'] },
          { title: 'X. Script، املا ۽ ترجمو', topics: ['سنڌي لکت ۽ املا جا اصول', 'اردو/انگريزي مان سنڌي ڏانهن ترجمو (مشقي سوال)'] }
        ],
        recommendedBooks: [
          'شاهه جو رسالو (مختلف ايڊيشنز)',
          'سچل سرمست: ڪليات',
          'شيخ اياز: چونڊ شاعري ۽ نثر',
          'سنڌي ادب جي تاريخ – مختلف محقق',
          'سنڌي لسانيات – تحقيقاتي مقالا',
          'سنڌي افسانو – چونڊ مجموعا'
        ],
        examPattern: 'واحد پرچو (100 نمبر): تاريخ/لسانيات، صنفون (شاعري/نثر)، قديم ۽ جديد ادب، تنقيد/تحقيق، لوڪ ادب ۽ ترجمي تي مشتمل.',
        preparationTips: [
          'شاهه عبداللطيف ۽ سچل سرمست جا سلسلا ۽ بيت مع حوالا ياد ڪريو',
          'صنفي خصوصيتن تي مختصر نوٽس ٺاهيو (بيت، وائي، ڪافي، افسانو وغيره)',
          'جديد تحريڪن ۽ شيخ اياز جي شاعري مان حوالا مثال گڏ ڪريو',
          'لساني نقطه نگاهه کان املا، صرف و نحو ۽ لفظيات جي مشق ڪريو',
          'ترجمي ۽ لوڪ ادب تي مثالن سان تياري ڪريو'
        ]
      },
      'balochi': {
        subjectId: 'balochi',
        subjectName: 'Balochi',
        subjectType: 'optional',
        subjectGroup: 'group7',
        code: 'OG7-9',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'A) شاعري',
            topics: [
              'بيت، گيت، دوها ۽ غزل',
              'جديد نظم (آزاد/نثري نظم)',
              'ڪلاسيڪي شاعري جا موضوع: عشق، دليرئ، قبائلي روايت، وطن دوستي',
              'جديد موضوعات: سماجي تبديلين، قومي سڃاڻپ، امن ۽ ترقي'
            ]
          },
          {
            title: 'B) نثر',
            topics: [
              'داستان ۽ روايتي قصا (سنگل/شاهنامي واري روايت)',
              'افسانو ۽ ناول: اسلوب، ڪردار نگاري، پلاٽ',
              'ڊرامو ۽ اسٽيچ روايت',
              'مقالا نويسي ۽ تنقيد'
            ]
          },
          {
            title: 'C) تاريخ، ثقافت ۽ لوڪ ادب',
            topics: [
              'بلوچستان جي تاريخ ۽ تمدن جو جائزو',
              'لوڪ بيت، لوڪ ڪهاڻيون، رزميه روايتون',
              'بلوچي ريتون ۽ ثقافتي قدريون'
            ]
          },
          {
            title: 'D) ٻولي ۽ لسانيات',
            topics: [
              'بلوچي ٻوليءَ جي شاخون، صوتيات ۽ صرف و نحو',
              'لغوي ذخيرو، لهجن جو جائزو، معياري املا'
            ]
          },
          {
            title: 'E) تخليقي لکڻ',
            topics: [
              'موضوع تي مختصر مضمون/افسانوي خاڪو'
            ]
          }
        ],
        recommendedBooks: [
          'بلوچستان جي ادبي تاريخ (منتخب ابواب)',
          'بلوچي شاعري جا چونڊ مجموعا',
          'بلوچي افسانا ۽ ناول – منتخب ڪتاب',
          'لساني جائزو: بلوچي گرامر ۽ صوتيات تي مقالا'
        ],
        examPattern: 'واحد پرچو (100 نمبر): شاعري، نثر، تاريخ/ثقافت/لوڪ ادب، لسانيات ۽ تخليقي لکڻ.',
        preparationTips: [
          'ڪلاسيڪي ۽ جديد شاعرن مان حوالا ياد ڪريو',
          'غزل/نظم ۽ افسانوي صنفن جي فني خصوصيتن تي مختصر نوٽس ٺاهيو',
          'بلوچ تاريخ ۽ ثقافت بابت مستند حوالن سان مثال گڏ ڪريو',
          'لساني نقطن (آوازيات، صرف و نحو) جي مشق ۽ املا جي درستي تي ڌيان ڏيو'
        ]
      },
      'philosophy': {
        subjectId: 'philosophy',
        subjectName: 'Philosophy',
        subjectType: 'optional',
        subjectGroup: 'group6',
        code: 'OG6-7',
        marks: 100,
        duration: '3 Hours',
        sections: [
          { title: 'I. Introduction', topics: ['Definition, nature and scope of Philosophy'] },
          {
            title: 'II. Philosophical Methods',
            topics: [
              'Socratic Method (Socrates)',
              'Inductive Method (Bacon, Mill)',
              'Deductive Method (Aristotle, Descartes)',
              'Dialectical Method (Hegel)',
              'Fallibilistic Method (Popper)'
            ]
          },
          {
            title: 'III. Epistemology',
            topics: [
              'Rationalism (Plato, Descartes, Spinoza)',
              'Empiricism (Locke, Berkeley, Hume)',
              'Transcendentalism (Kant)',
              'Intuitionism (Bergson)'
            ]
          },
          {
            title: 'IV. Ontology',
            topics: [
              'Idealism (Plato, Berkeley)',
              'Representative Realism (Locke)',
              'Historical and Dialectical Materialism (Marx)'
            ]
          },
          {
            title: 'V. Ethics',
            topics: [
              'What is morality? Cultural relativism challenge; Does morality depend on religion?',
              'Psychological and ethical egoism',
              'Virtue Ethics (Aristotle)',
              'Moral Absolutism (Kant)',
              'Utilitarianism (J.S. Mill)',
              'Social Contract Theory (Hobbes, Rawls)'
            ]
          },
          {
            title: 'VI. Muslim Thinkers',
            topics: [
              'Al-Farabi, Ibn Sina, Al-Ghazali, Ibn Rushd, Ibn Khaldun, Shah Waliullah, Muhammad Iqbal'
            ]
          },
          {
            title: 'VII. Contemporary Philosophical Movements',
            topics: [
              'Existentialism (Heidegger, Sartre)',
              'Pragmatism (Peirce, James, Dewey)',
              'Neo-pragmatism (Rorty)',
              'Postmodernism (Lyotard, Foucault, Derrida)'
            ]
          }
        ],
        recommendedBooks: [
          'A History of Western Philosophy by Bertrand Russell',
          'Philosophy: The Power of Ideas by Brooke Noel Moore & Kenneth Bruder',
          'Elements of Moral Philosophy by James Rachels',
          'Existentialism & Human Emotions by Jean-Paul Sartre',
          'The Postmodern Condition: A Report on Knowledge by Jean-Francois Lyotard',
          'Descartes to Derrida: An Introduction to European Philosophy by Peter Sedgwick',
          'Continental Philosophy in the 20th Century by Richard Kearney',
          'A Short History of Modern Philosophy by Roger Scruton',
          'A History of Muslim Philosophy (Vol I & II) edited by M.M. Sharif',
          'A History of Islamic Philosophy by Majid Fakhry',
          'The Reconstruction of Religious Thought in Islam by Muhammad Iqbal',
          'Iqbal by Mustansir Mir',
          'Stanford Encyclopedia of Philosophy (plato.stanford.edu)',
          'Internet Encyclopedia of Philosophy (www.iep.utm.edu)'
        ],
        examPattern: 'Single paper, 100 marks covering methods, epistemology, ontology, ethics, Muslim thinkers and contemporary movements.',
        preparationTips: [
          'Make brief philosophers’ cards (life, key works, core theses, critiques)',
          'Practice short comparative notes (Rationalism vs Empiricism; Idealism vs Materialism)',
          'Use examples to illustrate ethical theories and apply them to cases',
          'Link Muslim thinkers to Western debates for synoptic answers',
          'Quote primary texts where possible for high-scoring analysis'
        ]
      },
      'pure-mathematics': {
        subjectId: 'pure-mathematics',
        subjectName: 'Pure Mathematics',
        subjectType: 'optional',
        subjectGroup: 'group2',
        code: 'OG2-5',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Section-A: Modern Algebra (40 Marks)',
            description: 'Comprehensive study of group theory, ring theory, and linear algebra.',
            topics: [
              'Group Theory: Subgroups, Lagrange\'s theorem, Cyclic groups',
              'Normal subgroups, Quotient groups, Homomorphism',
              'Isomorphism, Automorphisms, Conjugate elements',
              'Commutator subgroups and group properties',
              'Ring Theory: Subrings, Integral domains, Quotient fields',
              'Ring isomorphism, Field extension, Finite fields',
              'Linear Algebra: Vector spaces, Linear independence',
              'Bases, Dimension, Linear transformations',
              'Matrices and their algebra, Echelon form',
              'Rank and nullity of matrices',
              'Systems of linear equations: Homogeneous and non-homogeneous',
              'Properties of determinants and matrix operations'
            ]
          },
          {
            title: 'Section-B: Calculus & Analytic Geometry (40 Marks)',
            description: 'Advanced calculus, analytic geometry, and mathematical analysis.',
            topics: [
              'Real Numbers, Limits, Continuity, Differentiability',
              'Indefinite integration and integration techniques',
              'Mean value theorems and their applications',
              'Taylor\'s theorem and series expansions',
              'Indeterminate forms and L\'Hôpital\'s rule',
              'Asymptotes and curve tracing',
              'Definite integrals and their properties',
              'Functions of several variables',
              'Partial derivatives and differential calculus',
              'Maxima and minima of functions',
              'Jacobians and change of variables',
              'Double and triple integration techniques',
              'Applications of Beta and Gamma functions',
              'Areas and volumes using integration',
              'Riemann-Stieltjes integral',
              'Improper integrals and convergence',
              'Implicit function theorem',
              'Analytic Geometry: Conic sections in Cartesian coordinates',
              'Conic sections in plane polar coordinates',
              'Cartesian and spherical polar coordinates in 3D',
              '3D shapes: Plane, Sphere, Ellipsoid, Paraboloid, Hyperboloid'
            ]
          },
          {
            title: 'Section-C: Complex Variables (20 Marks)',
            description: 'Complex analysis and functions of complex variables.',
            topics: [
              'Function of a complex variable',
              'De Moivre\'s theorem and its applications',
              'Analytic functions and Cauchy-Riemann equations',
              'Cauchy\'s theorem and integral formula',
              'Taylor\'s series and Laurent\'s series',
              'Singularities: Poles, essential singularities',
              'Cauchy residue theorem',
              'Contour integration and residue calculus',
              'Fourier series and their convergence',
              'Fourier transforms and their properties',
              'Complex integration techniques',
              'Applications of complex analysis'
            ]
          }
        ],
        recommendedBooks: [
          'Advanced Calculus by Kaplan, W.',
          'Analytic Function Theory Vol.1 by Hille, E.',
          'Calculus by Anton H., Biven I and Davis, S.',
          'Complex Analysis by Goodstein G.R.G.',
          'Complex Variables by Murray R. Spiegel',
          'Calculus with Analytic Geometry by Yusuf, S.M.',
          'Calculus and Analytic Geometry by Zia ul Haq',
          'Elements of Complex Analysis by Pennisi, L.L.',
          'Theory of Groups by Majeed, A.',
          'Mathematical Methods by Yusuf, S.M.',
          'Mathematical Techniques by Karamat H.Dar',
          'Mathematical Analysis by Apostal, T.M.',
          'The Theory of Groups by Macdonald, I.N.',
          'Topics in Algebra by Herstein, I.N.'
        ],
        examPattern: 'Section-A: Modern Algebra (40 Marks) + Section-B: Calculus & Analytic Geometry (40 Marks) + Section-C: Complex Variables (20 Marks) = 100 Marks',
        preparationTips: [
          'Master the fundamental concepts of modern algebra',
          'Understand group theory and its applications',
          'Study subgroups, normal subgroups, and quotient groups',
          'Learn about homomorphisms and isomorphisms',
          'Master Lagrange\'s theorem and cyclic groups',
          'Understand ring theory and field theory',
          'Study integral domains and quotient fields',
          'Learn about field extensions and finite fields',
          'Master linear algebra fundamentals',
          'Understand vector spaces and linear independence',
          'Study bases, dimension, and linear transformations',
          'Learn about matrices and their properties',
          'Master echelon form and rank-nullity theorem',
          'Understand systems of linear equations',
          'Study properties of determinants',
          'Master calculus fundamentals',
          'Understand limits, continuity, and differentiability',
          'Study integration techniques and applications',
          'Learn about mean value theorems',
          'Master Taylor\'s theorem and series expansions',
          'Understand indeterminate forms and L\'Hôpital\'s rule',
          'Study curve tracing and asymptotes',
          'Master definite integrals and their properties',
          'Understand functions of several variables',
          'Study partial derivatives and differential calculus',
          'Learn about maxima and minima',
          'Master Jacobians and change of variables',
          'Understand double and triple integration',
          'Study applications of Beta and Gamma functions',
          'Learn about areas and volumes using integration',
          'Master Riemann-Stieltjes integral',
          'Understand improper integrals and convergence',
          'Study implicit function theorem',
          'Master analytic geometry fundamentals',
          'Understand conic sections in different coordinate systems',
          'Study 3D coordinate systems and shapes',
          'Learn about plane, sphere, ellipsoid, paraboloid, hyperboloid',
          'Master complex analysis fundamentals',
          'Understand functions of complex variables',
          'Study De Moivre\'s theorem and its applications',
          'Learn about analytic functions and Cauchy-Riemann equations',
          'Master Cauchy\'s theorem and integral formula',
          'Understand Taylor\'s and Laurent\'s series',
          'Study singularities and their classification',
          'Learn about Cauchy residue theorem',
          'Master contour integration techniques',
          'Understand Fourier series and transforms',
          'Study applications of complex analysis',
          'Master mathematical proof techniques',
          'Understand logical reasoning and mathematical logic',
          'Study set theory and mathematical foundations',
          'Learn about mathematical induction',
          'Master problem-solving strategies',
          'Understand mathematical modeling',
          'Study applications of pure mathematics',
          'Learn about the relationship between different mathematical areas',
          'Master the use of mathematical software and tools',
          'Understand computational mathematics',
          'Study numerical methods and algorithms',
          'Learn about mathematical research methods',
          'Master the communication of mathematical concepts',
          'Understand mathematical notation and terminology',
          'Study the history and development of mathematics',
          'Learn about famous mathematicians and their contributions',
          'Master the interpretation of mathematical results',
          'Understand the practical applications of pure mathematics',
          'Study the role of mathematics in other sciences',
          'Learn about mathematical education and pedagogy',
          'Master the development of mathematical intuition',
          'Understand the beauty and elegance of mathematical structures',
          'Study the relationship between mathematics and philosophy',
          'Learn about mathematical creativity and innovation',
          'Master the art of mathematical problem-solving',
          'Understand the role of abstraction in mathematics',
          'Study mathematical patterns and structures',
          'Learn about the universality of mathematical concepts',
          'Master the application of mathematical principles',
          'Understand the role of mathematics in technology',
          'Study mathematical algorithms and computational complexity',
          'Learn about mathematical optimization',
          'Master the use of mathematical software packages',
          'Understand computer algebra systems',
          'Study mathematical visualization techniques',
          'Learn about mathematical simulation and modeling',
          'Master the interpretation of mathematical data',
          'Understand statistical applications of mathematics',
          'Study probability theory and its applications',
          'Learn about mathematical finance and economics',
          'Master the role of mathematics in engineering',
          'Understand mathematical physics applications',
          'Study the relationship between mathematics and computer science',
          'Learn about mathematical cryptography',
          'Master the application of mathematics in artificial intelligence',
          'Understand mathematical machine learning',
          'Study the role of mathematics in data science',
          'Learn about mathematical optimization in operations research',
          'Master the use of mathematics in scientific research',
          'Understand the role of mathematics in modern technology',
          'Study mathematical modeling in natural sciences',
          'Learn about mathematical biology and medicine',
          'Master the application of mathematics in social sciences',
          'Understand mathematical economics and game theory',
          'Study the role of mathematics in decision theory',
          'Learn about mathematical logic and foundations',
          'Master the relationship between mathematics and philosophy',
          'Understand the nature of mathematical truth',
          'Study mathematical epistemology',
          'Learn about the philosophy of mathematics',
          'Master the role of intuition in mathematics',
          'Understand mathematical creativity and discovery',
          'Study the psychology of mathematical thinking',
          'Learn about mathematical education research',
          'Master the teaching of advanced mathematics',
          'Understand mathematical learning theories',
          'Study the development of mathematical thinking',
          'Learn about mathematical problem-solving strategies',
          'Master the role of technology in mathematics education',
          'Understand online mathematics learning',
          'Study mathematical assessment and evaluation',
          'Learn about mathematical curriculum development',
          'Master the communication of mathematical ideas',
          'Understand mathematical writing and presentation',
          'Study mathematical visualization and graphics',
          'Learn about mathematical software and tools',
          'Master the use of mathematical notation',
          'Understand mathematical terminology and language',
          'Study the history of mathematical notation',
          'Learn about mathematical symbols and conventions',
          'Master the interpretation of mathematical expressions',
          'Understand mathematical syntax and grammar',
          'Study mathematical communication across cultures',
          'Learn about mathematical translation and interpretation',
          'Read recommended books for comprehensive understanding',
          'Practice solving mathematical problems regularly',
          'Work through examples and exercises systematically',
          'Understand the theoretical foundations of each topic',
          'Master the practical applications of mathematical concepts',
          'Study the relationships between different mathematical areas',
          'Learn about the historical development of mathematical ideas',
          'Understand the role of mathematics in modern society',
          'Master the use of mathematical software and computational tools',
          'Study the applications of mathematics in various fields',
          'Learn about the future of mathematical research and development',
          'Understand the role of mathematics in addressing global challenges',
          'Master the communication of complex mathematical concepts',
          'Study the relationship between mathematics and other disciplines',
          'Learn about the interdisciplinary nature of modern mathematics',
          'Understand the role of mathematics in innovation and technology',
          'Study the application of mathematical principles in real-world problems',
          'Learn about the beauty and elegance of mathematical structures',
          'Master the art of mathematical thinking and reasoning',
          'Understand the power and universality of mathematical concepts',
          'Study the role of mathematics in human knowledge and understanding',
          'Learn about the future of mathematical education and research',
          'Master the development of mathematical intuition and creativity',
          'Understand the relationship between mathematics and human cognition',
          'Study the role of mathematics in artificial intelligence and machine learning',
          'Learn about the application of mathematics in data science and analytics',
          'Master the use of mathematics in scientific discovery and innovation',
          'Understand the role of mathematics in addressing complex global challenges',
          'Study the future of mathematical research and its impact on society',
          'Learn about the interdisciplinary applications of pure mathematics',
          'Master the communication of mathematical insights to diverse audiences',
          'Understand the role of mathematics in promoting scientific literacy',
          'Study the application of mathematical thinking in everyday life',
          'Learn about the beauty and power of mathematical abstraction',
          'Master the art of mathematical problem-solving and creative thinking',
          'Understand the role of mathematics in shaping the future of technology and society'
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
      },
      'sociology': {
        subjectId: 'sociology',
        subjectName: 'Sociology',
        subjectType: 'optional',
        subjectGroup: 'group7',
        code: 'OG7-4',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'I. General Sociology',
            description: 'Comprehensive study of fundamental sociological concepts and theories.',
            topics: [
              'Individual: Sociability or the sociality of man',
              'Culture: Meaning and Characteristics (variable, learnt, social, shared, transmissive, dynamic, adaptive)',
              'Types of Culture: Material and Non-material',
              'Functions of Culture: Transfer of knowledge, define situation, provide behaviour pattern, moulds personality',
              'Elements of Culture: Norms, values, beliefs, sanctions, customs',
              'Culture and Socialization: Formal and non-formal',
              'Transmission of culture and cultural relativism',
              'Sub-cultures, Ethnocentrism and xenocentrism',
              'Cultural lag, High culture and popular culture',
              'Multiculturalism, assimilation, and acculturation'
            ]
          },
          {
            title: 'Society and Social Interaction',
            description: 'Understanding society, community, and social interaction patterns.',
            topics: [
              'Society: Meaning and characteristics',
              'Community: Meaning and characteristics',
              'Individual and society relationship',
              'Two main theories: Social contact theory and organismic theory',
              'Social and cultural evolution of society',
              'Hunting and Gathering Society, Herding and Advance Herding Society',
              'Horticultural Society, Agrarian Society, Industrial Society, Post modern Society',
              'Caste and classes, Forms of social classes',
              'Feudal system in Pakistan',
              'Social Mobility: Nature and determinants in Pakistani society',
              'Culture of poverty'
            ]
          },
          {
            title: 'Social Control and Change',
            description: 'Mechanisms of social control and processes of social change.',
            topics: [
              'Mechanisms of social control: Formal and informal means',
              'Anomie and Alienation',
              'Social Integration: Means in Pakistani Society',
              'Processes of Social and Cultural Change: Discovery',
              'Inhibitions to social and cultural change in Pakistan',
              'Social planning and directed social and cultural change',
              'Effect of Industrialization, Urbanization, Modernization and Modern Means of Communication on Social Change',
              'Public Opinion: Formation of public opinion',
              'Concept of opinion leader and characteristics of opinion leadership'
            ]
          },
          {
            title: 'Community and Social Institutions',
            description: 'Study of rural and urban communities and social institutions.',
            topics: [
              'The rural community and Traditional Characteristics of rural life',
              'The urban community and Rural-Urban convergence',
              'Urbanism and Future of cities in Pakistan',
              'The nature and genesis of institutions',
              'The process of institutionalization',
              'Functions of Social Institutions: Family, Religion, Education, Economy and Politics'
            ]
          },
          {
            title: 'Social Problems in Pakistan',
            description: 'Analysis of contemporary social issues and challenges in Pakistani society.',
            topics: [
              'High population growth rate and Rural-urban migration',
              'Issues of technical/vocational training and Unemployment',
              'Illiteracy and School drop out',
              'Deviance and street crime, Smuggling, Prostitution',
              'Poverty and Drug Addiction',
              'Child Labour and Abuse, Bonded Labour',
              'Social customs and Traditions affecting Women in Pakistan',
              'Violence Against Women and Domestic Violence',
              'Issues concerning the Elderly in Pakistan'
            ]
          },
          {
            title: 'II. Sociological Theory',
            description: 'Study of major sociological perspectives and theorists.',
            topics: [
              'Three sociological perspectives: Structural Functionalism, Symbolic interactions and Conflict',
              'Theorists: Ibn-i-Khaldun, Spencer, August Comte, Emile Dukheim, Max Weber, Karl Marx, Parson'
            ]
          },
          {
            title: 'III. Methods of Sociological Research',
            description: 'Understanding research methodologies and techniques in sociology.',
            topics: [
              'Scientific Method and Steps in research',
              'Types of Questionnaire Research Design',
              'Surveys and Observation',
              'Case Studies and Research methodology'
            ]
          }
        ],
        recommendedBooks: [
          'Sociology: A down to earth approach - James M. Henslin',
          'Methods of Social Research - Baily',
          'Poverty Curtains - Dr. Mehboob-ul-haq',
          'Contemporary Sociological Theories - Pitrim Sorokin',
          'Master of Sociological Thought - Lewis A.Coser',
          'Sociology - Ogbum & Nimkoff',
          'Social Change and History - Robert Nisbet',
          'Feudal System in Pakistan - Nawab Haider Naqvi',
          'The Sociology of Rural Life - Lynn Smith, T.',
          'Sociology-Social Structure and Social Conflict - Kerbo, Harold R. (1989)',
          'Sociology: An Introduction to the Science of Society - Koening Samuel',
          'Marriage and The Family - Lee, Alfred Mclung and Lee, Elizabeth Briant (1961)',
          'The Design of Social Research - Ackoff, Russel, L. (Latest ed.)',
          'An Introduction to the History of Sociology - Barnes, H.E. (Ed.) (1966)',
          'Pakistani Society - Akbar Ahmad, S.',
          'Sociology, 10th edition - John, J. Macionis. 2004.',
          'Research Methodology - Neuman, Lawrance (Rvs. Ed.)',
          'Sociological Theory - Ritzer, Georg, (1988)'
        ],
        examPattern: 'Comprehensive examination covering General Sociology, Sociological Theory, and Research Methods (100 Marks)',
        preparationTips: [
          'Develop strong understanding of fundamental sociological concepts',
          'Study major sociological theories and their applications',
          'Practice research methodology and data analysis techniques',
          'Stay updated with contemporary social issues in Pakistan',
          'Read recommended books for comprehensive coverage',
          'Focus on understanding social institutions and their functions',
          'Practice writing analytical essays on social problems',
          'Join study groups for peer learning and discussion',
          'Attend sociology workshops and seminars',
          'Practice case study analysis and research design'
        ]
      },
      'statistics': {
        subjectId: 'statistics',
        subjectName: 'Statistics',
        subjectType: 'optional',
        subjectGroup: 'group2',
        code: 'OG2-5',
        marks: 100,
        duration: '3 Hours',
        sections: [
          {
            title: 'Part - I: Descriptive Statistics',
            description: 'Fundamental concepts and methods of descriptive statistics.',
            topics: [
              'Definition, importance, and scope of Statistics',
              'Descriptive and Inferential Statistics',
              'Data presentation: Tables, Graphs, Charts, Stem-and-leaf diagrams, Box and Whisker Plots',
              'Measures of Central Tendency/location',
              'Measures of Dispersion/Variability: Skewness and Kurtosis'
            ]
          },
          {
            title: 'Basic Probability',
            description: 'Core probability concepts and mathematical foundations.',
            topics: [
              'Basic Probability Concepts',
              'Additive and Multiplicative laws of Probability',
              'Joint and Marginal Probabilities',
              'Conditional Probability and Statistical Independence',
              'Bayes\' rule',
              'Concept of a Random Variable',
              'Mathematical Expectations',
              'Discrete and Continuous Random Variables',
              'Probability Distribution',
              'Mean and Variance of a Discrete Probability Distribution'
            ]
          },
          {
            title: 'Probability Distributions',
            description: 'Study of various probability distributions and their applications.',
            topics: [
              'Discrete and continuous Probability Distributions',
              'Properties and applications of Binomial, Poisson, and Hyper-geometric distributions',
              'Normal Distribution and its properties',
              'Standard Normal Curve',
              'Normal approximation to Binomial and Poisson distribution'
            ]
          },
          {
            title: 'Regression Analysis & Correlation Analysis',
            description: 'Understanding relationships between variables and predictive modeling.',
            topics: [
              'Concepts of Regression and Correlation and their application',
              'Simple and Multiple Linear Regression (up to three variables)',
              'Estimation of Parameters of simple regression Model',
              'Method of least square',
              'Inference regarding regression parameters',
              'Correlation, Correlation Coefficient, Properties of Correlation Coefficient',
              'Inference regarding correlation coefficient',
              'Partial Correlation and Multiple Correlation Coefficients (up to three variables)'
            ]
          },
          {
            title: 'Non-Parametric Methods',
            description: 'Statistical tests that don\'t require specific distribution assumptions.',
            topics: [
              'Parametric versus nonparametric tests, when to use non-parametric procedures',
              'One-sample tests: Sign test, Wilcoxon signed ranks tests, Kolmogrov-Smirnov test, run test',
              'Tests for two related samples: Sign test, run tests, chi-square test',
              'Tests for two independent samples: Mann-Whitney test, Kolmogrov-Smirnov test'
            ]
          },
          {
            title: 'Part - II: Sampling & Sampling Distributions',
            description: 'Understanding sampling techniques and their distributions.',
            topics: [
              'Population and Sample',
              'Advantages of Sampling',
              'Sampling Design',
              'Probability & Non-Probability Sampling techniques',
              'Brief Concepts of Simple Random, Stratified, Systematic, Cluster, Multiphase and Multistage Sampling',
              'Non-probability sampling: Purposive, Quota Sampling, Convenience & Accidental Sampling',
              'Sampling with and without replacement',
              'Application of Central Limit Theorem in Sampling',
              'Sampling Distribution of Mean, difference between two Means, Proportion, difference between two Proportion and Variance'
            ]
          },
          {
            title: 'Statistical Inferences',
            description: 'Estimation and hypothesis testing methods.',
            topics: [
              'Estimation: Point Estimation, Properties of a good Estimator',
              'Interval Estimation of Single Population means and Single proportion',
              'Difference between two means and Difference between two proportions',
              'Hypothesis Testing: Types of errors',
              'Hypothesis Testing for Population Mean',
              'Inferences for difference between Two Population Means',
              'Inferences for the difference between Means of Two Normal Populations using Independent Samples (variances are assumed Equal) for sample size',
              'Inference for Two Populations Mean using Paired Samples',
              'Hypothesis testing for Single Population Proportion and difference between two population proportions',
              'Estimation of sample size',
              'Analysis of categorized data',
              'Goodness of fit tests',
              'Contingency tables',
              'Test of independence in contingency tables'
            ]
          },
          {
            title: 'Design of Experiments',
            description: 'Experimental design principles and analysis of variance.',
            topics: [
              'One-way and Two-way Analysis of Variance',
              'Design of Experiments, Concepts of Treatment, Replication, Blocking, Experimental Units and Experimental Error',
              'Basic Principles of Design of Experiments',
              'Description, Layout and Statistical Analysis of Completely Randomized Design (CRD), Randomized Complete Block Design (RCBD)',
              'Multiple Comparison tests (LSD test)'
            ]
          },
          {
            title: 'Population Analysis & Vital Statistics',
            description: 'Demographic methods and official statistics.',
            topics: [
              'Population and Demographic Methods',
              'Sources of Demographic data',
              'Basic Demographic Measures, Sex Ratio, Child Women Ratio, Vital Index',
              'Crude and Specific Birth and Death Rates, Total Fertility and Net Reproduction Rates',
              'Official Statistics: Statistical Systems in Pakistan',
              'Functions of Statistics Division, Bureaus of Statistics and NADRA',
              'The National Income, Gross Domestic Product, Saving and Wealth, Index Numbers'
            ]
          }
        ],
        recommendedBooks: [
          'Statistical Methods by S.P. Gupta',
          'Business Statistics by Levin and Rubin',
          'Probability and Statistics for Engineering and Sciences by Jay L. Devore',
          'Introduction to the Theory of Statistics by Mood, Graybill and Boes',
          'Mathematical Statistics by John E. Freund',
          'Statistical Inference by Casella and Berger',
          'Applied Statistics and Probability for Engineers by Montgomery and Runger',
              'Design and Analysis of Experiments by Montgomery',
              'Sampling Techniques by William G. Cochran',
              'Nonparametric Statistical Methods by Hollander and Wolfe',
              'Regression Analysis by Draper and Smith',
              'Statistical Quality Control by Grant and Leavenworth',
              'Vital Statistics by Benjamin B. Newcomb',
              'Demographic Methods by Andrew Hinde',
              'Official Statistics: A Guide for Users and Managers by United Nations',
              'Pakistan Statistical Yearbook by Pakistan Bureau of Statistics',
              'Statistical Abstract of Pakistan by Federal Bureau of Statistics',
              'Population Census Reports by Pakistan Bureau of Statistics'
        ],
        examPattern: 'Part - I (50 marks): Descriptive Statistics, Probability, Distributions, Regression & Correlation, Non-Parametric Methods | Part - II (50 marks): Sampling, Statistical Inference, Design of Experiments, Population Analysis & Vital Statistics',
        preparationTips: [
          'Master fundamental statistical concepts and probability theory',
          'Practice extensively with different probability distributions',
          'Work on regression analysis and correlation problems',
          'Understand sampling techniques and their applications',
          'Practice hypothesis testing with various scenarios',
          'Learn experimental design principles and ANOVA',
          'Study demographic methods and official statistics',
          'Use statistical software for practical applications',
          'Solve previous years\' statistics papers',
          'Join statistics study groups for peer learning',
          'Attend workshops on statistical software (SPSS, R, Excel)',
          'Practice time management for different question types',
          'Focus on understanding concepts rather than memorization',
          'Work on real-world data analysis projects'
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