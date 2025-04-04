import React from "react";
import { useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import { Card } from "antd";

function Home() {
  const { user } = useSelector((state) => state.users);

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <PageTitle title={`Hello, ${user.firstName} ${user.lastName}`} />
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-2xl font-bold">Welcome to Digital Banking</h1>
        <p className="mt-2 text-md">Manage your transactions, profile, and balance easily.</p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Details */}
        <Card className="shadow-md border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold text-gray-700">Account Details</h2>
          <div className="mt-4 text-gray-600">
            <p><span className="font-bold">Account Number:</span> {user._id}</p>
            <p><span className="font-bold">Balance:</span> $ {user.balance || 0}</p>
          </div>
        </Card>

        {/* User Profile */}
        <Card className="shadow-md border-l-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-700">User Profile</h2>
          <div className="mt-4 text-gray-600">
            <p><span className="font-bold">First Name:</span> {user.firstName}</p>
            <p><span className="font-bold">Last Name:</span> {user.lastName}</p>
            <p><span className="font-bold">Email:</span> {user.email}</p>
          </div>
        </Card>

        {/* Contact Details */}
        <Card className="shadow-md border-l-4 border-yellow-500">
          <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2>
          <div className="mt-4 text-gray-600">
            <p><span className="font-bold">Phone:</span> {user.phoneNumber}</p>
            <p><span className="font-bold">ID Type:</span> {user.idType}</p>
            <p><span className="font-bold">ID Number:</span> {user.idNumber}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Home;
