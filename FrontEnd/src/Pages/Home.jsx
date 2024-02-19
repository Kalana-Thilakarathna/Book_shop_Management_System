/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Stack,
  Card,
} from "react-bootstrap";
import styles from "./homePage.module.scss";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = React.useState([]);
  const [load, setload] = React.useState(false);
  const [deleteBook, setDeleteBook] = React.useState(null);
  const [confirm, setConfirm] = React.useState(null);

  useEffect(() => {
    setload(true);
    fetchBooks();
  }, [deleteBook]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books");
      setBooks(response.data.data);
      setload(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {


        const response = await axios.delete(`http://localhost:5000/books/${id}`);
        alert(response.data.message);
        setDeleteBook(id);

      
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className={styles.containe}>
      

      <Row className="header-page">
        <Col>
          <h1>Book List</h1>
        </Col>
        <Col xs="auto">
          <Button variant="success" className={styles.btn_no_link_style}>
            <Link className={styles.link_text} to="/books/create">
              Add Book
            </Link>
          </Button>
        </Col>
      </Row>
      <Row className={styles.row_booklist}>
        {load ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          <Card
            className={styles.card_body}
            style={{ height: "44rem" }}
            border="primary"
          >
            <Card.Body>
              <ListGroup>
                <Stack gap={2} direction="vertical">
                  {books.map((book) => (
                    
                    <ListGroup.Item
                      variant="info"
                      key={book._id}
                      className={styles.list_item}
                    >
                      <Row className={styles.book_row}>
                        <Col className={styles.book_name}>
                          <span>{book.title}</span>
                        </Col>
                        <Col xs="auto">
                          <Stack gap={2} direction="horizontal">
                            <Button
                              variant="primary"
                              className={styles.btn_no_link_style}
                            >
                              <Link
                                className={styles.link_text}
                                to={`/books/show/${book._id}`}
                              >
                                Details
                              </Link>
                            </Button>
                            <Button
                              variant="outline-secondary"
                              className={styles.btn_no_link_style}
                            >
                              <Link
                                className={styles.link_text}
                                to={`/books/edit/${book._id}`}
                              >
                                Edit
                              </Link>{" "}
                            </Button>
                            {/* <Button
                              variant="outline-warning"
                              className={styles.btn_no_link_style}
                              onClick={handleDelete(book._id)}
                            >
                              <Link
                                className={styles.link_text}
                                to={`/books/delete/${book._id}`}
                              >
                                Remove
                              </Link>
                            </Button> */}


                            <Button
                              variant="outline-warning"
                              className={styles.btn_no_link_style}
                              type="button"
                              onClick={() => handleDelete(book._id)}
                            >
                              Remove
                            </Button>
                          </Stack>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </Stack>
              </ListGroup>
            </Card.Body>
          </Card>
        )}
      </Row>
      
    </Container>
  );
}

export default Home;
