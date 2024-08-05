import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../provider/authProvider";

const API_URL = process.env.REACT_APP_API_URL;

function FirstLogin() {
  const { setToken, setId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const { name, token } = location.state;
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    axios
      .request({
        method: "PUT",
        url: API_URL + "/users/password/" + id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          password,
        },
      })
      .then((res) => {
        setToken(res.data.token);
        setId(res.data.user.iduser);
        navigate("/", { replace: true });
        toast.success("Password changed successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.error);
      });
  };

  return (
    <div className="Login">
      <img
        src={require("../assets/images/fender-logo.png")}
        alt="logo"
        style={{ width: "400px", marginTop: "-150px" }}
      />
      <h3>Welcome, {name}</h3>
      <Form>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Please, change your password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="button" onClick={handleSubmit}>
          Change password
        </Button>
      </Form>
    </div>
  );
}

export default FirstLogin;
