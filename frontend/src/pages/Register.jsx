import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { RegisterUser } from "../api/users";

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
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
      {/* Left Side - Image (Hidden on Small Screens) */}
      <div className="hidden md:flex flex-1 bg-blue-600 items-center justify-center">
        <img
          src="https://source.unsplash.com/600x600/?finance,banking"
          alt="Banking Illustration"
          className="w-3/4 max-w-md rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Responsive Form */}
      <div className="flex-1 flex justify-center items-center bg-gray-50 px-4 md:px-10 py-6">
        <div className="w-full max-w-lg sm:max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 text-center">Digital Banking</h1>
          <p className="text-center text-gray-500 mb-4">Create your account</p>

          <Form layout="vertical" onFinish={onFinish} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="First Name" name="firstName">
                <input type="text" className="w-full p-2 border rounded-md text-sm focus:outline-blue-500" defaultValue="" />
              </Form.Item>

              <Form.Item label="Last Name" name="lastName">
                <input type="text" className="w-full p-2 border rounded-md text-sm focus:outline-blue-500" defaultValue="" />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <input type="email" className="w-full p-2 border rounded-md text-sm focus:outline-blue-500" defaultValue="" />
              </Form.Item>

              <Form.Item label="Mobile" name="phoneNumber">
                <input type="text" className="w-full p-2 border rounded-md text-sm focus:outline-blue-500" defaultValue="" />
              </Form.Item>

              <Form.Item label="Identification Type" name="idType">
                <select className="w-full p-2 border rounded-md text-sm focus:outline-blue-500">
                  <option value="NATIONAL ID">National ID</option>
                  <option value="PASSPORT">Passport</option>
                  <option value="DRIVING LICENSE">Driving License</option>
                </select>
              </Form.Item>

              <Form.Item label="Identification Number" name="idNumber">
                <input type="text" className="w-full p-2 border rounded-md text-sm focus:outline-blue-500" defaultValue="" />
              </Form.Item>
            </div>

            <Form.Item label="Address" name="address">
              <textarea className="w-full p-2 border rounded-md text-sm focus:outline-blue-500" rows="3"></textarea>
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Password" name="password">
                <input type="password" className="w-full p-2 border rounded-md text-sm focus:outline-blue-500" />
              </Form.Item>

              <Form.Item label="Confirm Password" name="confirmPassword">
                <input type="password" className="w-full p-2 border rounded-md text-sm focus:outline-blue-500" />
              </Form.Item>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition"
            >
              Register
            </button>

            <p className="text-center text-gray-600 mt-4 text-sm">
              Already have an account?{" "}
              <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
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
