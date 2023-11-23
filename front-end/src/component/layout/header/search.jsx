import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SearchItem } from "./search-item";
import axios from "axios";
import { axiosClient } from "../../../access/api/axios-client";

export const Search = () => {
  const [filterData, setFilterData] = useState([]);
  const [message, setMessage] = useState(undefined);
  const [filterMessage, setFilterMessage] = useState("");
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const handleOuterClick = ({ target }) => {
      if (target.className !== "header-search-data") {
        setMessage(undefined);
        setFilterMessage("");
        setFilterData([]);
      }
    };
    if (filterData.length > 0 || message) {
      window.addEventListener("click", handleOuterClick);
    }
    return () => {
      window.removeEventListener("click", handleOuterClick);
    };
  }, [filterData, message]);

  const onSearchFormSubmit = async (data) => {
    const productQuery = data.search;
    if (!productQuery) {
      setFilterData([]);
      setMessage(undefined);
      return;
    }
    const { data: filter } = await axiosClient.get(
      "/product/search/" + productQuery
    );
    if (filter.length > 0) {
      setFilterData(filter);
      setFilterMessage(productQuery);
      setMessage(undefined);
    } else {
      setFilterData([]);
      setMessage("Not found");
      setFilterMessage("");
    }
  };

  const handleCloseModal = () => {
    setMessage(undefined);
    setFilterMessage("");
    setFilterData([]);
  };
  return (
    <section className="header-search-wrap">
      <div className="header-search">
        <form
          onChange={handleSubmit(onSearchFormSubmit)}
          onSubmit={handleSubmit(onSearchFormSubmit)}
          className="header-search-form"
        >
          <input
            {...register("search")}
            placeholder="Hôm nay bạn cần tìm gì?"
            className="form-input header-search-input"
          />
          <button
            title="search button"
            type="submit"
            className="btn header-search-btn"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
        {(filterData.length > 0 || message) && (
          <section className="header-search-data">
            {filterData.map((item, index) => (
              <SearchItem
                key={index}
                data={item}
                closeModal={handleCloseModal}
              />
            ))}
            {filterData.length > 0 && (
              <Link
                to={`/search/${filterMessage}`}
                className="header-search-filter-message"
              >
                Hiển thị kết quả cho {<span>{filterMessage}</span>}
              </Link>
            )}
            {message && <span>{message}</span>}
          </section>
        )}
      </div>
    </section>
  );
};
