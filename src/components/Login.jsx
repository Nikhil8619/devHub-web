import React, { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("nikhil12@gmail.com");
  const [passWord, setPassWord] = useState("Nikhil@123");
  const [error,setError]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogin = async () =>{
    try{
      const res=await axios.post(
        BASE_URL+"/login",
        {
          emailId,
          passWord
        },
        {withCredentials:true}
      )
      
      dispatch(addUser(res.data));
      navigate("/")
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong");
    }
  }
 

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6">Sign in to your account</p>
          
          <form >
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">emailId Address</span>
              </label>
              <input 
                type="emailId" 
                placeholder="Enter your emailId" 
                className="input input-bordered" 
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">passWord</span>
              </label>
              <input 
                type="passWord" 
                placeholder="Enter your passWord" 
                className="input input-bordered" 
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
                required
              />
              
            </div>
            <p className="text-red-500">{error}</p>
            <div className="form-control mt-2 flex justify-center">
              <button className="btn btn-primary cursor-pointer" type="button" onClick={handleLogin}>Login</button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Login;