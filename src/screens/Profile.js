import React, { useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";

export default function Profile({ user }) {
  useEffect(() => {
    console.log("USER =>", user);
  }, []);

  const fetchAvatar = async () => {
    await axios.get(`/users/${user._id}/avatar`);
  };
  return (
    <Container>
      <Heading>
        Hey {user.name}, you have been with us since{" "}
        {moment(user.createdAt).format("MMMM Do YYYY")}
      </Heading>
      <IntroText>
        Welcome to your profile page. We will have more features here soon
      </IntroText>
    </Container>
  );
}

const Container = styled.div`
  margin: 24px 48px;
`;
const Heading = styled.div`
  color: #214e34;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 900;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  margin: 20px 0;
  text-align: center;
`;

const SectionHeading = styled.h3`
  color: #214e34;
  font-size: 1.4rem;
`;

const StyledInput = styled.input`
  padding: 10px 15px;
  margin: 20px 0;
  font-size: 1.2rem;
  border: 3px solid #214e34;
`;

const DeleteButton = styled.button`
  color: white;
  background-color: red;
  padding: 10px 15px;
  border: none;
  font-weight: bold;
  font-size: 18px;
  margin: auto;
  border-radius: 16px;
  width: 50%;
`;
