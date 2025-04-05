import React from "react";
import { useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import { Card } from "antd";

function Home() {
  const { user } = useSelector((state) => state.users);

  return (
    <div className="p-6">
      {/* Page Title */}
      <PageTitle title={`Hello, ${user.firstName} ${user.lastName}`} />

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-6 rounded-2xl shadow-lg mb-10">
        <h1 className="text-3xl font-bold tracking-wide">Welcome to Digi Wallet</h1>
        <p className="mt-2 text-base opacity-90">
          Manage your transactions, profile, and digital balance with ease.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Details */}
        <Card
          className="rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300"
          bodyStyle={{ padding: "1.5rem" }}
        >
          <h2 className="text-xl font-semibold text-stone-800">Account Details</h2>
          <div className="mt-4 text-stone-600 space-y-2">
            <p>
              <span className="font-medium">Account Number:</span> {user._id}
            </p>
            <p>
              <span className="font-medium">Balance:</span> $ {user.balance || 0}
            </p>
          </div>
        </Card>

        {/* User Profile */}
        <Card
          className="rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300"
          bodyStyle={{ padding: "1.5rem" }}
        >
          <h2 className="text-xl font-semibold text-stone-800">User Profile</h2>
          <div className="mt-4 text-stone-600 space-y-2">
            <p>
              <span className="font-medium">First Name:</span> {user.firstName}
            </p>
            <p>
              <span className="font-medium">Last Name:</span> {user.lastName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>
        </Card>

        {/* Contact Info */}
        <Card
          className="rounded-xl shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-shadow duration-300"
          bodyStyle={{ padding: "1.5rem" }}
        >
          <h2 className="text-xl font-semibold text-stone-800">Contact Info</h2>
          <div className="mt-4 text-stone-600 space-y-2">
            <p>
              <span className="font-medium">Phone:</span> {user.phoneNumber}
            </p>
            <p>
              <span className="font-medium">ID Type:</span> {user.idType}
            </p>
            <p>
              <span className="font-medium">ID Number:</span> {user.idNumber}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Home;
