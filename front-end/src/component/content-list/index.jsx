import qs from "qs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { query } from "../../access";
import { Card } from "../common/card";
import "./content-list.scss";
import { Cart, Spinner } from "./styled";

export const ContentList = (props) => {
  const [contentListData, setContentListData] = useState([]);
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const id = slug.split("-").slice(-1)[0];
    let isCancelling = false;
    setLoading(true);
    (async () => {
      try {
        const { data } = await query().product.getFilter(
          qs.stringify({ category: id, ...filter })
        );
        if (!isCancelling) {
          setContentListData(data);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      isCancelling = true;
    };
  }, [slug, filter]);
  console.log(loading, "loading");

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Cart>
          {contentListData?.map((entity) => (
            <Card key={entity._id} data={entity} loading={loading} />
          ))}
          {contentListData.length === 0 && (
            <p className="error-message">Chưa có sản phẩm</p>
          )}
        </Cart>
      )}
    </div>
  );
};
