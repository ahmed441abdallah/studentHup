import axiosClient from "./axiosClient";

const createOrders = (data) => axiosClient.post("/orders", data);
export default {
  createOrders,
};
