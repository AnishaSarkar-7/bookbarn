import React from 'react';
import { X, Star, Calendar, BookOpen, Languages, Hash, Check } from 'lucide-react';
import { Book } from '../types/book';

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToReadingList: (book: Book) => void;
  isInReadingList: boolean;
}

const BookModal: React.FC<BookModalProps> = ({ book, isOpen, onClose, onAddToReadingList, isInReadingList }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Book Cover */}
              <div className="space-y-6">
                <div className="relative">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                  {book.featured && (
                    <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      if (!isInReadingList) {
                        onAddToReadingList(book);
                      }
                    }}
                    className={`flex-1 py-3 px-6 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2 ${
                      isInReadingList
                        ? 'bg-green-600 text-white cursor-default'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                    disabled={isInReadingList}
                  >
                    {isInReadingList ? (
                      <>
                        <Check className="h-4 w-4" />
                        Added to Reading List
                      </>
                    ) : (
                      'Add to Reading List'
                    )}
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium">
                    Preview
                  </button>
                </div>
              </div>

              {/* Book Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                  <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-lg font-medium text-gray-700">{book.rating}</span>
                      <span className="ml-2 text-gray-500">({book.reviews} reviews)</span>
                    </div>
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      {book.genre}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{book.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Published: {book.publishedYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{book.pages} pages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{book.language}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{book.isbn}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Similar Books</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
                        <div className="w-full h-20 bg-gray-300 rounded mb-2"></div>
                        <p className="text-xs text-gray-600 text-center">Similar Book {i}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;