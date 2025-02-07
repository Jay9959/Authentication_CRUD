import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookAsync, getAllBooksAsync } from "../Redux/actions/book.action";
import { useNavigate } from "react-router";
import Login from "./Auth/Login";
import { FaUserEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { PiEyeFill } from "react-icons/pi";
import { Container, Row, Col, Card, Button, Spinner, Form } from "react-bootstrap";

const DisplayBook = () => {
    const { user } = useSelector(state => state.authReducer);
    const { books, isLoading } = useSelector((state) => state.bookReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [sortedBooks, setSortedBooks] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        dispatch(getAllBooksAsync());
    }, [dispatch]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        let filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sorted = [...filteredBooks].sort((a, b) =>
            sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );

        setSortedBooks(sorted);
    }, [books, searchTerm, sortOrder]);

    const handleEdit = (id) => navigate(`/edit/${id}`);
    const handleDelete = (id) => dispatch(deleteBookAsync(id));
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
            ) : books.length === 0 ? (
                <h4 className="text-center">No Books Found</h4>
            ) : (
                <>
                    <div className="d-flex justify-content-between mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Search books..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Button variant="secondary" className="ms-3 " onClick={toggleSortOrder}>
                            {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
                        </Button>
                    </div>
                    <Row>
                        {sortedBooks.map((book) => (
                            <Col md={4} sm={6} key={book.id} className="mb-4">
                                <Card>
                                    <Card.Img src={book.image} width={"100%"} height={"300vh"} />
                                    <Card.Body>
                                        <figure className="text-end">
                                            <blockquote className="blockquote">
                                                <Card.Title style={{ wordWrap: "break-word", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 1 }}>{book.title}</Card.Title>
                                            </blockquote>
                                            <figcaption className="blockquote-footer">
                                                <cite title="Source Title">{book.author}</cite>
                                            </figcaption>
                                        </figure>
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-between">
                                        <Button variant="primary" onClick={() => handleEdit(book.id)}>
                                            <FaUserEdit /> Edit
                                        </Button>

                                        <Button variant="danger" onClick={() => handleDelete(book.id)}>
                                            <FaTrash /> Delete
                                        </Button>

                                        <Button variant="info" onClick={() => handleView(book.id)}>
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

export default DisplayBook;