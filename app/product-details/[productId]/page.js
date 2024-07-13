"use client";
import { useEffect, useState } from "react";
import ProductBanner from "./ProductBanner";
import ProductInfo from "./ProductInfo";
import CommonProduct from "./CommonProduct";
import { usePathname } from "next/navigation";
import productApis from "../../_utils/productApis";
import Breadcrumb from "../../_component/Breadcrumb";

function ProductDetails({ params }) {
  const path = usePathname();
  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    getProductById_();
  }, [params?.productId]);
  const getProductById_ = () => {
    productApis.getProductById(params?.productId).then((res) => {
      setProductDetails(res?.data?.data);
      getProductsByCategory_(res?.data?.data);
    });
  };

  const getProductsByCategory_ = (product) => {
    productApis
      .getProductsByCategory(product?.attributes?.category)
      .then((res) => {
        setSimilarProducts(res?.data.data);
      }); // need category name
  };
  return (
    <div className="container px-10 py-8 md:py-20 md:px-16">
      <Breadcrumb path={path}></Breadcrumb>
      <div className=" grid grid-cols-1 sm:grid-cols-2 my-4  gap-6 ">
        <ProductBanner product={productDetails}></ProductBanner>
        <ProductInfo product={productDetails}></ProductInfo>
      </div>
      <hr></hr>
      <CommonProduct similarProducts={similarProducts} />
    </div>
  );
}

export default ProductDetails;
