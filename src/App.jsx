import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./Components/Home";
import AddBook from "./Components/AddBook";
import EditBook from "./Components/EditBook";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Eye from "./Components/Singlepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="/view/:id" element={<Eye />} />
      </Routes>
    </>
  );
}

export default App;
