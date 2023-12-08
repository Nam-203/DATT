import { discountPrice } from "../../util";

export const CartItem = ({ product, onUpdate }) => {
  const { name, option, color, discount, product_image, quantity } = product;
  return (
    <div className="cart-items">
      <div className="item">
        <div
          className="img"
          style={{ display: "grid", alignContent: "center" }}
        >
          <img src={product_image[0]?.location} alt={name} />
          <p className="title">{name}</p>
          <p
            className="price"
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <strong>
              {discountPrice(option[0].price * quantity, discount)}
            </strong>
            <strike>{discountPrice(option[0].price * quantity)}</strike>
          </p>
          <div className="number">
            <label>Số lượng</label>
            <div className="control">
              <input
                style={{ width: "50px" }}
                type="number"
                onChange={(e) => {
                  const quantity = Number(e.target.value);
                  onUpdate({ ...product, quantity });
                }}
                defaultValue={product.quantity}
              />
            </div>
          </div>
        </div>
        <div className="info">
          <div className="promote">
            <div className="offer-items" id="of_OPPA95B"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
