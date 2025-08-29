import React, { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          passWord
        },
        { withCredentials: true }
      )
      
      dispatch(addUser(res.data));
      return navigate("/feed")
    }
    catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup", 
        {firstName, lastName, emailId, passWord},
        {withCredentials: true}
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      // Display the error message in the UI
      setError(err?.response?.data || "Something went wrong during signup");
    }
  }

  return (
    <div className="flex justify-center items-center py-8 px-4 min-h-[calc(100vh-120px)]">
      <div className="card bg-base-200 w-full max-w-md shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h2 className="card-title justify-center text-2xl font-bold mb-2">
            {isLoggedIn ? "Welcome Back" : "Welcome to DevHub"}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {isLoggedIn ? "Sign in to your account" : "Sign up to create your account"}
          </p>
          
          <form>
            {!isLoggedIn && 
              <>
                <div className="form-control mb-4">
                  <label className="label block">
                    <span className="label-text">First Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your first name" 
                    className="input input-bordered w-full" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label block">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your last name" 
                    className="input input-bordered w-full" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            }

            <div className="form-control mb-4">
              <label className="label block">
                <span className="label-text">Email Address</span>
              </label>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="input input-bordered w-full" 
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mb-6">
              <label className="label block">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="input input-bordered w-full" 
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
                required
              />
            </div>
            
            {error && (
              <div className="alert alert-error mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="stroke-current shrink-0 h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <div className="form-control mt-2 flex justify-center">
              <button 
                className="btn btn-primary cursor-pointer" 
                type="button" 
                onClick={isLoggedIn ? handleLogin : handleSignUp}
              >
                {isLoggedIn ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p 
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              onClick={() => {
                setIsLoggedIn((value) => !value);
                setError(""); // Clear error when switching between login/signup
              }}
            >
              {isLoggedIn ? 
                "New to DevHub? " : 
                "Already have an account? "
              }
              <span className="font-semibold text-blue-600 hover:underline">
                {isLoggedIn ? "Create an account" : "Sign in here"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;