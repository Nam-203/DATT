import { Link } from "react-router-dom";
import { selectCart } from "../../redux/cartSlice";
import "./cart.scss";
import { CartItem } from "./cartItem";
import { Info } from "./info";
import { Total } from "./total";
import { useSelector } from "react-redux";
import EmptyCart from "./empty-cart";

export const Cart = () => {
  const cart = useSelector(selectCart);

  return (
    <section>
      <div className="container">
        {cart.length <= 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart">
            <div className="header">
              <div className="back">
                <Link to="/">
                  <i className="icon-leftar" />
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                    width="24px"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="cart-layout">
              <div className="cart-info" id="cartInfo">
                <div className="cart-icon">
                  <label>Giỏ hàng</label>
                </div>
                {cart?.map((value, index) => {
                  return <CartItem key={index} product={value} />;
                })}
                <Total />
              </div>
              <div className="cart-form">
                <Info />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
