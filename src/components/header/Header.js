import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "gatsby";
import LogoImage from "../../images/logo.png";
import SecondaryButton from "../../elements/buttons/SecondaryButton";
import CouplesButton from "../../elements/buttons/CouplesButton";
import { logout } from "../../redux/features/authSlice";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
`;

const Logo = styled.img`
  width: 100px;
  height: auto;
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 1rem;
`;

const UserName = styled.span`
  font-size: 0.9rem;
  color: var(--black);
  text-transform: capitalize;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { marriages } = useSelector((state) => state.marriage);

  useEffect(() => {
    console.log("Current Auth State:", { user, isAuthenticated });
  }, [user, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/SignUp");
  };

  const handleLogoClick = () => {
    navigate("/indexPage");
  };

  const handleCouplesClick = () => {
    navigate("/Couples");
  };

  const hasMarriedCouples = marriages && marriages.length > 0;

  return (
    <HeaderContainer>
      <Logo src={LogoImage} alt="Logo" onClick={handleLogoClick} />
      <ButtonContainer>
        {isAuthenticated && user && (
          <UserInfo>
            <UserName>
              {user.name} {user.surname}
            </UserName>
          </UserInfo>
        )}
        {hasMarriedCouples && (
          <CouplesButton
            text="couples"
            background="var(--purple)"
            hoverBackground="var(--purple-light)"
            onClick={handleCouplesClick}
          />
        )}
        <SecondaryButton
          text="logout"
          border="none"
          onClick={handleLogout}
          type="button"
        />
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
