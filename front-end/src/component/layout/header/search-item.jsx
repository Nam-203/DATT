import { Link } from "react-router-dom";
import { formatCurrency } from "../../../util";

export const SearchItem = ({
  data: { product_image, name, option, _id, price },
  closeModal,
}) => {
  return (
    <div className="header-search-item">
      <div className="search-item-media">
        <Link
          to={`/product/${_id}`}
          onClick={() => {
            closeModal();
          }}
        >
          <img
            src={product_image[0].location}
            alt={name}
            className="search-item-image"
          />
        </Link>
      </div>
      <div className="search-item-content">
        <h4 className="search-item-name">
          <Link
            to={`/product/${_id}`}
            onClick={() => {
              closeModal();
            }}
          >
            {name}
          </Link>
        </h4>
        <p className="search-item-text">{formatCurrency(price)}</p>
      </div>
    </div>
  );
};
