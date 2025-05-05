import React from "react";
import styled from "styled-components";
import UsersIcon from "../images/icons/users.svg";
import UserIcon from "../images/icons/user.svg";

const BarContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--purple-light);
  border-radius: 1.75rem;
`;

const BarSegment = styled.div`
  /* display: flex; */
  flex: 1;
  align-items: stretch;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${(props) => (props.isActive ? "purple" : "")};
`;

const SymbolSegment = styled.div`
  flex: 1;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  /* background-color: ${(props) => (props.isActive ? "var(--white)" : "")}; */
`;

const MainIcon = styled.img`
  width: 24px;
  height: 24px;
  font-size: 1rem;
  font-weight: bold;
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
  font-size: 1rem;
  font-weight: bold;
`;

const Bar = ({ boy, girl }) => {
  return (
    <BarContainer>
      <BarSegment isActive={boy}>
        {boy ? (
          <>
            <Icon src={UserIcon} alt="User Icon" />
            {boy}
          </>
        ) : (
          "No husband"
        )}
      </BarSegment>
      <SymbolSegment isActive={boy && girl}>
        <Icon src={UsersIcon} alt="Users Icon" />
      </SymbolSegment>
      <BarSegment isActive={girl}>
        {girl ? (
          <>
            {girl}
            <Icon src={UserIcon} alt="User Icon" />
          </>
        ) : (
          "No wife"
        )}
      </BarSegment>
    </BarContainer>
  );
};

export default Bar;
