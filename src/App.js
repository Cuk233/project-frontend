import * as React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import Register from "./page/register";
import Login from "./page/login";
import UserProfilePage from "./page/profile";
import ProfileEdit from "./page/ProfileEdit";
import Homepage from "./page/homepage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" exact element={<Register />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/profile" exact element={<UserProfilePage />} />
        <Route path="/home" exact element={<Homepage />} />
        <Route path="/profile/edit" exact element={<ProfileEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
