import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CardRickAndMorty from "../components/CardRickAndMorty";
import CardPokemon from "../components/CardPokemon";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Versus() {
  const [character, setCharacter] = useState(null);
  const [pokemon, setPokemon] = useState(null);

  const getRandom = () => {
    axios
      .get(API_URL + "/rick-and-morty/random")
      .then((res) => {
        setCharacter(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(API_URL + "/pokemon/random")
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getRandom();
  }, []);

  return (
    <div className="Login">
      <Container>
        <h1>Versus</h1>
        <Row>
          <Col md={4}>
            <h2>Rick and Morty</h2>
            {character && <CardRickAndMorty character={character} />}
          </Col>
          <Col md={4}>
            <Button variant="primary" onClick={() => getRandom()}>
              Randomize
            </Button>
          </Col>
          <Col md={4}>
            <h2>Pokemon</h2>
            {pokemon && <CardPokemon pokemon={pokemon} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Versus;
