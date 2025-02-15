import { useEffect, useState } from "react";
import { deleteRecipeAsync, getAllRecipesAsync } from "../Redux/actions/recipe.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Login from "./Auth/Login";
import { FaUserEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { PiEyeFill } from "react-icons/pi";
import { Container, Row, Col, Card, Button, Spinner, Form } from "react-bootstrap";

const DisplayRecipes = () => {
    const { user } = useSelector(state => state.authReducer);
    const { reciprs  } = useState([]);
    const { isLoading } = useSelector((state) => state.recipeReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [sortedRecipes, setSortedRecipes] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        dispatch(getAllRecipesAsync());
    }, [dispatch]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        let filteredRecipes = reciprs?.filter(recipe =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.author.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];

        const sorted = [...filteredRecipes].sort((a, b) =>
            sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );

        setSortedRecipes(sorted);
    }, [reciprs, searchTerm, sortOrder]);

    const handleEdit = (id) => navigate(`/edit/${id}`);
    const handleDelete = (id) => dispatch(deleteRecipeAsync(id));
    const handleView = (id) => navigate(`/view/${id}`);
    const handleSearch = (e) => setSearchTerm(e.target.value);
    const toggleSortOrder = () => setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    return (
        <Container className="mt-4">
            {!user ? (
                <Login />
            ) : isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : reciprs?.length === 0 ? (
                <h4 className="text-center">No Recipes Found</h4>
            ) : (
                <>
                    <div className="d-flex justify-content-between mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Search Recipes..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Button variant="secondary" className="ms-3 " onClick={toggleSortOrder}>
                            {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
                        </Button>
                    </div>
                    <Row>
                        {sortedRecipes.map((recipe) => (
                            <Col md={4} sm={6} key={recipe.id} className="mb-4">
                                <Card>
                                    <Card.Img src={recipe.image} width={"100%"} height={"300vh"} />
                                    <Card.Body>
                                        <figure className="text-end">
                                            <blockquote className="blockquote">
                                                <Card.Title style={{ wordWrap: "break-word", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 1 }}>{recipe.title}</Card.Title>
                                            </blockquote>
                                            <figcaption className="blockquote-footer">
                                                <cite title="Source Title">{recipe.author}</cite>
                                            </figcaption>
                                        </figure>
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-between">
                                        <Button variant="primary" onClick={() => handleEdit(recipe.id)}>
                                            <FaUserEdit /> Edit
                                        </Button>

                                        <Button variant="danger" onClick={() => handleDelete(recipe.id)}>
                                            <FaTrash /> Delete
                                        </Button>

                                        <Button variant="info" onClick={() => handleView(recipe.id)}>
                                            <PiEyeFill /> View
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
};

export default DisplayRecipes;