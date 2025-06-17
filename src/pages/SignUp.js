import React, { useState } from "react";
import { Form, Formik } from "formik";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "gatsby";
import CustomInput from "../elements/Input";
import PrimaryButton from "../elements/buttons/PrimaryButton";
import { basicSchema, loginSchema } from "../components/schemas/BasicSchema";
import Logo from "../images/smaller_logo.png";
import { signup, login } from "../redux/features/authSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--white);
`;

const LogoImage = styled.img`
  margin: 40px;
  width: 200px;
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

const StyledButton = styled.button`
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 10px;
  text-transform: capitalize;
  background: none;
  border: none;
  padding: 0;

  &:hover {
    color: var(--gray);
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const onSubmit = async (values, actions) => {
    try {
      if (showSignUp) {
        const result = await dispatch(signup(values)).unwrap();
        if (result) {
          navigate("/");
        }
      } else {
        // Handle login
        const loginData = {
          email: values.email,
          password: values.password,
        };
        const result = await dispatch(login(loginData)).unwrap();
        if (result) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Container>
      <LogoImage src={Logo} alt="logo" />
      <Formik
        initialValues={{ name: "", surname: "", email: "", password: "" }}
        validationSchema={showSignUp ? basicSchema : loginSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <StyledForm>
              <FlexRowContainer visible={showSignUp}>
                <CustomInput type="text" name="name" placeholder="First Name" />
                <CustomInput
                  type="text"
                  name="surname"
                  placeholder="Last Name"
                />
              </FlexRowContainer>
              <CustomInput type="text" name="email" placeholder="Email" />
              <CustomInput
                type="password"
                name="password"
                placeholder="Password"
              />
              <PrimaryButton
                type="submit"
                text={
                  isLoading
                    ? "Processing..."
                    : showSignUp
                    ? "Register"
                    : "Login"
                }
                disabled={isLoading || isSubmitting}
              />

              {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
              <StyledButton
                type="button"
                onClick={toggleSignUp}
                aria-label={showSignUp ? "Switch to login" : "Switch to signup"}
              >
                {showSignUp ? "Login" : "Sign-up"}
              </StyledButton>
            </StyledForm>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignUp;

export const Head = () => (
  <>
    <title>SignUp Page</title>
    <link rel="icon" type="image/png" href={Logo} />
  </>
);
