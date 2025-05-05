import React from "react";
import styled from "styled-components";
import Card from "../cards/Card";

const GridContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
`;
const boys = [
  "Mpilo Ndlovu",
  "Ndumiso Ndlovu",
  "Tonic Ndlovu",
  "Mpilo kaka",
  "Ndumiso kaka ",
  "Tonic kaka",
];

function BoyGrid({ selectedBoy, onSelectBoy }) {
  const handleClick = (boy) => {
    onSelectBoy(boy);
  };
  return (
    // <BackgroundContainer>
    <GridContainer>
      {boys.map((boy, index) => (
        <Card
          key={index}
          selected={selectedBoy === boy}
          fullName={boy}
          onCardClick={() => handleClick(boy)} // Pass the boy name to the click handler
        />
      ))}
    </GridContainer>
    // </BackgroundContainer>
  );
}

export default BoyGrid;
