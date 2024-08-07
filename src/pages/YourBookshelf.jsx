import React, { useContext, useEffect, useState } from "react";
import CustomCarousel from "../components/CustomCarousel";
import { UserContext } from "../context/UserContext";
import { bookShelfAPI } from "../api";

const path = "your_bookshelf";

const YourBookshelf = () => {
  const { user } = useContext(UserContext);
  const [bookShelf, setBookShelf] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookShelf = async () => {
      setLoading(true);
      try {
        const response = await bookShelfAPI.getBookShelf(user?.id);
        const data = await response.data;
        setBookShelf(data);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookShelf();
  }, [user?.id]);

  return (
    <div className="flex flex-col gap-10">
      <div className="">
        <h1 className="text-4xl lg:text-5xl">Your Bookshelf</h1>
        <div className="mt-4 w-full md:w-[50%] md:bg-transparent md:p-0 bg-bg-lightest p-4 rounded-lg">
          <p className="italic">
            The magic is only in what books say, how they stitched the patches
            of the universe together into one garment for us.
          </p>
          <p className="mt-2 font-semibold">– John Waters</p>
        </div>
      </div>
      <CustomCarousel
        items={loading ? [] : bookShelf}
        path={path}
        message={"Start browsing books and add your to bookshelf."}
      />
    </div>
  );
};

export default YourBookshelf;
