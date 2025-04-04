import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { RegisterUser } from "../api/users";

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      return message.error("Passwords do not match");
    }

    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex flex-1 items-center justify-center">
        <img
          src="https://pngimg.com/uploads/bank/bank_PNG24.png"
          alt="Secure Login"
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
      </div>

      <div className="flex-1 flex justify-center items-center px-4 md:px-10 py-6">
        <div className="w-full max-w-xl sm:max-w-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-stone-600 text-center mb-2">
            Digi-Wallet
          </h1>
          <p className="text-center text-stone-500 mb-4">Create your account</p>

          <Form layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "First name is required" }]}
              >
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm"
                />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Last name is required" }]}
              >
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <input
                  type="email"
                  className="w-full p-2 border rounded-md text-sm"
                />
              </Form.Item>

              <Form.Item
                label="Mobile"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Phone number is required" },
                ]}
              >
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm"
                />
              </Form.Item>

              <Form.Item
                label="Identification Type"
                name="idType"
                rules={[{ required: true, message: "Select ID type" }]}
              >
                <select className="w-full p-2 border rounded-md text-sm">
                  <option value="">Select</option>
                  <option value="NATIONAL ID">National ID</option>
                  <option value="PASSPORT">Passport</option>
                  <option value="DRIVING LICENSE">Driving License</option>
                </select>
              </Form.Item>

              <Form.Item
                label="Identification Number"
                name="idNumber"
                rules={[{ required: true, message: "ID number is required" }]}
              >
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm"
                />
              </Form.Item>
            </div>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <textarea
                className="w-full p-2 border rounded-md text-sm"
                rows="3"
              />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <input
                  type="password"
                  className="w-full p-2 border rounded-md text-sm"
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please confirm your password" },
                ]}
              >
                <input
                  type="password"
                  className="w-full p-2 border rounded-md text-sm"
                />
              </Form.Item>
            </div>

            <button
              type="submit"
              className="w-full bg-stone-600 text-white py-2 rounded-md text-sm hover:bg-stone-700 transition cursor-pointer"
            >
              Register
            </button>

            <p className="text-center text-stone-600 mt-4 text-md">
              Already have an account?{" "}
              <span
                className="text-violet-600 cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
