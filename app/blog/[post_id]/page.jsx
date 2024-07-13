"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import postsApi from "../../_utils/postsApi";

const PostDetails = () => {
  const params = useParams();
  const [postDetails, setPostDetails] = useState({});
  const getPost = () => {
    postsApi
      .getPostById(params.post_id)
      .then((res) => setPostDetails(res.data.data));
  };

  useEffect(() => {
    getPost();
  }, [params.post_id]);
  return (
    <div className=" container mx-auto mt-8 p-4">
      <div className="text-center flex flex-col items-center">
        <h1 className=" text-xl sm:text-2xl font-bold">
          {postDetails?.attributes?.title}
        </h1>
        <p className=" text-gray-400 mt-2"> {postDetails?.attributes?.date}</p>
        <img
          src={postDetails?.attributes?.image?.data[0]?.attributes?.url}
          className="  rounded-md mt-4"
        ></img>
      </div>
      <div className="  mt-12 ">
        <h1 className="text-xl sm:text-2xl text-slate-900 font-bold">
          Blog Content
        </h1>
        <h3 className=" mt-4 text-2xl font-semibold"> Introduction</h3>
        <p className=" text-sm w-full leading-6 sm:w-2/3">
          {postDetails?.attributes?.description}
        </p>
        <h3 className=" mt-4 text-xl  font-semibold"> Headline</h3>

        <p className="w-full  sm:w-2/3 text-sm leading-6">
          {postDetails?.attributes?.headline}
        </p>
        <h3 className=" mt-4 text-xl  font-semibold"> Summary</h3>
        <p className=" w-full sm:w-2/3 text-sm leading-6 mb-2">
          {postDetails?.attributes?.subheadline}
        </p>
        <hr></hr>
      </div>
    </div>
  );
};

export default PostDetails;
