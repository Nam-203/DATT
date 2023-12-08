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
    image: "https://cdn.tgdd.vn/2023/11/campaign/720-220--1--720x220.png",
    text: "S21 Series Giảm siêu sốc",
    url: "/category/quat-656059c9df4687c9d1d20459",
  },
  {
    image: "https://cdn.tgdd.vn/2023/11/campaign/720-220-720x220-9.png",
    text: "Gia dụng hafale",
    url: "/category/may-loc-nuoc-656059f0df4687c9d1d2045e",
  },
  {
    image: "https://cdn.tgdd.vn/2023/11/campaign/720-220-720x220-11.png",
    text: "Tri ân thầy cô",
    url: "/category/may-hut-bui-65605a04df4687c9d1d20462",
  },
  {
    image: "https://cdn.tgdd.vn/2023/11/campaign/720-220-720x220-3.png",
    text: "Máy hút bụi",
    url: "/category/may-loc-khong-khi-65605a5bdf4687c9d1d2046f",
  },
  {
    image: "https://cdn.tgdd.vn/2023/11/campaign/720-220-720x220-4.png",
    text: "Máy lọc không khí",
    url: "category/quat-656059c9df4687c9d1d20459",
  },
];

export const Home = () => {
  const [householdAppliances, setHouseholdAppliances] = useState([]);
  const [familyHealth, setFamilyHealth] = useState([]);
  const [kitchenAppliances, setKitchenAppliances] = useState([]);
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
        const householdAppliances = res.data;
        if (isCancelling === false) {
          setHouseholdAppliances(householdAppliances);
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
        const familyHealth = res.data;
        if (isCancelling === false) {
          setFamilyHealth(familyHealth);
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
        const kitchenAppliances = res.data;
        if (isCancelling === false) {
          setKitchenAppliances(kitchenAppliances);
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
        name="Thiết bị gia đình"
        products={householdAppliances}
        loading={loading}
        numberOfItem={10}
        className="trending"
        to={`category/${data[0]?.slug}-${data[0]?._id}`}
      />

      <BoxProduct
        name="Sức khỏe gia đình"
        products={familyHealth}
        loading={loading}
        numberOfItem={5}
        className="trending"
        to={`category/${data[1]?.slug}-${data[1]?._id}`}
      />
      <BoxProduct
        name="Gia dụng nhà bếp"
        products={kitchenAppliances}
        loading={loading}
        numberOfItem={5}
        className="trending"
        to={`category/${data[3]?.slug}-${data[3]?._id}`}
      />
    </main>
  );
};
