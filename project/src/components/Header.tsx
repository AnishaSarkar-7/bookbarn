import React, { useState } from 'react';
import { Search, Menu, X, BookOpen, Heart, User } from 'lucide-react';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  currentView: 'home' | 'browse' | 'categories' | 'reviews';
  onNavigate: (view: 'home' | 'browse' | 'categories' | 'reviews') => void;
  onOpenReadingList: () => void;
  onOpenProfile: () => void;
  readingListCount: number;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearchChange, 
  searchQuery, 
  currentView, 
  onNavigate,
  onOpenReadingList,
  onOpenProfile,
  readingListCount
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'browse', label: 'Browse' },
    { key: 'categories', label: 'Categories' },
    { key: 'reviews', label: 'Reviews' }
  ] as const;

  const handleNavClick = (view: 'home' | 'browse' | 'categories' | 'reviews') => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <BookOpen className="h-8 w-8 text-amber-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">BookBarn</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleNavClick(key)}
                className={`transition-colors duration-200 font-medium ${
                  currentView === key
                    ? 'text-amber-600 border-b-2 border-amber-600 pb-1'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search books, authors, genres..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenReadingList}
              className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors duration-200 group"
              title="Reading List"
            >
              <Heart className="h-5 w-5" />
              {readingListCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {readingListCount > 9 ? '9+' : readingListCount}
                </span>
              )}
            </button>
            <button 
              onClick={onOpenProfile}
              className="p-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
              title="Profile"
            >
              <User className="h-5 w-5" />
            </button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search books, authors, genres..."
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
              
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-2">
                {navItems.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => handleNavClick(key)}
                    className={`text-left transition-colors duration-200 font-medium py-2 ${
                      currentView === key
                        ? 'text-amber-600'
                        : 'text-gray-700 hover:text-amber-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </nav>

              {/* Mobile User Actions */}
              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => {
                    onOpenReadingList();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
                >
                  <Heart className="h-5 w-5" />
                  Reading List ({readingListCount})
                </button>
                <button 
                  onClick={() => {
                    onOpenProfile();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                  Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;