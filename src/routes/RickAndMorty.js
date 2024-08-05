import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import CardRickAndMorty from "../components/CardRickAndMorty";

const API_URL = process.env.REACT_APP_API_URL;

function RickAndMorty() {
  const [info, setInfo] = useState({});
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(API_URL + "/rick-and-morty/?page=" + page)
      .then((res) => {
        setInfo(res.data.info);
        setCharacters(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  useEffect(() => {
    axios
      .get(API_URL + "/favorites/rick-and-morty")
      .then((res) => {
        setFavorites(res.data.map((fav) => fav.id));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
      axios.delete(API_URL + "/favorites/rick-and-morty/" + id);
    } else {
      setFavorites([...favorites, id]);
      axios.post(API_URL + "/favorites/rick-and-morty", { id });
    }
  };

  return (
    <div className="App">
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1>Rick And Morty</h1>
          </Col>
          <Col className="text-end">
            <Button
              variant="primary"
              onClick={() => setPage(page - 1)}
              disabled={info.prev === null}
              className="me-2"
            >
              Previous
            </Button>
            <span className="me-2">Page: {page}</span>
            <Button
              variant="primary"
              onClick={() => setPage(page + 1)}
              disabled={info.next === null}
            >
              Next
            </Button>
          </Col>
        </Row>
        <Row>
          {characters.map((character) => (
            <Col key={character.id} md={3}>
              <CardRickAndMorty
                character={character}
                handleFavorite={handleFavorite}
                favorites={favorites}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default RickAndMorty;
