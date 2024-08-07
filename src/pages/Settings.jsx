import React from "react";
import { Link, useParams } from "react-router-dom";
import { Bell, Bolt, UserRoundCog } from "lucide-react";
import Profile from "../components/Profile";
import Account from "../components/Account";

const settingsNav = [
  {
    path: "profile",
    icon: <UserRoundCog className="size-6" />,
    name: "My Profile",
  },
  {
    path: "account",
    icon: <Bolt className="size-6" />,
    name: "My Account",
  },
  {
    path: "notification",
    icon: <Bell className="size-6" />,
    name: "Notification",
  },
];

const Settings = () => {
  const { tab } = useParams();
  const activeTab = tab === undefined ? "profile" : tab;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-4xl lg:text-5xl">Settings</h1>
        <p className="mt-4 w-full md:w-[50%]">
          Customize Your Experience: Configure Settings, Manage Your Profile,
          and Update Account Details
        </p>
      </div>
      <div className="bg-bg-lightest p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="pb-4 pr-4 flex gap-2 md:block md:p-0 md:w-[300px] lg:w-[450px] border-b md:border-r md:border-b-0 border-bg-dark">
          {settingsNav.map((link, idx) => (
            <Link
              key={idx}
              to={`/settings/${link.path}`}
              className={`${
                activeTab === link.path ? "bg-[#dddddd]" : "bg-transparent"
              } flex gap-2 p-4 font-semibold w-fit rounded-full hover:bg-[#f1f1f1] duration-200`}
            >
              {link.icon}
              <span className="hidden md:inline">{link.name}</span>
            </Link>
          ))}
        </div>
        <div className="w-full">
          {activeTab === "profile" ? (
            <Profile />
          ) : activeTab === "account" ? (
            <Account />
          ) : activeTab === "notification" ? (
            <div>Notification</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
