import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "@reach/router";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    await axios
      .post("/users/login", { email, password })
      .then((res) => {
        console.log(res);
        localStorage.setItem("userToken", res.data.token);
        navigate("/");
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
    <LoginContainer>
      <Heading>Log In</Heading>
      <StyledForm onSubmit={login}>
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
      <SignupLink to="/signup">Sing up instead</SignupLink>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  border-radius: 16px;
  border: 3px solid #214e34;
  margin: 24px 48px;
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

const StyledInput = styled.input`
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

const SignupLink = styled(Link)`
  color: #214e34;
  font-size: 1.4rem;
  font-weight: 900;
  margin-top: 20px;
`;
