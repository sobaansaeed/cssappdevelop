# Past Papers Upload Guide

## 📁 **Complete Folder Structure Created**

✅ **51 subject folders** have been created for organizing CSS past papers:

### **📚 Compulsory Subjects (7 folders)**
- `public/past-papers/compulsory/english-essay/`
- `public/past-papers/compulsory/english-precis/`
- `public/past-papers/compulsory/general-science/`
- `public/past-papers/compulsory/current-affairs/`
- `public/past-papers/compulsory/pakistan-affairs/`
- `public/past-papers/compulsory/islamic-studies/`
- `public/past-papers/compulsory/comparative-religions/`

### **🎓 Optional Subjects (44 folders in 7 groups)**
- **Group 1**: Accountancy, Economics, Computer Science, International Relations
- **Group 2**: Physics, Chemistry, Applied Mathematics, Pure Mathematics, Statistics, Geology
- **Group 3**: Business Administration, Public Administration, Governance, Town Planning
- **Group 4**: History subjects (Pakistan & India, Islamic, British, European, USA)
- **Group 5**: Gender Studies, Environmental Sciences, Agriculture, Botany, Zoology, Literature
- **Group 6**: Law subjects (Constitutional, International, Muslim Law, Mercantile, Criminology, Philosophy)
- **Group 7**: Journalism, Psychology, Geography, Sociology, Anthropology, Languages

---

## 📋 **How to Upload Past Papers**

### **Step 1: Upload PDF Files**
1. **Navigate to the specific subject folder**
   ```
   Example: public/past-papers/compulsory/english-essay/
   ```

2. **Upload PDF files with descriptive names**
   ```
   english-essay-2024.pdf
   english-essay-2023.pdf
   english-essay-2022.pdf
   ```

3. **File naming convention**
   ```
   {subject-name}-{year}.pdf
   Examples:
   - economics-2024.pdf
   - physics-2023.pdf
   - computer-science-2022.pdf
   ```

### **Step 2: Add to Database**
After uploading files, run the automated script:

```bash
node add-past-paper-from-folder.js
```

This script will:
- ✅ Scan all subject folders for new PDF files
- ✅ Extract year from filename
- ✅ Generate proper titles
- ✅ Add entries to the database
- ✅ Create proper file URLs

### **Step 3: Verify**
Check that past papers appear on the website:
- Visit: `http://localhost:3003/past-papers`
- Select the subject
- Verify files are listed and downloadable

---

## 🚀 **Quick Start Example**

### **For English Essay Past Papers:**

1. **Upload files to**: `public/past-papers/compulsory/english-essay/`
   ```
   english-essay-2024.pdf
   english-essay-2023.pdf
   english-essay-2022.pdf
   ```

2. **Run the script**:
   ```bash
   node add-past-paper-from-folder.js
   ```

3. **Confirm addition** when prompted

4. **Check the website**: Files will appear in the English Essay section

---

## 📊 **Folder Statistics**

- **Total Folders Created**: 51
- **Compulsory Subjects**: 7 folders
- **Optional Subjects**: 44 folders (organized in 7 groups)
- **Ready for**: Multiple years of past papers per subject

---

## 🔗 **URL Structure**

Once uploaded, files will be accessible at:
```
https://your-domain.com/past-papers/{subject-folder}/{filename}.pdf
```

**Examples:**
- `https://your-domain.com/past-papers/compulsory/english-essay/english-essay-2024.pdf`
- `https://your-domain.com/past-papers/optional/group1/economics/economics-2023.pdf`

---

## ✅ **Benefits**

### **🎯 Organization**
- Clear separation by subject type and groups
- Easy to locate specific materials
- Logical folder structure

### **📈 Scalability**
- Each subject has dedicated folder
- Can accommodate multiple years
- Easy to add new subjects

### **🔧 Automation**
- Automated database updates
- Smart file detection
- Year extraction from filenames

### **🌐 Web Integration**
- Seamless website integration
- Proper URL structure
- Database-driven display

---

## 🎯 **Ready to Use**

The folder structure is now complete and ready for:
- ✅ **File Uploads**: Upload past papers to specific subject folders
- ✅ **Database Integration**: Use the automated script
- ✅ **Website Display**: Files will be accessible through the past papers pages
- ✅ **Year-wise Organization**: Multiple years can be stored for each subject

**Start uploading your past papers now!** 📚 