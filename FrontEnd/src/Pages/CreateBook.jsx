/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Container,
  Row,
  Col,
  Card,
  Stack,
  Button,
  ProgressBar,
} from "react-bootstrap";
import styles from "./createbook.module.scss";
import { useNavigate } from "react-router-dom";

function CreateBook() {
  const [title, setBookTitle] = useState("");
  const [ISBN, setBookISBN] = useState("");
  const [author, setBookAuthor] = useState("");
  const [publishedYear, setBookYear] = useState(0);
  const [description, setBookDescription] = useState("");
  const [price, setPrice] = useState(0)
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const navigation = useNavigate();

  const handleSubmit = () => {
    setShow(true)
    const data = {
      title,
      ISBN,
      author,
      publishedYear,
      description,
      price
    };

    axios
      .post("http://localhost:5000/books", data)
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);

        navigation("/");
        setShow(false)
      })
      .catch((error) => {
        setShow(false)
        alert(error.message);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 10 : prevProgress
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [show]);

  return (
    <Container className={styles.createbook}>
      <Row>
        <Col>
          <Stack gap={2} direction="horizontal">
            <h1>Add a Book to the System</h1>
          </Stack>
        </Col>
      </Row>
      <Row className={styles.card_body}>
        <Col xs={6}>
          <Card className="px-2 py-2" border="primary">
            <Card.Title>
              <h2>Book Details</h2>
            </Card.Title>
            <Card.Body className="px-2">
              <Form>
                <Stack gap={2}>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="bookTitle"
                      type="text"
                      placeholder="Enter book title"
                      onChange={(e) => setBookTitle(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">
                      Enter book title
                    </label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="bookISBN"
                      type="text"
                      placeholder="Enter book ISBN number"
                      onChange={(e) => setBookISBN(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">
                      Enter book ISBN number
                    </label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="bookauthor"
                      type="text"
                      placeholder="Enter book Author's name"
                      onChange={(e) => setBookAuthor(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">
                      book Author&apos;s name
                    </label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="bookYear"
                      type="number"
                      placeholder="Enter book's published year"
                      onChange={(e) => setBookYear(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">
                      Enter book&apos;s published year
                    </label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="bookPrice"
                      type="number"
                      placeholder="Enter book's price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">
                      Enter book&apos;s price
                    </label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="bookdescription"
                      as="textarea"
                      placeholder="Enter a book description"
                      style={{ height: "100px" }}
                      onChange={(e) => setBookDescription(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">
                      Enter a book description
                    </label>
                  </Form.Floating>
                </Stack>
                {show ? (
                  <ProgressBar now={progress} label={`${progress}%`} />
                ) : (
                  <Stack
                    gap={2}
                    direction="horizontal"
                    className="justify-content-end mt-3"
                  >
                    <Button variant="warning" onClick={() => navigation("..")}>
                      Back
                    </Button>
                    <Button variant="danger" type="clear">
                      Clear
                    </Button>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Stack>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateBook;
