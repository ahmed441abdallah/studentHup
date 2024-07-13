"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { CiShoppingCart } from "react-icons/ci";
import { cartContext } from "../_context/cartContext";
import cartApis from "../_utils/cartApis";
import Cart from "./Cart";

const Header = () => {
  const { cart, setCart } = useContext(cartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const toggleCart = () => {
    setCartIsOpen((prev) => !prev);
  };
  const { user } = useUser();
  useEffect(() => {
    setIsLoggedIn(window.location.href.toString().includes("sign-in"));
  }, []);
  const getCartUserItems_ = () => {
    cartApis
      .getUserCartItems(user.primaryEmailAddress.emailAddress)
      .then((res) => {
        console.log("data of carts", res?.data?.data);

        const newCartItems = res?.data?.data.map((item) => ({
          id: item.id,
          product: item?.attributes?.products?.data[0],
        }));
        setCart((prevCart) => [...prevCart, ...newCartItems]);
      });
  };
  useEffect(() => {
    user && getCartUserItems_();
  }, [user]);
  return (
    !isLoggedIn && (
      <header className="bg-white shadow-md">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex-1 md:flex md:items-center md:gap-12">
              <Image src="/logo.svg" width={50} height={50} alt="logo"></Image>
            </Link>
            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/blog"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/books"
                    >
                      Books
                    </Link>
                  </li>
                </ul>
              </nav>
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex sm:gap-4">
                    <span className="text-gray-500 cursor-pointer flex items-center transition hover:text-gray-500/75">
                      <CiShoppingCart
                        onClick={toggleCart}
                        className=" text-2xl font-bold"
                      ></CiShoppingCart>
                      <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm ">
                        {cart.length}
                      </span>
                    </span>
                    {cartIsOpen && <Cart toggleCart={toggleCart}></Cart>}
                    <UserButton afterSignOutUrl="/"></UserButton>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="sm:flex sm:gap-4">
                    <Link
                      className="rounded-md bg-[#35374B] px-5 py-2.5 text-sm font-medium text-white shadow"
                      href="/sign-in"
                    >
                      Login
                    </Link>

                    <div className="hidden sm:flex">
                      <Link
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black"
                        href="sign-up"
                      >
                        Register
                      </Link>
                    </div>
                  </div>

                  <div className="block md:hidden">
                    <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
