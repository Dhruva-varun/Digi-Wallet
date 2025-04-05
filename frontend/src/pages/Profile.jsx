import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const { user } = useSelector((state) => state.users);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Page Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 tracking-wide">Profile</h1>
        <p className="text-gray-500 mt-2">Your personal and banking information</p>
      </div>

      {/* Account Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border-l-4 border-blue-500 rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-500">Account Number</p>
          <p className="text-xl font-semibold text-gray-800 mt-1">{user._id}</p>
        </div>
        <div className="bg-white border-l-4 border-green-500 rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-xl font-semibold text-green-600 mt-1">$ {user.balance || 0}</p>
        </div>
      </div>

      {/* Personal Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-5 shadow">
          <p className="text-sm text-gray-500">First Name</p>
          <p className="font-medium text-gray-800 mt-1">{user.firstName}</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow">
          <p className="text-sm text-gray-500">Last Name</p>
          <p className="font-medium text-gray-800 mt-1">{user.lastName}</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium text-gray-800 mt-1">{user.email}</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium text-gray-800 mt-1">{user.phoneNumber}</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow">
          <p className="text-sm text-gray-500">ID Type</p>
          <p className="font-medium text-gray-800 mt-1">{user.idType}</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow">
          <p className="text-sm text-gray-500">ID Number</p>
          <p className="font-medium text-gray-800 mt-1">{user.idNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
