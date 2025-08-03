import React from 'react';
import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">CSS KRO</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your comprehensive platform for CSS exam preparation with newspapers, resources, past papers, and expert guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/newspapers" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Newspapers
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Timeline
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/resources#past-papers" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Past Papers
                </Link>
              </li>
              <li>
                <Link href="/resources#syllabus" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Syllabus
                </Link>
              </li>
              <li>
                <Link href="/resources#materials" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Study Materials
                </Link>
              </li>
              <li>
                <Link href="/resources#pattern" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Exam Pattern
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@cssprephub.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Islamabad, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {currentYear} CSS KRO. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;