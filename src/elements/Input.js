import React from "react";
import { useField } from "formik";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: capitalize;
  color: var(--black);
  border: none;
  background-color: var(--grey-light);
  border-radius: 1.25rem;

  outline: none;

  margin: 1rem;

  &:focus {
    border: 2px solid;
    border-color: var(--purple);
  }

  &::placeholder {
    color: var(--black);
  }

  &.input-error {
    border-color: red;
  }
`;

const Error = styled.div`
  color: #fc8181;
  font-size: 0.75rem;
  text-align: left;
  margin-top: 0.25rem;
`;

const CustomInput = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Input {...field} {...props} />
      {meta.touched && meta.error && <Error>{meta.error}</Error>}
    </>
  );
};

export default CustomInput;
