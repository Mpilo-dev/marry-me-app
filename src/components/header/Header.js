import React from "react";
import styled from "styled-components";

import LogoImage from "../../images/logo.png";
import SecondaryButton from "../../elements/buttons/SecondaryButton";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #f0f0f0;
  margin-bottom: 1rem;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={LogoImage} alt="Logo" />
      <SecondaryButton text="logout" border="none" />
    </HeaderContainer>
  );
};

export default Header;
