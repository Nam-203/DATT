import { Link } from "react-router-dom";
import { Spinner } from "../content-list/styled";
import { Card } from "./card";

export const BoxProduct = (props) => {
  const { name, products, loading, numberOfItem, to = "", className } = props;

  return (
    <section className={"box-wrap " + className}>
      <div className="container box">
        <div className="box-heading">
          <h4 className="box-heading-text">
            <Link to={to}>{name}</Link>
          </h4>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <section className="box-main">
            <div className="row row-cols-4">
              {products &&
                products.length > 0 &&
                products.map((product, index) => {
                  if (index < numberOfItem) {
                    return <Card key={index} data={product} />;
                  }
                  return null;
                })}
              {(products === undefined || products?.length === 0) && (
                <div className="error-wrap">
                  <p className="error-message">Chưa có sản phẩm</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};
