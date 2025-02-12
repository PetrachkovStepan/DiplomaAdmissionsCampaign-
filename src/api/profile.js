import { axiosInstance } from ".";

export const updateUser = async (userCredits, updateData, token) => {
  await axiosInstance(token).patch(
    `collections/users/records/${userCredits.id}`,
    updateData
  );

  const { data } = await axiosInstance(token).post(
    "collections/users/auth-refresh"
  );

  return data;
};