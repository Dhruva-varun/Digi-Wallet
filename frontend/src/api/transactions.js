import { axiosInstance } from ".";

export const VerifyAccount = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/transactions/verify-account",
      payload
    );
    return data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const TransferFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/transactions/transfer-funds",
      payload
    );
    return data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const GetTransactionsOfUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/transactions/get-all-transactions",
      payload
    );
    return data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const DepositeFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/transactions/deposite-funds",
      payload
    );
    return data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};
