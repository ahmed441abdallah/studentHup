import React from "react";
import { useContext } from "react";
import { cartContext } from "../_context/cartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import cartApis from "../_utils/cartApis";
const Cart = ({ toggleCart }) => {
  const { cart, setCart } = useContext(cartContext);
  const router = useRouter();
  const getTotalPrice = () => {
    let totalAmount = 0;
    cart.forEach((el) => {
      totalAmount += el?.product?.attributes?.price;
    });
    return totalAmount;
  };
  const deleteFromCart = (id) => {
    cartApis
      .deleteCartItem(id)
      .then((res) => {
        if (res)
          setCart((oldCart) =>
            oldCart.filter((item) => item.id !== res?.data?.data?.id)
          );
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className=" bg-gray-100 w-[300px] overflow-y-auto  h-[350px] sm:w-[370px] absolute right-10 top-20 z-10 shadow-md border border-gray-600 p-6 ">
      <h1 className="text-center"> Cart Content 📍</h1>
      <button
        onClick={toggleCart}
        className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
      >
        <span className="sr-only">Close cart</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      {cart.map((product) => (
        <div className="mt-4 space-y-6" key={product.id}>
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <img
                src={product.product.attributes.banner.data.attributes.url}
                alt="product-img"
                className="size-16 rounded  object-cover"
              />

              <div>
                <h3 className="text-sm text-gray-900">
                  {product.product.attributes.title}
                </h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Price:</dt>
                    <dd className="inline">
                      {product.product.attributes.price}
                    </dd>
                  </div>

                  <div>
                    <dt className="inline">Category:</dt>
                    <dd className="inline">
                      {product.product.attributes.category}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-1 items-center justify-end gap-2">
                <form>
                  <label htmlFor="Line1Qty" className="sr-only">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    value="1"
                    id="Line1Qty"
                    className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </form>

                <button
                  className="text-gray-600 transition hover:text-red-600"
                  onClick={() => deleteFromCart(product.id)}
                >
                  <span className="sr-only">Remove item</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
      ))}

      <div className="space-y-4 text-center mt-4">
        <Link
          href="/cart"
          className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
        >
          View my cart 🛍️ ({cart.length} )
        </Link>

        <button
          onClick={() => router.push(`/checkout?amount=${getTotalPrice()}`)}
          href="/checkout"
          className="block w-full rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
        >
          Checkout 💸
        </button>

        <Link
          href="/"
          className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
        >
          Continue shopping 🛒
        </Link>
      </div>
    </div>
  );
};

export default Cart;
