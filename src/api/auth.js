import axios from "axios";

export const login = async (formData) => {
  const { email, password } = formData;

  try {
    const { data: user } = await axios.get(`/users/?email=${email}`);

    if (user?.length < 0) {
      throw { error: "User does not exist." };
    }

    if (user[0]?.password !== password) {
      throw { error: "Password is incorrect." };
    }

    localStorage.setItem("rr-token", JSON.stringify(user[0]));
    return { data: user[0], success: "ok" };
  } catch (error) {
    throw error;
  }
};

export const register = async (formData) => {
  const { email, password, confirmPassword } = formData;

  try {
    const { data: existing } = await axios.get(`/users/?email=${email}`);

    if (existing.length > 0) {
      throw { error: "Email address already used." };
    }

    if (password !== confirmPassword) {
      throw { error: "Password did not match." };
    }

    const response = await axios.post("/users", {
      ...formData,
      image:
        "https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg",
    });
    return { data: response.data, success: "ok" };
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("rr-token");
};
