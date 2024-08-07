import React, { useContext, useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { UserContext } from "../context/UserContext";
import { userAPI } from "../api";

const Profile = () => {
  const { user, setUpdateUser } = useContext(UserContext);
  const [changeImage, setChangeImage] = useState(false);
  const [formInput, setFormInput] = useState({
    image: "",
    name: "",
    username: "",
  });

  useEffect(() => {
    if (user) {
      setFormInput({
        image: user.image,
        name: user.name,
        username: user.username,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormInput((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeImage = async () => {
    try {
      await userAPI.changeProfileImage(user?.id, formInput.image);
      setUpdateUser(true);
      setChangeImage(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveImage = async () => {
    try {
      const anwer = confirm(
        "Are you sure you want to remove this profile image?"
      );
      if (anwer) {
        await userAPI.removeProfileImage(user?.id);
        setUpdateUser(true);
        setChangeImage(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formInput,
        id: user?.id,
      };
      await userAPI.updateProfileInfo(data);
      setUpdateUser(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <label htmlFor="" className="text-sm">
          Profile Name
        </label>
        <div className="flex mt-4 flex-wrap items-center gap-8">
          <div className="flex -space-x-1 overflow-hidden">
            <img
              className="object-fit size-28 rounded-full border-2 border-bg-dark"
              src={user?.image}
              alt=""
            />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            {changeImage ? (
              <>
                <div className="form-group w-full">
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Enter image URL"
                    value={formInput.image}
                    onChange={handleChange}
                  />
                </div>
                <CustomButton
                  handleOnClick={() => setChangeImage(false)}
                  type={"delete-outlined"}
                  style={"h-fit"}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  handleOnClick={handleChangeImage}
                  type={"normal"}
                  style={"h-fit"}
                >
                  Save
                </CustomButton>
              </>
            ) : (
              <>
                <CustomButton
                  handleOnClick={() => setChangeImage(true)}
                  type={"normal"}
                >
                  Change Picture
                </CustomButton>
                <CustomButton
                  handleOnClick={handleRemoveImage}
                  type={"delete-outlined"}
                >
                  Delete Picture
                </CustomButton>
              </>
            )}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="form-group">
          <label htmlFor="profileName">Profile Name</label>
          <input
            required
            type="text"
            id="profileName"
            name="name"
            placeholder="Profile Name"
            value={formInput.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formInput.username}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <CustomButton btnType="submit" type={"normal"} style={"w-fit mt-4"}>
            Save Changes
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default Profile;
