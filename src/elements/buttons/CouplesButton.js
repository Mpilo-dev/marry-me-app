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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  text-align: center;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

  &:hover {
    background: ${(props) =>
      props.disabled
        ? props.background || "var(--purple)"
        : props.hoverBackground || "var(--purple-light)"};
  }

  margin: 1rem;
`;

const Button = ({
  text,
  background,
  color,
  hoverBackground,
  onClick,
  disabled,
}) => {
  return (
    <StyledButton
      background={background}
      color={color}
      hoverBackground={hoverBackground}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
