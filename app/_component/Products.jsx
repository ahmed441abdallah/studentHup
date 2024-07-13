"use client";
import React, { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import productApis from "../_utils/productApis";
const Products = () => {
  const [productList, setProductList] = useState([]);
  const fetchProducts = () => {
    productApis.getAllProducts().then((res) => setProductList(res.data.data)); // from public folder
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="text-center sm:text-left m-4">
        <h1 className="text-3xl font-bold  sm:text-3xl">
          Some of supported courses
        </h1>

        <p className="mt-1.5 text-sm text-gray-500">Let's start now ! 🎉</p>
      </div>
      <ProductsList products={productList}></ProductsList>
    </div>
  );
};

export default Products;
