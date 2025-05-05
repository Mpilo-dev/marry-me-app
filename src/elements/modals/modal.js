import React from "react";
import styled from "styled-components";
import Card from "../../components/cards/Card";

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
  box-sizing: border-box;
`;

const Button = styled.span`
  align-self: flex-end;
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Symbol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 25px;
  font-weight: bold;
`;
const Text = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
`;

const extractFirstName = (fullName) => {
  return fullName.split(" ")[0];
};

const Modal = ({ isVisible, onClick, selectedBoy, selectedGirl }) =>
  isVisible && (
    <ModalBackground>
      <ModalContent>
        <Button onClick={onClick}>Close</Button>
        <CardsContainer>
          <Card fullName={selectedBoy} selected={true} />
          <Symbol>+</Symbol>
          <Card fullName={selectedGirl} selected={true} />
        </CardsContainer>
        <Text>
          {extractFirstName(selectedGirl)} & {selectedBoy}
        </Text>
      </ModalContent>
    </ModalBackground>
  );

export default Modal;
