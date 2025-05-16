import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import DeleteIcon from "../../images/icons/trash.svg";
import UsersIcon from "../../images/icons/users.svg";

const CardContainer = styled.div`
  flex: 1;
  border: none;
  border-radius: 1rem;
  padding: 32px 12px;
  background-color: ${(props) => {
    if (props.isMarried) return "#916AE3"; // Always purple if married
    return props.selected ? "#916AE3" : "#FFFFFF";
  }};
  color: ${(props) =>
    props.isMarried || props.selected ? "#FFFFFF" : "#000000"};
  cursor: ${(props) => (props.isMarried ? "not-allowed" : "pointer")};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
  opacity: ${(props) => (props.isMarried ? 0.8 : 1)};
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
  cursor: pointer;
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
  margin-bottom: 4px;
`;

const MarriedStatus = styled.div`
  font-size: 12px;
  color: #ffffff;
  margin-top: 4px;
  font-weight: 500;
`;

const MarriedIcon = styled.img`
  width: 14px;
  height: 14px;
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

const Card = ({ fullName, onCardClick, selected, onDelete, person }) => {
  const { marriages } = useSelector((state) => state.marriage);

  if (!person) {
    return null;
  }

  const isMarried = marriages.some(
    (marriage) =>
      marriage.husband?._id === person._id || marriage.wife?._id === person._id
  );

  const handleClick = () => {
    if (isMarried) {
      return; // Don't allow selection if married
    }
    if (onCardClick) {
      onCardClick(person);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(person);
    }
  };

  return (
    <CardContainer
      selected={selected}
      isMarried={isMarried}
      onClick={handleClick}
    >
      <IconBackground onClick={handleDeleteClick}>
        <Icon src={DeleteIcon} alt="Delete Icon" />
      </IconBackground>
      <FullName>{fullName}</FullName>
      {isMarried && (
        <>
          <MarriedStatus>married</MarriedStatus>
          <IconBackground>
            {/* <MarriedIcon src={UsersIcon} alt="Married Icon" /> */}
            <Icon src={UsersIcon} alt="Married Icon" />
          </IconBackground>
        </>
      )}
    </CardContainer>
  );
};

export default Card;
