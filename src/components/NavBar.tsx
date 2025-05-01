import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';
import { Menu, X } from 'lucide-react';

interface NavBarProps {
  onLetsChatClick: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onLetsChatClick }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { labelKey: 'nav.problem', href: '#problem' },
    { labelKey: 'nav.solution', href: '#solution' },
    { labelKey: 'nav.howItWorks', href: '#how-it-works' },
    { labelKey: 'nav.benefits', href: '#benefits' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img 
              src="/theodora-logo-h.avif"
              alt="Theodora Logo" 
              className="h-20 w-auto"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.labelKey} 
                href={link.href} 
                className={`text-secondary hover:text-accent transition-colors ${isScrolled || isMobileMenuOpen ? '' : 'text-white/80 hover:text-white'}`}
              >
                {t(link.labelKey)}
              </a>
            ))}
            <button 
              onClick={onLetsChatClick}
              className="btn btn-primary ml-4"
            >
              {t('nav.letsChat')}
            </button>
            <LanguageSelector isScrolled={isScrolled || isMobileMenuOpen} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <LanguageSelector isScrolled={isScrolled || isMobileMenuOpen} />
             <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`ml-4 p-2 rounded ${isScrolled || isMobileMenuOpen ? 'text-primary' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.labelKey} 
                href={link.href} 
                onClick={closeMobileMenu} // Close menu on link click
                className="text-secondary hover:text-accent transition-colors py-2"
              >
                {t(link.labelKey)}
              </a>
            ))}
            <button
              onClick={() => {
                onLetsChatClick();
                closeMobileMenu();
              }}
              className="btn btn-primary w-11/12 mt-2"
            >
              {t('nav.letsChat')}
            </button>
          </nav>
        </div>
      )}
    </nav>
  );
}; 