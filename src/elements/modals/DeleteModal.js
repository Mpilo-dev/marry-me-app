import React from "react";
import styled from "styled-components";
import Card from "../../components/cards/Card";

import CloseButton from "../buttons/CloseButton";
import PrimaryButton from "../buttons/PrimaryButton";

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
  align-items: center;
`;

const Text = styled.span`
  color: var(--purple-light);
  font-size: 0.75rem;
`;

const Modal = ({ isVisible, onClick, selectedBoy, selectedGirl }) =>
  isVisible && (
    <ModalBackground>
      <ModalContent>
        <CloseButton onClick={onClick}>Close</CloseButton>
        <Text>Are you sure you want to delete</Text>
        <PrimaryButton
          text="delete"
          textTransform="capitalize"
          padding="0.25rem 3.5rem"
          background="var(--grey)"
          hoverBackground="var(--gray)"
        />
      </ModalContent>
    </ModalBackground>
  );

export default Modal;
