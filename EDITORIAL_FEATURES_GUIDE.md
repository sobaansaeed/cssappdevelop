# Editorial Features Guide

## 🎯 **New Editorial Features Added**

Your CSS Prep Hub now supports **author name** and **newspaper name** fields for editorials, matching the design shown in your image.

## 📝 **Editorial Data Structure**

### **JSON Format for Editorials**
```json
{
  "id": "unique-id",
  "title": "Editorial Title",
  "date": "2024-08-05",
  "fileUrl": "/pdfs/editorials/filename.pdf",
  "category": "editorials",
  "authorName": "Author Name",
  "newspaper": "Newspaper Name"
}
```

### **Required Fields**
- `id` - Unique identifier
- `title` - Editorial title
- `date` - Publication date (YYYY-MM-DD)
- `fileUrl` - Path to PDF file
- `category` - Must be "editorials"
- `authorName` - Author's name (optional but recommended)
- `newspaper` - Newspaper name (optional but recommended)

## 🛠️ **How to Add Editorials**

### **Method 1: Using the Script (Recommended)**

#### **Quick Add Editorial**
```bash
node add-pdf.js add-editorial "Title" "Date" "Author" "Newspaper" "filename.pdf"
```

#### **Example**
```bash
node add-pdf.js add-editorial "August 5 Dawn Editorial" "2024-08-05" "John Doe" "Dawn" "dawn-editorial.pdf"
```

### **Method 2: Manual JSON Editing**

1. **Upload PDF** to `public/pdfs/editorials/`
2. **Edit** `src/data/pdfs.json`
3. **Add entry** with author and newspaper fields:

```json
{
  "id": "unique-id",
  "title": "Your Editorial Title",
  "date": "2024-08-05",
  "fileUrl": "/pdfs/editorials/your-file.pdf",
  "category": "editorials",
  "authorName": "Author Name",
  "newspaper": "Newspaper Name"
}
```

### **Method 3: Admin Interface**

1. **Visit** `/admin` on your website
2. **Use the web form** to add editorials
3. **Fill in** author and newspaper fields

## 📊 **Current Editorials**

Your system currently has:

```
📝 July 31 Dawn Editorial And Opinion Summary
   Date: July 31, 2024
   Author: Editorial Team
   Newspaper: Dawn
   File: /pdfs/editorials/July 31 Dawn Editorial And Opinion Summary.pdf
```

## 🔧 **Management Commands**

### **List All PDFs**
```bash
node add-pdf.js list
```

### **Add New Editorial**
```bash
node add-pdf.js add-editorial "Title" "Date" "Author" "Newspaper" "filename.pdf"
```

### **Scan Directories**
```bash
node add-pdf.js scan
```

## 🌐 **API Endpoints**

### **Editorials API**
- **URL**: `/api/editorials`
- **Returns**: All editorials with author and newspaper information
- **Format**: JSON

### **Example Response**
```json
{
  "editorials": [
    {
      "id": "2",
      "title": "July 31 Dawn Editorial And Opinion Summary",
      "authorName": "Editorial Team",
      "newspaper": "Dawn",
      "date": "2024-07-31",
      "fileUrl": "/pdfs/editorials/July 31 Dawn Editorial And Opinion Summary.pdf"
    }
  ],
  "count": 1
}
```

## 🎨 **Frontend Display**

The editorials will now display with:
- ✅ **Author name** below the title
- ✅ **Newspaper name** in a pill-shaped tag
- ✅ **Date** with clock icon
- ✅ **View** and **Download** buttons

## 📋 **Daily Workflow for Editorials**

### **Step 1: Upload PDF**
```bash
cp "your-editorial.pdf" public/pdfs/editorials/
```

### **Step 2: Add Metadata**
```bash
node add-pdf.js add-editorial "Your Title" "2024-08-05" "Author Name" "Newspaper" "your-editorial.pdf"
```

### **Step 3: Deploy**
```bash
git add .
git commit -m "Add new editorial"
git push origin main
```

## 🔍 **Testing**

### **Test Locally**
```bash
# Start development server
npm run dev

# Test API
curl http://localhost:3001/api/editorials

# Visit website
open http://localhost:3001/newspapers
```

### **Test on Vercel**
- Visit your deployed website
- Check the newspapers page
- Verify editorials show author and newspaper information

## ✅ **Benefits**

- ✅ **Rich metadata** for editorials
- ✅ **Professional display** matching your design
- ✅ **Easy management** with command-line tools
- ✅ **API support** for frontend integration
- ✅ **Backward compatible** with existing PDFs

## 🎯 **Next Steps**

1. **Add more editorials** using the new features
2. **Customize the display** if needed
3. **Deploy to Vercel** when ready
4. **Enjoy your enhanced editorial system!**

Your editorial system now supports the full metadata you wanted! 🚀 