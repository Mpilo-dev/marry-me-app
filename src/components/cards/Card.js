import React from "react";
import styled from "styled-components";
import DeleteIcon from "../../images/icons/trash.svg";
import UsersIcon from "../../images/icons/users.svg";

const CardContainer = styled.div`
  flex: 1;
  border: none;
  border-radius: 1rem;
  padding: 32px 12px;
  background-color: ${(props) => (props.selected ? "#916AE3" : "#FFFFFF")};
  color: ${(props) => (props.selected ? "#FFFFFF" : "#000000")};
  cursor: ${(props) => (props.onCardClick ? "pointer" : "default")};

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const IconBackground = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: var(--grey-light);
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: -1.5rem;
`;

const Icon = styled.img`
  width: 14px;
  height: 14px;
  font-size: 1rem;
  font-weight: bold;
  background: lightgray;
  border-radius: 50%;
`;

const FullName = styled.div`
  font-size: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Card = ({ fullName, onCardClick, selected }) => {
  const handleClick = () => {
    onCardClick(fullName);
  };

  return (
    <CardContainer
      selected={selected}
      onClick={onCardClick ? handleClick : null}
    >
      <IconBackground>
        <Icon src={DeleteIcon} alt="Users Icon" />
      </IconBackground>
      <FullName>{fullName}</FullName>
    </CardContainer>
  );
};

export default Card;
