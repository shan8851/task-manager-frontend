import React from "react";
import styled from "styled-components";

export default function NavBar() {
  return (
    <Bar>
      <Text>Task Manager</Text>
    </Bar>
  );
}

const Bar = styled.div`
  padding: 5px 0;
  background-color: #214e34;
`;

const Text = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #dff8eb;
`;
