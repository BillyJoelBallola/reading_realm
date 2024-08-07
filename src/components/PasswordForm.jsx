import { useContext, useState } from "react";
import CustomButton from "./CustomButton";
import { UserContext } from "../context/UserContext";
import { userAPI } from "../api";

const PasswordForm = ({ closeForm }) => {
  const { user, setUpdateUser } = useContext(UserContext);

  const [formInput, setFormInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userAPI.changePassword({ ...formInput, id: user?.id });
      setUpdateUser(true);
      closeForm();
      alert("Password successfully updated.");
    } catch (error) {
      alert(error.error);
    }
  };

  const handleInputChange = (e) => {
    setFormInput((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="form-group">
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          placeholder="Current Password"
          value={formInput.currentPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="New Password"
          value={formInput.newPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formInput.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mt-4 flex justify-end items-center gap-2">
        <CustomButton btnType="submit" type={"normal"}>
          Save Changes
        </CustomButton>
        <CustomButton handleOnClick={closeForm} type={"delete-outlined"}>
          Cancel
        </CustomButton>
      </div>
    </form>
  );
};

export default PasswordForm;
