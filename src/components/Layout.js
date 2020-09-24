import React from "react";
import TopBar from "./TopBar";
export default function Layout({ children }) {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
}
