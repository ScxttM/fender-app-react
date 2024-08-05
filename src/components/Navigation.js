import React from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { BiLogOut, BiUser } from "react-icons/bi";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navigation = () => {
  const { setToken, id } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    axios.post(process.env.REACT_APP_API_URL + "/logout");
    setToken();
    navigate("/", { replace: true });
    toast.success("Logged out successfully");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={require("../assets/images/fender-logo.png")}
              alt="logo"
              height={65}
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link className="py-0">
                <span style={{ fontSize: "24px" }}>Home</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/users">
              <Nav.Link className="py-0">
                <span style={{ fontSize: "24px" }}>Users</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/rick-and-morty">
              <Nav.Link className="py-0">
                <span style={{ fontSize: "24px" }}>Rick and Morty</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/pokemon">
              <Nav.Link className="py-0">
                <span style={{ fontSize: "24px" }}>Pokemon</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/versus">
              <Nav.Link className="py-0">
                <span style={{ fontSize: "24px" }}>Versus</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Dropdown drop="down-centered">
            <Dropdown.Toggle variant="link">
              <img
                src={require("../assets/images/user_placeholder.png")}
                alt="user"
                className="navigation-user-profile-picture"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/profile/" + id)}>
                <BiUser className="mx-1" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  logout();
                }}
              >
                <BiLogOut className="mx-1" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
