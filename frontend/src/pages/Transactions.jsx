import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import { Table, message } from 'antd';
import TransferFund from './TransferFund';
import { GetTransactionsOfUser } from '../api/transactions';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Deposite from './Deposite';
import Loader from '../components/Loader'; // assuming this exists

function Transactions() {
  const [showTransferFund, setShowTransferFund] = useState(false);
  const [showDepositeModal, setShowDepositeModal] = useState(false);
  const [data = [], setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.users);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text, record) => moment(record.createdAt).format('DD-MM-YYYY hh:mm:ss A'),
    },
    {
      title: 'Transaction ID',
      dataIndex: '_id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text, record) => {
        if (record.sender._id === record.receiver._id) return 'Deposit';
        if (record.sender._id === user._id) return 'Debit';
        return 'Credit';
      },
    },
    {
      title: 'Reference Account',
      dataIndex: '',
      render: (text, record) => {
        const reference = record.sender._id === user._id ? record.receiver : record.sender;
        return (
          <p className="text-sm text-gray-700">
            {reference.firstName} {reference.lastName}
          </p>
        );
      },
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Status',
      dataIndex: 'status',
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
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Page Title and Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Transactions" />
        <div className="flex gap-3">
          <button
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
            onClick={() => setShowDepositeModal(true)}
          >
            Deposit
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => setShowTransferFund(true)}
          >
            Transfer
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow p-4">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            rowKey="_id"
            pagination={{ pageSize: 6 }}
          />
        )}
      </div>

      {/* Modals */}
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
