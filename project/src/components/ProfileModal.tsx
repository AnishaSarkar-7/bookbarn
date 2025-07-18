import React, { useState } from 'react';
import { X, User, BookOpen, Heart, Star, Settings, Edit3, Camera } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  readingListCount: number;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, readingListCount }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    bio: 'Passionate reader with a love for mystery novels and fantasy epics. Always looking for my next great adventure between the pages.',
    favoriteGenres: ['Mystery', 'Fantasy', 'Science Fiction'],
    joinDate: 'March 2023',
    booksRead: 47,
    reviewsWritten: 23
  });

  if (!isOpen) return null;

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition-colors duration-200">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-amber-600 focus:outline-none"
                  />
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-amber-600"
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{userProfile.name}</h3>
                  <p className="text-gray-600">{userProfile.email}</p>
                  <p className="text-sm text-gray-500 mt-1">Member since {userProfile.joinDate}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200"
            >
              {isEditing ? (
                <>Save Changes</>
              ) : (
                <>
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{userProfile.booksRead}</div>
              <div className="text-sm text-gray-600">Books Read</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{readingListCount}</div>
              <div className="text-sm text-gray-600">Reading List</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{userProfile.reviewsWritten}</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">About</h4>
            {isEditing ? (
              <textarea
                value={userProfile.bio}
                onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
                rows={3}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{userProfile.bio}</p>
            )}
          </div>

          {/* Favorite Genres */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Favorite Genres</h4>
            <div className="flex flex-wrap gap-2">
              {userProfile.favoriteGenres.map((genre) => (
                <span
                  key={genre}
                  className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Reading Goals */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">2024 Reading Goal</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-900">{userProfile.booksRead}/50 books</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userProfile.booksRead / 50) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {50 - userProfile.booksRead} books to go!
              </p>
            </div>
          </div>

          {/* Settings */}
          <div className="border-t border-gray-100 pt-6">
            <button className="flex items-center gap-3 w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <Settings className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">Account Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;