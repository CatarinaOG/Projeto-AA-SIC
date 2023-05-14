import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Profile from "./Pages/Profile"


import "./Styles/General.css"
import "./Styles/Event.css"

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Profile />
        }/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
