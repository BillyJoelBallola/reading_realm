import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authAPI.login(formInput);
      if (response.success === "ok") {
        navigate("/");
      }
    } catch (error) {
      alert(error.error);
    }
  };

  const handleChange = (e) => {
    setFormInput((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-bg-light grid place-items-center h-screen w-screen">
      <form
        onSubmit={handleFormSubmit}
        className="w-[90%] md:w-[60%] lg:w-[35%] flex flex-col gap-4 bg-bg-lightest p-4 py-8 md:p-12 rounded-xl shadow-md"
      >
        <div className="flex justify-center mb-4">
          <img className="w-44" src="/long-logo.svg" alt="logo" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="readingrealm@example.com"
            value={formInput.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formInput.password}
            onChange={handleChange}
          />
        </div>
        <CustomButton btnType="submit" type={"normal"} style={"w-full mt-4"}>
          Login
        </CustomButton>
        <p className="text-sm text-center mt-8">
          Don't have an account yet? <br /> Click here to{" "}
          <Link to={"/register"} className="text-accent-color">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
