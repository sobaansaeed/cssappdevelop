# CSS Past Papers System Guide

## 🎯 **Complete CSS Past Papers Collection**

Your CSS Prep Hub now includes a comprehensive past papers system with **51 subjects** organized into **7 compulsory subjects** and **7 groups of optional subjects**.

## 📚 **Subject Structure**

### **🎯 Compulsory Subjects (7)**
1. **English Essay** (CE-1)
2. **English (Precis and Composition)** (CE-2)
3. **General Science & Ability** (CE-3)
4. **Current Affairs** (CE-4)
5. **Pakistan Affairs** (CE-5)
6. **Islamic Studies** (CE-6)
7. **Comparative Study of Major Religions (For Non Muslims)** (CE-7)

### **📖 Optional Subjects (44) - Organized in 7 Groups**

#### **Group 1: Business & Technology**
- Accountancy & Auditing
- Economics
- Computer Science
- International Relations

#### **Group 2: Sciences & Mathematics**
- Physics
- Chemistry
- Applied Mathematics
- Pure Mathematics
- Statistics
- Geology

#### **Group 3: Administration & Management**
- Business Administration
- Public Administration
- Governance & Public Policies
- Town Planning & Urban Management

#### **Group 4: History**
- History of Pakistan & India
- Islamic History & Culture
- British History
- European History
- History of USA

#### **Group 5: Literature & Sciences**
- Gender Studies
- Environmental Sciences
- Agriculture & Forestry
- Botany
- Zoology
- English Literature
- Urdu Literature

#### **Group 6: Law & Philosophy**
- Law
- Constitutional Law
- International Law
- Muslim Law & Jurisprudence
- Mercantile Law
- Criminology
- Philosophy

#### **Group 7: Social Sciences & Languages**
- Journalism & Mass Communication
- Psychology
- Geography
- Sociology
- Anthropology
- Punjabi
- Sindhi
- Pashto
- Balochi
- Persian
- Arabic

## 🛠️ **How to Add Past Papers**

### **Method 1: Using the CLI Script (Recommended)**

#### **Quick Add Past Paper**
```bash
node add-past-paper.js quick-add <subjectId> <year> <filename>
```

#### **Examples**
```bash
# Add English Essay 2024
node add-past-paper.js quick-add "english-essay" "2024" "english-essay-2024.pdf"

# Add Economics 2023
node add-past-paper.js quick-add "economics" "2023" "economics-2023.pdf"

# Add Physics 2024
node add-past-paper.js quick-add "physics" "2024" "physics-2024.pdf"
```

#### **Full Add Past Paper**
```bash
node add-past-paper.js add <subjectId> <year> <title> <filePath> [description]
```

#### **Example**
```bash
node add-past-paper.js add "english-essay" "2024" "CSS English Essay 2024" "/pdfs/past-papers/compulsory/essay-2024.pdf" "Complete English Essay paper with solutions"
```

### **Method 2: Manual JSON Editing**

1. **Upload PDF** to appropriate directory:
   - Compulsory: `public/pdfs/past-papers/compulsory/`
   - Optional: `public/pdfs/past-papers/optional/group1/` (replace group1 with actual group)

2. **Edit** `src/data/past-papers.json`
3. **Add entry**:

```json
{
  "id": "unique-id",
  "subjectId": "english-essay",
  "subjectName": "English Essay",
  "subjectType": "compulsory",
  "year": "2024",
  "title": "CSS English Essay Past Paper 2024",
  "fileUrl": "/pdfs/past-papers/compulsory/essay-2024.pdf",
  "uploadDate": "2024-08-05",
  "description": "Complete English Essay paper with solutions"
}
```

## 📊 **Current Past Papers**

Your system currently has:
```
📖 English Essay:
   2024: CSS English Essay Past Paper 2024
   2023: CSS English Essay Past Paper 2023

📖 Economics:
   2024: CSS Economics Past Paper 2024
```

## 🔧 **Management Commands**

### **List All Past Papers**
```bash
node add-past-paper.js list
```

### **List All Subjects**
```bash
node add-past-paper.js list-subjects
```

### **Add New Past Paper**
```bash
node add-past-paper.js quick-add <subjectId> <year> <filename>
```

## 🌐 **API Endpoints**

### **Past Papers API**
- **URL**: `/api/past-papers`
- **Filters**: `?subjectId=`, `?subjectType=`, `?year=`, `?group=`
- **Returns**: All past papers with filtering capabilities

