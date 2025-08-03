'use client';

import React, { useState } from 'react';
import { X, Download, ExternalLink, ZoomIn, ZoomOut } from 'lucide-react';

interface PDFViewerProps {
  title: string;
  fileUrl: string;
  date: string;
  isOpen: boolean;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ title, fileUrl, date, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(100);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 truncate">{title}</h2>
            <p className="text-sm text-gray-600">{new Date(date).toLocaleDateString()}</p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom Out"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            
            <span className="text-sm text-gray-600 min-w-[4rem] text-center">
              {zoom}%
            </span>
            
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 200}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom In"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-gray-900"
              title="Download PDF"
            >
              <Download className="h-5 w-5" />
            </button>
            
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900"
              title="Open in New Tab"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <div className="p-4 flex justify-center">
            <iframe
              src={`${fileUrl}#zoom=${zoom}`}
              className="w-full border border-gray-300 rounded shadow-lg"
              style={{ 
                height: '80vh',
                minHeight: '600px',
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center'
              }}
              title={title}
              onError={() => {
                // Fallback for browsers that don't support iframe PDF viewing
                console.log('PDF iframe failed, redirecting to download');
              }}
            />
          </div>
        </div>

        {/* Fallback message */}
        <div className="p-4 text-center text-gray-600 text-sm border-t border-gray-200">
          <p>
            If the PDF doesn&apos;t display properly,{' '}
            <button
              onClick={handleDownload}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              download it here
            </button>{' '}
            or{' '}
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              open in a new tab
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;