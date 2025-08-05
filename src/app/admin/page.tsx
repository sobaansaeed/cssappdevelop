'use client';

import { useState, useEffect } from 'react';

interface PDFFile {
  id: string;
  title: string;
  date: string;
  fileUrl: string;
  category: 'newspapers' | 'editorials';
}

export default function AdminPage() {
  const [pdfs, setPdfs] = useState<PDFFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPdf, setNewPdf] = useState({
    title: '',
    date: '',
    fileUrl: '',
    category: 'newspapers' as 'newspapers' | 'editorials'
  });

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const response = await fetch('/api/pdfs');
      const data = await response.json();
      setPdfs(data.pdfs || []);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPdf = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const pdfData = {
      ...newPdf,
      id: Date.now().toString(),
      fileUrl: newPdf.fileUrl.startsWith('/') ? newPdf.fileUrl : `/pdfs/${newPdf.category}/${newPdf.fileUrl}`
    };

    // In a real app, you'd save this to a database
    // For now, we'll just add it to the local state
    setPdfs(prev => [...prev, pdfData]);
    
    // Reset form
    setNewPdf({
      title: '',
      date: '',
      fileUrl: '',
      category: 'newspapers'
    });
  };

  const handleDeletePdf = (id: string) => {
    setPdfs(prev => prev.filter(pdf => pdf.id !== id));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">PDF Management</h1>
        
        {/* Add New PDF Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New PDF</h2>
          <form onSubmit={handleAddPdf} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newPdf.title}
                  onChange={(e) => setNewPdf(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newPdf.date}
                  onChange={(e) => setNewPdf(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newPdf.category}
                  onChange={(e) => setNewPdf(prev => ({ ...prev, category: e.target.value as 'newspapers' | 'editorials' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newspapers">Newspapers</option>
                  <option value="editorials">Editorials</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File URL (or filename)
                </label>
                <input
                  type="text"
                  value={newPdf.fileUrl}
                  onChange={(e) => setNewPdf(prev => ({ ...prev, fileUrl: e.target.value }))}
                  placeholder="e.g., sample-newspaper.pdf or full URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add PDF
            </button>
          </form>
        </div>

        {/* PDF List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Current PDFs</h2>
          
          <div className="space-y-4">
            {pdfs.map((pdf) => (
              <div key={pdf.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{pdf.title}</h3>
                    <p className="text-gray-600 text-sm">Date: {pdf.date}</p>
                    <p className="text-gray-600 text-sm">Category: {pdf.category}</p>
                    <p className="text-blue-600 text-sm break-all">{pdf.fileUrl}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <a
                      href={pdf.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDeletePdf(pdf.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {pdfs.length === 0 && (
              <p className="text-gray-500 text-center py-8">No PDFs added yet.</p>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">How to Use This System</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Upload your PDF files to the <code className="bg-blue-100 px-1 rounded">public/pdfs/</code> directory</li>
            <li>Add the PDF information using the form above</li>
            <li>The PDFs will be available at <code className="bg-blue-100 px-1 rounded">/api/pdfs</code></li>
            <li>Update your frontend to use this API instead of Notion</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 