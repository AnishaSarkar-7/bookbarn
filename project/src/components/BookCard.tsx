import React from 'react';
import { Star, Heart, BookOpen, Check } from 'lucide-react';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onAddToReadingList: (book: Book) => void;
  onBookSelect: (book: Book) => void;
  isInReadingList: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToReadingList, onBookSelect, isInReadingList }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105">
      <div className="relative overflow-hidden">
        <img 
          src={book.coverUrl} 
          alt={book.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          onClick={() => onBookSelect(book)}
        />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (!isInReadingList) {
                onAddToReadingList(book);
              }
            }}
            className={`backdrop-blur-sm p-2 rounded-full transition-colors duration-200 ${
              isInReadingList 
                ? 'bg-green-500/90 text-white cursor-default' 
                : 'bg-white/90 hover:bg-white text-red-500'
            }`}
            disabled={isInReadingList}
          >
            {isInReadingList ? <Check className="h-5 w-5" /> : <Heart className="h-5 w-5" />}
          </button>
        </div>
        {book.featured && (
          <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 
          className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-amber-600 transition-colors duration-200"
          onClick={() => onBookSelect(book)}
        >
          {book.title}
        </h3>
        <p className="text-gray-600 mb-2 font-medium">{book.author}</p>
        <p className="text-sm text-gray-500 mb-4">{book.genre}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">{book.rating}</span>
            <span className="ml-2 text-sm text-gray-500">({book.reviews} reviews)</span>
          </div>
          <span className="text-sm text-gray-500">{book.publishedYear}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {book.description}
        </p>
        
        <div className="flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onBookSelect(book);
            }}
            className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <BookOpen className="h-4 w-4" />
            Read More
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (!isInReadingList) {
                onAddToReadingList(book);
              }
            }}
            className={`py-2 px-4 rounded-lg transition-colors duration-200 font-medium ${
              isInReadingList
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            disabled={isInReadingList}
          >
            {isInReadingList ? 'Added' : 'Add to List'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;