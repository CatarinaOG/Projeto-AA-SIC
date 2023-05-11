import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Pages/Home'
import HomeUser from "./Pages/HomeUser"

import "./Styles/General.css"

function App() {
  return (

    <BrowserRouter>
      <Routes>

        <Route path="/Home" element={
          <Home />
        }/>

        <Route path="/" element={
          <HomeUser />
        }/>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
