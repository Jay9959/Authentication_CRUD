import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addBookAsync } from "../Redux/actions/book.action";
import { useNavigate } from "react-router";
import generateUniqueId from "generate-unique-id";

const AddBook = () => {
  const { error, isCreated } = useSelector((state) => state.bookReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [bookInput, setBookInput] = useState({
    image: "",
    title: "",
    author: "",
    category: "",
    price: "",
    description: "",
    pages: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInput({ ...bookInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      let id = generateUniqueId({ length: 2, useLetters: false });
      dispatch(addBookAsync({ ...bookInput, id: id.toString() }));
    }
    setValidated(true);
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/");
    }
  }, [isCreated, navigate]);

  return (
    <Container>
      {error && <p className="text-danger">{error}</p>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2">Upload Image</Form.Label>
          <Col sm="10">
            <Form.Control placeholder="Enter Book Image" name="image" value={bookInput.image} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">Please upload an image.</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2">Book Title</Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter Book Title" name="title" value={bookInput.title} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">Title is required.</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2"> Book Author</Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter Book Author" name="author" value={bookInput.author} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">Author is required.</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2">Book Pages</Form.Label>
          <Col sm="10">
            <Form.Control type="number" placeholder="Enter Total Pages" name="pages" value={bookInput.pages} onChange={handleChange} required min="1" />
            <Form.Control.Feedback type="invalid">Enter a valid number of pages.</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2">Book Category</Form.Label>
          <Col sm="10">
            <Form.Select name="category" value={bookInput.category} onChange={handleChange} required>
              <option value="">Select a Category</option>
              <option value="Horror">Horror</option>
              <option value="Science fiction">Science fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Literary fiction">Literary fiction</option>
              <option value="Memoir">Memoir</option>
              <option value="Poetry">Poetry</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please select a category.</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2">Book Price</Form.Label>
          <Col sm="10">
            <Form.Control type="numder" placeholder="Enter Price" name="price" value={bookInput.price} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">price is required.</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2">Book Description</Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter Description" name="description" value={bookInput.description} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2"></Form.Label>
          <Col sm="10">
            <Button href="/" className="me-4" variant="secondary">Back</Button>
            <Button type="submit">Add Book</Button>
          </Col>
        </Form.Group>

      </Form>
    </Container>
  );
}

export default AddBook;
