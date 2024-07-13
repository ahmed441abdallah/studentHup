import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className=" container mx-4 my-4 p-4 flex flex-col items-center ">
      <Image
        src="/comfirm.png"
        alt="confirm-img"
        width={180}
        height={180}
      ></Image>
      <h1 className=" text-2xl uppercase font-bold"> Payment Successful ✅</h1>
      <p className=" text-slate-400 mt-4">
        We send email with order details and confirm 📧
      </p>
      <Link
        href="/"
        className=" bg-slate-800 text-white px-4 py-2 rounded-md mt-4 shadow-md"
      >
        {" "}
        Go Home
      </Link>
    </div>
  );
};

export default page;
