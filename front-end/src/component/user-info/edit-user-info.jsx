import { Button } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify/dist";
import styled from "styled-components";
import { query } from "../../access";
const UpdateUser = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  .container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    font-weight: 800;
  }

  form {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }

  label {
    margin-top: 10px;
    font-weight: bold;
  }

  input,
  textarea {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  textarea {
    resize: vertical;
  }
  .input {
    display: flex;
    gap: 20px;
  }
  input[type="submit"] {
    background-color: #4caf50;
    color: #fff;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #45a049;
  }

  input[type="submit"]:active {
    background-color: #3e874f;
  }
`;
export const EditUserInfo = ({ userId, onUpdated, setIsEdit }) => {
  const [formData, setFormData] = useState();
  const handleOnChange = (data) => {
    setFormData((state) => {
      return { ...state, ...data };
    });
  };

  const handleSubmit = async () => {
    try {
      await query().user.update(userId, formData);
      onUpdated();
      toast.success("Cập nhật thông tin cá nhân thành công.");
      setIsEdit(false);
    } catch (error) {}
  };

  return (
    <UpdateUser>
      <div className="container">
        <h1 className="h1" style={{ marginBottom: "20px" }}>
          Chỉnh sửa thông tin cá nhân
        </h1>
        <form>
          <div className="input">
            <label style={{ width: "50%" }} for="firstName">
              Tên
            </label>
            <input
              id="firstName"
              onChange={(e) => handleOnChange({ firstName: e.target.value })}
            />
          </div>
          <div className="input">
            <label style={{ width: "50%" }} for="lastName">
              Họ
            </label>
            <input
              id="lastName"
              onChange={(e) => handleOnChange({ lastName: e.target.value })}
            />
          </div>
          <div className="input">
            <label style={{ width: "50%" }} for="phone">
              Số điện thoại
            </label>
            <input
              id="phone"
              onChange={(e) => handleOnChange({ phone: e.target.value })}
            />
          </div>
          <div className="input">
            <label style={{ width: "50%" }} for="address">
              Địa chỉ
            </label>
            <input
              id="address"
              onChange={(e) => handleOnChange({ address: e.target.value })}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              size="large"
              onClick={() => setIsEdit(false)}
            >
              Huỷ
            </Button>{" "}
            <Button
              variant="contained"
              size="large"
              onClick={() => handleSubmit()}
            >
              Gửi
            </Button>
          </div>
        </form>
      </div>
    </UpdateUser>
  );
};
