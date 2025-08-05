# Daily PDF Management Guide

## 📋 **Quick Daily Process (5 minutes)**

### **Step 1: Upload PDF Files**
1. **Copy your PDF files** to the appropriate directories:
   ```
   public/pdfs/newspapers/your-newspaper.pdf
   public/pdfs/editorials/your-editorial.pdf
   ```

### **Step 2: Update JSON Data**
2. **Edit** `src/data/pdfs.json` and add new entries:
   ```json
   {
     "id": "unique-id",
     "title": "Your PDF Title",
     "date": "YYYY-MM-DD",
     "fileUrl": "/pdfs/category/filename.pdf",
     "category": "newspapers" or "editorials"
   }
   ```

### **Step 3: Deploy Changes**
3. **Commit and push** to GitHub
4. **Vercel auto-deploys** your changes
5. **PDF appears** on your website

---

## 🔧 **Detailed Step-by-Step Process**

### **Method 1: Manual File Management (Recommended)**

#### **Step 1: Prepare Your PDFs**
1. **Rename your PDFs** with descriptive names:
   ```
   August 5 Dawn Editorial.pdf
   August 5 The News Editorial.pdf
   ```

#### **Step 2: Upload to Correct Directories**
2. **For Newspapers**: Copy to `public/pdfs/newspapers/`
3. **For Editorials**: Copy to `public/pdfs/editorials/`

#### **Step 3: Update JSON Metadata**
3. **Open** `src/data/pdfs.json`
4. **Add new entries** at the top of the array:
   ```json
   {
     "pdfs": [
       {
         "id": "20240805-001",
         "title": "August 5 Dawn Editorial",
         "date": "2024-08-05",
         "fileUrl": "/pdfs/newspapers/August 5 Dawn Editorial.pdf",
         "category": "newspapers"
       },
       {
         "id": "20240805-002",
         "title": "August 5 The News Editorial",
         "date": "2024-08-05",
         "fileUrl": "/pdfs/editorials/August 5 The News Editorial.pdf",
         "category": "editorials"
       }
     ]
   }
   ```

#### **Step 4: Deploy**
4. **Save the JSON file**
5. **Commit changes** to Git
6. **Push to GitHub**
7. **Wait for Vercel deployment** (2-3 minutes)

---

## 📝 **JSON Format Reference**

### **Required Fields**
```json
{
  "id": "unique-identifier",           // Required: Unique ID
  "title": "PDF Title",                // Required: Display title
  "date": "2024-08-05",               // Required: Date in YYYY-MM-DD format
  "fileUrl": "/pdfs/category/file.pdf", // Required: Path to PDF file
  "category": "newspapers"             // Required: "newspapers" or "editorials"
}
```

### **ID Generation Tips**
- **Date-based**: `20240805-001`, `20240805-002`
- **Timestamp**: `1733456789`
- **Sequential**: `1001`, `1002`, `1003`

---

## 🎯 **Best Practices**

### **File Naming**
✅ **Good names**:
- `August 5 Dawn Editorial.pdf`
- `August 5 The News Front Page.pdf`
- `August 5 Express Tribune Editorial.pdf`

❌ **Avoid**:
- `document1.pdf`
- `untitled.pdf`
- `copy.pdf`

### **Date Format**
✅ **Always use**: `YYYY-MM-DD`
- `2024-08-05`
- `2024-12-25`
- `2025-01-01`

### **File Organization**
```
public/pdfs/
├── newspapers/
│   ├── August 5 Dawn.pdf
│   ├── August 5 The News.pdf
│   └── August 5 Express Tribune.pdf
└── editorials/
    ├── August 5 Dawn Editorial.pdf
    ├── August 5 The News Editorial.pdf
    └── August 5 Express Tribune Editorial.pdf
```

---

## 🚀 **Quick Commands for Daily Use**

### **Check Current PDFs**
```bash
# List newspapers
ls public/pdfs/newspapers/

# List editorials
ls public/pdfs/editorials/
```

### **Add New PDF (Example)**
```bash
# 1. Copy PDF to directory
cp "August 5 Dawn Editorial.pdf" public/pdfs/editorials/

# 2. Edit JSON file
nano src/data/pdfs.json

# 3. Add entry:
{
  "id": "20240805-001",
  "title": "August 5 Dawn Editorial",
  "date": "2024-08-05",
  "fileUrl": "/pdfs/editorials/August 5 Dawn Editorial.pdf",
  "category": "editorials"
}
```

---

## 🔍 **Verification Steps**

### **After Adding PDFs**
1. **Check JSON syntax**: Make sure JSON is valid
2. **Test locally**: Run `npm run dev` and check `/newspapers`
3. **Deploy**: Push to GitHub and wait for Vercel
4. **Verify online**: Check your live website

### **API Testing**
```bash
# Test newspapers API
curl https://your-app.vercel.app/api/newspapers-alt

# Test editorials API
curl https://your-app.vercel.app/api/editorials-alt

# Test specific category
curl https://your-app.vercel.app/api/pdfs?category=newspapers
```

---

## ⚠️ **Common Mistakes to Avoid**

1. **Wrong file path**: Make sure path matches actual file location
2. **Invalid JSON**: Check for missing commas, brackets
3. **Duplicate IDs**: Each PDF needs a unique ID
4. **Wrong category**: Use "newspapers" or "editorials" only
5. **Missing deployment**: Remember to push changes to GitHub

---

## 📱 **Mobile-Friendly Tips**

### **Using GitHub Mobile App**
1. **Upload PDFs** through GitHub mobile app
2. **Edit JSON** through GitHub mobile editor
3. **Commit changes** directly from mobile

### **Using VS Code Mobile**
1. **Open project** in VS Code mobile
2. **Edit files** directly on mobile
3. **Sync changes** to GitHub

---

## 🎉 **Success Checklist**

After adding PDFs, verify:
- [ ] PDF files are in correct directories
- [ ] JSON data is valid and complete
- [ ] Changes are committed and pushed
- [ ] Vercel deployment is successful
- [ ] PDFs appear on website
- [ ] PDFs are downloadable
- [ ] PDFs open correctly in browser

---

## 📞 **Need Help?**

If you encounter issues:
1. **Check the JSON syntax** with a JSON validator
2. **Verify file paths** match exactly
3. **Check Vercel deployment logs**
4. **Test APIs** to see error messages
5. **Use the admin interface** at `/admin` for web-based management

This process takes only 5 minutes daily and keeps your website updated with fresh content! 🚀 