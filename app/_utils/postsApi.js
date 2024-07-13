import axiosClient from "./axiosClient";
const getAllPosts = () => axiosClient.get("/posts?populate=*");
const getPostById = (id) => axiosClient.get(`/posts/${id}?populate=*`);

export default {
  getAllPosts,
  getPostById,
};
