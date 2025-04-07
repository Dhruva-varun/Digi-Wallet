import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.users);

  return (
    <div className="p-4 md:p-6 bg-stone-200 max-h-fit rounded-2xl">
      <div className="mb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-800 tracking-wide">
          Profile
        </h1>
        <p className="text-zinc-500 mt-2 text-sm md:text-base">
          Your personal and banking information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-zinc-700">
          <p className="text-sm text-gray-500">Account Number</p>
          <p className="text-xl font-semibold text-gray-800 mt-1 break-words">
            {user._id}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-emerald-600">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-xl font-semibold text-emerald-600 mt-1">
            ₹ {user.balance || 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">First Name</p>
          <p className="text-gray-800 font-medium mt-1">{user.firstName}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Last Name</p>
          <p className="text-gray-800 font-medium mt-1">{user.lastName}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-gray-800 font-medium mt-1">{user.email}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-gray-800 font-medium mt-1">{user.phoneNumber}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">ID Type</p>
          <p className="text-gray-800 font-medium mt-1">{user.idType}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">ID Number</p>
          <p className="text-gray-800 font-medium mt-1">{user.idNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
