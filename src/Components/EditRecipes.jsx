import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { singleRecipeAsync, updateRecipeAsync } from "../Redux/actions/recipe.action";
import { useNavigate, useParams } from "react-router";

const EditRecipes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipe, isUpdated } = useSelector(state => state.recipeReducer)
  const [recipesInput, setRecipesInput] = useState({
    id: "",
    image: "",
    title: "",
    author: "",
    category: "",
    price: "",
    description: "",
  });

  const handelChanged = (e) => {
    const { name, value } = e.target;
    setRecipesInput({
      ...recipesInput,
      [name]: value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log("Submit now", recipesInput);

    dispatch(updateRecipeAsync(recipesInput));
  };

  useEffect(() => {
    dispatch(singleRecipeAsync(id));
  }, [])
  useEffect(() => {
    if (recipe)
      setRecipesInput(recipe);
  }, [recipe])

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
                value={recipesInput.image}
                onChange={handelChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Recipes Title
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter recipe Title"
                name="title"
                value={recipesInput.title}
                onChange={handelChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Recipes Author
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter recipe Author"
                name="author"
                value={recipesInput.author}
                onChange={handelChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="2">Recipes Price</Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Enter Price" name="price" value={recipesInput.description} onChange={handelChanged} required />
              <Form.Control.Feedback type="invalid">price is required.</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="2">
              Recipes description
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Recipes Description"
                name="description"
                value={recipesInput.description}
                onChange={handelChanged}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2"></Form.Label>
            <Col sm="10">
              <Button href="/" className="me-4" variant="secondary">Back</Button>
              <Button type="submit">Update Recipe</Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default EditRecipes;
