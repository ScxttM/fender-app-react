import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import placeholder from "../assets/images/placeholder.png";

const CardPokemon = ({ pokemon, handleFavorite, favorites }) => {
  return (
    <Card>
      <LazyLoadImage
        src={pokemon.image}
        alt={pokemon.name}
        placeholderSrc={placeholder}
        effect="blur"
        style={{ width: "100%" }}
      />
      <Card.Body>
        <Card.Title>
          {handleFavorite ? (
            <Row className="align-items-center">
              <Col xs={10} sm={9} lg={10}>
                {pokemon.name}
              </Col>
              <Col xs={2} sm={3} lg={2}>
                {favorites.includes(pokemon.id) ? (
                  <IoMdHeart
                    color="red"
                    onClick={() => handleFavorite(pokemon.id)}
                  />
                ) : (
                  <IoMdHeartEmpty
                    color="red"
                    onClick={() => handleFavorite(pokemon.id)}
                  />
                )}
              </Col>
            </Row>
          ) : (
            pokemon.name
          )}
        </Card.Title>
        <Card.Text>
          Type: <i>{pokemon.types.join(", ")}</i>
        </Card.Text>
        <Card.Text>Abilities: {pokemon.abilities?.join(", ")}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardPokemon;
