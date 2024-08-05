import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import placeholder from "../assets/images/placeholder.png";

const CardRickAndMorty = ({ character, handleFavorite, favorites }) => {
  return (
    <Card>
      <LazyLoadImage
        src={character.image}
        alt={character.name}
        placeholderSrc={placeholder}
        effect="blur"
        style={{ width: "100%" }}
      />
      <Card.Body>
        <Card.Title>
          {handleFavorite ? (
            <Row className="align-items-center">
              <Col xs={10} sm={9} lg={10}>
                {character.name}
              </Col>
              <Col xs={2} sm={3} lg={2}>
                {favorites.includes(character.id) ? (
                  <IoMdHeart
                    color="red"
                    onClick={() => handleFavorite(character.id)}
                  />
                ) : (
                  <IoMdHeartEmpty
                    color="red"
                    onClick={() => handleFavorite(character.id)}
                  />
                )}
              </Col>
            </Row>
          ) : (
            character.name
          )}
        </Card.Title>
        <Card.Text>Status: {character.status}</Card.Text>
        <Card.Text>Species: {character.species}</Card.Text>
        <Card.Text>Location: {character.location.name}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardRickAndMorty;
