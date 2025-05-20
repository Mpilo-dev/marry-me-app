import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import CloseButton from "../buttons/CloseButton";
import PrimaryButton from "../buttons/PrimaryButton";
import { deletePerson } from "../../redux/features/personSlice";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 400px;
  background-color: white;
  border-radius: 15px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CardPreview = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  background: var(--purple);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--black);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Text = styled.span`
  color: var(--black);
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const DeleteButton = styled(PrimaryButton)`
  &:hover {
    background: var(--red) !important;
    color: white !important;
  }
`;

const ErrorMessage = styled.div`
  color: var(--red);
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const Modal = ({ isVisible, onClick, person }) => {
  const dispatch = useDispatch();
  const [error, setError] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!person?._id) {
      console.error("Delete attempted without person ID");
      setError("No person ID provided for deletion");
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      console.log("Starting delete process for person:", {
        id: person._id,
        name: `${person.firstName} ${person.lastName}`,
      });

      const result = await dispatch(deletePerson(person._id)).unwrap();
      console.log("Delete successful, result:", result);

      onClick();
    } catch (error) {
      console.error("Delete failed with error:", {
        message: error.message,
        error: error,
      });
      setError(error.message || "Failed to delete person");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setError(null);
    onClick();
  };

  if (!isVisible || !person) {
    console.log("Modal not visible or no person provided");
    return null;
  }

  return (
    <ModalBackground onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose} />
        <TextContainer>
          <Text>Are you sure you want to delete</Text>
          <CardPreview>
            {person.firstName} {person.lastName}
          </CardPreview>
          <Text>This action cannot be undone</Text>
        </TextContainer>
        <ButtonContainer>
          <PrimaryButton
            text="Cancel"
            textTransform="capitalize"
            padding="0.25rem 2rem"
            background="var(--grey)"
            hoverBackground="var(--gray)"
            onClick={handleClose}
          />
          <DeleteButton
            text={isDeleting ? "Deleting..." : "Delete"}
            textTransform="capitalize"
            padding="0.25rem 2rem"
            background="var(--black)"
            hoverBackground="var(--red)"
            onClick={handleDelete}
            disabled={isDeleting}
          />
        </ButtonContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
