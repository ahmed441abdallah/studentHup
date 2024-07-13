import React from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ProductBanner = ({ product }) => {
  return (
    <>
      {product?.attributes?.banner?.data?.attributes.url ? (
        <Image
          src={product?.attributes?.banner?.data?.attributes.url}
          alt="product-banner"
          width={500}
          height={400}
          className="rounded-lg "
        ></Image>
      ) : (
        <Skeleton width={500} height={300} className="rounded-lg" />
      )}
    </>
  );
};

export default ProductBanner;
