import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../buttons/PrimaryButton";
import Button from "../buttons/CloseButton";
import CustomInput from "../Input";
import { personSchema } from "../../components/schemas/BasicSchema";
import { createPerson, clearError } from "../../redux/features/personSlice";

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

const FormContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  margin-bottom: 7px;
`;

const Modal = ({ isVisible, onClick, gender }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.person);

  const initialValues = {
    firstName: "",
    lastName: "",
    gender: gender || "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const personData = {
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender === "male" ? "Male" : "Female",
      };

      await dispatch(createPerson(personData)).unwrap();
      resetForm();
      onClick();
    } catch (error) {
      console.error("Failed to create person:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(clearError());
    onClick();
  };

  return (
    isVisible && (
      <ModalBackground onClick={handleClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <Button onClick={handleClose} />
          <FormContainer>
            <Formik
              initialValues={initialValues}
              validationSchema={personSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputWrapper>
                    <CustomInput
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                    />
                  </InputWrapper>

                  <InputWrapper>
                    <CustomInput
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                    />
                  </InputWrapper>

                  <InputWrapper>
                    <CustomInput
                      type="text"
                      name="gender"
                      placeholder="Gender"
                      disabled
                    />
                  </InputWrapper>

                  {error && <ErrorMessage>{error}</ErrorMessage>}
                  <ButtonContainer>
                    <PrimaryButton
                      type="submit"
                      text={isLoading ? "Adding..." : "Add"}
                      textTransform="capitalize"
                      disabled={isLoading || isSubmitting}
                    />
                  </ButtonContainer>
                </Form>
              )}
            </Formik>
          </FormContainer>
        </ModalContent>
      </ModalBackground>
    )
  );
};

export default Modal;
