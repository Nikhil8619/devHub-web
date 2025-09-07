import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = connections.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(connections.length / cardsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };
  
  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-12">Your Connections</h1>
          <div className="flex flex-wrap justify-center gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-80 h-64 animate-pulse">
                <div className="flex items-center mb-4 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-white/20"></div>
                  <div className="ml-4 space-y-2">
                    <div className="h-4 w-32 bg-white/20 rounded"></div>
                    <div className="h-3 w-24 bg-white/20 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="h-3 w-full bg-white/20 rounded"></div>
                  <div className="h-3 w-3/4 bg-white/20 rounded"></div>
                </div>
                <div className="h-10 w-full mt-6 bg-white/20 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <svg className="w-32 h-32 mx-auto text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">No Connections Yet</h1>
          <p className="text-lg text-white/80 mb-8">
            It looks like you haven't connected with anyone yet. Start building your network by exploring our community!
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition-all">
              Explore Community
            </button>
            <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
              Invite Friends
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">Your Connections</h1>
        <p className="text-lg text-white/70 text-center mb-12">Stay connected with your network</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCards.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

            return (
              <div
                key={_id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transition-all hover:scale-[1.02] hover:bg-white/15 border border-white/10 w-full h-[320px] flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <img
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                    src={photoUrl || "https://via.placeholder.com/150"}
                  />
                  <div className="ml-4">
                    <h2 className="font-bold text-xl text-white">
                      {firstName + " " + lastName}
                    </h2>
                    {age && gender && (
                      <p className="text-white/70">{age + ", " + gender}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex-grow overflow-hidden mb-5">
                  <p className="text-white/80 line-clamp-3">{about || "No bio available"}</p>
                </div>
                
                <div className="flex justify-center mt-auto flex-shrink-0">
                  <button className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg transition-all flex items-center justify-center cursor-not-allowed opacity-75">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    Chat
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {connections.length > cardsPerPage && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="text-sm text-white/70">
              Showing {indexOfFirstCard + 1}-{Math.min(indexOfLastCard, connections.length)} of {connections.length} connections
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 text-white/70 hover:text-white  cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 text-white/70 cursor-pointer hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center gap-1">
                {getPageNumbers().map((number, index) => (
                  <button
                    key={index}
                    onClick={() => typeof number === 'number' && setCurrentPage(number)}
                    disabled={number === '...' || number === currentPage}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      number === currentPage
                        ? 'bg-indigo-500 text-white'
                        : number === '...'
                        ? 'text-white/70 cursor-default'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 text-white/70 hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 text-white/70 hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;