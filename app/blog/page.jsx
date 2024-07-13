"use client";
import React from "react";
import postsApi from "../_utils/postsApi";
import { useEffect, useState } from "react";
import Post from "./Post";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const getAllPosts_ = () => {
    postsApi.getAllPosts().then((res) => setPosts(res.data.data));
  };
  useEffect(() => {
    getAllPosts_();
  }, []);
  console.log("posts", posts);
  return (
    <div className=" container mx-auto mt-2 p-2">
      <div className=" mt-6">
        <div className=" flex flex-col items-center px-4">
          <h1 className="text-xl sm:text-3xl font-bold">
            Read our latest blogs
          </h1>
          <p className="w-3/4 sm:w-2/4 text-center mt-4 text-sm tracking-wide	 leading-5">
            Provides valuable guidelines for structuring software applications.
            It promotes well-organized, maintainable, and testable code that can
            adapt to changing technologies and requirements.
          </p>
        </div>

        <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 p-2 gap-16 items-center">
          <div className=" p-8">
            <h2 className=" text-xl text-stone-500 font-bold mb-4">
              Trending Post
            </h2>
            <h3 className=" text-xl sm:text-3xl font-bold mb-4">
              New invoicing features to help you get paid faster
            </h3>
            <p className=" text-sm mb-4 leading-5 tracking-wide	">
              Over the past few months, we’ve added several new features to SaaS
              Invoicing to help any business get paid faster and streamline
              their collection workflows.
            </p>
            <span className=" text-gray-500">
              Luke Matthews l November 8, 2023
            </span>
          </div>
          <div className=" p-8 hidden sm:block ">
            <img
              src="https://media.istockphoto.com/id/1249211552/photo/lets-test-this-algorithm.jpg?s=612x612&w=0&k=20&c=08XnNsNpQ2rm3AzfqmQAQYKoDdubZ0u0i2v-MErUG1I="
              className=" w-full rounded-md"
            ></img>
          </div>
        </div>
      </div>
      <div className=" mt-6 ">
        <h1 className="text-xl sm:text-3xl font-bold text-center">All Posts</h1>
        <div className=" grid grid-cols-1 sm:grid-cols-3 gap-8 mt-4">
          {posts.map((post) => (
            <Post post={post} key={post.id}></Post>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
