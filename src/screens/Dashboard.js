import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import TaskCard from "../components/TaskCard";
import styled from "styled-components";
import NewTask from "../components/NewTask";
import { useNavigate } from "@reach/router";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [taskList, setTaskList] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const taskResponse = await axios.get("/tasks?sortBy=completed:asc", {
      headers: {
        Authorization: "Bearer " + token,
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
    await axios
      .get("/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setName(res.data.name);
        setMemberSince(res.data.createdAt);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            console.log("status", error.response.status);
            navigate("/login");
          }
        }
      });
  };

  const logoutHandler = async () => {
    await axios.post("/users/logout", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  const handleAddNewTask = async (newTask) => {
    await axios.post(
      "/tasks",
      {
        description: newTask,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
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
        Authorization: "Bearer " + token,
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
          Authorization: "Bearer " + token,
        },
      }
    );
    fetchTasks();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Heading>Dashboard</Heading>
      <UserInfo>
        Hello {name}, you have been a member since{" "}
        {moment(memberSince).format("MMMM Do YYYY")}. Please see below for your
        tasks.
      </UserInfo>
      <Subheading>Add new task</Subheading>
      <NewTask handleAddNewTask={handleAddNewTask} />
      <Subheading>Tasks</Subheading>
      {taskList.length === 0 && (
        <NoTaskText>Congrats, you have no tasks remaining</NoTaskText>
      )}
      <Grid>
        {taskList.map((task, index) => (
          <TaskCard
            key={index}
            {...task}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
          />
        ))}
      </Grid>
      <LogoutButton className="logout" onClick={logoutHandler}>
        Logout
      </LogoutButton>
    </Container>
  );
}

const Container = styled.div`
  margin: 24px 48px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: flex;
  width: 90vw;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
`;

const Heading = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 900;
`;

const Subheading = styled.div`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
`;

const UserInfo = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  margin: 20px 0;
  text-align: center;
`;

const LogoutButton = styled.button`
  width: 100%;
  color: white;
  background-color: #214e34;
  padding: 10px 15px;
  border: none;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
  border-radius: 16px;
`;

const NoTaskText = styled.h1`
  color: #214e34;
  font-weight: 900;
  text-align: center;
  margin: 20px 0;
`;
