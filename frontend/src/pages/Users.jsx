import React, { useEffect, useState } from "react";
import { Table, Modal, message } from "antd";
import { GetAllUsers, UpdateUserVerification } from "../api/users";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await GetAllUsers();
      if (response.success) {
        setUsers(response.data);
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

  const updateStatus = async (record, isVerified) => {
    try {
      setLoading(true);
      const response = await UpdateUserVerification({
        selectedUser: record._id,
        isVerified,
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex gap-2">
          {record.isVerified ? (
            <button
              className="bg-red-100 text-red-600 border border-red-400 px-3 py-1 rounded hover:bg-red-200 transition"
              onClick={() => updateStatus(record, false)}
            >
              Suspend
            </button>
          ) : (
            <button
              className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 rounded hover:bg-green-200 transition"
              onClick={() => updateStatus(record, true)}
            >
              Activate
            </button>
          )}
        </div>
      ),
    },
  ];

  const handleRowClick = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <PageTitle title="Users" />
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-lg shadow p-4 mt-4">
          <Table
            dataSource={users}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 6 }}
            className="rounded"
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
        </div>
      )}

      <Modal
        title="User Information"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedUser && (
          <div className="flex flex-col gap-4 text-gray-800 text-base px-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">First Name:</p>
                <p>{selectedUser.firstName}</p>
              </div>
              <div>
                <p className="font-semibold">Last Name:</p>
                <p>{selectedUser.lastName}</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <p className="font-semibold">Phone:</p>
                <p>{selectedUser.phoneNumber}</p>
              </div>
              <div>
                <p className="font-semibold">Balance:</p>
                <p>$ {selectedUser.balance || 0}</p>
              </div>
              <div>
                <p className="font-semibold">Account Number:</p>
                <p>{selectedUser._id}</p>
              </div>
              <div>
                <p className="font-semibold">ID Type:</p>
                <p>{selectedUser.idType}</p>
              </div>
              <div>
                <p className="font-semibold">ID Number:</p>
                <p>{selectedUser.idNumber}</p>
              </div>
              <div>
                <p className="font-semibold">Verified:</p>
                <p>{selectedUser.isVerified ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Users;
