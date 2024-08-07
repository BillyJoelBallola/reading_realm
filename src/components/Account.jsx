import React, { useState } from "react";
import CustomButton from "./CustomButton";
import PasswordForm from "./PasswordForm";

const Account = () => {
  const [changePassword, setChangePassword] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          disabled
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          value={"readingrealm@gmail.com"}
        />
        <span className="text-sm text-gray-400">
          Email address can't be changed
        </span>
      </div>
      {changePassword ? (
        <PasswordForm closeForm={() => setChangePassword(false)} />
      ) : (
        <div className="form-group">
          <label htmlFor="">Password</label>
          <CustomButton
            handleOnClick={() => setChangePassword(true)}
            type={"normal"}
            style={"w-fit"}
          >
            Change Password
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default Account;
