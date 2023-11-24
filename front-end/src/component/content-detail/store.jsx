import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";

export const Store = () => {
  return (
    <section className="store">
      <div className="store-shop">
        <h4 className="store-shop-heading">Địa chỉ cửa hàng</h4>
        <ul className="store-shop-list">
          <li className="store-shop-item">
            <p className="store-shop-item-text">147 Nguyễn Thị Thập</p>
            <Link to="#" className="store-shop-item-action">
              Bản đồ đường đi
            </Link>
          </li>
          <li className="store-shop-item">
            <p className="store-shop-item-text">147 Nguyễn Thị Thập</p>
            <Link to="#" className="store-shop-item-action">
              Bản đồ đường đi
            </Link>
          </li>
          <li className="store-shop-item">
            <p className="store-shop-item-text">147 Nguyễn Thị Thập</p>
            <Link to="#" className="store-shop-item-action">
              Bản đồ đường đi
            </Link>
          </li>
          <li className="store-shop-item">
            <p className="store-shop-item-text">147 Nguyễn Thị Thập</p>
            <Link to="#" className="store-shop-item-action">
              Bản đồ đường đi
            </Link>
          </li>
        </ul>
      </div>
      <div className="store-product-info">
        <p className="product-info-title">Thông tin máy</p>
        <ul className="product-info-content">
          <li className="product-info-item">
            <span>
              <FontAwesomeIcon icon={faMobileScreenButton} />
            </span>
            <span>Mới, đầy đủ phụ kiện từ nhà sản xuất</span>
          </li>
          <li className="product-info-item">
            <span>
              <FontAwesomeIcon icon={faBoxOpen} />
            </span>
            <span>Máy, Sách hướng dẫn, Cây lấy sim, Cáp Type C</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
