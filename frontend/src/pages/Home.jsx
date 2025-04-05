import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Input, Button } from "antd";

function Home() {
  const { user } = useSelector((state) => state.users);
  const [activeTab, setActiveTab] = useState("deposit");

  // Sample static transactions
  const transactions = [
    { date: "Aug 16 2023", type: "withdraw", amount: -15000 },
    { date: "Aug 15 2023", type: "deposit", amount: 10000 },
    { date: "Aug 15 2023", type: "deposit", amount: 10000 },
    { date: "Aug 15 2023", type: "withdraw", amount: -10000 },
    { date: "Aug 15 2023", type: "withdraw", amount: -30000 },
    { date: "Aug 11 2023", type: "deposit", amount: 2 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <Card className="md:col-span-1">
          <p className="text-gray-700 text-lg">Welcome back, <em>{user.firstName}</em></p>
          <p className="text-sm text-gray-600">Balance:</p>
          <h2 className="text-4xl font-bold mt-2">${user.balance || 0}</h2>
        </Card>

        {/* Middle - Deposit/Withdraw Switch */}
        <Card className="md:col-span-1 p-0 overflow-hidden">
          <div className="grid grid-cols-2 text-center">
            <button
              className={`py-3 text-sm border ${activeTab === "deposit" ? "bg-gray-200 font-semibold" : "bg-white"}`}
              onClick={() => setActiveTab("deposit")}
            >
              DEPOSIT
            </button>
            <button
              className={`py-3 text-sm border ${activeTab === "withdraw" ? "bg-gray-200 font-semibold" : "bg-white"}`}
              onClick={() => setActiveTab("withdraw")}
            >
              transfer
            </button>
          </div>
        </Card>

        {/* Date Box */}
        <Card className="flex flex-col justify-center items-center">
          <p className="text-sm text-gray-600">Aug</p>
          <p className="text-3xl font-bold">27</p>
        </Card>
      </div>

      {/* Transactions Section */}
      <Card className="mt-6">
        <p className="text-lg font-semibold mb-2">Latest transactions</p>

        {/* Table Header */}
        <div className="grid grid-cols-3 font-semibold text-gray-600 border-b pb-2">
          <span>📅 Transaction date</span>
          <span>↔️ Transaction type</span>
          <span>💰 Amount</span>
        </div>

        {/* Transactions List */}
        {transactions.map((txn, idx) => (
          <div key={idx} className="grid grid-cols-3 text-sm py-2 border-b last:border-none">
            <span>{txn.date}</span>
            <span>
              {txn.type === "deposit" ? (
                <span className="text-green-600">▲ deposit</span>
              ) : (
                <span className="text-red-600">▼ withdraw</span>
              )}
            </span>
            <span className={`font-medium ${txn.amount >= 0 ? "text-green-500" : "text-red-500"}`}>
              {txn.amount >= 0 ? `+$${txn.amount}` : `-$${Math.abs(txn.amount)}`}
            </span>
          </div>
        ))}

        <div className="text-right mt-3 text-blue-600 cursor-pointer hover:underline">
          View more
        </div>
      </Card>
    </div>
  );
}

export default Home;
