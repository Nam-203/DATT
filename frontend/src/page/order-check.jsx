import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify/dist";
import styled from "styled-components";
import { query } from "../access";
import { axiosClient } from "../access/api/axios-client"; // Thêm import cho axios
import { Footer, Header } from "../component";
import { Spinner } from "../component/content-list/styled";
import { Navbar } from "../component/layout/header/navbar";
import { getUserDecode } from "../redux/authSlice";
import { cartAction } from "../redux/cartSlice";
import { Categori, Wrapper } from "../styles/styled";

const HeaderOdercheck = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
  }
  .left-header {
    display: flex;
    gap: 20px;
  }
  .left-1 {
    display: flex;
    background-color: red;
    border-top-left-radius: 15px;
    width: 100px;
    color: white;
    align-items: center;
    justify-content: center;
    font-weight: 800;
  }
  .left-2 {
    display: flex;
    background-color: red;
    width: 50px;
    border-top-right-radius: 15px;
    color: white;
    align-items: center;
    justify-content: center;
    font-weight: 800;
  }
`;
const ContentOdercheck = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .content-left {
    display: flex;
    gap: 20px;
  }
`;
const FooterOrdercheck = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 40px;
`;
const OrderCheckPage = () => {
  const [orderList, setOrderList] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(
    () =>
      query()
        .store.getAll()
        .then(({ data }) => {
          setOrderList(data);
          setLoading(false);
        }),
    []
  );
  const deleteOrder = (orderId) => {
    axiosClient

      .delete(`/order/delete/${orderId}`)
      .then(() => {
        query()
          .store.getAll()
          .then(({ data }) => {
            setOrderList(data);
            toast.success("Đơn hàng đã được huỷ thành công!");
          });
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  const history = useHistory();

  return (
    <>
      <Header />
      <Categori>
        <Navbar />
        <Wrapper>
          {loading ? (
            <Spinner />
          ) : (
            <main
              className="main-global-wrap"
              style={{ display: "grid", gap: "10px" }}
            >
              {orderList?.map((order) => (
                <div>
                  <Wrapper>
                    <HeaderOdercheck>
                      <div className="header">
                        <div className="left-header">
                          <div className="left-1">
                            <p>Yêu Thích</p>
                          </div>
                          <a
                            href="https://www.facebook.com/messages/t/110242042167552"
                            className="left-2"
                            target="blank"
                            rel="noopener"
                          >
                            Chat
                          </a>
                        </div>
                        <div style={{ fontWeight: "bold" }}>{order.status}</div>
                      </div>
                    </HeaderOdercheck>
                    <hr style={{ marginBottom: "20px" }} />
                    {order?.cart?.map((item) => (
                      <ContentOdercheck>
                        <div className="content-left">
                          <img
                            src={item?.banner_image?.location}
                            alt=""
                            width="100px"
                          />
                          <div className="content-left-r">
                            <Link
                              to={`/product/${item?._id}`}
                              style={{ fontWeight: "bold" }}
                            >
                              {item?.name}
                            </Link>
                            <p>Số lượng: {item?.quantity}</p>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                          }}
                        >
                          {item?.flash_sale && (
                            <strike style={{ color: "black" }}>
                              {item?.option[0]?.price.toLocaleString()} VNĐ
                            </strike>
                          )}

                          <div style={{ color: "red" }}>
                            {(
                              item?.option[0]?.price -
                              (item?.option[0]?.price / 100) * item?.discount
                            ).toLocaleString()}{" "}
                            VNĐ
                          </div>
                        </div>
                      </ContentOdercheck>
                    ))}

                    <hr style={{ marginTop: "20px" }} />
                    <FooterOrdercheck>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "end",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            justifyContent: "end",
                            alignItems: "center",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            width="24px"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                            />
                          </svg>
                          <p style={{ width: "150px" }}>Thành tiền:</p>
                        </div>

                        <p style={{ color: "red" }}>
                          {order?.priceTotal?.toLocaleString()} VNĐ
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          justifyContent: "end",
                        }}
                      >
                        {order?.status === "Đang xác nhận" && (
                          <>
                            <Button
                              onClick={() => deleteOrder(order._id)}
                              variant="outlined"
                              color="error"
                              size="large"
                            >
                              Huỷ Đơn
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                history.push(`/update-order/${order._id}`);
                              }}
                              color="error"
                              size="large"
                            >
                              Chỉnh Sửa Đơn Hàng
                            </Button>
                          </>
                        )}
                        <a
                          href="https://www.facebook.com/messages/t/110242042167552"
                          target="blank"
                        >
                          <Button
                            variant="outlined"
                            color="inherit"
                            size="large"
                          >
                            Liên hệ cửa hàng
                          </Button>
                        </a>
                      </div>
                    </FooterOrdercheck>
                  </Wrapper>
                </div>
              ))}
            </main>
          )}
        </Wrapper>
      </Categori>
      <Footer />
    </>
  );
};

export default OrderCheckPage;
