import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CardPokemon from "../components/CardPokemon";
import CardRickAndMorty from "../components/CardRickAndMorty";

const API_URL = process.env.REACT_APP_API_URL;

function Profile() {
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [favoritesRickAndMorty, setFavoritesRickAndMorty] = useState([]);
  const [favoritesPokemon, setFavoritesPokemon] = useState([]);

  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL + "/users/" + id)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get(API_URL + "/favorites/rick-and-morty/" + id + "/data")
      .then((res) => {
        setFavoritesRickAndMorty(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get(API_URL + "/favorites/pokemon/" + id + "/data")
      .then((res) => {
        setFavoritesPokemon(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const uploadProfilePicture = () => {
    if (!file) {
      toast.info("Select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(API_URL + "/users/" + id + "/upload-profile-picture", formData)
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={3}>
            <h1>Profile</h1>
            <Card>
              <img
                src={
                  user.profile_picture
                    ? API_URL + "/uploads/" + user.profile_picture
                    : require("../assets/images/user_placeholder.png")
                }
                alt="Profile"
                className="profile-picture"
              />
              <Card.Body>
                <Card.Title>{user?.name}</Card.Title>
                <Card.Text>{user?.email}</Card.Text>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Change your profile picture</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  onClick={() => uploadProfilePicture()}
                >
                  Upload photo
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <h2>Favorites</h2>
            <h3>Rick and Morty</h3>
            <Row>
              {favoritesRickAndMorty.map((character) => (
                <Col key={character.id} md={4}>
                  <CardRickAndMorty
                    character={character}
                    favorites={favoritesRickAndMorty}
                  />
                </Col>
              ))}
              {favoritesRickAndMorty.length === 0 && (
                <Col>
                  <p>No favorites yet</p>
                </Col>
              )}
            </Row>

            <h3>Pokemon</h3>
            <Row>
              {favoritesPokemon.map((pokemon) => (
                <Col key={pokemon.id} md={4}>
                  <CardPokemon pokemon={pokemon} favorites={favoritesPokemon} />
                </Col>
              ))}
              {favoritesPokemon.length === 0 && (
                <Col>
                  <p>No favorites yet</p>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
