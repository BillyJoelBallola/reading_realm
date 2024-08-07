import { booksAPI, bookShelfAPI } from "../api";

const newBooksList = (shelf, books) => {
  let newData = books;

  shelf.forEach((book) => {
    books.forEach((item, idx) => {
      if (Number(book.bookId) === Number(item.id)) {
        newData[idx] = { ...newData[idx], shelf: true };
      }
    });
  });

  return newData;
};

export const fetchBookList = async (setLoading, id) => {
  setLoading(true);
  let result = [];

  try {
    const bookShelfResponse = await bookShelfAPI.getBookShelf(id);
    const booksResponse = await booksAPI.getAllBooks();
    result = newBooksList(bookShelfResponse.data, booksResponse.data);
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    setLoading(false);
  }

  return result;
};
