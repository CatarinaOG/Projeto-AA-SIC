import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeUser from "./Pages/HomeUser";
import BoughtTickets from "./Pages/BoughtTickets";

import "./Styles/General.css";
import "./Styles/Event.css";
import BuyTicket from "./Pages/BuyTicket";
import SellingListing from "./Pages/SellingListing";
import SavedEvents from "./Pages/SavedEvents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SavedEvents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
