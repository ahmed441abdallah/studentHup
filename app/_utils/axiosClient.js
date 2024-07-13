const { default: axios } = require("axios");
import productApis from "./productApis";
const api_key = process.env.NEXT_PUBLIC_REST_API_KEY;
const api_url = "http://localhost:1337/api";

const axiosClient = axios.create({
  baseURL: api_url, // Set the base URL to the correct API endpoint
  headers: {
    Authorization: `Bearer ${api_key}`, // Use the API key for authorization
  },
});

export default axiosClient;
