import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeUser from "./Pages/HomeUser"


import "./Styles/General.css"
import "./Styles/Event.css"

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <HomeUser />
        }/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
