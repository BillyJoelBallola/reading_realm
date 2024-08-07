import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import SearchBox from "./SearchBox";
import { NavLink } from "react-router-dom";

const TopNav = () => {
  const { user } = useContext(UserContext);
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  return (
    <nav
      className={`${
        scrollY > 0 ? "bg-bg-light shadow-sm" : "bg-transparent"
      } pl-24 z-30 pr-4 md:pr-10 py-4 fixed top-0 w-full flex items-center justify-between`}
    >
      <SearchBox />
      <NavLink to={"/settings"} className="flex gap-2 items-center">
        <div className="flex -space-x-1 overflow-hidden">
          <img
            className="object-fit h-8 w-8 rounded-full border-2 border-bg-lightest"
            src={user?.image}
            alt="profile picture"
          />
        </div>
        <span className="hidden md:block text-sm font-semibold">
          {user?.name}
        </span>
      </NavLink>
    </nav>
  );
};

export default TopNav;
