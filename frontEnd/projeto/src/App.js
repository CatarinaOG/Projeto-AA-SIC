import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import BoughtTickets from "./Pages/BoughtTickets"
import Browse from "./Pages/Browse"
import Event from "./Pages/Event"
import Home from "./Pages/Home"
import HomeAdmin from "./Pages/HomeAdmin"
import HomePromoter from "./Pages/HomePromoter"
import HomeUser from "./Pages/HomeUser"
import Notifications from "./Pages/Notifications"
import PaymentMethods from "./Pages/PaymentMethods"
import Profile from "./Pages/Profile"
import SavedEvents from "./Pages/SavedEvents"
import SellingListing from "./Pages/SellingListing"
import SellTicket from "./Pages/SellTicket"


import "./Styles/General.css"
import "./Styles/Event.css"

function App() {

  const [event,setEvent] = useState()

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaymentMethods />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
