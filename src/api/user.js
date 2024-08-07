import axios from "axios";

export const getAllUsers = async () => {
  try {
    const response = await axios.get("/users");
    const users = await response.data;
    return { data: users, success: "ok" };
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(`/users/${id}`);
    const user = await response.data;
    return { data: user, success: "ok" };
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (formData) => {
  try {
    const { data: userData } = await axios.get(`/users/${formData.id}`);
    if (userData.password !== formData.currentPassword) {
      throw { error: "Incorrect current password." };
    }

    if (formData.newPassword !== formData.confirmPassword) {
      throw { error: "Password did not match." };
    }

    const newUser = {
      ...userData,
      password: formData.confirmPassword,
    };

    const updatedUser = await axios.put(`/users/${newUser.id}`, newUser);
    return { data: updatedUser, success: "ok" };
  } catch (error) {
    throw error;
  }
};

export const updateProfileInfo = async (formData) => {
  try {
    const { data: userData } = await axios.get(`/users/${formData.id}`);
    const newUser = {
      ...userData,
      ...formData,
    };
    const updatedUser = await axios.put(`/users/${newUser.id}`, newUser);
    return { data: updatedUser, success: "ok" };
  } catch (error) {
    throw error;
  }
};

export const changeProfileImage = async (userId, image) => {
  try {
    const { data: userData } = await axios.get(`/users/${userId}`);
    const newUser = {
      ...userData,
      image,
    };
    const updatedUser = await axios.put(`/users/${userId}`, newUser);
    return { data: updatedUser, success: "ok" };
  } catch (error) {
    throw error;
  }
};

export const removeProfileImage = async (userId) => {
  try {
    const { data: userData } = await axios.get(`/users/${userId}`);
    const newUser = {
      ...userData,
      image:
        "https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg",
    };
    const updatedUser = await axios.put(`/users/${userId}`, newUser);
    return { data: updatedUser, success: "ok" };
  } catch (error) {
    throw error;
  }
};
