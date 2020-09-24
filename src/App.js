import React, { useState } from "react";
import { AuthContext } from "./context/context";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import axios from "axios";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [userToken, setUserToken] = useState("");

  const login = async (email, password) => {
    await axios
      .post("/users/login", { email, password })
      .then((res) => {
        setUserToken(res.data.token);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            console.log("status", error.response.status);
            setLoginError("Something went wrong");
          }
        }
      });
  };

  const signUp = async (name, email, password) => {
    await axios
      .post("/users", { name, email, password })
      .then((res) => {
        setUserToken(res.data.token);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            console.log("status", error.response.status);
            setSignupError("Something went wrong");
          }
        }
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        signUp,
        token: userToken,
      }}
    >
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Home loginError={loginError} signupError={signupError} />
      )}
    </AuthContext.Provider>
  );
}
