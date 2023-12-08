import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "../../../redux/cartSlice";
import { getUserDecode } from "../../../redux/authSlice";

export const Action = () => {
  const cart = useSelector(selectCart);
  const userInfo = useSelector(getUserDecode);

  return (
    <section className="header-action-wrap">
      <section className="header-action">
        <div className="action-order-check">
          <Link to={`/order-check`} className="action-order-check-link">
            <span className="action-order-check-icon">
              <FontAwesomeIcon icon={faTruck} />
            </span>
            <span className="action-order-check-text">Kiểm tra đơn hàng</span>
          </Link>
        </div>
        <div className="action-cart">
          <Link to="/cart" className="action-cart-link">
            <span className="fa-layers fa-fw fa-2x">
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="fa-layers-counter">{cart.length}</span>
            </span>
          </Link>
        </div>
        <div className="action-login">
          <Link
            to={userInfo !== null ? "/user-info" : "/login"}
            className="action-login-link"
          >
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </section>
    </section>
  );
};
