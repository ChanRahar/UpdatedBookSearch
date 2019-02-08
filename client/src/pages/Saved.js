import React, { Component } from "react";
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
    componentDidMount() {
        this.loadBooks();
      }

    loadBooks = () => {
        API.getSavedBooks()
          .then(res =>
            this.setState({ savedBooks: res.data})
          )
          .catch(err => console.log(err));
      };

      deleteBook = id => {
        API.deleteBook(id)
          .then(res => this.loadBooks())
          .catch(err => console.log(err));
      };

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
            <div className="pt-5">
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
                                                        description={book.description}
                                                        thumbnail={book.image}
                                                        button={"Delete"}
                                                        onClick={() => this.deleteBook(book._id)}
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
