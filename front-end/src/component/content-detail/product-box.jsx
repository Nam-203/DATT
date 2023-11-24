import { faCartPlus, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import { discountPrice } from "../../util";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../redux/cartSlice";
import { getUserDecode } from "../../redux/authSlice";
import swal from "sweetalert";

export const ProductBox = (props) => {
  const { product } = props;
  const { option, discount } = product;
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserDecode);
  const history = useHistory();

  const addCart = () => {
    if (userInfo === null) {
      history.push("/login");
      return null;
    }
    dispatch(cartAction.addCart(product));
    swal("Thêm vào giỏ hàng thành công");
  };
  const handleBuynowClick = () => {
    if (userInfo === null) return null;
    dispatch(cartAction.addCart(product));
  };

  return (
    <section className="product-box">
      <div className="heading">
        <div className="heading-price">
          <h5 className="heading-price-new">
            {discountPrice(option[0].price, discount)}
          </h5>
          <h5 className="heading-price-old">
            Giá niêm yết: <strike>{discountPrice(option[0].price)}</strike>
          </h5>
        </div>
        <div className="heading-freeship">
          <p className="heading-freeship-text">
            <FontAwesomeIcon icon={faTruckFast} /> MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC
          </p>
        </div>
        <div className="heading-status">
          <p className="heading-status-text">
            <span>Trạng thái: </span>Còn hàng
          </p>
          <p className="heading-status-amount">
            <span>Số lượng</span> {"200"}
          </p>
        </div>
        <div className="heading-warranty">
          <p className="heading-warranty-text">Thông tin bảo hành</p>
          <p className="heading-warranty-desc">
            Bảo hành {12} tháng chính hãng, 1 đổi 1 và hỗ trợ bảo hành tại nhà.
          </p>
        </div>
        <div className="heading-deal">
          <p className="heading-deal-title">Trả góp</p>
          <p className="heading-deal-text">
            Trả góp 0% lãi suất, hỗ trợ xét duyệt qua điện thoại
          </p>
          <p className="heading-deal-text">
            Trả góp qua thẻ (Visa, Master Card, JCB)
          </p>
        </div>
        <div className="heading-action">
          <button className="btn heading-action-buy">
            <Link
              to={userInfo === null ? "/login" : "/cart"}
              onClick={handleBuynowClick}
            >
              <span>Mua ngay</span>
              <span>Giao hàng tận nhà (COD) hoặc nhận tại cửa hàng</span>
            </Link>
          </button>
          <button className="btn heading-action-add" onClick={() => addCart()}>
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
        </div>
      </div>
    </section>
  );
};
