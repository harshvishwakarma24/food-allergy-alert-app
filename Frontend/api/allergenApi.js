import axiosInstance from "./axiosConfig";

// Save user allergens
export const saveAllergens = async (username, allergens) => {
  const response = await axiosInstance.post(
    "allergens/save/",
    {
      username,
      allergens,
    }
  );
  return response.data;
};

// Get user allergens
export const getAllergens = async (username) => {
  const response = await axiosInstance.get(
    `allergens/${username}/`
  );
  return response.data;
};
