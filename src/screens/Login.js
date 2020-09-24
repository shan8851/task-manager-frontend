import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/context";
import Layout from "../components/Layout";

export default function Login() {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    authContext.login(email, password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    authContext.signUp(name, email, password);
  };

  return (
    <Layout>
      <Container>
        <LoginContainer>
          <Heading>Log In</Heading>
          <StyledForm onSubmit={handleLogin}>
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
          </StyledForm>
        </LoginContainer>
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
          </StyledForm>
        </SignUpContainer>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 3rem;
  justify-content: space-around;
  @media (max-width: 850px) {
    flex-direction: column;
    margin: 20px;
  }
`;

const LoginContainer = styled.div`
  width: 40%;
  border-radius: 16px;
  border: 3px solid #214e34;
  padding: 24px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 850px) {
    margin-bottom: 40px;
    width: 85%;
  }
`;

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
