import React, { useState, useEffect } from 'react';
import { Menu, X, Github } from 'lucide-react';
import { Link } from '../components/ui/Link';
import AuthButton from './AuthButton';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <Github className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-teal-400">
                CopyrightChain
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/verify" className="text-gray-300 hover:text-white transition">
              Verify Content
            </Link>
            <Link href="/mint" className="text-gray-300 hover:text-white transition">
              Mint NFT
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
              Dashboard
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition">
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <AuthButton />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="/verify"
              className="block py-2 text-gray-300 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Verify Content
            </Link>
            <Link
              href="/mint"
              className="block py-2 text-gray-300 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Mint NFT
            </Link>
            <Link
              href="/dashboard"
              className="block py-2 text-gray-300 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-300 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <div className="pt-2 border-t border-gray-800">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header