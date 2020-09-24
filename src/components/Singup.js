import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/context";

export default function Singup({ error }) {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    authContext.signUp(name, email, password);
  };
  return (
    <SignUpContainer>
      <Heading>Sing Up</Heading>
      <StyledForm onSubmit={handleSignUp}>
        <StyledInput
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <StyledInput
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledInput
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Submit</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </StyledForm>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.div`
  width: 40%;
  border-radius: 16px;
  border: 3px solid #214e34;
  padding: 24px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 850px) {
    width: 85%;
  }
`;

const Heading = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 900;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledInput = styled.input`
  padding: 10px 15px;
  margin: 20px 0;
  font-size: 1.2rem;
  border: 3px solid #214e34;
`;

const Button = styled.button`
  width: 100%;
  color: white;
  background-color: #214e34;
  padding: 10px 15px;
  border: none;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
  border-radius: 16px;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: red;
  font-weight: bold;
  text-align: center;
`;
