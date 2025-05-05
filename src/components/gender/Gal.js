import React from "react";
import styled from "styled-components";
import Card from "../cards/Card";

const GridContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
`;

const girls = [
  "Zinhle Mafedza",
  "Mbali Mafedza",
  "Thoko Mafedza",
  "Sne Zondi",
  "Amahle Zondi ",
  "Pretty Zondi",
];
function GirlGrid({ selectedGirl, onSelectGirl }) {
  const handleClick = (girl) => {
    onSelectGirl(girl);
  };

  return (
    <GridContainer>
      {girls.map((girl, index) => (
        <Card
          key={index}
          selected={selectedGirl === girl}
          fullName={girl}
          onCardClick={() => handleClick(girl)} // Pass the boy name to the click handler
        />
      ))}
    </GridContainer>
  );
}

export default GirlGrid;
