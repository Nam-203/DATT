import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify/dist";
import styled from "styled-components";
import { query } from "../../access";
import { authAction } from "../../redux/authSlice";
import { cartAction } from "../../redux/cartSlice";
import CommonModal from "../common/modal/CommonModal";
import { EditUserInfo } from "./edit-user-info";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 50px;
`;

const ButtonInput = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const UserInfo = ({ data }) => {
  const [userData, setUserData] = useState({});
  // if (!userData) return null;
  const {
    email,
    firstName,
    lastName,
    image,
    role,
    _id: userId,
    phone,
    address,
  } = userData;
  const history = useHistory();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };
  const handleConfirmLogout = () => {
    toast.success("Bạn đã đăng xuất thành công!");
    dispatch(cartAction.destroyCart());
    dispatch(authAction.deleteUser());

    setIsModalOpen(false);
    history.push("/login");
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  const handleGetUserData = async () => {
    try {
      const { data } = await query().user.info();
      setUserData(data);
    } catch (error) {
      console.log("Loi khi load user data.", error);
    }
  };

  useEffect(() => {
    handleGetUserData();
  }, [userData]);

  const handleOnUpdateUserInfo = () => {
    handleGetUserData();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {isEdit ? (
        <EditUserInfo
          userId={userId}
          onUpdated={handleOnUpdateUserInfo}
          setIsEdit={setIsEdit}
          data={userData}
        />
      ) : (
        <div
          style={{
            padding: "2rem 1.4rem",
            borderRadius: "1.2rem",
            border: "1px solid",
            width: "50%",
          }}
        >
          <h4 style={{ fontWeight: "bold", textAlign: "center" }}>
            Thông tin cá nhân
          </h4>
          <img
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px auto",
            }}
            src={image}
          />
          <div
            style={{
              display: "flex",
              padding: "5px",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginLeft: "30px",
              }}
            >
              {" "}
              <p>
                Họ tên: {firstName} {lastName}
              </p>
              <p>Email: {email}</p>
              <p>Số điện thoại: {phone}</p>
              <p>Địa chỉ: {address}</p>
              <p>Phân quyền: {role}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={handleLogoutClick}
                >
                  Đăng xuất
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="button"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          </div>
          <CommonModal
            isOpen={isModalOpen}
            onRequestClose={handleCancelLogout}
            contentLabel="Xác nhận đăng xuất"
            content={
              <>
                <p>Bạn có chắc muốn đăng xuất?</p>
                <ButtonContainer>
                  <ButtonInput onClick={handleConfirmLogout}>
                    Đồng ý
                  </ButtonInput>
                  <ButtonInput onClick={handleCancelLogout}>Hủy</ButtonInput>
                </ButtonContainer>
              </>
            }
          />
        </div>
      )}
    </div>
  );
};

export default UserInfo;
