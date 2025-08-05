'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Clock, FileText, Eye, Download } from 'lucide-react';
import PDFViewer from '@/components/PDFViewer';



interface Newspaper {
  id: string;
  title: string;
  date: string;
  fileUrl: string;
}

interface Editorial {
  id: string;
  title: string;
  authorName: string;
  newspaper: string;
  date: string;
  fileUrl: string;
}

const NewspapersPage: React.FC = () => {
  const [newspapers, setNewspapers] = useState<Newspaper[]>([]);
  const [editorials, setEditorials] = useState<Editorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorialsLoading, setEditorialsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editorialsError, setEditorialsError] = useState<string | null>(null);
  const [selectedPDF, setSelectedPDF] = useState<Newspaper | Editorial | null>(null);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  // Fetch newspapers from API
  useEffect(() => {
    const fetchNewspapers = async () => {
      try {
        setLoading(true);
        // Try alternative API first, fallback to original if needed
        let response = await fetch('/api/newspapers-alt');
        
        if (!response.ok) {
          // Fallback to original API
          response = await fetch('/api/newspapers');
        }
        
        if (!response.ok) {
          throw new Error(`Failed to fetch newspapers: ${response.statusText}`);
        }
        
        const data = await response.json();
        setNewspapers(data.newspapers || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching newspapers:', err);
        setError(err instanceof Error ? err.message : 'Failed to load newspapers');
      } finally {
        setLoading(false);
      }
    };

    fetchNewspapers();
  }, []);

  // Fetch editorials from API
  useEffect(() => {
    const fetchEditorials = async () => {
      try {
        setEditorialsLoading(true);
        // Try alternative API first, fallback to original if needed
        let response = await fetch('/api/editorials-alt');
        
        if (!response.ok) {
          // Fallback to original API
          response = await fetch('/api/editorials');
        }
        
        if (!response.ok) {
          throw new Error(`Failed to fetch editorials: ${response.statusText}`);
        }
        
        const data = await response.json();
        setEditorials(data.editorials || []);
        setEditorialsError(null);
      } catch (err) {
        console.error('Error fetching editorials:', err);
        setEditorialsError(err instanceof Error ? err.message : 'Failed to load editorials');
      } finally {
        setEditorialsLoading(false);
      }
    };

    fetchEditorials();
  }, []);

  const handleViewPDF = (item: Newspaper | Editorial) => {
    setSelectedPDF(item);
    setShowPDFViewer(true);
  };

  const handleClosePDF = () => {
    setShowPDFViewer(false);
    setSelectedPDF(null);
  };

  const handleDownloadPDF = (item: Newspaper | Editorial) => {
    const link = document.createElement('a');
    link.href = item.fileUrl;
    link.download = `${item.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Daily Newspapers</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay updated with current affairs from leading Pakistani newspapers - Essential for CSS Current Affairs with CSS KRO
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading newspapers...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Error Loading Newspapers</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* PDF Newspapers Grid */}
        {!loading && !error && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Newspaper PDFs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newspapers.map((newspaper) => (
                  <div
                    key={newspaper.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
                  >
                    <div className="p-6">
                      {/* PDF Icon */}
                      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-lg mb-4 mx-auto">
                        <FileText className="h-8 w-8 text-red-600" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors">
                        {newspaper.title}
                      </h3>

                      {/* Date */}
                      <div className="flex items-center justify-center text-gray-500 text-sm mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(newspaper.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewPDF(newspaper)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View PDF
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(newspaper)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Editorial Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Editorial</h2>
              
              {/* Editorial Loading State */}
              {editorialsLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading editorials...</p>
                </div>
              )}

              {/* Editorial Error State */}
              {editorialsError && (
                <div className="text-center py-8">
                  <div className="text-red-500 text-4xl mb-4">⚠️</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Editorials</h3>
                  <p className="text-gray-600">{editorialsError}</p>
                </div>
              )}

              {/* Editorial Grid */}
              {!editorialsLoading && !editorialsError && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {editorials.map((editorial) => (
                    <div
                      key={editorial.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
                    >
                      <div className="p-6">
                        {/* Editorial Icon */}
                        <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-lg mb-4 mx-auto">
                          <FileText className="h-8 w-8 text-purple-600" />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center group-hover:text-purple-600 transition-colors">
                          {editorial.title}
                        </h3>

                        {/* Author */}
                        <div className="flex items-center justify-center text-gray-600 text-sm mb-2">
                          <span className="font-medium">By {editorial.authorName}</span>
                        </div>

                        {/* Newspaper */}
                        <div className="flex items-center justify-center text-purple-600 text-sm font-medium mb-2">
                          <span className="bg-purple-100 px-2 py-1 rounded-full text-xs">{editorial.newspaper}</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center justify-center text-gray-500 text-sm mb-4">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(editorial.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewPDF(editorial)}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Editorial
                          </button>
                          <button
                            onClick={() => handleDownloadPDF(editorial)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Editorials */}
              {!editorialsLoading && !editorialsError && editorials.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">📝</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No editorials found</h3>
                  <p className="text-gray-600">No editorial PDFs are available at the moment.</p>
                </div>
              )}
            </div>

          </>
        )}

        {/* No Results for PDF Newspapers */}
        {!loading && !error && newspapers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📰</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No newspapers found</h3>
            <p className="text-gray-600">No newspaper PDFs are available at the moment.</p>
          </div>
        )}

        {/* Newspaper Links */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Dawn</h3>
            <p className="text-sm text-gray-600 mb-4">Pakistan&apos;s most widely circulated English newspaper</p>
            <a
              href="https://www.dawn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Visit Website
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h3 className="font-semibold text-gray-900 mb-2">The News</h3>
            <p className="text-sm text-gray-600 mb-4">Leading English daily with comprehensive coverage</p>
            <a
              href="https://www.thenews.com.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Visit Website
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Express Tribune</h3>
            <p className="text-sm text-gray-600 mb-4">Pakistan&apos;s premier English newspaper</p>
            <a
              href="https://tribune.com.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Visit Website
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h3 className="font-semibold text-gray-900 mb-2">The Nation</h3>
            <p className="text-sm text-gray-600 mb-4">Independent voice with comprehensive coverage</p>
            <a
              href="https://nation.com.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Visit Website
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>

        {/* PDF Viewer Modal */}
        {selectedPDF && (
          <PDFViewer
            title={selectedPDF.title}
            fileUrl={selectedPDF.fileUrl}
            date={selectedPDF.date}
            isOpen={showPDFViewer}
            onClose={handleClosePDF}
          />
        )}
      </div>
    </div>
  );
};

export default NewspapersPage;