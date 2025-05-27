import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Card from "../cards/Card";
import PrimaryButton from "../../elements/buttons/PrimaryButton";
import AddModal from "../../elements/modals/AddModal";
import DeleteModal from "../../elements/modals/DeleteModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

const GridContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  overflow-y: auto;
  position: relative;
  align-content: start;
`;

const EmptyMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666;
  font-size: 1.2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

function GirlGrid({ selectedGirl, onSelectGirl }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const [personToDelete, setPersonToDelete] = React.useState(null);
  const { persons } = useSelector((state) => state.person);

  const girls = persons.filter((person) => person.gender === "Female");

  const handleClick = (girl) => {
    onSelectGirl(girl);
  };

  const handleAddGirl = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (person) => {
    setPersonToDelete(person);
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setPersonToDelete(null);
  };

  return (
    <Container>
      <GridContainer>
        {girls.length === 0 ? (
          <EmptyMessage>No girl added yet</EmptyMessage>
        ) : (
          girls.map((girl) => (
            <Card
              key={girl._id}
              selected={selectedGirl?._id === girl._id}
              fullName={`${girl.firstName} ${girl.lastName}`}
              onCardClick={() => handleClick(girl)}
              onDelete={handleDelete}
              person={girl}
            />
          ))
        )}
      </GridContainer>
      <ButtonContainer>
        <PrimaryButton
          text="Add Girl"
          onClick={handleAddGirl}
          padding="0.5rem 2rem"
        />
      </ButtonContainer>
      <AddModal
        isVisible={isModalVisible}
        onClick={handleCloseModal}
        gender="female"
      />
      <DeleteModal
        isVisible={isDeleteModalVisible}
        onClick={handleCloseDeleteModal}
        person={personToDelete}
      />
    </Container>
  );
}

export default GirlGrid;
