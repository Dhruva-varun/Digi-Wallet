import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, message } from "antd";
import moment from "moment";
import { GetTransactionsOfUser } from "../api/transactions";
import { ReloadUser } from "../redux/usersSlice";
import Loader from "../components/Loader";
import Deposite from "./Deposite";
import TransferFund from "./TransferFund";

function Home() {
  const { user } = useSelector((state) => state.users);
  const [activeTab, setActiveTab] = useState("deposit");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDepositeModal, setShowDepositeModal] = useState(false);
  const [showTransferFund, setShowTransferFund] = useState(false);
  const dispatch = useDispatch();

  const getTransactions = async () => {
    try {
      setLoading(true);
      const response = await GetTransactionsOfUser();
      if (response.success) {
        setTransactions(response.data.slice(0, 5));
        dispatch(ReloadUser(true));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
          <Loader />
        </div>
      )}

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* User Card */}
        <Card className="shadow-md rounded-lg">
          <p className="text-gray-700 text-xl mb-1">
            Welcome back, <em className="font-semibold">{user.firstName}</em>
          </p>
          <p className="text-sm text-gray-500">Available Balance</p>
          <h2 className="text-4xl font-bold mt-2 text-green-600">
            ${user.balance || 0}
          </h2>
        </Card>

        {/* Deposit & Transfer Buttons (Vertical) */}
        <Card className="md:col-span-2 shadow-md rounded-lg p-4 flex flex-col gap-4">
          <button
            className={`w-full py-3 rounded-lg text-base font-medium transition-all duration-200 ${
              activeTab === "deposit"
                ? "bg-green-100 text-green-700"
                : "bg-white hover:bg-gray-100 border"
            }`}
            onClick={() => {
              setActiveTab("deposit");
              setShowDepositeModal(true);
            }}
          >
            💸 DEPOSIT
          </button>

          <button
            className={`w-full py-3 rounded-lg text-base font-medium transition-all duration-200 ${
              activeTab === "transfer"
                ? "bg-blue-100 text-blue-700"
                : "bg-white hover:bg-gray-100 border"
            }`}
            onClick={() => {
              setActiveTab("transfer");
              setShowTransferFund(true);
            }}
          >
            🔁 TRANSFER
          </button>
        </Card>

        {/* Date Box */}
        <Card className="flex flex-col justify-center items-center shadow-md rounded-lg">
          <p className="text-sm text-gray-500">{moment().format("MMM")}</p>
          <p className="text-4xl font-bold text-blue-600">
            {moment().format("DD")}
          </p>
        </Card>
      </div>

      {/* Transactions List */}
      <Card className="mt-10 mb-10 shadow-lg rounded-lg">
        <p className="text-xl font-semibold text-gray-800 mb-4">
          🔍 Latest Transactions
        </p>

        {/* Table Header */}
        <div className="grid grid-cols-3 text-sm font-semibold text-gray-500 border-b pb-2">
          <span>Date</span>
          <span>Type</span>
          <span>Amount</span>
        </div>

        {/* Transactions */}
        {transactions.map((txn, idx) => {
          const type =
            txn.sender._id === txn.receiver._id
              ? "deposit"
              : txn.sender._id === user._id
              ? "transfer"
              : "deposit";

          const amount = type === "transfer" ? -txn.amount : txn.amount;

          return (
            <div
              key={idx}
              className="grid grid-cols-3 text-sm py-2 border-b last:border-none text-gray-700"
            >
              <span>{moment(txn.createdAt).format("MMM DD YYYY")}</span>
              <span>
                {type === "deposit" ? (
                  <span className="text-green-600 font-medium">
                    ▲ Deposit
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">
                    ▼ Transfer
                  </span>
                )}
              </span>
              <span
                className={`font-semibold ${
                  amount >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {amount >= 0 ? `+$${amount}` : `-$${Math.abs(amount)}`}
              </span>
            </div>
          );
        })}

        <div className="text-right mt-4">
          <button className="text-blue-600 text-sm hover:underline">
            View all transactions
          </button>
        </div>
      </Card>

      {/* Modals */}
      <Deposite
        showDepositeModal={showDepositeModal}
        setShowDepositeModal={setShowDepositeModal}
        reloadData={getTransactions}
      />

      <TransferFund
        showTransferFund={showTransferFund}
        setShowTransferFund={setShowTransferFund}
        reloadData={getTransactions}
      />
    </div>
  );
}

export default Home;
