import { axiosInstance } from ".";

export const LoginUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/users/login", payload);
    return data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const RegisterUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/users/register", payload);
    return data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const GetUserInfo = async () => {
  try {
    const { data } = await axiosInstance.post("/users/user-info");
    return data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const GetAllUsers = async () => {
  try {
    const { data } = await axiosInstance.post("/users/get-all-users");
    return data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const UpdateUserVerification = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/users/update-user-verified-status",
      payload
    );
    return data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};
