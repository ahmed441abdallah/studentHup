"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_component/Header";
import Footer from "./_component/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { cartContext } from "./_context/cartContext";
import { Suspense, useState } from "react";
import Loader from "./_component/Loader";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
export default function RootLayout({ children }) {
  const [cart, setCart] = useState([]);
  return (
    <ClerkProvider>
      <cartContext.Provider value={{ cart, setCart }}>
        <html lang="en">
          <body className={inter.variable}>
            <Suspense fallback={<Loader></Loader>}>
              <Header></Header>
              {children}
              <Footer></Footer>
            </Suspense>
          </body>
        </html>
      </cartContext.Provider>
    </ClerkProvider>
  );
}
