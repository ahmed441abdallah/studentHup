"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import booksApis from "../../_utils/booksApis";
import { useState } from "react";
import Link from "next/link";

const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState({});
  const params = useParams();
  const getBookDetails = () => {
    booksApis
      .getBookById(params.book_id)
      .then((res) => setBookDetails(res.data.data));
  };
  useEffect(() => {
    getBookDetails();
  }, [params.book_id]);
  return (
    <div className=" container mx-auto mt-2">
      <nav aria-label="Breadcrumb" className=" my-12 mx-10">
        <ol className="flex items-center gap-1 text-sm text-gray-600">
          <li>
            <a href="#" className="block transition hover:text-gray-700">
              <span className="sr-only"> Home </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </a>
          </li>

          <li className="rtl:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>

          <li>
            <a href="#" className="block transition hover:text-gray-700">
              Books
            </a>
          </li>

          <li className="rtl:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li>
            <a href="#" className="block transition hover:text-gray-700">
              {params.book_id}
            </a>
          </li>
        </ol>
      </nav>
      <section className="flex flex-col gap-4 sm:flex-row items-center sm:gap-24 px-4 ">
        <img
          src={bookDetails?.attributes?.cover?.data?.[0]?.attributes?.url}
          alt="banner"
          width={250}
        ></img>
        <div className="flow-root">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Title</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {bookDetails?.attributes?.title}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Author Name</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {bookDetails?.attributes?.authorName}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Category</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {" "}
                {bookDetails?.attributes?.category}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Price</dt>
              <dd className="text-gray-700 sm:col-span-2">
                $ {bookDetails?.attributes?.price}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Overview</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {bookDetails?.attributes?.description}
              </dd>
            </div>
          </dl>
          <a
            href={bookDetails?.attributes?.amazonUrl}
            target="_blank"
            className=" mt-4 cursor-pointer inline-block bg-slate-500 px-8 py-2 rounded-md"
          >
            Link
          </a>
        </div>
      </section>
      <hr></hr>
    </div>
  );
};

export default BookDetails;
