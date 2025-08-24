import React from 'react';
import Logo from "./assets/images/logo.webp";

const Navbar = () => {
  return (
    <div className="navbar bg-base-300 shadow-sm px-4 min-h-[60px]">
      <div className="flex-1">
        <a className="btn btn-ghost p-0 h-full">
          <img 
            src={Logo} 
            alt="DevSphere Logo" 
            className="h-[80px] w-[80px] object-contain p-1 rounded-full " 
          />
        </a>
      </div>
      <div className="flex gap-2 items-center">
        <div className="dropdown dropdown-end mx-4">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
