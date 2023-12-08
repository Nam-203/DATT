import Modal from "react-modal";
import styled from "styled-components";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%; /* Đảm bảo chiều cao của nội dung là 100% */
`;
const CommonModal = ({ isOpen, onRequestClose, contentLabel, content }) => {
  const modalStyles = {
    content: {
      width: "500px",
      height: "320px",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        style={modalStyles}
      >
        <ModalContent>{content}</ModalContent>
      </Modal>
    </>
  );
};
export default CommonModal;
