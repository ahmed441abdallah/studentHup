import React from "react";
import Link from "next/link";

const Post = ({ post }) => {
  return (
    <Link className="p-4 " href={`/blog/${post.id}`}>
      <img
        src={post?.attributes.image?.data[0]?.attributes?.url}
        className=" w-full rounded-md"
        alt="post-image"
      ></img>
      <h3 className="text-lg font-bold my-2">{post.attributes.title}</h3>
      <p className="text-sm mb-2 leading-5 tracking-wide">
        {post?.attributes?.description}
      </p>
      <span className="text-gray-600">{post.attributes.date}</span>
    </Link>
  );
};

export default Post;
