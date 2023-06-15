import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeUser from "./Pages/HomeUser";
import BoughtTickets from "./Pages/BoughtTickets";

import "./Styles/General.css";
import "./Styles/Event.css";
import "./Styles/PaymentMethods.css";

import PaymentMethods from "./Pages/PaymentMethods";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaymentMethods />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
