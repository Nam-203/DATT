import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { getUserDecode } from "../../redux/authSlice";
import { cartAction } from "../../redux/cartSlice";
import { discountPrice, formatCurrency } from "../../util";
export const Card = (props) => {
  const { data } = props;
  const { slug, _id, product_image, name, option, discount, price } = data;
  const history = useHistory();
  const cardUrl = `/product/${_id}`;
  const userInfo = useSelector(getUserDecode);
  const dispatch = useDispatch();
  const handleAddToCard = () => {
    if (userInfo === null) {
      history.push("/login");
      return null;
    }
    dispatch(cartAction.addCart(data));
    swal("Thêm vào giỏ hàng thành công");
  };
  const handleBuynowClick = () => {
    if (userInfo === null) return null;
    dispatch(cartAction.addCart(data));
  };
  return (
    <div className="card">
      {data && (
        <>
          {discount !== 0 && (
            <span className="card-label">Giảm {discount}%</span>
          )}
          <div className="card-heading">
            <Link to={cardUrl} className="card-heading-link">
              <img
                src={product_image[0].location}
                alt={name}
                className="card-heading-image"
              />
            </Link>
          </div>
          <div className="card-content">
            <h5 className="card-content-heading">
              <Link to={cardUrl} className="card-content-heading-link">
                {name}
              </Link>
            </h5>
            <div className="card-content-price-box">
              <span className="card-content-price price-left">
                {price ? discountPrice(price) : 0}
                {/* {option ? discountPrice(option[0].price, discount) : 0} */}
              </span>
              <span className="card-content-price price-right">
                {price && discount !== 0 && discountPrice(price, discount)}
              </span>
            </div>
            <div className="card-content-action-box">
              <Link
                className="btn card-content-action-buy"
                style={{
                  display: "block",
                  textAlign: "center",
                  lineHeight: "30px",
                  backgroundColor: "#fafafa",
                }}
                to={cardUrl}
              >
                Chi tiết
              </Link>
              <button className="btn heading-action-buy">
                <Link
                  to={userInfo === null ? "/login" : "/cart"}
                  onClick={handleBuynowClick}
                >
                  <span>Mua ngay</span>
                </Link>
              </button>
              <button
                onClick={handleAddToCard}
                type="button"
                className="btn card-content-action-add"
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
