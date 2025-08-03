'use client';

import React, { useState } from 'react';
import { Download, BookOpen, Star, Search, Tag, FileText, Clock, Users } from 'lucide-react';

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  category: string;
  subject: string;
  downloads: number;
  rating: number;
  type: 'pdf' | 'doc' | 'video' | 'audio';
  level: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: string;
}

const StudyMaterialsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const studyMaterials: StudyMaterial[] = [
    {
      id: '1',
      title: 'Complete CSS Study Guide 2024',
      description: 'Comprehensive guide covering all compulsory subjects with latest updates',
      fileSize: '25.4 MB',
      category: 'general',
      subject: 'all',
      downloads: 5420,
      rating: 4.8,
      type: 'pdf',
      level: 'intermediate',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'Current Affairs Digest 2024',
      description: 'Monthly digest of important current affairs and developments',
      fileSize: '12.8 MB',
      category: 'current-affairs',
      subject: 'current-affairs',
      downloads: 3250,
      rating: 4.6,
      type: 'pdf',
      level: 'beginner',
      lastUpdated: '2024-01-01'
    },
    {
      id: '3',
      title: 'Pakistan Affairs Complete Notes',
      description: 'Detailed notes on Pakistan\'s history, politics, and development',
      fileSize: '18.2 MB',
      category: 'pakistan-affairs',
      subject: 'pakistan-affairs',
      downloads: 2890,
      rating: 4.7,
      type: 'pdf',
      level: 'intermediate',
      lastUpdated: '2023-12-20'
    },
    {
      id: '4',
      title: 'Essay Writing Masterclass',
      description: 'Advanced techniques for writing high-scoring CSS essays',
      fileSize: '8.5 MB',
      category: 'english',
      subject: 'english',
      downloads: 4100,
      rating: 4.9,
      type: 'pdf',
      level: 'advanced',
      lastUpdated: '2024-01-10'
    },
    {
      id: '5',
      title: 'General Knowledge MCQs Bank',
      description: '1000+ multiple choice questions with detailed explanations',
      fileSize: '15.3 MB',
      category: 'general-knowledge',
      subject: 'general-knowledge',
      downloads: 3750,
      rating: 4.5,
      type: 'pdf',
      level: 'intermediate',
      lastUpdated: '2023-12-15'
    },
    {
      id: '6',
      title: 'Islamic Studies Comprehensive Guide',
      description: 'Complete coverage of Islamic history, jurisprudence, and ethics',
      fileSize: '22.1 MB',
      category: 'islamic-studies',
      subject: 'islamic-studies',
      downloads: 2340,
      rating: 4.6,
      type: 'pdf',
      level: 'intermediate',
      lastUpdated: '2023-11-30'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', count: studyMaterials.length },
    { id: 'general', label: 'General Guides', count: 1 },
    { id: 'current-affairs', label: 'Current Affairs', count: 1 },
    { id: 'pakistan-affairs', label: 'Pakistan Affairs', count: 1 },
    { id: 'english', label: 'English', count: 1 },
    { id: 'general-knowledge', label: 'General Knowledge', count: 1 },
    { id: 'islamic-studies', label: 'Islamic Studies', count: 1 }
  ];

  const subjects = ['all', 'english', 'general-knowledge', 'pakistan-affairs', 'current-affairs', 'islamic-studies'];

  const filteredMaterials = studyMaterials.filter(material => {
    const categoryMatch = selectedCategory === 'all' || material.category === selectedCategory;
    const subjectMatch = selectedSubject === 'all' || material.subject === selectedSubject;
    const searchMatch = searchTerm === '' || 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && subjectMatch && searchMatch;
  });

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'video': return '🎥';
      case 'audio': return '🎵';
      default: return '📄';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Download className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Study Materials</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Subject-wise study guides, notes, and reference materials to boost your CSS preparation.
            </p>
            <div className="flex justify-center space-x-8 mt-8 text-orange-100">
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm">Files</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm">Subjects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm">Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search study materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
            </div>
            
            {/* Subject Filter */}
            <div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Subjects</option>
                {subjects.slice(1).map(subject => (
                  <option key={subject} value={subject}>
                    {subject.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <div key={material.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getFileTypeIcon(material.type)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(material.level)}`}>
                    {material.level}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm text-gray-600">{material.rating}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{material.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{material.description}</p>

              {/* Metadata */}
              <div className="space-y-2 mb-4 text-xs text-gray-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <FileText className="h-3 w-3" />
                    <span>{material.fileSize}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{material.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Updated {new Date(material.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="h-3 w-3 text-gray-400" />
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {material.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Preview
                </button>
                <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMaterials.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No materials found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters to see more results.</p>
          </div>
        )}

        {/* Statistics */}
        {filteredMaterials.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{filteredMaterials.length}</div>
                <div className="text-orange-700 text-sm">Materials Found</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(filteredMaterials.reduce((acc, m) => acc + m.rating, 0) / filteredMaterials.length * 10) / 10}
                </div>
                <div className="text-blue-700 text-sm">Avg Rating</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {filteredMaterials.reduce((acc, m) => acc + m.downloads, 0).toLocaleString()}
                </div>
                <div className="text-green-700 text-sm">Total Downloads</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {(filteredMaterials.reduce((acc, m) => acc + parseFloat(m.fileSize), 0)).toFixed(1)}
                </div>
                <div className="text-purple-700 text-sm">Total Size (MB)</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterialsPage;