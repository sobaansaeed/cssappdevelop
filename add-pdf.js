#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const PDFS_JSON_PATH = './src/data/pdfs.json';
const NEWSPAPERS_DIR = './public/pdfs/newspapers/';
const EDITORIALS_DIR = './public/pdfs/editorials/';

// Helper function to generate unique ID
function generateId() {
  return Date.now().toString();
}

// Helper function to format date
function formatDate(date) {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Helper function to read JSON file
function readPdfsJson() {
  try {
    const data = fs.readFileSync(PDFS_JSON_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading PDFs JSON:', error.message);
    return { pdfs: [] };
  }
}

// Helper function to write JSON file
function writePdfsJson(data) {
  try {
    fs.writeFileSync(PDFS_JSON_PATH, JSON.stringify(data, null, 2));
    console.log('✅ PDFs JSON updated successfully!');
  } catch (error) {
    console.error('❌ Error writing PDFs JSON:', error.message);
  }
}

// Helper function to get PDF files from directory
function getPdfFiles(directory) {
  try {
    const files = fs.readdirSync(directory);
    return files.filter(file => file.toLowerCase().endsWith('.pdf'));
  } catch (error) {
    console.error(`❌ Error reading directory ${directory}:`, error.message);
    return [];
  }
}

// Main function to add PDF
function addPdf(title, date, filePath, category, authorName = null, newspaper = null) {
  const pdfsData = readPdfsJson();
  
  const newPdf = {
    id: generateId(),
    title: title,
    date: date,
    fileUrl: filePath,
    category: category
  };
  
  // Add editorial-specific fields if provided
  if (category === 'editorials') {
    if (authorName) newPdf.authorName = authorName;
    if (newspaper) newPdf.newspaper = newspaper;
  }
  
  // Add to beginning of array (newest first)
  pdfsData.pdfs.unshift(newPdf);
  
  writePdfsJson(pdfsData);
  
  console.log('📄 PDF added successfully:');
  console.log(`   Title: ${title}`);
  console.log(`   Date: ${date}`);
  console.log(`   Category: ${category}`);
  if (authorName) console.log(`   Author: ${authorName}`);
  if (newspaper) console.log(`   Newspaper: ${newspaper}`);
  console.log(`   File: ${filePath}`);
}

// Function to list existing PDFs
function listPdfs() {
  const pdfsData = readPdfsJson();
  
  console.log('\n📚 Current PDFs:');
  console.log('================');
  
  pdfsData.pdfs.forEach((pdf, index) => {
    console.log(`${index + 1}. ${pdf.title}`);
    console.log(`   Date: ${pdf.date} | Category: ${pdf.category}`);
    if (pdf.authorName) console.log(`   Author: ${pdf.authorName}`);
    if (pdf.newspaper) console.log(`   Newspaper: ${pdf.newspaper}`);
    console.log(`   File: ${pdf.fileUrl}\n`);
  });
}

// Function to scan directories and suggest additions
function scanDirectories() {
  console.log('\n🔍 Scanning directories for PDFs...');
  
  const newspapers = getPdfFiles(NEWSPAPERS_DIR);
  const editorials = getPdfFiles(EDITORIALS_DIR);
  
  console.log('\n📰 Newspapers directory:');
  newspapers.forEach(file => {
    console.log(`   - ${file}`);
  });
  
  console.log('\n📝 Editorials directory:');
  editorials.forEach(file => {
    console.log(`   - ${file}`);
  });
  
  return { newspapers, editorials };
}

// Main CLI interface
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'add':
      if (args.length < 5) {
        console.log('❌ Usage: node add-pdf.js add <title> <date> <filePath> <category>');
        console.log('   Example: node add-pdf.js add "August 5 Dawn Editorial" "2024-08-05" "/pdfs/editorials/dawn.pdf" "editorials"');
        return;
      }
      
      const [, , title, date, filePath, category] = args;
      addPdf(title, date, filePath, category);
      break;
      
    case 'list':
      listPdfs();
      break;
      
    case 'scan':
      scanDirectories();
      break;
      
    case 'quick-add':
      if (args.length < 4) {
        console.log('❌ Usage: node add-pdf.js quick-add <title> <date> <category>');
        console.log('   Example: node add-pdf.js quick-add "August 5 Dawn Editorial" "2024-08-05" "editorials"');
        return;
      }
      
      const [, , quickTitle, quickDate, quickCategory] = args;
      const quickFileName = quickTitle.replace(/\s+/g, ' ') + '.pdf';
      const quickFilePath = `/pdfs/${quickCategory}/${quickFileName}`;
      
      addPdf(quickTitle, quickDate, quickFilePath, quickCategory);
      break;
      
    case 'add-editorial':
      if (args.length < 6) {
        console.log('❌ Usage: node add-pdf.js add-editorial "Title" "Date" "Author" "Newspaper" "filename.pdf"');
        console.log('   Example: node add-pdf.js add-editorial "August 5 Editorial" "2024-08-05" "John Doe" "Dawn" "editorial.pdf"');
        return;
      }
      
      // Use a more robust argument parsing
      const editorialArgs = args.slice(2); // Remove 'node', 'add-pdf.js', 'add-editorial'
      const editorialTitle = editorialArgs[0];
      const editorialDate = editorialArgs[1];
      const editorialAuthor = editorialArgs[2];
      const editorialNewspaper = editorialArgs[3];
      const editorialFilename = editorialArgs[4];
      const editorialFilePath = `/pdfs/editorials/${editorialFilename}`;
      
      addPdf(editorialTitle, editorialDate, editorialFilePath, 'editorials', editorialAuthor, editorialNewspaper);
      break;
      
    default:
      console.log('📄 PDF Management Tool');
      console.log('=====================');
      console.log('');
      console.log('Commands:');
      console.log('  add <title> <date> <filePath> <category>  - Add PDF with full details');
      console.log('  quick-add <title> <date> <category>       - Quick add with auto-generated file path');
      console.log('  add-editorial <title> <date> <author> <newspaper> <filename> - Add editorial with author and newspaper');
      console.log('  list                                      - List all current PDFs');
      console.log('  scan                                      - Scan directories for PDF files');
      console.log('');
      console.log('Examples:');
      console.log('  node add-pdf.js add "August 5 Dawn Editorial" "2024-08-05" "/pdfs/editorials/dawn.pdf" "editorials"');
      console.log('  node add-pdf.js quick-add "August 5 Dawn Editorial" "2024-08-05" "editorials"');
      console.log('  node add-pdf.js list');
      console.log('  node add-pdf.js scan');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { addPdf, listPdfs, scanDirectories }; 