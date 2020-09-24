import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/context";
import Layout from "../components/Layout";
import axios from "axios";
import moment from "moment";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    console.log(authContext);
    fetchUser();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const taskResponse = await axios.get("/tasks", {
      headers: {
        Authorization: "Bearer " + authContext.token,
      },
    });
    try {
      console.log(taskResponse.data);
      setTaskList(taskResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    const userResponse = await axios.get("/users/me", {
      headers: {
        Authorization: "Bearer " + authContext.token,
      },
    });
    try {
      setName(userResponse.data.name);
      setMemberSince(userResponse.data.createdAt);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = async () => {
    await axios.post("/users/logout", {
      headers: {
        Authorization: "Bearer " + authContext.token,
      },
    });
  };

  const handleAddNewTask = async () => {
    await axios.post(
      "/tasks",
      {
        description: newTask,
      },
      {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      }
    );
    try {
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/tasks/${id}`, {
      headers: {
        Authorization: "Bearer " + authContext.token,
      },
    });
    fetchTasks();
  };

  const handleStatus = async (id, status) => {
    await axios.patch(
      `/tasks/${id}`,
      {
        completed: !status,
      },
      {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      }
    );
    fetchTasks();
  };

  if (loading) return <div>Loading...</div>;

  return (
    authContext.isLoggedIn && (
      <Layout>
        <h1>Dashboard</h1>
        <p>
          Hello {name}, you have been a member since{" "}
          {moment(memberSince).format("MMMM Do YYYY")}. Please see below for
          your tasks.
        </p>
        <h3>Add new task</h3>
        <input
          type="text"
          placeholder="Enter task..."
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddNewTask}>Add It!</button>
        <h3>Tasks</h3>
        {taskList.length === 0 && <h1>You are all done</h1>}
        {taskList.map((task, index) => (
          <TaskCard
            key={index}
            {...task}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
          />
        ))}
        <button className="logout" onClick={logoutHandler}>
          Logout
        </button>
      </Layout>
    )
  );
}
