import React from "react";
import { NavLink } from "react-router-dom";

const Card = ({ item, style, hoverStyle, path }) => {
  return (
    <NavLink
      to={`/${path}/${item.id}`}
      className="group snap-center flex-1 flex flex-col gap-4 items-center"
    >
      <div
        className={`${
          style ? style.img : "w-40"
        } ${hoverStyle} overflow-hidden rounded-lg`}
      >
        <img
          className="h-full w-full"
          src={item.image}
          alt={item.title + "book cover"}
        />
      </div>
      <span
        className={`${style ? style.title : "max-w-40"}  text-sm text-center`}
      >
        {item.title}
      </span>
    </NavLink>
  );
};

export default Card;
