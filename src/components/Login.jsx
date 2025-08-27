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

  const handleSignUp=async()=>{
    try{
      const res=await axios.post(BASE_URL+"/signup", {firstName,lastName,emailId,passWord},{withCredentials:true});
      dispatch(addUser(res.data.data));
      return navigate("/profile");

    }catch(err){
      
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
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
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your first name" 
                    className="input input-bordered" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your last name" 
                    className="input input-bordered" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            }

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="input input-bordered" 
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="input input-bordered" 
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
                required
              />
            </div>
            
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            
            <div className="form-control mt-2 flex justify-center">
              <button 
                className="btn btn-primary cursor-pointer" 
                type="button" 
                onClick={isLoggedIn? handleLogin : handleSignUp}
              >
                {isLoggedIn ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p 
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              onClick={() => setIsLoggedIn((value) => !value)}
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