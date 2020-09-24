import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../context/context";

export default function TaskCard(props) {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <h1>{props.description}</h1>
      <p>Created: {moment(props.createdAt).format("MMMM Do YYYY")}</p>
      <p>Updated: {moment(props.updatedAt).format("MMMM Do YYYY")}</p>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={() => props.handleStatus(props._id, props.completed)}
      />
      <button onClick={() => props.handleDelete(props._id)}>delete</button>
    </div>
  );
}
