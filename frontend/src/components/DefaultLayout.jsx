import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BankOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

function DefaultLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
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
    {
      title: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/logout",
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
    {
      title: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/logout",
    },
  ];

  const menuToRender = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <div
        className={`bg-slate-800 text-white h-full transition-all duration-300 flex flex-col justify-between ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div>
          <div className="flex justify-center items-center h-16">
            {collapsed ? (
              <MenuUnfoldOutlined
                onClick={() => setCollapsed(false)}
                className="text-xl cursor-pointer"
              />
            ) : (
              <MenuFoldOutlined
                onClick={() => setCollapsed(true)}
                className="text-xl cursor-pointer"
              />
            )}
          </div>

          <div className="flex flex-col gap-2 px-2">
            {menuToRender.map((item) => {
              const isActive = window.location.pathname === item.path;
              return (
                <div
                  key={item.path}
                  onClick={item.onClick}
                  className={`flex items-center rounded-lg px-3 py-3 cursor-pointer text-base font-medium transition-all duration-200 
                  ${collapsed ? "justify-center" : "gap-4"}
                  ${isActive ? "bg-slate-700" : "hover:bg-slate-600"}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!collapsed && <span>{item.title}</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`px-3 py-4 hover:bg-slate-600 cursor-pointer transition-all duration-200 border-t border-slate-700
          ${collapsed ? "flex justify-center" : "flex items-center gap-3"}`}
          onClick={() => navigate("/profile")}
        >
          <UserOutlined className="text-xl" />
          {!collapsed && (
            <div className="truncate">
              <h1 className="text-md font-semibold">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-xs opacity-70">View Profile</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="bg-slate-800 text-white h-16 flex items-center justify-center shadow">
          <h1 className="text-2xl font-bold">Digi Wallet</h1>
        </div>

        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
