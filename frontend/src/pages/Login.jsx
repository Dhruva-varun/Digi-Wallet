import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { LoginUser } from "../api/users";

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Image (Hidden on Mobile) */}
      <div className="hidden md:flex flex-1 bg-blue-600 items-center justify-center">
        <img
          src="https://source.unsplash.com/600x600/?banking,security"
          alt="Login Illustration"
          className="w-3/4 max-w-md rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex justify-center items-center bg-gray-50 px-4 md:px-10 py-6">
        <div className="w-full max-w-md sm:max-w-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 text-center">Welcome Back</h1>
          <p className="text-center text-gray-500 mb-6">Sign in to your account</p>

          <Form layout="vertical" onFinish={onFinish} className="space-y-4">
            <Form.Item label="Email" name="email">
              <input
                type="email"
                className="w-full p-2 border rounded-md text-sm focus:outline-blue-500"
                defaultValue=""
              />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <input
                type="password"
                className="w-full p-2 border rounded-md text-sm focus:outline-blue-500"
                defaultValue=""
              />
            </Form.Item>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition"
            >
              Login
            </button>

            <p className="text-center text-gray-600 mt-4 text-sm">
              Don't have an account?{" "}
              <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
                Register
              </span>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
