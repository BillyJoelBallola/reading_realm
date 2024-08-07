import React from "react";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";
import { UserContextProvider } from "../context/UserContext";

const Layout = () => {
  return (
    <main className="relevant">
      <UserContextProvider>
        <TopNav />
        <SideNav />
        <div className="bg-bg-light w-full min-h-screen pt-20 pb-10 pl-24 pr-8">
          <Outlet />
        </div>
      </UserContextProvider>
    </main>
  );
};

export default Layout;
