import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import FilterBar from './components/FilterBar';
import ReadingListSidebar from './components/ReadingListSidebar';
import ProfileModal from './components/ProfileModal';
import { books, genres } from './data/books';
import { Book } from './types/book';
import { Heart } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSort, setSelectedSort] = useState('rating');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [isReadingListOpen, setIsReadingListOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'browse' | 'categories' | 'reviews'>('home');
  const [notification, setNotification] = useState<string | null>(null);

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.genre.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === '' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'year':
          return b.publishedYear - a.publishedYear;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'rating':
        default:
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [searchQuery, selectedGenre, selectedSort]);

  const featuredBooks = books.filter(book => book.featured);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleAddToReadingList = (book: Book) => {
    setReadingList(prev => {
      if (prev.some(b => b.id === book.id)) {
        showNotification(`"${book.title}" is already in your reading list!`);
        return prev;
      }
      showNotification(`"${book.title}" added to your reading list!`);
      return [...prev, book];
    });
  };

  const handleRemoveFromReadingList = (bookId: string) => {
    const book = readingList.find(b => b.id === bookId);
    setReadingList(prev => prev.filter(book => book.id !== bookId));
    if (book) {
      showNotification(`"${book.title}" removed from your reading list!`);
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleNavigation = (view: 'home' | 'browse' | 'categories' | 'reviews') => {
    setCurrentView(view);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isBookInReadingList = (bookId: string) => {
    return readingList.some(book => book.id === bookId);
  };

  const handleOpenReadingList = () => {
    setIsReadingListOpen(true);
  };

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true);
  };

  const handleStartExploring = () => {
    setCurrentView('browse');
    // Scroll to the browse section
    setTimeout(() => {
      const browseSection = document.getElementById('browse-section');
      if (browseSection) {
        browseSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        currentView={currentView}
        onNavigate={handleNavigation}
        onOpenReadingList={handleOpenReadingList}
        onOpenProfile={handleOpenProfile}
        readingListCount={readingList.length}
      />
      
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          {notification}
        </div>
      )}
      
      {currentView === 'home' && (
        <>
          <Hero onStartExploring={handleStartExploring} />
          
          {/* Featured Books Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Featured Books</h2>
                <button 
                  onClick={() => setIsReadingListOpen(true)}
                  className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200"
                >
                  <Heart className="h-4 w-4" />
                  Reading List ({readingList.length})
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredBooks.map(book => (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    onAddToReadingList={handleAddToReadingList}
                    onBookSelect={handleBookSelect}
                    isInReadingList={isBookInReadingList(book.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {(currentView === 'browse' || currentView === 'home') && (
        <>
          {/* Filter Bar */}
          <FilterBar 
            selectedGenre={selectedGenre}
            selectedSort={selectedSort}
            onGenreChange={setSelectedGenre}
            onSortChange={setSelectedSort}
            genres={genres}
          />

          {/* All Books Section */}
          <section id="browse-section" className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 
                   currentView === 'browse' ? 'Browse All Books' : 'All Books'}
                </h2>
                <div className="text-sm text-gray-500">
                  {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
                </div>
              </div>
              
              {filteredBooks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No books found matching your criteria</p>
                  <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredBooks.map(book => (
                    <BookCard 
                      key={book.id} 
                      book={book} 
                      onAddToReadingList={handleAddToReadingList}
                      onBookSelect={handleBookSelect}
                      isInReadingList={isBookInReadingList(book.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {currentView === 'categories' && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {genres.map(genre => {
                const genreBooks = books.filter(book => book.genre === genre);
                return (
                  <div 
                    key={genre}
                    onClick={() => {
                      setSelectedGenre(genre);
                      setCurrentView('browse');
                    }}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {genre}
                    </h3>
                    <p className="text-gray-600 mb-4">{genreBooks.length} books available</p>
                    <div className="flex -space-x-2">
                      {genreBooks.slice(0, 3).map(book => (
                        <img 
                          key={book.id}
                          src={book.coverUrl} 
                          alt={book.title}
                          className="w-8 h-10 object-cover rounded border-2 border-white"
                        />
                      ))}
                      {genreBooks.length > 3 && (
                        <div className="w-8 h-10 bg-gray-200 rounded border-2 border-white flex items-center justify-center text-xs text-gray-600">
                          +{genreBooks.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {currentView === 'reviews' && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Rated Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {books
                .sort((a, b) => b.rating - a.rating)
                .map(book => (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    onAddToReadingList={handleAddToReadingList}
                    onBookSelect={handleBookSelect}
                    isInReadingList={isBookInReadingList(book.id)}
                  />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Book Modal */}
      <BookModal 
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBook(null);
        }}
        onAddToReadingList={handleAddToReadingList}
        isInReadingList={selectedBook ? isBookInReadingList(selectedBook.id) : false}
      />

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        readingListCount={readingList.length}
      />

      {/* Reading List Sidebar */}
      <ReadingListSidebar 
        isOpen={isReadingListOpen}
        onClose={() => setIsReadingListOpen(false)}
        readingList={readingList}
        onRemoveFromList={handleRemoveFromReadingList}
      />

      {/* Background overlay for sidebar and modals */}
      {(isReadingListOpen || isProfileModalOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => {
            setIsReadingListOpen(false);
            setIsProfileModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;