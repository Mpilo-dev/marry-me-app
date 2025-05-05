import React from "react";
import styled from "styled-components";

import CloseButton from "../buttons/CloseButton";
import CouplesButton from "../buttons/CouplesButton";

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
  color: var(--red);
  font-size: 0.75rem;
`;

const Modal = ({ isVisible, onClick, selectedBoy, selectedGirl }) =>
  isVisible && (
    <ModalBackground>
      <ModalContent>
        <CloseButton onClick={onClick}>Close</CloseButton>
        <Text>Divorce couple as husband and wife</Text>
        <CouplesButton
          text="divorce couple!"
          background="var(--black)"
          hoverBackground="var(--grey-button)"
        />
      </ModalContent>
    </ModalBackground>
  );

export default Modal;
