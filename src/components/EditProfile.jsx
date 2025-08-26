import axios from "axios";
import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

// Toastify imports
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
        autoClose: 3000,   // 3 seconds
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

      <div className="flex justify-center items-start min-h-screen gap-x-8 p-8">
        {/* Edit Profile Card */}
        <div className="card bg-base-200 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl font-bold mb-2">
              Edit Profile
            </h2>

            <form>
              {/* First Name */}
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

              {/* Last Name */}
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

              {/* Age */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  className="input input-bordered"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              {/* Gender */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  className="select select-bordered"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Others</option>
                </select>
              </div>

              {/* Photo URL */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  placeholder="Enter your photo URL"
                  className="input input-bordered"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              {/* About */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">About</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Tell us about yourself"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <p className="text-red-500">{error}</p>

              <div className="form-control mt-2 flex justify-center">
                <button
                  className="btn btn-primary cursor-pointer"
                  type="button"
                  onClick={saveProfile}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Live Preview User Card */}
        <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />
      </div>
    </>
  );
};

export default EditProfile;
