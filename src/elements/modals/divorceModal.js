import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import CloseButton from "../buttons/CloseButton";
import PrimaryButton from "../buttons/PrimaryButton";
import NewBar from "../../components/NewBar";

import { deleteMarriage } from "../../redux/features/marriageSlice";

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

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  text-align: center;
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

const Text = styled.span`
  color: var(--black);
  font-size: 1rem;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const DivorceButton = styled(PrimaryButton)`
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

const Modal = ({ isVisible, onClose, marriage }) => {
  const dispatch = useDispatch();
  const [error, setError] = React.useState(null);
  const [isDivorcing, setIsDivorcing] = React.useState(false);

  const handleDivorce = async () => {
    if (!marriage?._id) {
      console.error("Divorce attempted without marriage ID");
      setError("No marriage ID provided for divorce");
      return;
    }

    try {
      setIsDivorcing(true);
      setError(null);
      console.log("Starting divorce process for marriage:", {
        id: marriage._id,
        husband: {
          id: marriage.husband._id,
          name: `${marriage.husband.firstName} ${marriage.husband.lastName}`,
          isMarried: marriage.husband.isMarried,
        },
        wife: {
          id: marriage.wife._id,
          name: `${marriage.wife.firstName} ${marriage.wife.lastName}`,
          isMarried: marriage.wife.isMarried,
        },
      });

      const result = await dispatch(deleteMarriage(marriage._id)).unwrap();
      console.log("Divorce successful, result:", result);

      onClose();
    } catch (error) {
      console.error("Divorce failed with error:", {
        message: error.message,
        error: error,
        marriage: marriage,
      });

      let errorMessage = "Failed to process divorce";
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.status) {
        errorMessage = `Error: ${error.status}`;
      }

      setError(errorMessage);
    } finally {
      setIsDivorcing(false);
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  if (!isVisible || !marriage) {
    console.log("Modal not visible or no marriage provided");
    return null;
  }

  return (
    <ModalBackground onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose} />
        <TextContainer>
          <Text>Are you sure you want to divorce</Text>
          <NewBar boy={marriage.husband} girl={marriage.wife} active={true} />
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
          <DivorceButton
            text={isDivorcing ? "Processing..." : "Divorce"}
            textTransform="capitalize"
            padding="0.25rem 2rem"
            background="var(--black)"
            hoverBackground="var(--red)"
            onClick={handleDivorce}
            disabled={isDivorcing}
          />
        </ButtonContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
