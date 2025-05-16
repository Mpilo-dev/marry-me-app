import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 0.85rem;
  text-transform: capitalize;
  padding: 0.2rem 1.5rem;
  background: ${(props) => props.background || "var(--grey-button)"};
  color: ${(props) => props.color || "var(--black)"};
  border-radius: 1rem;
  /* border: ${(props) => props.border || "none"}; */
  cursor: pointer;
  text-align: center;
  border: ${(props) => props.border || "1px solid var(--purple-light)"};

  &:hover {
    background: ${(props) => props.hoverBackground || "var(--gray)"};
  }

  margin: 1rem;
`;

const Button = ({
  text,
  background,
  color,
  border,
  hoverBackground,
  onClick,
  type = "button",
  ...props
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      background={background}
      color={color}
      border={border}
      hoverBackground={hoverBackground}
      {...props}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
