import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, message } from "antd";
import moment from "moment";
import { GetTransactionsOfUser } from "../api/transactions";
import { ReloadUser } from "../redux/usersSlice";
import Loader from "../components/Loader";
import Deposite from "./Deposite";
import TransferFund from "./TransferFund";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.users);
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
    <div className="p-4 md:p-6 bg-stone-200 max-h-fit rounded-2xl">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
          <Loader />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-8xl mx-auto mb-6">
        <Card className="rounded-2xl shadow-md border border-gray-200 p-6 break-words">
          <p className="text-gray-700 text-xl mb-1">Welcome back,</p>
          <p className="text-xl font-bold text-stone-800">{user.firstName}</p>
          <p className="text-sm text-gray-600 mt-4">Account No</p>
          <h2 className="text-xl font-semibold text-zinc-700 break-all">
            {user._id}
          </h2>
          <p className="text-sm text-gray-500 mt-4">Available Balance</p>
          <h2 className="text-2xl font-bold mt-2 text-blue-700">
            ₹{user.balance || 0}
          </h2>
        </Card>

        <Card className="rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col justify-center items-center gap-6">
          <button
            onClick={() => setShowDepositeModal(true)}
            className="w-full py-3 px-6 rounded-xl text-lg font-semibold text-zinc-700 bg-stone-300 hover:bg-stone-400 shadow transition-all duration-200"
          >
            Deposit
          </button>

          <button
            onClick={() => setShowTransferFund(true)}
            className="w-full py-3 px-6 rounded-xl text-lg font-semibold text-white bg-zinc-700 hover:bg-zinc-800 shadow transition-all duration-200 mt-5"
          >
            Transfer
          </button>
        </Card>

        <Card className="rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col items-center justify-center text-center">
          <p className="text-xl text-zinc-700 mb-2">Date</p>
          <p className="text-3xl font-bold text-blue-600">
            {moment().format("DD")}
          </p>
          <p className="text-md text-gray-500">
            {moment().format("MMMM, YYYY")}
          </p>
        </Card>
      </div>

      <div className="max-w-8xl mx-auto px-2 sm:px-4">
        <Card className="rounded-2xl shadow border border-gray-200 p-6">
          <p className="text-xl font-semibold text-stone-800 mb-4">
            Your Latest Transactions
          </p>

          <div className="hidden sm:grid grid-cols-3 text-sm font-semibold text-zinc-500 border-b pb-2">
            <span>Date</span>
            <span>Type</span>
            <span>Amount</span>
          </div>

          {transactions.map((txn, idx) => {
            let type = "Deposit";
            if (txn.sender._id !== txn.receiver._id) {
              type = txn.sender._id === user._id ? "Debit" : "Credit";
            }

            const amount = type === "Debit" ? -txn.amount : txn.amount;

            return (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-3 text-sm py-3 border-b last:border-none text-zinc-700 gap-1"
              >
                <span>{moment(txn.createdAt).format("MMM DD, YYYY")}</span>
                <span className="font-medium">
                  {type === "Deposit" && (
                    <span className="text-stone-500">Deposit</span>
                  )}
                  {type === "Debit" && (
                    <span className="text-red-600">Debit</span>
                  )}
                  {type === "Credit" && (
                    <span className="text-green-600">Credit</span>
                  )}
                </span>
                <span
                  className={`font-semibold ${
                    amount >= 0 ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {amount >= 0 ? `+₹${amount}` : `-₹${Math.abs(amount)}`}
                </span>
              </div>
            );
          })}

          <div className="text-right mt-2">
            <Link
              to="/transactions"
              className="text-blue-600 text-sm hover:underline"
            >
              View all transactions
            </Link>
          </div>
        </Card>
      </div>

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
