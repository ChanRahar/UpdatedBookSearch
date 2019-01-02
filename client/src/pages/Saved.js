import React, { Component } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../utils/API";
import { Booklist, BookListItem } from "../components/BookList";
import { Container, Row, Col } from "../components/Grid";

const border = {
    border: "1px solid ",
    padding: "30px"
};

let bookData = [];

class Search extends Component {
    state = {
        savedBooks: []
    };

    //   handleInputChange = event => {
    //     // Destructure the name and value properties off of event.target
    //     // Update the appropriate state
    //     const { name, value } = event.target;
    //     this.setState({
    //       [name]: value
    //     });
    //   };

    // saveBook = (data) => {
    //     API.saveBook({
    //       title:title,
    //       authors: data.authors,
    //       description: data.description,
    //       image: data.image,
    //       infoLink: data.infoLink,
    //       ISBN: data.ISBN
    //     })
    //       .then(res => this.loadBooks())
    //       .catch(err => console.log(err));

    // }

    handleFormSubmit = event => {
        // When the form is submitted, prevent its default behavior, get books update the books state
        event.preventDefault();
        bookData = [];
        API.getBooks(this.state.bookSearch)
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

                    this.setState({ books: bookData });
                })
            })
            .catch(err => console.log(err));

        this.setState({ bookSearch: "" })
    };

    render() {
        return (
            <div>
                <Container>
                    <div style={border}>
                        <h4>Saved Books</h4>
                        <Row>
                            <Col size="md-12">
                                {!this.state.savedBooks.length ? (
                                   null) : (
                                        <Booklist>
                                            {this.state.savedBooks.map(book => {
                                                return (
                                                    <BookListItem
                                                        key={book.ISBN}
                                                        title={book.title}
                                                        href={book.infoLink}
                                                        authors={book.authors}
                                                        ingredients={book.description}
                                                        thumbnail={book.image}
                                                        button={"Delete"}
                                                    />
                                                );
                                            })}
                                        </Booklist>
                                    )}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div >
        );
    }
}

export default Search;
