import axios from "axios";
import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, gender, age, about, photoUrl },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));

      // Show toast on success
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      {/* Toast Container */}
      <ToastContainer />

      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8 bg-gray-800 min-h-screen">
        {/* Edit Profile Card */}
        {/* Edit Profile Card */}
        <div className="w-full max-w-lg bg-gray-700 shadow-lg rounded-2xl border border-gray-600 p-6 md:p-8">
          <h2 className="text-center text-2xl font-bold text-white mb-6">
            Edit Profile
          </h2>

          <form className="space-y-5">
            {/* First Name */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full px-4 py-2 rounded-lg bg-gray-600 border border-gray-500 text-white 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full px-4 py-2 rounded-lg bg-gray-600 border border-gray-500 text-white 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Age
              </label>
              <input
                type="number"
                placeholder="Enter your age"
                className="w-full px-4 py-2 rounded-lg bg-gray-600 border border-gray-500 text-white 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Gender
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg bg-gray-600 border border-gray-500 text-white 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled className="text-gray-400">
                  Select your gender
                </option>
                <option value="male" className="text-gray-800">
                  Male
                </option>
                <option value="female" className="text-gray-800">
                  Female
                </option>
                <option value="other" className="text-gray-800">
                  Other
                </option>
              </select>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">
                Photo URL
              </label>
              <input
                type="url"
                placeholder="Enter your photo URL"
                className="w-full px-4 py-2 rounded-lg bg-gray-600 border border-gray-500 text-white 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            {/* About */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">
                About
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-lg bg-gray-600 border border-gray-500 text-white 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm h-24 resize-none"
                placeholder="Tell us about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* Save Button */}
            <button
              type="button"
              onClick={saveProfile}
              className="w-full py-2.5 text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 
                 transition duration-200 shadow-md"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Live Preview User Card */}
        <div className="w-full max-w-md lg:max-w-sm xl:max-w-md 2xl:max-w-md flex flex-col items-center">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">
            Profile Preview
          </h3>
          <div className="w-full max-w-xs md:max-w-sm mx-auto">
            <UserCard
              user={{ firstName, lastName, age, gender, photoUrl, about }}
              isPreview={true}
            />
          </div>
          <p className="text-gray-400 text-xs md:text-sm mt-3 md:mt-4 text-center max-w-md">
            This is how your profile will appear to others
          </p>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
