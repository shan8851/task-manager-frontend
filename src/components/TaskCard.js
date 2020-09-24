import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";

export default function TaskCard(props) {
  return (
    <Container>
      <TopRow>
        <Description isDone={props.completed}>{props.description}</Description>
        <input
          type="checkbox"
          checked={props.completed}
          onChange={() => props.handleStatus(props._id, props.completed)}
        />
      </TopRow>
      <DetailsRow>
        <p>
          <strong>Created:</strong>{" "}
          {moment(props.createdAt).format("MMMM Do YYYY")}
        </p>
        <p>
          <strong>Updated:</strong>{" "}
          {moment(props.updatedAt).format("MMMM Do YYYY")}
        </p>
      </DetailsRow>
      <DeleteButton onClick={() => props.handleDelete(props._id)}>
        Delete
      </DeleteButton>
    </Container>
  );
}

const Container = styled.div`
  margin: 24px 48px;
  padding: 24px 48px;
  border: 3px solid #214e34;
  border-radius: 16px;
  width: 400px;
`;

const Description = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 900;
  ${(props) => props.isDone && "text-decoration: line-through"}
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  align-items: center;
`;

const DetailsRow = styled.div`
  margin: 10px 0;
`;

const DeleteButton = styled.button`
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
