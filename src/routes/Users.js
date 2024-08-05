import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import FormUser from "../components/FormUser";
import { useAuth } from "../provider/authProvider";
import { toast } from "react-toastify";
import TableUsers from "../components/TableUsers";

const API_URL = process.env.REACT_APP_API_URL;

function Users() {
  const { setToken } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [iduser, setIdUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get(API_URL + "/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          setToken();
        }
        if (err.response?.data) toast.error(err.response.data.error);
      });
  }, [setToken]);

  const openUserProfile = (id) => {
    navigate("/profile/" + id);
  };

  const handleModal = (user = null) => {
    if (user) {
      setIdUser(user.iduser);
      setName(user.name);
      setEmail(user.email);
    } else {
      setIdUser(null);
      setName("");
      setEmail("");
    }
    setShowModal(!showModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (iduser === null) {
      addUser();
    } else {
      updateUser();
    }
  };

  const addUser = () => {
    axios
      .post(API_URL + "/register", {
        name,
        email,
      })
      .then((res) => {
        setUsers([...users, res.data.user]);
        handleModal();
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          setToken();
        }
        if (err.response?.data) toast.error(err.response.data.error);
      });
  };

  const updateUser = () => {
    axios
      .put(API_URL + "/users/" + iduser, {
        name,
        email,
      })
      .then((res) => {
        setUsers(
          users.map((user) => {
            if (user.iduser === iduser) {
              return res.data.user;
            }
            return user;
          })
        );
        handleModal();
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          setToken();
        }
        if (err.response?.data) toast.error(err.response.data.error);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(API_URL + "/users/" + id)
      .then((res) => {
        setUsers(users.filter((user) => user.iduser !== id));
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          setToken();
        }
        if (err.response?.data) toast.error(err.response.data.error);
      });
  };

  return (
    <div className="App">
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1>Users</h1>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={() => handleModal()}>
              Add user
            </Button>
          </Col>
        </Row>
        <TableUsers
          users={users}
          openUserProfile={openUserProfile}
          handleModal={handleModal}
          deleteUser={deleteUser}
        />
      </Container>

      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{iduser ? "Edit user" : "Add user"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormUser
            user={{ iduser, name, email }}
            handleSubmit={handleSubmit}
            setName={setName}
            setEmail={setEmail}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Users;
