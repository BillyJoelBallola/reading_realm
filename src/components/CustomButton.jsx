import React, { useEffect, useMemo, useState } from "react";

const CustomButton = ({
  children,
  style,
  type,
  btnType = "button",
  handleOnClick = () => {},
}) => {
  const [selectedType, setSelectedType] = useState("");

  useMemo(() => {
    switch (type) {
      case "normal":
        return setSelectedType("bg-btn-color hover:bg-[#373b4d] text-white");
      case "delete-outlined":
        return setSelectedType(
          "bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        );
      case "delete-fill":
        return setSelectedType("bg-red-500 hover:bg-red-400 text-white");
    }
  }, [type]);

  return (
    <button
      type={btnType}
      onClick={handleOnClick}
      className={`${style} ${selectedType} cursor-pointer rounded-full text-sm px-4 py-2 duration-200`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
