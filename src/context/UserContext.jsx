import { createContext, useEffect, useState } from "react";
import { userAPI } from "../api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [updateUser, setUpdateUser] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const userLogged = JSON.parse(localStorage.getItem("rr-token"));

      if (!userLogged) {
        navigate("/login");
      } else {
        const response = await userAPI.getUser(userLogged?.id);
        if (response.success === "ok") {
          const data = await response.data;
          setUser(data);
        }
      }
    };

    if (!user || updateUser) {
      getUserData();
      setUpdateUser(false);
    }
  }, [user, updateUser]);

  return (
    <UserContext.Provider value={{ user, setUpdateUser }}>
      {children}
    </UserContext.Provider>
  );
};
