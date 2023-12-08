import {
  faBolt,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { query } from "../../access";
import { discountPrice, formatCurrency, slugify } from "../../util";
import "swiper/swiper.scss";
import { Spinner } from "../content-list/styled";
import { Pagination } from "swiper";

export const FlashSale = () => {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isCancelling = false;
    (async () => {
      const {
        data: { products },
      } = await query().product.getAll();
      const saleProducts = products.filter(
        (entity) => entity.flash_sale === true
      );
      if (isCancelling === false) {
        setFlashSaleProducts(saleProducts);
        setLoading(false);
      }
    })();
    return () => {
      isCancelling = true;
    };
  }, []);

  return (
    <section className="container flashsale-wrap">
      <div className="flashsale">
        <div className="flashsale-heading">
          <h4 className="flashsale-heading-text">
            F<FontAwesomeIcon icon={faBolt} />
            ASH SALE ONLINE
          </h4>
        </div>
        <div className="flashsale-slider-wrap ">
          <div className="flashsale-slider">
            {loading ? (
              <Spinner />
            ) : (
              <Swiper
                spaceBetween={5}
                slidesPerView={5}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
                modules={[Pagination]}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className="slider-container"
              >
                {flashSaleProducts?.map(
                  (
                    { thumbnail, name, option, discount, _id, price },
                    index
                  ) => (
                    <SwiperSlide key={index} className="slider-card">
                      <div className="slider-card-heading">
                        <Link
                          to={`/product/${_id}`}
                          className="slider-card-link"
                        >
                          <img
                            src={thumbnail.location}
                            alt={slugify(name)}
                            className="slider-card-image"
                          />
                        </Link>
                      </div>
                      <div className="slider-card-content">
                        <h5 className="slider-card-name">
                          <Link
                            to={`/product/${_id}`}
                            className="slider-card-content-link"
                          >
                            {name}
                          </Link>
                        </h5>
                        <div className="slider-card-price-box">
                          <span className="slider-card-price new">
                            {discountPrice(price, discount)}
                          </span>
                          <del className="slider-card-price old">
                            {formatCurrency(price)}
                          </del>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )}
                <button
                  ref={navigationPrevRef}
                  type="button"
                  className="btn slider-navigation left"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  ref={navigationNextRef}
                  type="button"
                  className="btn slider-navigation right"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
