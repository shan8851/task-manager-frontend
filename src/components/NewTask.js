import React, { useState } from "react";
import styled from "styled-components";

export default function NewTask(props) {
  const [newTask, setNewTask] = useState("");

  return (
    <Container>
      <StyledInput
        type="text"
        placeholder="Enter task..."
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button onClick={() => props.handleAddNewTask(newTask)}>Add It!</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  padding: 10px 15px;
  margin: 20px 0;
  font-size: 1.2rem;
  border: 3px solid #214e34;
  width: 50%;
`;

const Button = styled.button`
  color: white;
  background-color: #214e34;
  padding: 10px 15px;
  border: none;
  font-weight: bold;
  font-size: 18px;
  margin: auto;
  border-radius: 16px;
  width: 50%;
`;
