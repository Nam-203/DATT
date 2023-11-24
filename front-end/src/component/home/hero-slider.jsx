import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';

export const HeroSlider = ({ sliders }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <section className='hero-slider-global-wrap'>
      <div className='container hero-slider-wrap'>
        <div className='hero-slider'>
          <Swiper
            loop={true}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{ delay: 5000 }}
            className='hero-slider-top'
          >
            {sliders?.map(({ image, text }, index) => (
              <SwiperSlide key={index} className='hero-slider-item'>
                <Link to={'/'} className='hero-slider-link'>
                  <img src={image} alt={text} className='hero-slider-image' />
                </Link>
              </SwiperSlide>
            ))}
            <button
              type='button'
              className='btn slider-btn left'
              ref={navigationPrevRef}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type='button'
              className='btn slider-btn right'
              ref={navigationNextRef}
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
            className='hero-slider-bottom'
          >
            {sliders?.map(({ text }, index) => (
              <SwiperSlide key={index} className='hero-slider-item-content'>
                {({ isActive }) => (
                  <Link
                    to={'/'}
                    className={`hero-slider-link ${
                      isActive ? 'link-active' : ''
                    }`}
                  >
                    <h5 className='hero-slider-text'>{text}</h5>
                  </Link>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
