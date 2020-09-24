import React from "react";
import { Router } from "@reach/router";
import Dashboard from "./screens/Dashboard";
import Layout from "./components/Layout";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

export default function App() {
  return (
    <Layout>
      <Router>
        <Dashboard path="/" />
        <Login path="login" />
        <Signup path="signup" />
      </Router>
    </Layout>
  );
}
