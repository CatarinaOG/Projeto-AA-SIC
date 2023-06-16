import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./Styles/General.css";
import "./Styles/Event.css";
import "./Styles/PaymentMethods.css";
import "./Styles/CreatePromoter.css";
import "./Styles/EventsListing.css";
import "./Styles/CreateEvent.css";
import "./Styles/AddVenue.css";

import PaymentMethods from "./Pages/PaymentMethods";
import Notifications from "./Pages/Notifications";
import CreatePromoter from "./Pages/CreatePromoter";
import BoughtTickets from "./Pages/BoughtTickets";
import Browse from "./Pages/Browse";
import Event from "./Pages/Event";
import Home from "./Pages/Home";
import HomeAdmin from "./Pages/HomeAdmin";
import HomePromoter from "./Pages/HomePromoter";
import HomeUser from "./Pages/HomeUser";
import Profile from "./Pages/Profile";
import SavedEvents from "./Pages/SavedEvents";
import SellingListing from "./Pages/SellingListing";
import SellTicket from "./Pages/SellTicket";
import EventsListing from "./Pages/EventsListing";
import CreateEvent from "./Pages/CreateEvent";
import AddVenue from "./Pages/AddVenue";
import FollowedEvents from "./Pages/FollowedEvents";

import "./Styles/General.css";
import "./Styles/Event.css";

function App() {

  const [event,setEvent] = useState()
  const [user,setUser] = useState({
    name: "catarina",
    id: 1,
  })


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FollowedEvents></FollowedEvents>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
