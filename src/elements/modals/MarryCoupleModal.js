import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import CloseButton from "../buttons/CloseButton";
import CouplesButton from "../buttons/CouplesButton";
import NewBar from "../../components/NewBar";
import {
  createMarriage,
  clearError,
  fetchMarriages,
} from "../../redux/features/marriageSlice";

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
`;

const ModalContent = styled.div`
  width: 400px;
  height: 250px;
  background-color: white;
  border-radius: 15px;
  padding: 25px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.span`
  color: var(--black);
  font-size: 1rem;
  font-weight: bold;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const Modal = ({ isVisible, onClose, selectedBoy, selectedGirl, onReset }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.marriage);

  const handleMarry = async () => {
    console.log("Marry button clicked");
    console.log("Selected Boy:", selectedBoy);
    console.log("Selected Girl:", selectedGirl);

    if (!selectedBoy || !selectedGirl) {
      console.error("Missing selected boy or girl");
      return;
    }

    try {
      console.log("Dispatching createMarriage action");
      const result = await dispatch(
        createMarriage({
          husbandId: selectedBoy._id,
          wifeId: selectedGirl._id,
        })
      ).unwrap();
      console.log("Marriage created successfully:", result);

      // Fetch updated marriages list
      await dispatch(fetchMarriages());

      // Reset selections
      if (onReset) {
        onReset();
      }

      onClose();
    } catch (error) {
      console.error("Failed to create marriage:", error);
    }
  };

  const handleClose = () => {
    dispatch(clearError());
    onClose();
  };

  // Helper function to format error message
  const getErrorMessage = (error) => {
    if (typeof error === "string") return error;
    if (error?.message) return error.message;
    if (error?.status) return `Error: ${error.status}`;
    return "An error occurred";
  };

  return (
    isVisible && (
      <ModalBackground>
        <ModalContent>
          <CloseButton onClick={handleClose}>Close</CloseButton>
          <Text>Declare couple husband and wife</Text>

          <NewBar
            boy={selectedBoy}
            girl={selectedGirl}
            active={!!selectedBoy && !!selectedGirl}
          />
          <CouplesButton
            text={loading ? "Marrying..." : "marry couple!"}
            onClick={handleMarry}
            disabled={loading}
          />
          {error && <ErrorMessage>{getErrorMessage(error)}</ErrorMessage>}
        </ModalContent>
      </ModalBackground>
    )
  );
};

export default Modal;
