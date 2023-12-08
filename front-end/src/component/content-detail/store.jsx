import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faMobileScreenButton,
  faCheckToSlot,
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
        <p className="text-4xl product-info-title">Độc quyền Houseware</p>
        <ul className="product-info-content">
          <li className="product-info-item">
            <span>
              <FontAwesomeIcon icon={faCheckToSlot} />
            </span>
            <span>Hàng chính hãng 100%</span>
          </li>
          <li className="product-info-item">
            <span>
              <FontAwesomeIcon icon={faBoxOpen} />
            </span>
            <span>Khách Hàng Được Mua Tối Đa 01 Sản Phẩm</span>
          </li>
        </ul>
        {/* <ol class="custom-counter" style={{ "counter-reset": "section" }}>
          <li>This is the first item</li>
          <li>This is the second item</li>
          <li>This is the third item</li>
          <li>This is the fourth item</li>
          <li>This is the fifth item</li>
          <li>This is the sixth item</li>
        </ol> */}
      </div>
    </section>
  );
};
