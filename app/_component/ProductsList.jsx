import React from "react";
import ProductItem from "./ProductItem";
const ProductsList = ({ products }) => {
  return (
    <div className=" grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
      {products.map((product) => (
        <ProductItem product={product} key={product.id}></ProductItem>
      ))}
    </div>
  );
};

export default ProductsList;
