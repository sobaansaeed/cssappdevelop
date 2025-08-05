#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the existing past papers data
const pastPapersPath = path.join(__dirname, 'src/data/past-papers.json');
const subjectsPath = path.join(__dirname, 'src/data/subjects.json');

function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Data written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error.message);
  }
}

function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function scanPastPapersFolder() {
  const pastPapersDir = path.join(__dirname, 'public/past-papers');
  const newPastPapers = [];

  // Scan compulsory subjects
  const compulsoryDir = path.join(pastPapersDir, 'compulsory');
  if (fs.existsSync(compulsoryDir)) {
    const compulsorySubjects = fs.readdirSync(compulsoryDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    compulsorySubjects.forEach(subjectFolder => {
      const subjectPath = path.join(compulsoryDir, subjectFolder);
      const files = fs.readdirSync(subjectPath)
        .filter(file => file.toLowerCase().endsWith('.pdf'));

      files.forEach(file => {
        const year = extractYearFromFilename(file);
        const title = generateTitleFromFilename(file, subjectFolder);
        
        newPastPapers.push({
          id: generateId(),
          subjectId: subjectFolder,
          subjectName: getSubjectName(subjectFolder),
          subjectType: 'compulsory',
          year: year,
          title: title,
          fileUrl: `/past-papers/compulsory/${subjectFolder}/${file}`,
          uploadDate: new Date().toISOString().split('T')[0],
          description: `CSS ${year} Past Paper - ${getSubjectName(subjectFolder)}`
        });
      });
    });
  }

  // Scan optional subjects
  const optionalDir = path.join(pastPapersDir, 'optional');
  if (fs.existsSync(optionalDir)) {
    const groups = fs.readdirSync(optionalDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    groups.forEach(group => {
      const groupPath = path.join(optionalDir, group);
      const subjects = fs.readdirSync(groupPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      subjects.forEach(subjectFolder => {
        const subjectPath = path.join(groupPath, subjectFolder);
        const files = fs.readdirSync(subjectPath)
          .filter(file => file.toLowerCase().endsWith('.pdf'));

        files.forEach(file => {
          const year = extractYearFromFilename(file);
          const title = generateTitleFromFilename(file, subjectFolder);
          
          newPastPapers.push({
            id: generateId(),
            subjectId: subjectFolder,
            subjectName: getSubjectName(subjectFolder),
            subjectType: 'optional',
            subjectGroup: group,
            year: year,
            title: title,
            fileUrl: `/past-papers/optional/${group}/${subjectFolder}/${file}`,
            uploadDate: new Date().toISOString().split('T')[0],
            description: `CSS ${year} Past Paper - ${getSubjectName(subjectFolder)}`
          });
        });
      });
    });
  }

  return newPastPapers;
}

function extractYearFromFilename(filename) {
  // Try to extract year from filename (e.g., "english-essay-2024.pdf" -> "2024")
  const yearMatch = filename.match(/(\d{4})/);
  return yearMatch ? yearMatch[1] : new Date().getFullYear().toString();
}

function generateTitleFromFilename(filename, subjectFolder) {
  // Remove .pdf extension and convert to title case
  const name = filename.replace(/\.pdf$/i, '');
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function getSubjectName(subjectId) {
  // Map subject IDs to readable names
  const subjectNames = {
    // Compulsory subjects
    'english-essay': 'English Essay',
    'english-precis': 'English (Precis and Composition)',
    'general-science': 'General Science & Ability',
    'current-affairs': 'Current Affairs',
    'pakistan-affairs': 'Pakistan Affairs',
    'islamic-studies': 'Islamic Studies',
    'comparative-religions': 'Comparative Study of Major Religions',
    
    // Optional subjects
    'accountancy-auditing': 'Accountancy & Auditing',
    'economics': 'Economics',
    'computer-science': 'Computer Science',
    'international-relations': 'International Relations',
    'physics': 'Physics',
    'chemistry': 'Chemistry',
    'applied-mathematics': 'Applied Mathematics',
    'pure-mathematics': 'Pure Mathematics',
    'statistics': 'Statistics',
    'geology': 'Geology',
    'business-administration': 'Business Administration',
    'public-administration': 'Public Administration',
    'governance-public-policies': 'Governance & Public Policies',
    'town-planning-urban-management': 'Town Planning & Urban Management',
    'history-pakistan-india': 'History of Pakistan & India',
    'islamic-history-culture': 'Islamic History & Culture',
    'british-history': 'British History',
    'european-history': 'European History',
    'history-usa': 'History of USA',
    'gender-studies': 'Gender Studies',
    'environmental-sciences': 'Environmental Sciences',
    'agriculture-forestry': 'Agriculture & Forestry',
    'botany': 'Botany',
    'zoology': 'Zoology',
    'english-literature': 'English Literature',
    'urdu-literature': 'Urdu Literature',
    'law': 'Law',
    'constitutional-law': 'Constitutional Law',
    'international-law': 'International Law',
    'muslim-law-jurisprudence': 'Muslim Law & Jurisprudence',
    'mercantile-law': 'Mercantile Law',
    'criminology': 'Criminology',
    'philosophy': 'Philosophy',
    'journalism-mass-communication': 'Journalism & Mass Communication',
    'psychology': 'Psychology',
    'geography': 'Geography',
    'sociology': 'Sociology',
    'anthropology': 'Anthropology',
    'punjabi': 'Punjabi',
    'sindhi': 'Sindhi',
    'pashto': 'Pashto',
    'balochi': 'Balochi',
    'persian': 'Persian',
    'arabic': 'Arabic'
  };

  return subjectNames[subjectId] || subjectId;
}

function main() {
  console.log('🔍 Scanning past papers folder structure...\n');

  // Read existing data
  const existingPastPapers = readJsonFile(pastPapersPath);
  if (!existingPastPapers) {
    console.error('❌ Could not read existing past papers data');
    return;
  }

  // Scan for new past papers
  const newPastPapers = scanPastPapersFolder();

  if (newPastPapers.length === 0) {
    console.log('📁 No new past papers found in the folder structure.');
    console.log('💡 Make sure you have uploaded PDF files to the subject folders.');
    return;
  }

  console.log(`📄 Found ${newPastPapers.length} new past papers:\n`);

  // Display found past papers
  newPastPapers.forEach((paper, index) => {
    console.log(`${index + 1}. ${paper.title}`);
    console.log(`   Subject: ${paper.subjectName} (${paper.subjectType})`);
    console.log(`   Year: ${paper.year}`);
    console.log(`   File: ${paper.fileUrl}\n`);
  });

  // Ask for confirmation
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Do you want to add these past papers to the database? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      // Add new past papers to existing data
      const updatedPastPapers = {
        ...existingPastPapers,
        pastPapers: [...existingPastPapers.pastPapers, ...newPastPapers]
      };

      // Write updated data
      writeJsonFile(pastPapersPath, updatedPastPapers);
      console.log(`\n✅ Successfully added ${newPastPapers.length} past papers to the database!`);
    } else {
      console.log('\n❌ Operation cancelled.');
    }
    rl.close();
  });
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  scanPastPapersFolder,
  extractYearFromFilename,
  generateTitleFromFilename,
  getSubjectName
}; 