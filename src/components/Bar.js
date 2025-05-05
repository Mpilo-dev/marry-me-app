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
  background-color: ${(props) =>
    props.isActive ? "var(--purple-light)" : "var(--white-light)"};
  color: ${(props) => (props.isActive ? "var(--white)" : "var(--black)")};
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const BarSegment = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
`;

const SymbolSegment = styled.div`
  flex: 1;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  font-size: 1rem;
  font-weight: bold;
`;

const Bar = ({ boy, girl, active }) => {
  return (
    <BarContainer isActive={active}>
      <BarSegment>
        <Icon src={UserIcon} alt="Users Icon" isActive={active} />
        {boy || "No husband"}
      </BarSegment>
      <SymbolSegment>
        <Icon src={UsersIcon} alt="Users Icon" isActive={active} />
      </SymbolSegment>
      <BarSegment>{girl || "No wife"}</BarSegment>
    </BarContainer>
  );
};

export default Bar;
