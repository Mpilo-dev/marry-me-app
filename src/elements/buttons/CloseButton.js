import React from "react";
import styled from "styled-components";

const StyledButton = styled.span`
  align-self: flex-end;
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 10px;
  text-transform: uppercase;

  &:hover {
    color: var(--gray);
  }

  /* margin: 1rem; */
`;

const Button = ({ onClick }) => {
  return (
    <>
      <StyledButton onClick={onClick}>close</StyledButton>
    </>
  );
};

export default Button;
