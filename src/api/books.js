import axios from "axios";

export const getAllBooks = async () => {
  try {
    const response = await axios.get("/books");
    const books = await response.data;
    return { data: books, success: "ok" };
  } catch (error) {
    throw { error: "Failed to fetch data" + error };
  }
};

export const addToBookshelf = async (bookId, userId) => {
  try {
    const { data: bookData } = await axios.get(`/books/${bookId}`);
    delete bookData?.id;
    const shelfData = {
      ...bookData,
      shelf: true,
      bookId,
      userId,
    };
    await axios.post("/bookShelf", shelfData);

    return { data: shelfData, success: "ok" };
  } catch (error) {
    throw { error: "Failed to add data" + error };
  }
};
