import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { LoginUser } from "../api/users";
import Loader from "../components/Loader";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
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
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex flex-1 items-center justify-center">
        <img
          src="https://pngimg.com/uploads/bank/bank_PNG24.png"
          alt="Secure Login"
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
      </div>

      <div className="flex-1 flex justify-center items-center px-4 md:px-10 py-6">
        <div className="w-full max-w-md sm:max-w-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-stone-600 text-center mb-2">
            Digi-Wallet
          </h1>
          <p className="text-center text-stone-500 mb-6">
            Login to your account
          </p>

          {loading ? (
            <Loader fullscreen={false} />
          ) : (
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ email: "", password: "" }}
            >
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
                  className="w-full p-2 border rounded-md text-lg focus:outline-stone-500"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <input
                  type="password"
                  className="w-full p-2 border rounded-md text-lg focus:outline-stone-500"
                />
              </Form.Item>

              <button
                type="submit"
                className="w-full bg-stone-600 text-white py-2 rounded-md text-lg hover:bg-stone-700 transition cursor-pointer"
              >
                Login
              </button>

              <p className="text-center text-stone-600 mt-4 text-md">
                Don't have an account?{" "}
                <span
                  className="text-violet-600 cursor-pointer hover:underline"
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
              </p>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
