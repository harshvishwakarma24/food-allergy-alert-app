import axiosInstance from "./axiosConfig";

export const saveHistory = async (data) => {
  const response = await axiosInstance.post(
    "history/save/",
    data
  );
  return response.data;
};

export const getHistory = async (username) => {
  const response = await axiosInstance.get(
    `history/${username}/`
  );
  return response.data;
};

export const clearHistory = async (username) => {
  const response = await axiosInstance.delete(
    `history/clear/${username}/`
  );
  return response.data;
};


