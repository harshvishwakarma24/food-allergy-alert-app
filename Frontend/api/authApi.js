import axiosInstance from "./axiosConfig";

// 🔹 Register API
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "users/register/",
      userData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw { error: "Server not reachable" };
    }
  }
};
export const loginUser = async (loginData) => {
  try {
    const response = await axiosInstance.post(
      "users/login/",
      loginData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw { error: "Server not reachable" };
    }
  }
};
export const getUserProfile = async (username) => {
  try {
    const response = await axiosInstance.get(
      `users/profile/${username}/`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw { error: "Server not reachable" };
    }
  }
};
// 🔹 UPDATE PROFILE
export const updateUserProfile = async (username, data) => {
  try {
    const response = await axiosInstance.put(
      `users/profile/update/${username}/`,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw { error: "Server not reachable" };
    }
  }
};

