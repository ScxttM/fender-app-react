import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FormUser = (props) => {
  return (
    <Form onSubmit={props.handleSubmit} autoComplete="off">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the name"
          name="name"
          value={props.user.name}
          onChange={(e) => props.setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={props.user.email}
          onChange={(e) => props.setEmail(e.target.value)}
        />
      </Form.Group>

      <Row className="text-end">
        <Col>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormUser;
