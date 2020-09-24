import React, { useState, useEffect } from "react";
import { AuthContext } from "./context/context";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import styled from "styled-components";
import axios from "axios";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [userToken, setUserToken] = useState("");

  const login = async (email, password) => {
    const loginResponse = await axios.post("/users/login", { email, password });
    console.log(loginResponse);
    if (loginResponse.status !== 200) {
      return setError("Something went wrong");
    }
    setUserToken(loginResponse.data.token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    const logoutResponse = await axios.post("/users/logout");
    if (logoutResponse.status === 500) {
      return setError("Something went wrong");
    }
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        token: userToken,
      }}
    >
      {isLoggedIn ? <Dashboard /> : <Login />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </AuthContext.Provider>
  );
}

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: red;
  font-weight: bold;
`;
