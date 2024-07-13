import React from "react";
import { IoIosTimer } from "react-icons/io";
import { TbCategory2 } from "react-icons/tb";
import Link from "next/link";
const ProductItem = ({ product }) => {
  return (
    <Link
      href={`/product-details/${product.id}`}
      className="block rounded-lg p-4 shadow-sm hover:shadow-md duration-75 shadow-indigo-100"
    >
      <img
        alt="card-img"
        src={product.attributes.banner.data.attributes.url}
        className="h-56 w-full rounded-md object-cover"
        loading="lazy"
      />

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Title</dt>

            <dd className="font-medium"> {product.attributes.title}</dd>
          </div>
          <div>
            <dt className="sr-only">Price</dt>

            <dd className="text-sm text-gray-500">
              $ {product.attributes.price}.00
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-8 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-5 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Instructor</p>

              <p className="font-medium">{product.attributes.instructor}</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <IoIosTimer className="size-5 text-indigo-700"></IoIosTimer>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Duration</p>

              <p className="font-medium">{product.attributes.duration} Hours</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <TbCategory2 className="size-5 text-indigo-700"></TbCategory2>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Category</p>

              <p className="font-medium"> {product.attributes.category}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
