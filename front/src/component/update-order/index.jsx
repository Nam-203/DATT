import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { query } from "../../access";
import { useHistory } from "react-router-dom";
import { CartItem } from "./cartItem";
import { Button } from "@mui/material";
import { Wrapper } from "../../styles/styled";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify/dist";
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const GridContainerV2 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
    gap: 10px 8px;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  color: #ea3f30;
  display: flex;
  font-size: 14px;
  margin-top: 4px;
`;
const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập họ và tên"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  address: yup.string().required("Vui lòng nhập địa chỉ nhận hàng"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  note: yup.string(),
});
export const UpdateOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const history = useHistory();
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    (async () => {
      try {
        const { data: order } = await query().order.detail(orderId);
        if (order) {
          setOrder(order);
          console.log(order);
        } else {
          history.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const handleCartUpdate = (cartItem) => {
    const cartProducts = order.cart;

    const UpdateCartProducts = cartProducts?.map((product) => {
      if (product._id === cartItem._id) {
        return cartItem;
      }
      return product;
    });
    const priceTotal = UpdateCartProducts.reduce((prev, curr) => {
      const price = curr.quantity * curr.option[0].price;
      return prev + price;
    }, 0);
    setOrder((state) => ({
      ...state,
      cart: UpdateCartProducts,
      priceTotal,
    }));
  };

  const handleUpdateOrder = async () => {
    try {
      await query().order.update(orderId, {
        ...order,
        name: getValues("name"),
        phone: getValues("phone"),
        email: getValues("email"),
        address: getValues("address"),
      });
      toast.success("Cập nhật đơn hàng thành công.");
      history.push("/order-check");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    reset({
      name: order?.name,
      email: order?.email,
      phone: order?.phone,
      address: order?.address,
    });
  }, [order]);
  return (
    <div>
      <GridContainer>
        <div>
          {order?.cart?.map((item) => (
            <GridContainerV2>
              <CartItem product={item} onUpdate={handleCartUpdate} />
            </GridContainerV2>
          ))}
        </div>

        <form>
          <Wrapper>
            <div className="cart-form">
              <h3>Thông tin đặt hàng</h3>
              <p className="text-gray">
                <i>Bạn cần nhập đầy đủ các trường thông tin có dấu </i>
              </p>
              <Row className="row">
                <Col className="col">
                  <div className="control">
                    <input
                      name="Title"
                      type="string"
                      placeholder="Họ và tên"
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                  )}
                </Col>
              </Row>
              <Row className="row">
                <Col className="col">
                  <div className="control">
                    <input
                      name="Phone"
                      type="tel"
                      {...register("phone")}
                      placeholder="Số điện thoại "
                    />
                  </div>
                  {errors.phone && (
                    <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
                  )}
                </Col>
              </Row>
              <Row className="row shInfo">
                <Col className="col">
                  <div className="control">
                    <input
                      name="Address"
                      type="text"
                      {...register("address")}
                      placeholder="Địa chỉ nhận hàng "
                    />
                  </div>
                  {errors.address && (
                    <ErrorMessage>{errors?.address?.message}</ErrorMessage>
                  )}
                </Col>
              </Row>
              <Row className="row shInfo">
                <Col className="col">
                  <div className="control">
                    <input
                      name="Email"
                      type="email"
                      {...register("email")}
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && (
                    <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                  )}
                </Col>
              </Row>
              <Row className="row shInfo">
                <Col className="col">
                  <div className="control">
                    <textarea
                      name="Note"
                      {...register("note")}
                      placeholder="Ghi chú"
                    />
                  </div>
                  {errors.note && (
                    <ErrorMessage>{errors?.note?.message}</ErrorMessage>
                  )}
                </Col>
              </Row>
            </div>
          </Wrapper>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "10px",
            }}
          >
            <Button
              onClick={() => handleSubmit(handleUpdateOrder)()}
              type="button"
              size="large"
              variant="contained"
              color="success"
            >
              Cập nhật
            </Button>
          </div>
        </form>
      </GridContainer>
    </div>
  );
};
