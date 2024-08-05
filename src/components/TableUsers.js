import React from "react";
import { Table, DropdownButton, Dropdown } from "react-bootstrap";

function TableUsers({ users, openUserProfile, handleModal, deleteUser }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr className="text-center">
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.iduser} className="align-middle">
            <td>{user.iduser}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className="text-center">
              <DropdownButton variant="secondary" title="Actions">
                <Dropdown.Item onClick={() => openUserProfile(user.iduser)}>
                  View profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleModal(user)}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={() => deleteUser(user.iduser)}>
                  Delete
                </Dropdown.Item>
              </DropdownButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableUsers;
