// Import necessary dependencies
import React, { useContext, useState } from "react";
import { ShopContext } from "./context/ShopContext";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const { username,userEmail, logout } = useContext(ShopContext); // Assume user and logout come from context
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: username || "",
    email: userEmail || "",
    currentPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate()

  const handleLogout = () => {
    logout(); // Call logout function from context
    navigate('/login')
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Post the updated data to the backend (replace `/update-profile` with the actual endpoint)
      const response = await fetch("/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success
        alert("Profile updated successfully!");
        setShowEditPopup(false);
      } else {
        // Handle error
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-3xl mb-4 mx-auto p-8 bg-gray-100 shadow-md rounded-lg">
      {/* Profile Section */}
      <div className="flex items-center space-x-6 pb-6 border-b border-gray-300">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
          alt="Default Profile"
          className="w-24 h-24 rounded-full border border-gray-400"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{username}</h1>
          <p className="text-gray-600">{userEmail}</p>
        </div>
      </div>

      {/* Account Management Section */}
      <div className="mt-6">
        <button
          onClick={() => setShowEditPopup(true)}
          className=" px-5 py-3 text-lg font-medium text-white bg-gray-800 rounded-lg shadow hover:bg-gray-900 focus:ring focus:ring-gray-400"
        >
          Edit Profile
        </button>
        <button
          onClick={handleLogout}
          className="w-full mt-4 px-5 py-3 text-lg font-medium text-white bg-red-800 rounded-lg shadow hover:bg-red-600 focus:ring focus:ring-red-300"
        >
          Logout
        </button>
      </div>

      {/* Support Section */}
      <div className="mt-10 border-t border-gray-300 pt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Support</h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Contact Support</h3>
              <p className="text-sm text-gray-600">Reach out to our support team for assistance.</p>
            </div>
            <button className="px-4 py-2 text-white bg-green-900 rounded-lg hover:bg-green-700 focus:ring focus:ring-blue-300">
              Contact
            </button>
          </li>
          <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div>
              <h3 className="text-lg font-medium text-gray-800">FAQs</h3>
              <p className="text-sm text-gray-600">Find answers to frequently asked questions.</p>
            </div>
            <button className="px-4 py-2 text-white bg-green-900 rounded-lg hover:bg-green-700 focus:ring focus:ring-blue-300">
              View FAQs
            </button>
          </li>
        </ul>
      </div>

      {/* Edit Profile Popup */}
      {showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-gray-300"
                />
              </div>
            </form>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowEditPopup(false)}
                className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
