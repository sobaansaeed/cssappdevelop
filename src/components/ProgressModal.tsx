'use client';

import React, { useEffect, useState } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
  status: 'processing' | 'completed' | 'error';
  errorMessage?: string;
}

const ProgressModal: React.FC<ProgressModalProps> = ({
  isOpen,
  onClose,
  progress,
  status,
  errorMessage
}) => {
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    if (status === 'completed' && progress === 100) {
      setShowCompleted(true);
      const timer = setTimeout(() => {
        setShowCompleted(false);
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, progress, onClose]);

  if (!isOpen) return null;

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'error':
        return <X className="w-8 h-8 text-red-500" />;
      default:
        return <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'processing':
        return 'Analyzing your essay...';
      case 'completed':
        return 'Analysis completed!';
      case 'error':
        return 'Analysis failed';
      default:
        return 'Processing...';
    }
  };

  const getProgressColor = () => {
    if (status === 'error') return 'bg-red-500';
    if (status === 'completed') return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={status === 'error' ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Close button (only for errors) */}
        {status === 'error' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            {getStatusIcon()}
          </div>

          {/* Title */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {getStatusText()}
            </h3>
            {status === 'processing' && (
              <p className="text-sm text-gray-600">
                This may take a few moments...
              </p>
            )}
            {status === 'error' && errorMessage && (
              <p className="text-sm text-red-600 mt-2">
                {errorMessage}
              </p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Status-specific content */}
          {status === 'processing' && (
            <div className="space-y-2">
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <p className="text-xs text-gray-500">
                {progress < 30 && 'Extracting text from document...'}
                {progress >= 30 && progress < 60 && 'Processing with AI...'}
                {progress >= 60 && progress < 90 && 'Generating analysis...'}
                {progress >= 90 && 'Finalizing results...'}
              </p>
            </div>
          )}

          {status === 'completed' && showCompleted && (
            <div className="space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-green-600 font-medium">
                Your essay has been analyzed successfully!
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-2">
              <p className="text-sm text-red-600">
                Please try again or contact support if the problem persists.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressModal;
