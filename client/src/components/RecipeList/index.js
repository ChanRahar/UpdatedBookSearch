import React from "react";
import { Container, Row, Col } from "../Grid";
import Button from "../Button";

const block = {
  display:"block",
  margin: "0 auto"
}

// Exporting both RecipeList and RecipeListItem from this file

// RecipeList renders a bootstrap list item
export function RecipeList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function RecipeListItem({
  thumbnail = "https://placehold.it/300x300",
  title,
  ingredients,
  href,
  button,
  onClick
}) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="md-3">
            <img style ={block} className="rounded" src={thumbnail} />
          </Col>
          <Col size="md-9">
            <Button
              type="primary"
              size="btn-sm"
              onClick={onClick}>
              {button}
            </Button>
            <a rel="noreferrer noopener" target="_blank" href={href} >
            <Button
              type="secondaryy"
              size="btn-sm">
              View
            </Button>
            </a>
            <h3>{title}</h3>
            <p>Ingredients: {ingredients}</p>
          </Col>
        </Row>
      </Container>
      {/* <div className="card">
        <h5 className="card-header">Featured</h5>
        <div className="card-body">
        <img className="card-img" src={thumbnail}/>
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div> */}
    </li>
  );
}
