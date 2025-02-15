import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const Eye = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipesRef = doc(db, "recipes", id);
                const recipesSnap = await getDoc(recipesRef);
                if (recipesSnap.exists()) {
                    setRecipes(recipesSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching recipe: ", error);
            }
            setLoading(false);
        };
        fetchRecipes();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center mt-4">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <Container className="mt-4">
            {recipe ? (
                <>
                    <Card className="mt-3">
                        <Card.Body>
                            <img src={recipe.image} style={{ height: "400px", objectFit: "contain" }} alt="" />
                            <h2>{recipe.title}</h2>
                            <p>{recipe.author}</p>
                            <p>{recipe.category}</p>
                            <p>${recipe.price}</p>
                            <p> <strong>{recipe.description}</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia harum dolore sint. Sunt iure ipsum debitis vel voluptatem consequatur amet laborum animi. Incidunt quidem ducimus in laboriosam asperiores vel accusamus voluptatibus qui illum architecto nobis, at ea eum consequuntur animi quae vero temporibus exercitationem recusandae fugiat modi dolores ratione! Quae repudiandae omnis dolore non earum vitae, debitis magnam enim alias itaque ex distinctio vel dignissimos commodi neque expedita tempore quaerat id vero fugiat! Minus aperiam ipsa, neque illum expedita est voluptas laudantium beatae autem, laboriosam optio quaerat omnis quae incidunt, eaque distinctio vero ipsam earum ad quasi. Praesentium, eos ex.</p>

                        </Card.Body>
                    </Card>
                    <Button variant="secondary" className="mt-5" onClick={() => navigate(-1)}>
                        <FaArrowLeft /> Back
                    </Button>
                </>
            ) : (
                <h4 className="text-center mt-4">recipe Not Found</h4>
            )}
        </Container>
    );
};

export default Eye;