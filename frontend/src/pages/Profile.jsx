import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const { user } = useSelector((state) => state.users);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-5">
          <h1 className="text-2xl font-bold">Profile Details</h1>
          <p className="text-sm text-blue-100 mt-1">Manage and verify your account information</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Account Overview */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="font-semibold text-gray-800">{user._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Balance</p>
                <p className="font-bold text-green-600 text-lg">$ {user.balance || 0}</p>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-medium text-gray-800">{user.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-medium text-gray-800">{user.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium text-gray-800">{user.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ID Type</p>
              <p className="font-medium text-gray-800">{user.idType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ID Number</p>
              <p className="font-medium text-gray-800">{user.idNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
