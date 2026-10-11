import React from 'react';
import { Film, Moon, Sun, Shield, Menu, X } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  currentRole: UserRole;
  onOpenAdmin: () => void;
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  activeSection,
  setActiveSection,
  currentRole,
  onOpenAdmin,
  onOpenUpload,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'projects', label: 'Selected Works' },
    { id: 'breakdown', label: 'Before & After' },
    { id: 'services', label: 'Packages & Rates' },
    { id: 'about', label: 'About Muawiya' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 bg-neutral-950/85 border-neutral-800 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
            <Film className="w-4 h-4" />
          </span>
          <span className="font-display tracking-wider">MUAWIYA</span>
        </a>

        {/* Zone 2: 4-5 Nav Links (Single line text with hover states) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeSection === item.id ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={onOpenUpload}
            className="hover:text-amber-400 text-neutral-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Upload Video
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Studio' : 'Switch to Dark Cinematic'}
            className="p-2 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Toggle theme mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Admin / RBAC Portal Quick Button */}
          <button
            onClick={onOpenAdmin}
            title={`Active role: ${currentRole.toUpperCase()}`}
            className="p-2 rounded-lg border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline uppercase">{currentRole}</span>
          </button>

          {/* Primary CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="px-4 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm shadow-amber-500/20"
          >
            Book Project
          </a>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-5 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-2 text-sm font-medium text-neutral-300 hover:text-amber-400"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenUpload();
              }}
              className="text-sm font-medium text-amber-400 py-1"
            >
              + Upload to Portfolio
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xs font-mono uppercase text-neutral-400"
            >
              RBAC Portal ({currentRole})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
