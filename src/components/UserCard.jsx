import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';

const UserCard = ({ user, isPreview = false }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Only show swipe functionality if it's not a preview
  const handleSendRequest = async (status, userId) => {
    if (isPreview) return;
    
    try {
      setIsLoading(true);
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      // Dispatch after animation completes
      setTimeout(() => {
        dispatch(removeUserFromFeed(userId));
      }, 500);
    } catch (err) {
      console.error(err);
      alert("Failed to send request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwipe = (direction) => {
    if (isPreview || isExiting) return;
    
    setIsExiting(true);
    setSwipeDirection(direction);
    
    setTimeout(() => {
      setIsExiting(false);
      if (direction === 'right') {
        handleSendRequest("interested", _id);
      } else {
        handleSendRequest("ignored", _id);
      }
    }, 500);
  };

  return (
    <div className={`relative transition-all duration-500 ease-in-out ${isExiting ? (swipeDirection === 'right' ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0') : 'translate-x-0 opacity-100'} ${isPreview ? 'pointer-events-none' : ''}`}>
      <div 
        className={`bg-gray-700 rounded-2xl overflow-hidden shadow-xl ${isPreview ? 'h-96' : ''}`}
      >
        {/* Profile Image */}
        <div className={`relative ${isPreview ? 'h-48' : 'h-72'}`}>
          <img
            src={photoUrl || "https://via.placeholder.com/400x500"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* User Info - Below the photo */}
        <div className="p-4">
          <div className="flex items-start mb-3">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">
                {firstName} {lastName}
              </h2>
              {(age || gender) && (
                <p className="text-gray-300 text-sm mt-1">
                  {age && <span>{age}</span>}
                  {age && gender && <span> • </span>}
                  {gender && <span>{gender}</span>}
                </p>
              )}
            </div>
          </div>
          
          <h3 className="text-md font-semibold text-gray-300 mb-2">About</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">{about || "No description provided."}</p>
          
          {!isPreview && (
            <div className="flex justify-between items-center">
              {/* Reject Button with Tooltip */}
              <div className="tooltip" data-tip="Ignore">
                <button
                  onClick={() => handleSwipe('left')}
                  disabled={isLoading}
                  className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-md hover:bg-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {/* Accept Button with Tooltip */}
              <div className="tooltip" data-tip="Interested">
                <button
                  onClick={() => handleSwipe('right')}
                  disabled={isLoading}
                  className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-md hover:bg-green-400 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default UserCard;