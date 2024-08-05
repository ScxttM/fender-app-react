import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
  const { setToken, setId } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Email is required");
      return;
    }

    if (password === "") {
      toast.error("Password is required");
      return;
    }

    axios
      .post(API_URL + "/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.firstLogin) {
          navigate("/changePassword/" + res.data.iduser, {
            replace: true,
            state: { name: res.data.name, token: res.data.token },
          });
          return;
        }
        setToken(res.data.token);
        setId(res.data.iduser);
        navigate("/", { replace: true });
        toast.success("Welcome " + res.data.name);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.error);
      });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    if (name === "") {
      toast.error("Name is required");
      return;
    }

    if (email === "") {
      toast.error("Email is required");
      return;
    }

    axios
      .post(API_URL + "/register", {
        name,
        email,
      })
      .then((res) => {
        setName("");
        setEmail("");
        toast.success("User registered successfully");
        setShowRegister(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error registering user");
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="Login">
      <img
        src={require("../assets/images/fender-logo.png")}
        alt="logo"
        style={{ width: "400px", marginTop: "-150px" }}
      />
      <h1>Welcome</h1>
      {showRegister ? (
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="success"
            type="button"
            onClick={handleSubmitRegister}
          >
            Register
          </Button>
          <hr></hr>
          <Button
            variant="secondary"
            onClick={() => {
              setShowRegister(false);
            }}
          >
            Back to login
          </Button>
        </Form>
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </Form.Group>
          <Button variant="success" type="button" onClick={handleSubmit}>
            Login
          </Button>
          <hr></hr>
          <h5>Don't have an account?</h5>
          <Button
            variant="secondary"
            onClick={() => {
              setShowRegister(true);
            }}
          >
            Register
          </Button>
        </Form>
      )}
    </div>
  );
}
export default Login;
