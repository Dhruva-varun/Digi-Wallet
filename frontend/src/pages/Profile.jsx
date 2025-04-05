import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const { user } = useSelector((state) => state.users);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Profile Information</h1>
          <p className="text-gray-500 mt-1">View and verify your digital banking details</p>
        </div>

        {/* Account Info */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-inner mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700">Account Number</span>
            <span className="text-gray-600">{user._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Balance</span>
            <span className="text-green-600 font-semibold">$ {user.balance || 0}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">First Name</span>
            <span>{user.firstName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Last Name</span>
            <span>{user.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone</span>
            <span>{user.phoneNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">ID Type</span>
            <span>{user.idType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">ID Number</span>
            <span>{user.idNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
