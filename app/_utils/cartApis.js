const { default: axiosClient } = require("./axiosClient");

const addToCart = (payload) => axiosClient.post("/carts", payload);
const getUserCartItems = (email) =>
  axiosClient.get(
    `carts?populate[products][populate]=banner&filters[email][$eq]=${email}`
  );

const deleteCartItem = (id) => axiosClient.delete(`/carts/${id}`);

//http://localhost:1337/api/carts?populate[products][populate]=banner&filters[email][$eq]=ahmedabdaalh027@gmail.com
export default {
  addToCart,
  getUserCartItems,
  deleteCartItem,
};
