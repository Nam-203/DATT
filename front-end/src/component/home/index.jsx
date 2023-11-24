import axios from "axios";
import { useEffect, useState } from "react";
import { BoxProduct } from "../common/box-product";
import { FlashSale } from "./flash-sale";
import { HeroSlider } from "./hero-slider";
import { query } from "../../access";
import { CATEGORIES } from "../../constant";
import "./home.scss";
import qs from "qs";

const Mock_Slider = [
  {
    image:
      "https://cdn.hoanghamobile.com/i/home/Uploads/2021/11/04/s21-moi-01.jpg",
    text: "S21 Series Giảm siêu sốc",
  },
  {
    image:
      "https://cdn.hoanghamobile.com/i/home/Uploads/2021/11/08/web-01-1.jpg",
    text: "ZFold3 |Flip3 5G - Ưu đãi giảm tới 11.700.000đ",
  },
  {
    image:
      "https://cdn.hoanghamobile.com/i/home/Uploads/2021/10/25/iphone-13-series-pre-111.jpg",
    text: "iPhone 13 Series - Giá sốc",
  },
  {
    image:
      "https://cdn.hoanghamobile.com/i/home/Uploads/2021/11/10/lenovo-m10-02-1.jpg",
    text: "Sản phẩm mới Lenovo M10 | M10 Gen 2",
  },
  {
    image:
      "https://cdn.hoanghamobile.com/i/home/Uploads/2021/11/11/web-xiaomi.jpg",
    text: "Xiaomi 11 Lite 5G NE (Swarovski)",
  },
];

export const Home = () => {
  const [phone, setPhone] = useState([]);
  const [tablet, setTablet] = useState([]);
  const [laptop, setLaptop] = useState([]);
  const [sliders] = useState([...Mock_Slider]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await query().category.getAll();
        const { data } = response;
        setData(data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    let isCancelling = false;
    query()
      .product.getFilter(qs.stringify({ category: CATEGORIES[0][1] }))
      .then((res) => {
        const myPhone = res.data;
        if (isCancelling === false) {
          setPhone(myPhone);
          setLoading(false);
        }
      })
      .catch((err) => {});
    return () => {
      isCancelling = true;
    };
  }, []);

  useEffect(() => {
    let isCancelling = false;
    query()
      .product.getFilter(qs.stringify({ category: CATEGORIES[1][1] }))
      .then((res) => {
        const myPhone = res.data;
        if (isCancelling === false) {
          setTablet(myPhone);
        }
      })
      .catch((err) => {});
    return () => {
      isCancelling = true;
    };
  }, []);

  useEffect(() => {
    let isCancelling = false;
    query()
      .product.getFilter(qs.stringify({ category: CATEGORIES[2][1] }))
      .then((res) => {
        const myLaptop = res.data;
        if (isCancelling === false) {
          setLaptop(myLaptop);
        }
      })
      .catch((err) => {});
    return () => {
      isCancelling = true;
    };
  }, []);

  return (
    <main className="home-global-wrap">
      <HeroSlider sliders={sliders} />
      <FlashSale />
      <BoxProduct
        name="Điện thoại nổi bật nhất"
        products={phone}
        loading={loading}
        numberOfItem={10}
        className="trending"
        to={`category/${data[0]?.slug}-${data[0]?._id}`}
      />

      <BoxProduct
        name="Laptop"
        products={tablet}
        loading={loading}
        numberOfItem={5}
        className="trending"
        to={`category/${data[1]?.slug}-${data[1]?._id}`}
      />
      <BoxProduct
        name="Máy tính bảng"
        products={laptop}
        loading={loading}
        numberOfItem={5}
        className="trending"
        to={`category/${data[3]?.slug}-${data[3]?._id}`}
      />
    </main>
  );
};
