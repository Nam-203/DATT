import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #000;
  border-radius: 50%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 50px;
  animation: ${spinAnimation} 1s linear infinite;
`;
export const Cart = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  max-width: 100%;
  opacity: 1;
  padding: 5px 15px;
  width: 100%;
  gap: 20px;
  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 5px 15px;
    padding: 10px 20px;
  }
  @media (min-width: 1057px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 5px 15px;
    padding: 10px 20px;
  }
  @media (min-width: 1213px) {
    grid-template-columns: repeat(4, 1fr);
    padding: 5px 15px;
    padding: 0px 30px;
  }
  @media (min-width: 1536px) {
    grid-template-columns: repeat(5, 1fr);
    padding: 5px 15px;
    padding: 30px 50px;
  }
`;
