import React from 'react';
import { X, BookOpen, Trash2 } from 'lucide-react';
import { Book } from '../types/book';

interface ReadingListSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  readingList: Book[];
  onRemoveFromList: (bookId: string) => void;
}

const ReadingListSidebar: React.FC<ReadingListSidebarProps> = ({ 
  isOpen, 
  onClose, 
  readingList, 
  onRemoveFromList 
}) => {
  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">My Reading List</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {readingList.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Your reading list is empty</p>
              <p className="text-sm text-gray-400 mt-2">Add books to start building your collection</p>
            </div>
          ) : (
            <div className="space-y-4">
              {readingList.map((book) => (
                <div key={book.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{book.title}</h3>
                    <p className="text-sm text-gray-600 truncate">{book.author}</p>
                    <p className="text-xs text-gray-500">{book.genre}</p>
                  </div>
                  <button
                    onClick={() => onRemoveFromList(book.id)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {readingList.length > 0 && (
          <div className="p-6 border-t border-gray-100">
            <div className="text-center text-sm text-gray-500 mb-4">
              {readingList.length} book{readingList.length !== 1 ? 's' : ''} in your list
            </div>
            <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium">
              Export List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingListSidebar;