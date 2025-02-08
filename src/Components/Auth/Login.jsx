import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { googleLoginAsync, loginUserAsync } from "../../Redux/actions/auth.action";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector(state => state.authReducer);
  const [inputForm, setInputForm] = useState({
    email: "",
    password: ""
  });

  const handelChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value
    })
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync(inputForm));
  }

  const handleGoogleLogin = () => {
    dispatch(googleLoginAsync())
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user]);

  return (
    <>
      <Row className="mt-5 login">
        <Col>
          <img src="/public/login-bg.png" width={"110%"} alt="" />
        </Col>
        <Col style={{ marginTop: "7%" }}>
          <h3 className="mb-5">Login User</h3>
          {error ? <p>{error}</p> : ""}
          <Form onSubmit={handelSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={inputForm.email}
                  onChange={handelChanged}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={inputForm.password}
                  onChange={handelChanged}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2"></Form.Label>
              <Col sm="10" className="flex">
                <button onClick={handleGoogleLogin} className="border-0 bg-transparent"><img src="/public/goole.logo.png" width={180} alt="" style={{ marginLeft: "-60%" }} /></button>
              </Col>
              <hr className="mt-3 w-50 mx-auto" />
              <button type="submit" className="border-0 bg-transparent " style={{
                marginLeft : "15px"
              }}>Login</button>
            </Form.Group>
          </Form>
          <p>Create an Account ? <Link className="text-decoration-none text-danger fw-bold" to={"/signup"}>SignUp</Link></p>
        </Col>
      </Row>
    </>
  )
};

export default Login;