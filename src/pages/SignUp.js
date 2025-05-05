import React, { useState } from "react";
import { Form, Formik } from "formik";
import styled from "styled-components";
import CustomInput from "../elements/Input";
import PrimaryButton from "../elements/buttons/PrimaryButton";
import { basicSchema } from "../components/schemas/BasicSchema";
import Logo from "../images/smaller_logo.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: var(--white);
`;

const LogoImage = styled.img`
  margin: 40px;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexRowContainer = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const StyledButton = styled.span`
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 10px;
  text-transform: capitalize;

  &:hover {
    color: var(--gray);
  }
`;

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  return (
    <Container>
      <LogoImage src={Logo} alt="logo" />
      <Formik
        initialValues={{ name: "", surname: "", email: "", password: "" }}
        validationSchema={basicSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <StyledForm>
            <FlexRowContainer visible={showSignUp}>
              <CustomInput type="text" name="name" placeholder="First Name" />
              <CustomInput type="text" name="surname" placeholder="Last Name" />
            </FlexRowContainer>
            <CustomInput type="text" name="email" placeholder="Email" />
            <CustomInput
              type="password"
              name="password"
              placeholder="Password"
            />
            <PrimaryButton
              type="submit"
              text={showSignUp ? "Register" : " Login "}
            />
            <StyledButton onClick={toggleSignUp}>
              {showSignUp ? "Login" : "Sign-up"}
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
