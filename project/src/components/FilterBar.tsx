import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  selectedGenre: string;
  selectedSort: string;
  onGenreChange: (genre: string) => void;
  onSortChange: (sort: string) => void;
  genres: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  selectedGenre, 
  selectedSort, 
  onGenreChange, 
  onSortChange, 
  genres 
}) => {
  return (
    <div className="bg-white border-b border-gray-100 py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Genre Filter */}
            <div className="relative">
              <select 
                value={selectedGenre} 
                onChange={(e) => onGenreChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            
            {/* Sort Filter */}
            <div className="relative">
              <select 
                value={selectedSort} 
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
              >
                <option value="rating">Sort by Rating</option>
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
                <option value="year">Sort by Year</option>
                <option value="reviews">Sort by Reviews</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;