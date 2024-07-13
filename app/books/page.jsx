"use client"; // error Swiper
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import booksApi from "../_utils/booksApis";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import Link from "next/link";

const Page = () => {
  const [bookList, setBookList] = useState([]);
  const getAllBooks = () => {
    booksApi.getBooks().then((res) => {
      setBookList(res.data.data);
    });
  };
  useEffect(() => {
    getAllBooks();
  }, []);
  console.log(bookList);
  return (
    <div className="container w-full py-4 px-4 mx-auto">
      <section className="author rounded-lg p-6 shadow-lg">
        <h1 className="text-sm font-bold mb-2">Top Author</h1>
        <Swiper
          navigation
          slidesPerView={2}
          spaceBetween={10}
          pagination={{ type: "fraction" }}
          modules={[Navigation, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 50,
            },
          }}
          className=" h-40"
        >
          {bookList.map((el, indx) => (
            <SwiperSlide>
              <div className="flex">
                <div className="avatar-box bg-gray-100 w-32 py-4 rounded-md flex justify-center flex-col items-center">
                  <img
                    src={el?.attributes?.authorAvatar?.data[0]?.attributes?.url}
                    alt=" Avatar"
                    className="w-14 h-14 rounded-full object-cover grayscale"
                  />
                  <p className="text-sm mt-2">{el?.attributes?.authorName}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <div className=" mt-6">
        <h1 className="text-sm font-bold mb-12">Recommend For You</h1>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {bookList.map((el) => (
            <Link
              href={`books/${el.id}`}
              className="block  shadow-md p-4"
              key={el.id}
            >
              <img
                alt="books-cover"
                src={el?.attributes?.cover?.data[0]?.attributes?.url}
                className="h-64 w-full object-cover sm:h-62 lg:h-64 rounded-sm"
              />

              <h3 className="mt-4 text-sm font-bold text-gray-900 ">
                {el?.attributes?.title}
              </h3>

              <p className="mt-2 max-w-sm text-gray-700">
                Author : {el?.attributes?.authorName}
              </p>
              <p className="mt-2 max-w-sm text-sm text-gray-700">
                Category:{el?.attributes?.category}
              </p>
              <div className=" flex justify-between items-center mt-2">
                <span className=" font-bold text-red-700">
                  $ {el?.attributes?.price}
                </span>
                <div className="flex text-yellow-500">
                  <IoStar></IoStar>
                  <IoStar></IoStar>
                  <IoStar></IoStar>
                  <IoStar></IoStar>
                  <IoStar></IoStar>
                  <IoStarHalf></IoStarHalf>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
