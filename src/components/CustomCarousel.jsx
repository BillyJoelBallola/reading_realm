import { ArrowLeft, ArrowRight } from "lucide-react";
import Card from "./Card";
import React, { useMemo, useRef, useState } from "react";

const CustomCarousel = ({ items, message, path }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="self-end flex gap-4">
        <button
          disabled={items.length <= 0 ? true : false}
          onClick={scrollLeft}
          className="border border-transparent hover:border-text-color duration-200 p-2 rounded-full"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          disabled={items.length <= 0 ? true : false}
          onClick={scrollRight}
          className="border border-transparent hover:border-text-color duration-200 p-2 rounded-full"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
      {items.length <= 0 ? (
        <div className="h-[300px] p-8 grid place-items-center my-4 outline-gray-400 outline-[2px] outline-dashed rounded-2xl">
          <p className="text-center text-md md:text-xl text-gray-400">
            {message ? message : "No books found."}
          </p>
        </div>
      ) : (
        <div
          ref={carouselRef}
          className="carousel mt-4 md:mt-8 snap-x flex overflow-x-auto gap-16 pt-8 pb-4 md:pb-8 px-8"
        >
          {items.map((item) => (
            <Card
              key={item.id}
              item={item}
              path={path}
              hoverStyle={"group-hover:scale-[1.12] origin-bottom duration-500"}
              style={{ img: "w-[12rem]", title: "max-w-[12rem]" }}
            />
          ))}
        </div>
      )}
      <div className="self-end">
        <span className="text-accent-color">{items.length}</span> Available
        Books
      </div>
    </div>
  );
};

export default CustomCarousel;
