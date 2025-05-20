import React from "react";
import styled from "styled-components";
import UsersIcon from "../images/icons/users.svg";
import UserIcon from "../images/icons/user.svg";

const BarContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.75rem;
  background: transparent;
  width: 100%;
  min-width: 300px;
`;

const BarSegment = styled.div`
  flex: 1;
  min-width: 0;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => (props.isActive ? "var(--white)" : "var(--black)")};
  background-color: ${(props) =>
    props.isActive ? "var(--purple)" : "var(--white-light)"};
  padding: 1rem;
  border-radius: ${(props) =>
    props.isLeft ? "1.75rem 0 0 1.75rem" : "0 1.75rem 1.75rem 0"};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: 1px solid var(--purple-light);
  overflow: hidden;
`;

const NameText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
`;

const SymbolSegment = styled.div`
  flex: 0 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const NewBar = ({ boy, girl, active }) => {
  return (
    <BarContainer active={active}>
      <BarSegment isActive={!!boy} isLeft>
        {boy ? (
          <>
            <Icon src={UserIcon} alt="Male Icon" />
            <NameText>{`${boy.firstName} ${boy.lastName}`}</NameText>
          </>
        ) : (
          "No husband"
        )}
      </BarSegment>
      <SymbolSegment>
        <Icon src={UsersIcon} alt="Couple Icon" />
      </SymbolSegment>
      <BarSegment isActive={!!girl}>
        {girl ? (
          <>
            <NameText>{`${girl.firstName} ${girl.lastName}`}</NameText>
            <Icon src={UserIcon} alt="Female Icon" />
          </>
        ) : (
          "No wife"
        )}
      </BarSegment>
    </BarContainer>
  );
};

export default NewBar;
