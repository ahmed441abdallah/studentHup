// import Features from "./_component/Features";
// import Hero from "./_component/Hero";
// import Products from "./_component/Products";
import Subscribe from "./_component/Subscribe ";
// import Testimonials from "./_component/Testimonials";
import { lazy } from "react";
const Hero = lazy(() => import("./_component/Hero"));
const Products = lazy(() => import("./_component/Products"));
const Features = lazy(() => import("./_component/Features"));
const Testimonials = lazy(() => import("./_component/Testimonials"));
export default function Home() {
  return (
    <div>
      <Hero />
      <Products />
      <Testimonials />
      <Features />
      <Subscribe />
    </div>
  );
}
