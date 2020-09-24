import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

export default function Nav() {
  return (
    <Bar>
      <Text>Task Manager</Text>
      <LinkSection>
        <NavLink to="/">Dashboard</NavLink>
      </LinkSection>
    </Bar>
  );
}

const Bar = styled.div`
  padding: 5px 20px;
  background-color: #214e34;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #dff8eb;
`;

const LinkSection = styled.div`
  display: flex;
`;

const NavLink = styled(Link)`
  color: white;
  font-size: 1.2rem;
  font-weight: 900;
  text-decoration: none;
`;
