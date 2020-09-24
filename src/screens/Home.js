import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Login from "../components/Login";
import Signup from "../components/Singup";

export default function Home({ loginError, signupError }) {
  return (
    <Layout>
      <Container>
        <Login error={loginError} />
        <Signup error={signupError} />
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
