import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./Components/Home";
import AddRecipes from "./Components/AddRecipes";
import EditRecipes from "./Components/EditRecipes";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Eye from "./Components/SingleRecipes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/add" element={<AddRecipes />} />
        <Route path="/edit/:id" element={<EditRecipes />} />
        <Route path="/view/:id" element={<Eye />} />
      </Routes>
    </>
  );
}

export default App;
