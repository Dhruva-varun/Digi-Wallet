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
      className="max-w-md"
    >
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader />
        </div>
      ) : (
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Account Number
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Form.Item
                name="receiver"
                className="flex-1 m-0"
                rules={[
                  {
                    required: true,
                    message: "Please enter the account number",
                  },
                ]}
              >
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring--400"
                />
              </Form.Item>

              <button
                type="button"
                onClick={verifyAccount}
                className="bg-zinc-700 text-white px-4 py-2 h-10 rounded-lg hover:bg-zinc-600 transition"
              >
                Verify
              </button>
            </div>
          </div>

          {isVerified === "true" && (
            <div className="bg-green-100 text-green-800 px-3 py-2 rounded mb-3 text-sm">
              Account Verified
            </div>
          )}
          {isVerified === "false" && (
            <div className="bg-red-100 text-red-800 px-3 py-2 rounded mb-3 text-sm">
              Invalid Account Number
            </div>
          )}

          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: "Please input the amount" },
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </Form.Item>

          <Form.Item label="Reference" name="reference">
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows={3}
            />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setShowTransferFund(false)}
              className="border border-zinc-600 text-zinc-600 px-4 py-2 rounded-lg hover:bg-zinc-200 transition"
            >
              Cancel
            </button>

            {isVerified === "true" && (
              <button
                type="submit"
                className="bg-stone-600 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition"
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
