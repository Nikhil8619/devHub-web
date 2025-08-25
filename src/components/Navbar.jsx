import React from 'react';
import Logo from "../assets/images/logo.webp"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((store) => store.user);

  const isLoggedIn = user && Object.keys(user).length > 0;

  return (
    <div className="navbar bg-base-300 shadow-sm px-4 min-h-[60px]">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost p-0 h-full">
          <img 
            src={Logo} 
            alt="DevSphere Logo" 
            className="h-[80px] w-[80px] object-contain p-1 rounded-full" 
          />
        </Link>
      </div>

      {/* Show welcome message and profile dropdown only when logged in */}
      {isLoggedIn && (
        <div className="flex gap-4 items-center">
          {/* Welcome message */}
          <span className="font-medium text-lg">
            Welcome, {user.firstName}
          </span>

          {/* Profile dropdown */}
          <div className="dropdown dropdown-end mx-4">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
