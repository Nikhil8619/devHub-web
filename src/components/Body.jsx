import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import {addUser} from "../utils/userSlice"
import axios from 'axios'

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector(store => store.user);
   const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
useEffect(() => {
  const isLoggedIn = document.cookie.includes("token") 
  if (isLoggedIn) {
    fetchUser();
  }
}, []);


  return (
    <div className="min-h-screen flex flex-col">
        <Navbar/>
        <div className="flex-1">
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Body