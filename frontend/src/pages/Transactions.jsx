import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { Table, message } from "antd";
import TransferFund from "./TransferFund";
import { GetTransactionsOfUser } from "../api/transactions";
import moment from "moment";
import { useSelector } from "react-redux";
import Deposite from "./Deposite";
import Loader from "../components/Loader";

function Transactions() {
  const [showTransferFund, setShowTransferFund] = useState(false);
  const [showDepositeModal, setShowDepositeModal] = useState(false);
  const [data = [], setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.users);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => {
        const type =
          record.sender._id === record.receiver._id
            ? "deposit"
            : record.sender._id === user._id
            ? "transfer"
            : "deposit";
        const amount = type === "transfer" ? -record.amount : record.amount;

        return (
          <span
            className={`font-semibold ${
              amount >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            {amount >= 0 ? `+₹${amount}` : `-₹${Math.abs(amount)}`}
          </span>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        if (record.sender._id === record.receiver._id) return "Deposit";
        if (record.sender._id === user._id) return "Debit";
        return "Credit";
      },
    },
    {
      title: "Reference Account",
      dataIndex: "",
      render: (text, record) => {
        const reference =
          record.sender._id === user._id ? record.receiver : record.sender;
        return (
          <p className="text-sm text-gray-700">
            {reference.firstName} {reference.lastName}
          </p>
        );
      },
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "success"
              ? "bg-green-100 text-green-700"
              : status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  const getData = async () => {
    try {
      setLoading(true);
      const response = await GetTransactionsOfUser();
      if (response.success) {
        setData(response.data);
        message.success(response.message);
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
    getData();
  }, []);

  return (
    <div className="p-4 md:p-6 bg-stone-200 max-h-fit rounded-2xl">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
          <Loader />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <PageTitle title="Transactions" />
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-stone-300 hover:bg-stone-400 text-zinc-700 font-medium transition"
            onClick={() => setShowDepositeModal(true)}
          >
            Deposit
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-800 text-white font-medium transition"
            onClick={() => setShowTransferFund(true)}
          >
            Transfer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          pagination={{ pageSize: 6 }}
          scroll={{ x: "100%" }}
        />
      </div>

      {showTransferFund && (
        <TransferFund
          showTransferFund={showTransferFund}
          setShowTransferFund={setShowTransferFund}
          reloadData={getData}
        />
      )}

      {showDepositeModal && (
        <Deposite
          showDepositeModal={showDepositeModal}
          setShowDepositeModal={setShowDepositeModal}
          reloadData={getData}
        />
      )}
    </div>
  );
}

export default Transactions;
