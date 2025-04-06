import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BankOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
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
      <div className="bg-stone-800 text-white h-20 px-4 md:px-10 flex items-center justify-between shadow-lg w-full relative">
        <div className="block md:hidden relative z-50">
          <input type="checkbox" id="menu-toggle" className="peer hidden" />
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer p-2 rounded-md hover:bg-stone-700"
          >
            <MenuOutlined style={{ fontSize: "22px" }} />
          </label>
          <div className="absolute top-14 left-0 bg-stone-800 rounded-md shadow-lg w-48 hidden peer-checked:flex flex-col z-50">
            {menuToRender.map((item) => {
              const isActive = window.location.pathname === item.path;
              return (
                <div
                  key={item.path}
                  onClick={item.onClick}
                  className={`px-4 py-2 text-sm cursor-pointer flex items-center gap-2 ${
                    isActive ? "bg-stone-700" : "hover:bg-stone-600"
                  }`}
                >
                  {item.icon}
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex-1 flex justify-center md:justify-start">
          <h1 className="text-xl md:text-3xl font-bold tracking-wide text-center md:text-left whitespace-nowrap">
            Digi Wallet
          </h1>
        </div>

        <div className="hidden md:flex gap-6 items-center absolute left-1/2 -translate-x-1/2">
          {menuToRender.map((item) => {
            const isActive = window.location.pathname === item.path;
            return (
              <div
                key={item.path}
                onClick={item.onClick}
                className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md text-base font-medium transition-all duration-200 ${
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

        <div
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-2 text-base font-medium hover:text-red-400 transition-all absolute right-4 md:static"
        >
          <LogoutOutlined />
          <span className="hidden sm:inline">Logout</span>
        </div>
      </div>

      <main className="flex-1 p-4 md:p-6 w-full max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
