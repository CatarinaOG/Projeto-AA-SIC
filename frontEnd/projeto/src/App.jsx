import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./Styles/General.css";
import "./Styles/Event.css";
import "./Styles/PaymentMethods.css";
import "./Styles/CreatePromoter.css";
import "./Styles/EventsListing.css";
import "./Styles/CreateEvent.css";
import "./Styles/AddVenue.css";

import Home from "./Pages/Home";
import HomeAdmin from "./Pages/HomeAdmin";
import HomePromoter from "./Pages/HomePromoter";
import HomeUser from "./Pages/HomeUser";
import SellingListing from "./Pages/SellingListing";
import BoughtTickets from "./Pages/BoughtTickets";
import SellTicket from "./Pages/SellTicket";
import SavedEvents from "./Pages/SavedEvents";
import FollowedEvents from "./Pages/FollowedEvents";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import SuggestEvent from "./Pages/SuggestEvent"

import PaymentMethods from "./Pages/PaymentMethods";
import CreatePromoter from "./Pages/CreatePromoter";
import Browse from "./Pages/Browse";
import Event from "./Pages/Event";
import EventsListing from "./Pages/EventsListing";
import CreateEvent from "./Pages/CreateEvent";
import AddVenue from "./Pages/AddVenue";

import "./Styles/General.css";
import "./Styles/Event.css";

function App() {

	const [user, setUser] = useState({
		name: "Catarina Gonçalves",
		profile_pic: "https://cdn-icons-png.flaticon.com/128/4140/4140047.png",
		email: "catarina.oliveira.41@hotmail.com",
		password: "hello",
		phone: 933066325,
		language: "English",
		bank_details: "23455667234"
	});
  



	const [event, setEvent] = useState();

	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={
				<Home setUser={setUser}/>
			}/>
			<Route path="/HomeUser" element={
				<HomeUser user={user} setUser={setUser}/>
			}/>
			<Route path="/HomePromoter" element={
				<HomePromoter />
			}/>
			<Route path="/HomeAdmin" element={
				<HomeAdmin />
			}/>
			<Route path="/Listings" element={
				<SellingListing user={user} setUser={setUser}/>
			}/>
			<Route path="/MyTickets" element={
				<BoughtTickets user={user} setUser={setUser}/>
			}/>
			<Route path="/SellTicket" element={
				<SellTicket user={user} setUser={setUser}/>
			}/>
			<Route path="/SavedEvents" element={
				<SavedEvents user={user} setUser={setUser}/>
			}/>
			<Route path="/FollowedEvents" element={
				<FollowedEvents user={user} setUser={setUser}/>
			}/>
			<Route path="/Profile" element={
				<Profile user={user} setUser={setUser}/>
			}/>
			<Route path="/Notifications" element={
				<Notifications user={user} setUser={setUser}/>
			}/>
			<Route path="/Suggestion" element={
				<SuggestEvent user={user} setUser={setUser}/>
			}/>
		</Routes>
		</BrowserRouter>
	);
}

export default App;
