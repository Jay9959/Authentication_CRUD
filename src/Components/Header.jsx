import { Container, Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOutAsync } from "../Redux/actions/auth.action";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducer);
  const handleLogOut = () => {
    dispatch(logOutAsync());
  }
  return (
    <>
      <Container>
        <Navbar className="border bg-body-tertiary text-dark mb-5">
          <Container>
            {user ? <Nav.Link href="/add">Home</Nav.Link> : ""}
            {user ? <Nav.Link href="/add">Add Recipes</Nav.Link> : ""}
            {!user ? <Nav.Link href="/login">Login</Nav.Link> : <button className="border-0 bg-transparent" onClick={handleLogOut}>Logout</button>}
          </Container>
        </Navbar>
      </Container>
    </>
  );
}

export default Header;
