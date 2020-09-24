import React, { useState } from "react";
import { Router } from "@reach/router";
import Dashboard from "./screens/Dashboard";
import Nav from "./components/Nav";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Profile from "./screens/Profile";

export default function App() {
  const [user, setUser] = useState({});
  const createUser = (data) => {
    setUser(data);
  };

  const logout = async () => {
    console.log("hello");
    localStorage.removeItem("userToken");
    setUser({});
    window.location.reload(false);
  };
  return (
    <>
      <Nav logout={logout} />
      <Router>
        <Dashboard user={user} path="/" />
        <Login createUser={createUser} path="login" />
        <Signup path="signup" />
        <Profile user={user} path="profile" />
      </Router>
    </>
  );
}
