import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { fetchBookList } from "../helper/bookList.js";
import CustomCarousel from "../components/CustomCarousel";

const path = "books";

const Books = () => {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      const booksData = await fetchBookList(setLoading, user?.id);
      setBooks(booksData);
    };

    getBooks();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex-col md:flex-row flex justify-between gap-4">
        <div className="">
          <h1 className="text-4xl lg:text-5xl">Keep the story going...</h1>
          <p className="mt-4 w-full md:w-[85%] lg:w-[70%]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
            voluptate autem est facilis consequuntur adipisci!
          </p>
        </div>
        <div className="w-full md:w-[80%] lg:w-[45%] md:bg-transparent md:p-0 bg-bg-lightest p-4 rounded-lg">
          <p className="italic">
            It wasn't until I started reading and found books they wouldn't let
            us read in school that I discovered you could be insane and happy
            and have a good life without being like everybody else.
          </p>
          <p className="mt-2 font-semibold">– John Waters</p>
        </div>
      </div>
      <CustomCarousel items={loading ? [] : books} path={path} />
    </div>
  );
};

export default Books;
