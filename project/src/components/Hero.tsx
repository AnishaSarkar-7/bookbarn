import React from 'react';
import { TrendingUp, Star, BookOpen } from 'lucide-react';

interface HeroProps {
  onStartExploring: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartExploring }) => {
  return (
    <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your Next
            <span className="text-amber-600 block">Great Read</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our vast collection of books, get personalized recommendations, and join a community of passionate readers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center group">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <BookOpen className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">50,000+ Books</h3>
            <p className="text-gray-600">Vast collection across all genres</p>
          </div>

          <div className="text-center group">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
            <p className="text-gray-600">AI-powered suggestions just for you</p>
          </div>

          <div className="text-center group">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Star className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Reviews</h3>
            <p className="text-gray-600">Trusted ratings from book lovers</p>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={onStartExploring}
            className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;