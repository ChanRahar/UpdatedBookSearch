import React, { Component } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../utils/API";
import { RecipeList, RecipeListItem } from "../components/RecipeList";
import { Container, Row, Col } from "../components/Grid";

const border = {
  border: "1px solid ",
  padding: "30px"
};

let bookData = [];

class Saved extends Component {
  state = {
    recipes: [],
    recipeSearch: ""
  };

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    bookData = [];
    API.getRecipes(this.state.recipeSearch)
      .then(res => {
        res.data.items.forEach(data => {
          // console.log(data.volumeInfo.imageLinks.smallThumbnail);
          bookData.push({
            title: data.volumeInfo.title,
            authors: data.volumeInfo.authors,
            description: data.volumeInfo.description,
            image: data.volumeInfo.imageLinks.thumbnail,
            infoLink: data.volumeInfo.infoLink,
            ISBN: data.volumeInfo.industryIdentifiers[0].identifier
          })

          this.setState({ recipes: bookData });
        })
      })
      .catch(err => console.log(err));

    this.setState({ recipeSearch: "" })
  };

  render() {
    return (
      <div>
        <Container>
          <div style={border}>
            <h4>Saved Books</h4>
            <Row>
              <Col size="md-12">
                {!this.state.recipes.length ? (
                  <h1 className="text-center">Search above to display books</h1>
                ) : (
                    <RecipeList>
                      {this.state.recipes.map(recipe => {
                        return (
                          <RecipeListItem
                            key={recipe.ISBN}
                            title={recipe.title}
                            href={recipe.infoLink}
                            authors={recipe.authors}
                            ingredients={recipe.description}
                            thumbnail={recipe.image}
                            button = {"Delete"}
                          />
                        );
                      })}
                    </RecipeList>
                  )}
              </Col>
            </Row>
          </div>
        </Container>
      </div >
    );
  }
}

export default Saved;
