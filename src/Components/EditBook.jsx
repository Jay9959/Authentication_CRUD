import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { singleBookAsync, updateBookAsync } from "../Redux/actions/book.action";
import { useNavigate, useParams } from "react-router";

const EditBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { book, isUpdated } = useSelector(state => state.bookReducer)
  const [bookInput, setBookInput] = useState({
    id: "",
    image: "",
    title: "",
    author: "",
    category: "",
    price: "",
    description: "",
    pages: ""
  });

  const handelChanged = (e) => {
    const { name, value } = e.target;
    setBookInput({
      ...bookInput,
      [name]: value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log("Submit now", bookInput);

    dispatch(updateBookAsync(bookInput));
  };

  useEffect(() => {
    dispatch(singleBookAsync(id));
  }, [])
  useEffect(() => {
    if (book)
      setBookInput(book);
  }, [book])

  useEffect(() => {
    if (isUpdated) {
      navigate("/");
    }
  }, [isUpdated])
  return (
    <>
      <Container>
        <Form onSubmit={handelSubmit}>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="2">
              Upload Image
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="image"
                value={bookInput.image}
                onChange={handelChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Library Title
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter Book Title"
                name="title"
                value={bookInput.title}
                onChange={handelChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Library Author
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter Book Author"
                name="author"
                value={bookInput.author}
                onChange={handelChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Library Pages
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Enter Book Total pages"
                name="pages"
                value={bookInput.pages}
                onChange={handelChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="2">Book Category</Form.Label>
            <Col sm="10">
              <Form.Select name="category" value={bookInput.category} onChange={handelChanged} required>
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
              <Form.Control type="text" placeholder="Enter Price" name="price" value={bookInput.description} onChange={handelChanged} required />
              <Form.Control.Feedback type="invalid">price is required.</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="2">
              Library description
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Library Description"
                name="description"
                value={bookInput.description}
                onChange={handelChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2"></Form.Label>
            <Col sm="10">
              <Button href="/" className="me-4" variant="secondary">Back</Button>
              <Button type="submit">Update Book</Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default EditBook;
