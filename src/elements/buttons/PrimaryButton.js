import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 0.8rem;
  /* text-transform: capitalize; */
  text-transform: ${(props) => props.textTransform || "uppercase"};
  padding: ${(props) => props.padding || "0.65rem 5rem"};
  /* background: var(--purple-light); */
  background: ${(props) => props.background || "var(--purple-light)"};
  color: var(--white);
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: ${(props) => props.hoverBackground || "var(--purple)"};
  }

  margin: 1rem;
`;

const Button = ({
  text,
  textTransform,
  padding,
  background,
  hoverBackground,
  type = "button",
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      textTransform={textTransform}
      padding={padding}
      background={background}
      hoverBackground={hoverBackground}
      {...props}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
