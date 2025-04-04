import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DefaultLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const userMenu = [
    {
        title:"Home",
        icon:<i className="ri-home-9-fill"></i>     ,
        onClick: ()=> navigate("/"),
        path:"/"
    },
    {
        title:"Transactions",
        icon:<i className="ri-bank-line"></i>    ,
        onClick: ()=> navigate("/transactions"),
        path:"/transactions"
    },
   
    {
        title:"Profile",
        icon: <i className="ri-shield-user-line"></i>   ,
        onClick: ()=> navigate("/profile"),
        path:"/profile"
    },
    {
        title:"Logout",
        icon:  <i className="ri-logout-circle-line"></i>     ,
        onClick: ()=> {
            localStorage.removeItem("token");
            navigate("/login");
        },
        path:"/logout"
    },
  ]

  const adminMenu = [
    {
        title:"Home",
        icon:<i className="ri-home-9-fill"></i>     ,
        onClick: ()=> navigate("/"),
        path:"/"
    },
    {
        title:"Users",
        icon:<i className="ri-group-line"></i>     ,
        onClick: ()=> navigate("/users"),
        path:"/users"
    },
    {
        title:"Transactions",
        icon:<i className="ri-bank-line"></i>    ,
        onClick: ()=> navigate("/transactions"),
        path:"/transactions"
    },
    {
        title:"Profile",
        icon: <i className="ri-shield-user-line"></i>   ,
        onClick: ()=> navigate("/profile"),
        path:"/profile"
    },
    {
        title:"Logout",
        icon:  <i className="ri-logout-circle-line"></i>     ,
        onClick: ()=> {
            localStorage.removeItem("token");
            navigate("/login");
        },
        path:"/logout"
    },
  ]
   
  const menuToRender = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="flex p-4 h-screen gap-4 w-screen">
      <div className="bg-teal-900 p-4 rounded-md h-full flex items-center">
      <div className="flex flex-col gap-4 w-full">
          {menuToRender.map((item) => {
           const isActive = window.location.pathname === item.path;
            return (
              <div
                className={`flex items-center gap-4 text-white p-1.5 cursor-pointer ${isActive ? "active-menu-item" : ""}`}
                onClick={item.onClick}
                key={item.path} // add a key for efficient rendering
              >
                {item.icon}
                {!collapsed && <h1 className="text-white text-sm">{item.title}</h1>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <div className="bg-teal-800 p-4 rounded-md w-full flex justify-between item-center">
          <div className="text-white">
            {!collapsed && (
              <i
                className="ri-close-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
            { collapsed && (
              <i
                className="ri-menu-2-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
          </div>
          <div>
            <h1 className="text-xl text-white">Digital Banking</h1>
          </div>
          <div>
            <h1 className="text-sm text-white">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
