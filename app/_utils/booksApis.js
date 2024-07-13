import axiosClient from "./axiosClient";

const getBooks = () => axiosClient.get("/books?populate=*");
const getBookById = (id) => axiosClient.get(`/books/${id}?populate=*`);
export default {
  getBooks,
  getBookById,
};
