import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import cartApis from "../../_utils/cartApis";
import { cartContext } from "../../_context/cartContext";

const ProductInfo = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(cartContext);
  const handleAddToCart = () => {
    if (user) {
      const data = {
        // from strapi docs
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id],
        },
      };
      cartApis
        .addToCart(data)
        .then((res) => {
          // Ensure res and its properties are available
          console.log(res);
          console.log(res?.data?.data?.id);
          setCart((prev) => [
            ...prev,
            {
              id: res?.data?.data?.id,
              product: product,
            },
          ]);
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <>
      {product.id ? (
        <div className="flow-root">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-2">
              <dt className="font-medium text-gray-900">Title</dt>
              <dd className="text-gray-700 sm:col-span-2 ">
                {product?.attributes?.title}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-2">
              <dt className="font-medium text-gray-900"> Instructor Name</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {product?.attributes?.instructor}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-2">
              <dt className="font-medium text-gray-900">Category</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {product?.attributes?.category}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-2">
              <dt className="font-medium text-gray-900">Price</dt>
              <dd className="text-gray-700 sm:col-span-2">
                $ {product?.attributes?.price}.00
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-2">
              <dt className="font-medium text-gray-900">Description</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {product?.attributes?.description[0]?.children[0]?.text}
              </dd>
            </div>
          </dl>
          <button
            onClick={() => handleAddToCart()}
            className="inline-block rounded mt-4 bg-blue-700 px-6 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
          >
            Add to cart
          </button>
        </div>
      ) : (
        <div>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton height={100}></Skeleton>
          <Skeleton width={150} height={50}></Skeleton>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
