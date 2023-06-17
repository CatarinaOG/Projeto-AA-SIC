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
import HomeUser from "./Pages/HomeUser";
import SellingListing from "./Pages/SellingListing";
import BoughtTickets from "./Pages/BoughtTickets";
import SellTicket from "./Pages/SellTicket";
import SavedEvents from "./Pages/SavedEvents";
import FollowedEvents from "./Pages/FollowedEvents";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import SuggestEvent from "./Pages/SuggestEvent";
import Browse from "./Pages/Browse";
import Event from "./Pages/Event";
import PaymentMethods from "./Pages/PaymentMethods";

import HomePromoter from "./Pages/HomePromoter";
import SuggestedEvents from "./Pages/SuggestedEvents"
import EventsListing from "./Pages/EventsListing";
import CreateEvent from "./Pages/CreateEvent";

import HomeAdmin from "./Pages/HomeAdmin";
import PromotersListing from "./Pages/PromotersListing";
import CreatePromoter from "./Pages/CreatePromoter";

import AddVenue from "./Pages/AddVenue";

import "./Styles/General.css";

function App() {
	const [user, setUser] = useState({
		name: "Catarina Gonçalves",
		profile_pic: "https://cdn-icons-png.flaticon.com/128/4140/4140047.png",
		email: "catarina.oliveira.41@hotmail.com",
		password: "hello",
		phone: 933066325,
		language: "English",
		bank_details: "23455667234",
	});

  	const [eventId, setEventId] = useState();

  	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={
				<Home setUser={setUser} setEventId={setEventId} />} 
			/>


			<Route
				path="/HomeUser" element={
				<HomeUser user={user} setUser={setUser} setEventId={setEventId} />}
			/>
			<Route
				path="/Listings"element={
				<SellingListing user={user} setUser={setUser} />}
			/>
			<Route
				path="/MyTickets"element={
				<BoughtTickets user={user} setUser={setUser} />}
			/>
			<Route
				path="/SellTicket"element={
				<SellTicket user={user} setUser={setUser} />}
			/>
			<Route
				path="/SavedEvents"element={
				<SavedEvents user={user} setUser={setUser} />}
			/>
			<Route
				path="/FollowedEvents"element={
				<FollowedEvents user={user} setUser={setUser} />}
			/>
			<Route
				path="/Profile"element={
				<Profile user={user} setUser={setUser} />}
			/>
			<Route
				path="/Notifications"element={
				<Notifications user={user} setUser={setUser} />}
			/>
			<Route
				path="/Suggestion"element={
				<SuggestEvent user={user} setUser={setUser} />}
			/>
			<Route
				path="/Browse" element={
				<Browse setEventId={setEventId} user={user} setUser={setUser} />}
			/>
			<Route
				path="/Event"element={
				<Event eventId={eventId} user={user} setUser={setUser} />}
			/>
			<Route
				path="/PaymentMethods"element={
				<PaymentMethods user={user} setUser={setUser} />}
			/>


			<Route path="/HomePromoter" element={
				<HomePromoter setUser={setUser} setEventId={setEventId}/>} 
			/>
			<Route
				path="/Suggestions" element={
				<SuggestedEvents setUser={setUser} />}
			/>
			<Route
				path="/Events" element={
				<EventsListing setUser={setUser} />}
			/>
			<Route
				path="/AddEvent" element={
				<CreateEvent setUser={setUser} />}
			/>


			<Route path="/HomeAdmin" element={
				<HomeAdmin setUser={setUser} setEventId={setEventId}/>} 
			/>
			<Route path="/Promoters" element={
				<PromotersListing setUser={setUser}/>} 
			/>
			<Route path="/CreatePromoter" element={
				<CreatePromoter setUser={setUser}/>} 
			/>


		</Routes>
		</BrowserRouter>
  );
}

export default App;
