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

function BoyGrid({ selectedBoy, onSelectBoy }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const [personToDelete, setPersonToDelete] = React.useState(null);
  const { persons } = useSelector((state) => state.person);

  const boys = persons.filter((person) => person.gender === "Male");

  const handleClick = (boy) => {
    onSelectBoy(boy);
  };

  const handleAddBoy = () => {
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
        {boys.length === 0 ? (
          <EmptyMessage>No guy added yet</EmptyMessage>
        ) : (
          boys.map((boy) => (
            <Card
              key={boy._id}
              selected={selectedBoy?._id === boy._id}
              fullName={`${boy.firstName} ${boy.lastName}`}
              onCardClick={() => handleClick(boy)}
              onDelete={handleDelete}
              person={boy}
            />
          ))
        )}
      </GridContainer>
      <ButtonContainer>
        <PrimaryButton
          text="Add Guy"
          onClick={handleAddBoy}
          padding="0.5rem 2rem"
        />
      </ButtonContainer>
      <AddModal
        isVisible={isModalVisible}
        onClick={handleCloseModal}
        gender="male"
      />
      <DeleteModal
        isVisible={isDeleteModalVisible}
        onClick={handleCloseDeleteModal}
        person={personToDelete}
      />
    </Container>
  );
}

export default BoyGrid;
