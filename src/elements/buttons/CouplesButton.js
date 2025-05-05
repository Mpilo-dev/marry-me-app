import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  font-size: 0.85rem;
  text-transform: capitalize;
  padding: 0.5rem 1.85rem;
  background: ${(props) => props.background || "var(--purple)"};
  color: var(--white);
  border-radius: 1rem;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: ${(props) => props.hoverBackground || "var(--purple-light)"};
  }

  margin: 1rem;
`;

const Button = ({ text, background, color, hoverBackground }) => {
  return (
    <>
      <StyledButton
        background={background}
        color={color}
        hoverBackground={hoverBackground}
      >
        {text}
      </StyledButton>
    </>
  );
};

export default Button;
