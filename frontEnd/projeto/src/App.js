import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Pages/Home'
import HomeUser from "./Pages/HomeUser"
import HomeAdmin from "./Pages/HomeAdmin"
import HomePromoter from "./Pages/HomePromoter"
import BuyTicket from "./Pages/BuyTicket"



import "./Styles/General.css"

function App() {
  return (

    <BrowserRouter>
      <Routes>

        <Route path="/Home" element={
          <Home />
        }/>

        <Route path="/HomeUser" element={
          <HomeUser />
        }/>

        <Route path="/" element={
          <BuyTicket />
        }/>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
