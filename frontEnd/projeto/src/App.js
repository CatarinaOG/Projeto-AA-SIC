import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BuyTicket from "./Pages/BuyTicket"


import "./Styles/General.css"

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <BuyTicket />
        }/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
