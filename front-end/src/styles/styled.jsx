import styled from "styled-components";

export const Categori = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  .Wapper {
    min-width: 375px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 5px 5px 10px #0000000d;
    border: 1px solid #d9d9d9;
    border-radius: 15px;
    opacity: 1;
    margin: 0 20px;
    width: 100%;
    height: fit-content;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    @media (min-width: 500px) {
      padding: 40px 30px;
    }
    @media (min-width: 1024px) {
      padding: 50px 40px;
    }
    @media (min-width: 1280px) {
      padding: 50px 50px;
    }
    @media (min-width: 1536px) {
      padding: 50px 50px;
    }
  }
`;
export const Wrapper = styled.form`
  min-width: 375px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 5px 5px 10px #0000000d;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  opacity: 1;
  margin: 0 20px;
  width: 100%;
  height: fit-content;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 500px) {
    padding: 40px 30px;
  }
  @media (min-width: 1024px) {
    padding: 50px 40px;
  }
  @media (min-width: 1280px) {
    padding: 50px 50px;
  }
  @media (min-width: 1536px) {
    padding: 50px 50px;
  }
`;
