import React from 'react';
import { Mail } from 'lucide-react';
import {FaGithub, FaTwitter, FaLinkedin} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ background: 'linear-gradient(135deg, #A6D8FF 0%, #6B9FBF 50%, #3F7CAD 100%)' }} className="text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-xl mb-4">DU Tutors</h3>
            <p className="text-gray-200 mb-4">Your Trusted Platform to Find DU Tutors & Tuitions</p>
            <div className="flex space-x-4">
              <button className="text-gray-200 hover:text-white transition-colors">
                <FaGithub size={20} />
              </button>
              <button className="text-gray-200 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </button>
              <button className="text-gray-200 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </button>
              <button className="text-gray-200 hover:text-white transition-colors">
                <Mail size={20} />
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button className="text-gray-200 hover:text-white transition-colors">Home</button></li>
              <li><button className="text-gray-200 hover:text-white transition-colors">Posts</button></li>
              <li><button className="text-gray-200 hover:text-white transition-colors">Applications</button></li>
              <li><button className="text-gray-200 hover:text-white transition-colors">Chat</button></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><button className="text-gray-200 hover:text-white transition-colors">Blog</button></li>
              <li><button className="text-gray-200 hover:text-white transition-colors">Tuition Tips</button></li>
              <li><button className="text-gray-200 hover:text-white transition-colors">Help Center</button></li>
              <li><button className="text-gray-200 hover:text-white transition-colors">Guidelines</button></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-200">
              <li>DU Tutors</li>
              <li>Institute of Information Technology</li>
              <li>University of Dhaka</li>
              <li>Dhaka-1000, Bangladesh</li>
              <li className="mt-4">
                <a href="mailto:tashrifpro@gmail.com" className="hover:text-white transition-colors">support@dututors.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-200 mb-4 md:mb-0">© {currentYear} DU Tutors. All rights reserved.</p>
          <div className="flex space-x-6">
            <button className="text-gray-200 hover:text-white transition-colors text-sm">Terms of Service</button>
            <button className="text-gray-200 hover:text-white transition-colors text-sm">Privacy Policy</button>
            <button className="text-gray-200 hover:text-white transition-colors text-sm">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;