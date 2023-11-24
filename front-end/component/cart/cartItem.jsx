import { discountPrice } from "../../util";
import { useDispatch } from "react-redux";
import { cartAction } from "../../redux/cartSlice";

export const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const { name, option, color, discount, product_image, quantity } = product;
  return (
    <div className="cart-items">
      <div className="item ">
        <div
          className="img"
          style={{
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img src={product_image[0]?.location} alt={name} />
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <p className="title">{name}</p>
            <p
              className="price"
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <strong>
                {discountPrice(option[0].price * quantity, discount)}
              </strong>
              <strike>
                {discount !== 0 && discountPrice(option[0].price * quantity)}
              </strike>
            </p>
          </div>
          <div className="number">
            <label>Số lượng</label>
            <div className="control">
              <button onClick={() => dispatch(cartAction.subQuantity(product))}>
                -
              </button>
              <span
                style={{
                  display: "inline-block",
                  border: "1px solid gray",
                  padding: "0 4px",
                }}
              >
                {product.quantity}
              </span>
              <button onClick={() => dispatch(cartAction.addQuantity(product))}>
                +
              </button>
            </div>
          </div>
        </div>
        <div className="info">
          <div className="edit">
            <a onClick={() => dispatch(cartAction.deleteCart(product))}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </a>
          </div>
          <div className="promote">
            <div className="offer-items" id="of_OPPA95B"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
