import React, { useState } from "react";
import { Modal, Form, message } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { DepositeFunds } from "../api/transactions";
import Loader from "../components/Loader";

function Deposite({ showDepositeModal, setShowDepositeModal, reloadData }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);

  const onToken = async (token) => {
    try {
      const amount = form.getFieldValue("amount");
      if (!amount || amount <= 0) {
        message.error("Please enter a valid amount");
        return;
      }

      setLoading(true);
      setStripeLoading(true);

      const response = await DepositeFunds({ token, amount });

      if (response.success) {
        reloadData();
        setShowDepositeModal(false);
        form.resetFields();
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
      setStripeLoading(false);
    }
  };

  const handleCancel = () => {
    setShowDepositeModal(false);
    form.resetFields();
    setStripeLoading(false);
  };

  return (
    <Modal
      title="Deposit Funds"
      open={showDepositeModal}
      onCancel={handleCancel}
      footer={null}
    >
      {(loading || stripeLoading) ? (
        <div className="flex justify-center items-center py-10">
          <Loader />
        </div>
      ) : (
        <Form layout="vertical" form={form}>
          {/* Amount Input */}
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: "Please input the amount" },
              {
                validator: (_, value) =>
                  value <= 50
                    ? Promise.reject("Amount must be greater than 50")
                    : Promise.resolve(),
              },
            ]}
          >
            <input
              type="number"
              placeholder="Enter amount in USD"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </Form.Item>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
              disabled={stripeLoading}
            >
              Cancel
            </button>

            <StripeCheckout
              token={onToken}
              currency="USD"
              amount={form.getFieldValue("amount") * 100}
              stripeKey="pk_test_51Qbn1DRwXBoyuTG18mYOrHZ23b4F3s28Xh8TDy530ik8AUQe3Q4K3MUKYloyclxcZ5Y322tSsjTgodowpsOQNumS00cqn9l3DB"
              disabled={stripeLoading}
            >
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => setStripeLoading(true)}
                disabled={stripeLoading}
              >
                {stripeLoading ? "Processing..." : "Deposit"}
              </button>
            </StripeCheckout>
          </div>
        </Form>
      )}
    </Modal>
  );
}

export default Deposite;
