import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addRecipeAsync } from "../Redux/actions/recipe.action";
import { useNavigate } from "react-router";
import generateUniqueId from "generate-unique-id";

const AddRecipes = () => {
  const { error, isCreated } = useSelector((state) => state.recipeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [recipesInput, setRecipesInput] = useState({
    image: "",
    title: "",
    author: "",
    category: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipesInput({ ...recipesInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      let id = generateUniqueId({ length: 2, useLetters: false });
      dispatch(addRecipeAsync({ ...recipesInput, id: id.toString() }));
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
            <Form.Control placeholder="Enter Recipes Image" name="image" value={recipesInput.image} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">Please upload an image.</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2">Recipes Title</Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter Recipes Title" name="title" value={recipesInput.title} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">Title is required.</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2"> Recipes Author</Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter Recipes Author" name="author" value={recipesInput.author} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">Author is required.</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2">Recipes Price</Form.Label>
          <Col sm="10">
            <Form.Control type="numder" placeholder="Enter Price" name="price" value={recipesInput.price} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">price is required.</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm="2">Recipes Description</Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter Description" name="description" value={recipesInput.description} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2"></Form.Label>
          <Col sm="10">
            <Button href="/" className="me-4" variant="secondary">Back</Button>
            <Button type="submit">Add Recipes</Button>
          </Col>
        </Form.Group>

      </Form>
    </Container>
  );
}

export default AddRecipes;
