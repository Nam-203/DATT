import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import * as yup from "yup";
import { axiosClient } from "../../access/api/axios-client";
import { getUserDecode } from "../../redux/authSlice";
import { cartAction, selectCart } from "../../redux/cartSlice";
import { cart } from "../../util/cart";

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
export const Info = () => {
  const cartSlice = useSelector(selectCart);
  const user = useSelector(getUserDecode);
  const dispatch = useDispatch();
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
  const onSubmit = async (e) => {
    const body = {
      name: getValues("name"),
      email: getValues("email"),
      phone: getValues("phone"),
      address: getValues("address"),
      note: getValues("note"),
      cart: cartSlice,
      priceTotal: cart.totalPrice(cartSlice),
    };
    try {
      const result = await axiosClient.post("/order/create", body);
      if (result) {
        swal("Đặt hàng thành công");
        dispatch(cartAction.setCart([]));
        return history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    reset({
      name: user?.lastName + " " + user?.firstName,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
    });
  }, [user]);
  return (
    <form>
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
          {errors.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}
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
            <textarea name="Note" {...register("note")} placeholder="Ghi chú" />
          </div>
          {errors.note && <ErrorMessage>{errors?.note?.message}</ErrorMessage>}
        </Col>
      </Row>
      <div className="row shInfo">
        <div className="control-button">
          <button type="button" onClick={() => handleSubmit(onSubmit)()}>
            XÁC NHẬN VÀ ĐẶT HÀNG
          </button>
        </div>
      </div>
    </form>
  );
};
