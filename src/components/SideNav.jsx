import React from "react";
import { Bolt, BookHeart, House, LibraryBig, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authAPI } from "../api";

const SideNav = () => {
  const navigate = useNavigate();

  const logout = () => {
    authAPI.logout();
    navigate("/login");
  };

  return (
    <nav className="z-50 fixed flex flex-col items-center justify-between h-screen left-0 bg-transparent p-4">
      <Link to="/">
        <img src="/logo.svg" className="w-6 h-6" alt="logo" />
      </Link>
      <div className="flex flex-col gap-4 side-nav">
        <NavLink to="/">
          <House />
        </NavLink>
        <NavLink to="/books">
          <LibraryBig />
        </NavLink>
        <NavLink to="/your_bookshelf">
          <BookHeart />
        </NavLink>
        <NavLink to="/settings">
          <Bolt />
        </NavLink>
      </div>
      <button onClick={logout}>
        <LogOut />
      </button>
      <div className="absolute right-0 h-[95%] w-[1px] bg-bg-dark" />
    </nav>
  );
};

export default SideNav;
