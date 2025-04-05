import React, { useState } from "react";
import { Modal, Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { VerifyAccount, TransferFunds } from "../api/transactions";
import { ReloadUser } from "../redux/usersSlice";
import Loader from "../components/Loader";

function TransferFund({ showTransferFund, setShowTransferFund, reloadData }) {
  const { user } = useSelector((state) => state.users);
  const [isVerified, setIsVerified] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const verifyAccount = async () => {
    try {
      const receiver = form.getFieldValue("receiver")?.trim();
      if (!receiver) {
        setIsVerified("false");
        return;
      }

      setLoading(true);
      const response = await VerifyAccount({ receiver });

      if (response.success) {
        setIsVerified("true");
      } else {
        setIsVerified("false");
      }
    } catch (error) {
      setIsVerified("false");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      if (values.amount > user.balance) {
        message.error("Insufficient Balance");
        return;
      }

      setLoading(true);
      const payload = {
        ...values,
        sender: user._id,
        reference: values.reference || "no reference",
        status: "success",
      };

      const response = await TransferFunds(payload);
      if (response.success) {
        reloadData();
        setShowTransferFund(false);
        message.success(response.message);
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

  return (
    <Modal
      title="Transfer Funds"
      open={showTransferFund}
      onCancel={() => setShowTransferFund(false)}
      footer={null}
    >
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader />
        </div>
      ) : (
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* Account Number & Verify Button */}
          <div className="flex gap-2 mb-4">
            <Form.Item
              label="Account Number"
              name="receiver"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please enter the account number",
                },
              ]}
            >
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 h-10"
              />
            </Form.Item>

            {/* Ensure button aligns with input using mt-[30px] */}
            <div className="flex items-center mt-[30px]">
              <button
                type="button"
                onClick={verifyAccount}
                className="bg-blue-600 text-white px-4 h-10 rounded-md hover:bg-blue-700 transition"
              >
                Verify
              </button>
            </div>
          </div>

          {/* Verification Status */}
          {isVerified === "true" && (
            <div className="bg-green-100 text-green-700 px-3 py-2 rounded mb-3 text-sm">
              ✅ Account Verified
            </div>
          )}
          {isVerified === "false" && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-3 text-sm">
              ❌ Invalid Account Number
            </div>
          )}

          {/* Amount */}
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input the amount",
              },
              {
                validator(_, value) {
                  if (!value || parseFloat(value) <= user.balance) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Insufficient balance");
                },
              },
            ]}
          >
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </Form.Item>

          {/* Reference */}
          <Form.Item label="Reference" name="reference">
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
            />
          </Form.Item>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setShowTransferFund(false)}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
            >
              Cancel
            </button>
            {isVerified === "true" && (
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Transfer
              </button>
            )}
          </div>
        </Form>
      )}
    </Modal>
  );
}

export default TransferFund;
