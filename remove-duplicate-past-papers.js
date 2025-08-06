#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the existing past papers data
const pastPapersPath = path.join(__dirname, 'src/data/past-papers.json');

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

function removeDuplicates() {
  console.log('🔍 Reading past papers data...\n');

  // Read existing data
  const existingPastPapers = readJsonFile(pastPapersPath);
  if (!existingPastPapers) {
    console.error('❌ Could not read existing past papers data');
    return;
  }

  const originalCount = existingPastPapers.pastPapers.length;
  console.log(`📊 Original count: ${originalCount} past papers`);

  // Create a map to track unique papers
  const uniquePapers = new Map();
  const duplicates = [];

  existingPastPapers.pastPapers.forEach(paper => {
    // Create a unique key based on subjectId, year, and paperNumber
    const key = `${paper.subjectId}-${paper.year}-${paper.paperNumber || 'null'}`;
    
    if (uniquePapers.has(key)) {
      // This is a duplicate
      duplicates.push({
        duplicate: paper,
        original: uniquePapers.get(key)
      });
      console.log(`⚠️  Found duplicate: ${paper.title} (${paper.year}) - ID: ${paper.id}`);
    } else {
      // This is the first occurrence
      uniquePapers.set(key, paper);
    }
  });

  if (duplicates.length === 0) {
    console.log('✅ No duplicates found!');
    return;
  }

  console.log(`\n📊 Found ${duplicates.length} duplicate entries`);
  console.log(`📊 Unique papers: ${uniquePapers.size}`);

  // Convert map back to array
  const cleanedPapers = Array.from(uniquePapers.values());

  // Ask for confirmation
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(`\nDo you want to remove ${duplicates.length} duplicate entries? (y/n): `, (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      // Update the data
      const updatedPastPapers = {
        ...existingPastPapers,
        pastPapers: cleanedPapers
      };

      // Write updated data
      writeJsonFile(pastPapersPath, updatedPastPapers);
      console.log(`\n✅ Successfully removed ${duplicates.length} duplicate entries!`);
      console.log(`📊 Final count: ${cleanedPapers.length} past papers`);
    } else {
      console.log('\n❌ Operation cancelled.');
    }
    rl.close();
  });
}

// Run the script
if (require.main === module) {
  removeDuplicates();
}

module.exports = {
  removeDuplicates
}; 