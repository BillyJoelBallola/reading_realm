import axios from "axios";

export const getBookShelf = async (userId) => {
  try {
    const response = await axios.get(`/bookShelf/?userId=${userId}`);
    const bookShelf = await response.data;
    return { data: bookShelf, success: "ok" };
  } catch (error) {
    throw { error: "Failed to add data " + error };
  }
};

export const removeBook = async (bookId) => {
  try {
    const { data: bookData } = await axios.get(`/bookShelf/?bookId=${bookId}`);
    await axios.delete(`/bookShelf/${bookData[0]?.id}`);
    return { data: "Book has been remove successfully", success: "ok" };
  } catch (error) {
    throw { error: "Failed to add data " + error };
  }
};
