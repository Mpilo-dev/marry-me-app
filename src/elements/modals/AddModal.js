import React from "react";
import styled from "styled-components";

import PrimaryButton from "../buttons/PrimaryButton";
import Button from "../buttons/CloseButton";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 400px;
  height: 250px;
  background-color: white;
  border-radius: 15px;
  padding: 25px;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const Modal = ({ isVisible, onClick }) =>
  isVisible && (
    <ModalBackground onClick={onClick}>
      <ModalContent>
        <Button onClick={onClick} />
        <PrimaryButton text="add" textTransform="capitalize" />
      </ModalContent>
    </ModalBackground>
  );

export default Modal;
