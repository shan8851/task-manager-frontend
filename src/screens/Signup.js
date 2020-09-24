import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    await axios
      .post("/users", { name, email, password })
      .then((res) => {
        localStorage.setItem("userToken", res.data.token);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            console.log("status", error.response.status);
            setError("Something went wrong");
          }
        }
      });
  };
  return (
    <SignUpContainer>
      <Heading>Sing Up</Heading>
      <StyledForm onSubmit={signUp}>
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
      <LoginLink to="/login">Login instead</LoginLink>
    </SignUpContainer>
  );
}
const SignUpContainer = styled.div`
  border-radius: 16px;
  margin: 24px 48px;
  border: 3px solid #214e34;
  padding: 24px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.div`
  color: #214e34;
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

const LoginLink = styled(Link)`
  color: #214e34;
  font-size: 1.4rem;
  font-weight: 900;
  margin-top: 20px;
`;
