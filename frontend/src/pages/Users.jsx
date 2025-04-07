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
      render: (text) => (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            text ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}
        >
          {text ? "Yes" : "No"}
        </span>
      ),
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
    <div className="p-4 md:p-6 bg-stone-200 max-h-fit rounded-2xl min-h-fit">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
          <Loader />
        </div>
      )}

      <PageTitle title="Users" />

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 sm:p-6 mt-6 overflow-x-auto">
        <Table
          dataSource={users}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 6 }}
          className="min-w-[600px]"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>

      <Modal
        title={<h2 className="text-xl font-semibold">User Details</h2>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={750}
        bodyStyle={{ padding: "24px" }}
        centered
      >
        {selectedUser && (
          <div className="text-gray-800 text-base space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
              <div>
                <p className="font-semibold text-gray-600">First Name</p>
                <p>{selectedUser.firstName}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Last Name</p>
                <p>{selectedUser.lastName}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Email</p>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Phone</p>
                <p>{selectedUser.phoneNumber}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Balance</p>
                <p>&#8377; {selectedUser.balance || 0}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Account Number</p>
                <p>{selectedUser._id}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">ID Type</p>
                <p>{selectedUser.idType}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">ID Number</p>
                <p>{selectedUser.idNumber}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Verified</p>
                <p>
                  {selectedUser.isVerified ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-red-500 font-medium">No</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Users;
