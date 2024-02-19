/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Spinner from "../Components/Spinner";
import styles from "./showBook.module.scss";

function ShowBook() {
  const [book, setBook] = useState([]);
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    setLoad(true);
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(response.data.data);
        setLoad(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBooks();
  }, []);

  return (
    <Container className={styles.containe}>
      <Row>
        <Col>
          <h1>Book Details</h1>
        </Col>
      </Row>
      <Row className={styles.book_card}>
        <Col>
          {load ? (
            <div className={styles.spinner}>
              <Spinner />
            </div>
          ) : (
            <Card border="primary">
              <Card.Header style={{ fontSize: "20px", fontWeight: "bold" }}>
                <Row>
                  <Col>Title: {book.title}</Col>
                  <Col xs="auto">ISBN: {book.ISBN ? book.ISBN : "null"}</Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Text style={{ fontSize: "16px" }}>
                      <p>
                        Author: <span>{book.author}</span>
                      </p>
                      <p>
                        Published Year: <span>{book.publishedYear}</span>
                      </p>
                      <p>
                        Price: <span>Rs. {book.price}</span>
                      </p>
                      <p className={styles.des}>
                        Description: <span>{book.description}</span>
                      </p>
                      <p>
                        Created At:{" "}
                        <span>{new Date(book.createdAt).toString()}</span>
                      </p>
                      <p>
                        Updated At:{" "}
                        <span>{new Date(book.updatedAt).toString()}</span>
                      </p>
                    </Card.Text>
                  </Col>
                  <Col xs="2"></Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          <Row>
            <Col></Col>
            <Col xs="auto" className="mt-3">
              <Link to="..">
                <Button variant="warning">Back</Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ShowBook;
