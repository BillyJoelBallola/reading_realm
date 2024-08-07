import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp, FileDown, Heart } from "lucide-react";
import { UserContext } from "../context/UserContext";
import { fetchBookList } from "../helper/bookList";
import { booksAPI, bookShelfAPI } from "../api";
import CustomButton from "../components/CustomButton";

const Book = () => {
  const navigate = useNavigate();
  const { activePath, id } = useParams();
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const currentBook = books?.find((book) => book.id === id);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        if (activePath === "books") {
          const booksData = await fetchBookList(setLoading, user?.id);
          setBooks(booksData);
        } else if (activePath === "your_bookshelf") {
          const response = await bookShelfAPI.getBookShelf(user?.id);
          setBooks(response.data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [update, activePath, user?.id]);

  const toggleAddToShelf = async (bookData, userId) => {
    const hasShelf = "shelf" in bookData;
    const { bookId, id } = bookData;
    setUpdate(true);

    try {
      if (hasShelf) {
        const answer = confirm(
          "Are you sure you want to remove this from your shelf?"
        );
        if (answer) {
          await bookShelfAPI.removeBook(bookId);
          navigate(`/${activePath}`);
        }
      } else {
        await booksAPI.addToBookshelf(id, userId);
      }
      setUpdate(false);
    } catch (error) {
      console.error("Error toggling book shelf:", error);
    }
  };

  const handlePrevNavigate = () => {
    const currentIndex = books.findIndex((item) => item.id === id);
    const prevBookId =
      currentIndex > 0 ? books[currentIndex - 1]?.id : books[currentIndex]?.id;
    navigate(`/${activePath}/${prevBookId}`);
  };

  const handleNextNavigate = () => {
    const currentIndex = books.findIndex((item) => item.id === id);
    const lastBookId = books[books.length - 1]?.id;
    const nextBookId =
      lastBookId != books[currentIndex]?.id
        ? books[currentIndex + 1]?.id
        : books[currentIndex]?.id;
    navigate(`/${activePath}/${nextBookId}`);
  };

  return (
    <div className="md:px-8 lg:px-14">
      {!loading && currentBook ? (
        <>
          <div className="flex flex-col md:flex-row justify-around gap-4 md:gap-8">
            <div className="flex items-center justify-center md:justify-between gap-4 md:gap-8">
              <div className="flex flex-col justify-center items-center gap-4">
                <button
                  onClick={handlePrevNavigate}
                  className="border border-transparent hover:border-text-color duration-200 p-2 rounded-full"
                >
                  <ArrowUp />
                </button>
                <button
                  onClick={handleNextNavigate}
                  className="border border-transparent hover:border-text-color duration-200 p-2 rounded-full"
                >
                  <ArrowDown />
                </button>
              </div>
              <div className="w-[12rem] md:w-[14rem] lg:w-[17rem] drop-shadow-2xl overflow-hidden rounded-lg">
                <img
                  className="object-contain"
                  src={currentBook.image}
                  alt={currentBook.title + "cover"}
                />
              </div>
            </div>
            <div className="md:w-[500px] flex flex-col text-center md:text-left justify-start lg:justify-center gap-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl">
                {currentBook.title}
              </h1>
              <p className="text-md lg:text-lg font-semibold">
                {currentBook.author}
              </p>
            </div>
          </div>
          <div className="mt-8 md:-mt-14 lg:-mt-16 bg-bg-lightest w-full pb-8 px-6 md:px-10 pt-8 md:pt-20 lg:pt-24">
            <div className="border-b border-bg-dark pb-4 md:pb-8 flex flex-wrap justify-center md:justify-between gap-4 items-center">
              <p className="text-sm">
                Enjoy reading this book by downloading the PDF file format.
              </p>
              <div className="flex items-center gap-2">
                <CustomButton
                  style={"flex gap-1 items-center w-fit"}
                  type={"normal"}
                >
                  <FileDown className="size-4" />
                  Download
                </CustomButton>
                <button
                  onClick={() => toggleAddToShelf(currentBook, user?.id)}
                  className={`${
                    currentBook.shelf
                      ? "bg-accent-color hover:bg-red-400"
                      : "bg-transparent hover:bg-bg-dark"
                  } border border-text-color p-2 rounded-full duration-200`}
                >
                  <Heart className="size-4 fill-white" />
                </button>
              </div>
            </div>
            <div className=" mt-8 flex flex-col md:flex-row gap-4 md:gap-14">
              <div className="grid gap-4 flex-1">
                <div>
                  <h3 className="font-body font-semibold mb-2 md:mb-4">
                    Description
                  </h3>
                  <p>
                    {currentBook.description} Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Aperiam dolorum eius labore
                    dicta sit tempora tenetur eum illum veritatis accusamus?
                  </p>
                </div>
                <div>
                  <h3 className="font-body font-semibold mb-2 md:mb-4">
                    Genre
                  </h3>
                  <p>{currentBook.genre}</p>
                </div>
              </div>
              <div className="grid gap-4 flex-1">
                <div>
                  <h3 className="font-body font-semibold mb-2 md:mb-4">
                    Language
                  </h3>
                  <p>{currentBook.language}</p>
                </div>
                <div>
                  <h3 className="font-body font-semibold mb-2 md:mb-4">
                    Publication
                  </h3>
                  <p>
                    {currentBook.startDate} - {currentBook.endDate}.{" "}
                    {currentBook.pages} Pages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default Book;
