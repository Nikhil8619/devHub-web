import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = requests.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(requests.length / cardsPerPage);

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
  const [error, setError] = useState(null);

  const reviewRequest=async(status,_id)=>{
    try{
     const res=axios.post(BASE_URL+"/request/review/"+status+"/"+_id, {}, {withCredentials:true});
     dispatch(removeRequest(_id));
    }
    catch(err){

    }
  }

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      setError("Failed to load connection requests. Please try again later.");
      
    } finally {
      setIsLoading(false);
    }
  };

  

  useEffect(() => {
    fetchRequests();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-12">Connection Requests</h1>
          <div className="flex flex-wrap justify-center gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-700 rounded-2xl p-6 w-full h-[320px] animate-pulse flex flex-col">
                <div className="flex items-center mb-4 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gray-600"></div>
                  <div className="ml-4 space-y-2">
                    <div className="h-4 w-32 bg-gray-600 rounded"></div>
                    <div className="h-3 w-24 bg-gray-600 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="h-3 w-full bg-gray-600 rounded"></div>
                  <div className="h-3 w-3/4 bg-gray-600 rounded"></div>
                </div>
                <div className="flex gap-3 mt-auto flex-shrink-0">
                  <div className="h-10 flex-1 bg-gray-600 rounded-lg"></div>
                  <div className="h-10 flex-1 bg-gray-600 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <svg className="w-32 h-32 mx-auto text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Oops! Something went wrong</h1>
          <p className="text-lg text-gray-300 mb-8">
            {error}
          </p>
          <button 
            onClick={fetchRequests}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <svg className="w-32 h-32 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">No Connection Requests</h1>
          <p className="text-lg text-gray-300 mb-8">
            You don't have any pending connection requests at the moment. When someone sends you a request, it will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">Connection Requests</h1>
        <p className="text-lg text-gray-400 text-center mb-12">
          You have {requests.length} pending connection request{requests.length !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCards.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

            return (
              <div
                key={_id}
                className="bg-gray-700 rounded-2xl p-6 transition-all hover:bg-gray-600 border border-gray-600 w-full h-[320px] flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <img
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-500"
                    src={photoUrl || "https://via.placeholder.com/150"}
                  />
                  <div className="ml-4">
                    <h2 className="font-bold text-xl text-white">
                      {firstName + " " + lastName}
                    </h2>
                    {age && gender && (
                      <p className="text-gray-300">{age + ", " + gender}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex-grow overflow-hidden mb-5">
                  <p className="text-gray-300 line-clamp-3">{about || "No bio available"}</p>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button 
                    onClick={() => reviewRequest("accepted",request._id)}
                    className="flex-1 py-3 cursor-pointer bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-all flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Accept
                  </button>
                  <button 
                    onClick={() => reviewRequest("rejected",request._id)}
                    className="flex-1 py-3 cursor-pointer bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-all flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {requests.length > cardsPerPage && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="text-sm text-white/70">
              Showing {indexOfFirstCard + 1}-{Math.min(indexOfLastCard, requests.length)} of {requests.length} requests
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 text-white/70 cursor-pointer hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                    className={`px-3 py-1 cursor-pointer rounded-md transition-all ${
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
                className="p-2 text-white/70 cursor-pointer hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 text-white/70 cursor-pointer hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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

export default Requests;