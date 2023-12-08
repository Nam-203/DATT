import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

export const ProductSlider = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const { images } = props;

  return (
    <section className='product-slider'>
      <div className='slider-wrap'>
        <div className='slider'>
          <Swiper
            loop={true}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{ delay: 3000 }}
            className='slider-container-top'
          >
            {images?.map((image, index) => (
              <SwiperSlide key={index} className='slider-top-box'>
                <img src={image.location} alt={index} className='slider-top-image' />
              </SwiperSlide>
            ))}
            <button
              ref={navigationPrevRef}
              type='button'
              className='btn slider-btn btn-prev'
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              ref={navigationNextRef}
              type='button'
              className='btn slider-btn btn-next'
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            spaceBetween={10}
            className='slider-container-bottom'
          >
            {images?.map((image, index) => (
              <SwiperSlide key={index} className='slider-bottom-box'>
                {({ isActive }) => (
                  <img
                    src={image.location}
                    alt={index}
                    className={`slider-bottom-image ${
                      isActive ? 'slider-active' : ''
                    }`}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