### **Subjects API**
- **URL**: `/api/subjects`
- **Returns**: All subjects organized by compulsory and optional groups

### **Example API Calls**
```bash
# Get all past papers
curl http://localhost:3001/api/past-papers

# Get papers for specific subject
curl http://localhost:3001/api/past-papers?subjectId=english-essay

# Get papers for specific year
curl http://localhost:3001/api/past-papers?year=2024

# Get compulsory papers only
curl http://localhost:3001/api/past-papers?subjectType=compulsory

# Get optional papers from specific group
curl http://localhost:3001/api/past-papers?group=group1
```

## 🎨 **Frontend Features**

### **Main Past Papers Page** (`/past-papers`)
- ✅ **Subject Overview**: All 51 subjects organized by type and groups
- ✅ **Statistics**: Count of compulsory, optional, and total subjects
- ✅ **Filter Tabs**: All, Compulsory, Optional
- ✅ **Year Indicators**: Shows available years for each subject
- ✅ **Subject Cards**: Clean cards with subject info and paper counts

### **Individual Subject Page** (`/past-papers/[subjectId]`)
- ✅ **Subject Details**: Name, type, code, group information
- ✅ **Year Filtering**: Filter papers by specific years
- ✅ **Paper Grid**: All papers for the subject with download/view options
- ✅ **Breadcrumb Navigation**: Easy navigation back to main page
- ✅ **Paper Information**: Title, year, upload date, description

## 📋 **Daily Workflow for Past Papers**

### **Step 1: Upload PDF**
```bash
# For compulsory subjects
cp "english-essay-2024.pdf" public/pdfs/past-papers/compulsory/

# For optional subjects
cp "economics-2024.pdf" public/pdfs/past-papers/optional/group1/
```

### **Step 2: Add Metadata**
```bash
# Quick add
node add-past-paper.js quick-add "english-essay" "2024" "english-essay-2024.pdf"

# Or full add with description
node add-past-paper.js add "english-essay" "2024" "CSS English Essay 2024" "/pdfs/past-papers/compulsory/english-essay-2024.pdf" "Complete paper with solutions"
```

### **Step 3: Deploy**
```bash
git add .
git commit -m "Add CSS English Essay 2024 past paper"
git push origin main
```

## 🔍 **Testing**

### **Test Locally**
```bash
# Start development server
npm run dev

# Test APIs
curl http://localhost:3001/api/past-papers
curl http://localhost:3001/api/subjects

# Visit website
open http://localhost:3001/past-papers
```

### **Test on Vercel**
- Visit your deployed website
- Check the past papers page
- Verify subject organization and filtering

## 📁 **File Structure**

```
src/
├── data/
│   ├── subjects.json          # All subjects data
│   └── past-papers.json       # Past papers metadata
├── app/
│   ├── api/
│   │   ├── past-papers/
│   │   │   └── route.ts       # Past papers API
│   │   └── subjects/
│   │       └── route.ts       # Subjects API
│   └── past-papers/
│       ├── page.tsx           # Main past papers page
│       └── [subjectId]/
│           └── page.tsx       # Individual subject page
public/
└── pdfs/
    └── past-papers/
        ├── compulsory/        # Compulsory subject papers
        └── optional/
            ├── group1/        # Group 1 papers
            ├── group2/        # Group 2 papers
            └── ...            # Other groups
```

## ✅ **Benefits**

- ✅ **Comprehensive Coverage**: All 51 CSS subjects included
- ✅ **Organized Structure**: Clear separation of compulsory and optional subjects
- ✅ **Multiple Years**: Support for papers from different years
- ✅ **Easy Management**: CLI tools for quick addition
- ✅ **Rich Metadata**: Subject codes, types, groups, descriptions
- ✅ **Filtering**: By subject, type, year, and group
- ✅ **Professional UI**: Clean, modern interface
- ✅ **API Support**: Full REST API for frontend integration
- ✅ **Scalable**: Easy to add new subjects and papers

## 🎯 **Next Steps**

1. **Add more past papers** using the CLI tools
2. **Upload PDF files** to appropriate directories
3. **Customize the display** if needed
4. **Deploy to Vercel** when ready
5. **Enjoy your comprehensive CSS past papers system!**

Your CSS past papers system is now complete with all 51 subjects and ready for use! 🚀 