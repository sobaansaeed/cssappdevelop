#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// File paths
const PAST_PAPERS_FILE = 'src/data/past-papers.json';
const SUBJECTS_FILE = 'src/data/subjects.json';

// Directories
const COMPULSORY_DIR = 'public/pdfs/past-papers/compulsory';
const OPTIONAL_DIR = 'public/pdfs/past-papers/optional';

// Ensure directories exist
function ensureDirectories() {
  const dirs = [COMPULSORY_DIR, OPTIONAL_DIR];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
}

// Generate unique ID
function generateId() {
  return Date.now().toString();
}

// Format date
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Read past papers JSON
function readPastPapersJson() {
  try {
    if (fs.existsSync(PAST_PAPERS_FILE)) {
      const data = fs.readFileSync(PAST_PAPERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('❌ Error reading past papers JSON:', error.message);
  }
  
  return { pastPapers: [] };
}

// Write past papers JSON
function writePastPapersJson(data) {
  try {
    fs.writeFileSync(PAST_PAPERS_FILE, JSON.stringify(data, null, 2));
    console.log('✅ Past Papers JSON updated successfully!');
  } catch (error) {
    console.error('❌ Error writing past papers JSON:', error.message);
  }
}

// Read subjects JSON
function readSubjectsJson() {
  try {
    if (fs.existsSync(SUBJECTS_FILE)) {
      const data = fs.readFileSync(SUBJECTS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('❌ Error reading subjects JSON:', error.message);
  }
  
  return { compulsory: [], optional: {} };
}

// Get subject info
function getSubjectInfo(subjectId) {
  const subjectsData = readSubjectsJson();
  
  // Check compulsory subjects
  const compulsory = subjectsData.compulsory.find(s => s.id === subjectId);
  if (compulsory) {
    return { ...compulsory, type: 'compulsory' };
  }
  
  // Check optional subjects
  for (const [groupKey, groupData] of Object.entries(subjectsData.optional)) {
    const optional = groupData.subjects.find(s => s.id === subjectId);
    if (optional) {
      return { ...optional, type: 'optional', group: groupKey };
    }
  }
  
  return null;
}

// List all subjects
function listSubjects() {
  const subjectsData = readSubjectsJson();
  
  console.log('\n📚 Available Subjects:');
  console.log('=====================');
  
  console.log('\n🎯 Compulsory Subjects:');
  subjectsData.compulsory.forEach((subject, index) => {
    console.log(`${index + 1}. ${subject.name} (${subject.id})`);
  });
  
  console.log('\n📖 Optional Subjects:');
  Object.entries(subjectsData.optional).forEach(([groupKey, groupData]) => {
    console.log(`\n${groupData.name}:`);
    groupData.subjects.forEach((subject, index) => {
      console.log(`  ${index + 1}. ${subject.name} (${subject.id})`);
    });
  });
}

// Add past paper
function addPastPaper(subjectId, year, title, filePath, description = '') {
  const pastPapersData = readPastPapersJson();
  const subjectInfo = getSubjectInfo(subjectId);
  
  if (!subjectInfo) {
    console.log(`❌ Subject with ID "${subjectId}" not found.`);
    console.log('Use "list-subjects" command to see available subjects.');
    return;
  }
  
  const newPastPaper = {
    id: generateId(),
    subjectId: subjectId,
    subjectName: subjectInfo.name,
    subjectType: subjectInfo.type,
    subjectGroup: subjectInfo.group,
    year: year,
    title: title,
    fileUrl: filePath,
    uploadDate: formatDate(new Date()),
    description: description
  };
  
  // Add to beginning of array (newest first)
  pastPapersData.pastPapers.unshift(newPastPaper);
  
  writePastPapersJson(pastPapersData);
  
  console.log('📄 Past Paper added successfully:');
  console.log(`   Subject: ${subjectInfo.name}`);
  console.log(`   Year: ${year}`);
  console.log(`   Title: ${title}`);
  console.log(`   Type: ${subjectInfo.type}`);
  if (subjectInfo.group) {
    console.log(`   Group: ${subjectInfo.group}`);
  }
  console.log(`   File: ${filePath}`);
  if (description) {
    console.log(`   Description: ${description}`);
  }
}

// List past papers
function listPastPapers() {
  const pastPapersData = readPastPapersJson();
  
  console.log('\n📚 Current Past Papers:');
  console.log('======================');
  
  if (pastPapersData.pastPapers.length === 0) {
    console.log('No past papers available.');
    return;
  }
  
  // Group by subject
  const groupedPapers = {};
  pastPapersData.pastPapers.forEach(paper => {
    if (!groupedPapers[paper.subjectName]) {
      groupedPapers[paper.subjectName] = [];
    }
    groupedPapers[paper.subjectName].push(paper);
  });
  
  Object.entries(groupedPapers).forEach(([subjectName, papers]) => {
    console.log(`\n📖 ${subjectName}:`);
    papers.forEach(paper => {
      console.log(`   ${paper.year}: ${paper.title}`);
      console.log(`      File: ${paper.fileUrl}`);
    });
  });
}

// Quick add past paper
function quickAddPastPaper(subjectId, year, filename) {
  const subjectInfo = getSubjectInfo(subjectId);
  
  if (!subjectInfo) {
    console.log(`❌ Subject with ID "${subjectId}" not found.`);
    return;
  }
  
  const title = `CSS ${subjectInfo.name} Past Paper ${year}`;
  const filePath = subjectInfo.type === 'compulsory' 
    ? `/pdfs/past-papers/compulsory/${filename}`
    : `/pdfs/past-papers/optional/${subjectInfo.group}/${filename}`;
  
  addPastPaper(subjectId, year, title, filePath);
}

// Main CLI interface
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  ensureDirectories();
  
  switch (command) {
    case 'add':
      if (args.length < 5) {
        console.log('❌ Usage: node add-past-paper.js add <subjectId> <year> <title> <filePath> [description]');
        console.log('   Example: node add-past-paper.js add "english-essay" "2024" "CSS English Essay 2024" "/pdfs/past-papers/compulsory/essay-2024.pdf"');
        return;
      }
      
      const [, , subjectId, year, title, filePath, description] = args;
      addPastPaper(subjectId, year, title, filePath, description);
      break;
      
    case 'quick-add':
      if (args.length < 4) {
        console.log('❌ Usage: node add-past-paper.js quick-add <subjectId> <year> <filename>');
        console.log('   Example: node add-past-paper.js quick-add "english-essay" "2024" "essay-2024.pdf"');
        return;
      }
      
      // Use a more robust argument parsing
      const quickArgs = args.slice(1); // Remove 'quick-add'
      const quickSubjectId = quickArgs[0];
      const quickYear = quickArgs[1];
      const quickFilename = quickArgs[2];
      
      quickAddPastPaper(quickSubjectId, quickYear, quickFilename);
      break;
      
    case 'list':
      listPastPapers();
      break;
      
    case 'list-subjects':
      listSubjects();
      break;
      
    default:
      console.log('📄 CSS Past Papers Management Tool');
      console.log('==================================');
      console.log('');
      console.log('Commands:');
      console.log('  add <subjectId> <year> <title> <filePath> [description]  - Add past paper with full details');
      console.log('  quick-add <subjectId> <year> <filename>                   - Quick add with auto-generated title and path');
      console.log('  list                                                      - List all current past papers');
      console.log('  list-subjects                                             - List all available subjects');
      console.log('');
      console.log('Examples:');
      console.log('  node add-past-paper.js add "english-essay" "2024" "CSS English Essay 2024" "/pdfs/past-papers/compulsory/essay-2024.pdf"');
      console.log('  node add-past-paper.js quick-add "economics" "2024" "economics-2024.pdf"');
      console.log('  node add-past-paper.js list-subjects');
      console.log('');
  }
}

// Run the script
if (require.main === module) {
  main();
} 