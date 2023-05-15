import * as React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Product from "./page/product";

import { ChakraProvider } from "@chakra-ui/react";
import Register from "./page/register";
import Login from "./page/login";
import UserProfilePage from "./page/profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Product />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/profile" exact element={<UserProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
