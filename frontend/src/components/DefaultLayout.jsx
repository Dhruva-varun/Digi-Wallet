import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BankOutlined,
  HomeOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

function DefaultLayout({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const userMenu = [
    {
      title: "Home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Transactions",
      icon: <BankOutlined />,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Users",
      icon: <UsergroupAddOutlined />,
      onClick: () => navigate("/users"),
      path: "/users",
    },
    {
      title: "Transactions",
      icon: <BankOutlined />,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
  ];

  const menuToRender = user?.isAdmin ? adminMenu : userMenu;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      {/* Navbar */}
      <div className="bg-stone-800 text-white h-16 flex items-center justify-between px-6 shadow-md">
        {/* Logo */}
        <h1 className="text-2xl font-semibold tracking-wide">Digi Wallet</h1>

        {/* Nav Links */}
        <div className="flex gap-4 items-center">
          {menuToRender.map((item) => {
            const isActive = window.location.pathname === item.path;
            return (
              <div
                key={item.path}
                onClick={item.onClick}
                className={`cursor-pointer flex items-center gap-2 text-base font-medium px-4 py-2 rounded-md transition-all duration-200
                  ${
                    isActive
                      ? "bg-stone-700"
                      : "hover:bg-stone-600 hover:text-white"
                  }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
            );
          })}
        </div>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-2 hover:text-red-400 transition-all"
        >
          <LogoutOutlined />
          <span>Logout</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
