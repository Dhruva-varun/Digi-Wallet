import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetUserInfo } from "../api/users";
import { message, Spin } from "antd";
import { SetUser, ReloadUser } from "../redux/usersSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
  const { user, reloadUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const response = await GetUserInfo();
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        message.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      message.error(error.message);
      navigate("/login");
    } finally {
      dispatch(ReloadUser(false));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") && !user) {
      getData();
    } else if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (reloadUser) {
      getData();
    }
  }, [reloadUser]);

  if (!user) {
    return <Spin fullscreen />;
  }

  return <DefaultLayout>{children}</DefaultLayout>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
