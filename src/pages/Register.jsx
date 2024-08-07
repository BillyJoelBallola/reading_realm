import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.register(formInput);
      if (response.success === "ok") {
        alert("Account registered successfully");
        navigate("/login");
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
        className="w-[90%] md:w-[80%] lg:w-[50%] flex flex-col gap-4 bg-bg-lightest p-4 py-8 md:p-12 rounded-xl shadow-md"
      >
        <div className="flex justify-center mb-4">
          <img className="w-44" src="/long-logo.svg" alt="logo" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Juan Dela Cruz"
              value={formInput.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="e.g. juan234"
              value={formInput.username}
              onChange={handleChange}
              required
            />
          </div>
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
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formInput.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <CustomButton btnType="submit" type={"normal"} style={"w-full mt-4"}>
          Register
        </CustomButton>
        <p className="text-sm text-center mt-8">
          Already have an account? <br /> Click here to{" "}
          <Link to={"/login"} className="text-accent-color">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
