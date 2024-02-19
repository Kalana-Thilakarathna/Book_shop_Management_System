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
} from "react-bootstrap";
import styles from "./editbook.module.scss";
import {useNavigate, useParams} from 'react-router-dom'

function EditBook() {
  const {id} = useParams()
  const [title, setBookTitle] = useState("");
  const [ISBN, setBookISBN] = useState("");
  const [author, setBookAuthor] = useState("");
  const [publishedYear, setBookYear] = useState("");
  const [description, setBookDescription] = useState("");
  const [price, setPrice] = useState(0)
  const navigation = useNavigate()

  const handleSubmit = () => {
    const data = {
      title,
      ISBN,
      author,
      publishedYear,
      description,
      price
    }

    axios
      .put(`http://localhost:5000/books/${id}`,data)
      .then((response)=>{
        console.log(response.data)
        alert(response.data.message)

        navigation("/")
      })
      .catch(error=>{
        alert(error.message)
      })
  }

  useEffect(()=>{
    const fetchBook = async () =>{
      const response = await axios.get(`http://localhost:5000/books/${id}`)
      setBookAuthor(response.data.data.author)
      setBookDescription(response.data.data.description)
      setBookISBN(response.data.data.ISBN)
      setBookTitle(response.data.data.title)
      setBookYear(response.data.data.publishedYear)
      setPrice(response.data.data.price)
      
    }
    fetchBook()
  },[])

  return (
    <Container className={styles.createbook}>
      <Row>
        <Col>
          <h1>Edit Book</h1>
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
                      value={title}
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
                      value={ISBN}
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
                      value={author}
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
                      value={publishedYear}
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
                      value={price}
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
                      value={description}
                      placeholder="Enter a book description"
                      style={{ height: "100px" }}
                      onChange={(e) => setBookDescription(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">
                      Enter a book description
                    </label>
                  </Form.Floating>
                </Stack>
                <Stack
                  gap={2}
                  direction="horizontal"
                  className="justify-content-end mt-3"
                >
                  <Button variant="warning" onClick={() => navigation("..")}>Back</Button>
                  <Button variant="primary" type="button" onClick={handleSubmit}>
                    Update
                  </Button>
                </Stack>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditBook
