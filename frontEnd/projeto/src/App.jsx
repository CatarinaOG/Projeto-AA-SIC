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

import UserContext from "./Contexts/UserContext"

import "./Styles/General.css";

function App() {
	const [user, setUser] = useState({});
  	const [eventId, setEventId] = useState();
	const [suggestedEvent,setSuggestedEvent] = useState({})

    console.log(user)

  	return (
		<BrowserRouter>
			<UserContext.Provider value={{ user, setUser }}>
				<Routes>
					<Route path="/" element={
						<Home setUser={setUser} setEventId={setEventId} />} 
					/>

					<Route
						path="/HomeUser" element={
						<HomeUser setEventId={setEventId} />}
					/>
					<Route
						path="/Listings" element={
						<SellingListing />}
					/>
					<Route
						path="/MyTickets" element={
						<BoughtTickets />}
					/>
					<Route
						path="/SellTicket" element={
						<SellTicket />}
					/>
					<Route
						path="/SavedEvents" element={
						<SavedEvents setEventId={setEventId}/>}
					/>
					<Route
						path="/FollowedEvents" element={
						<FollowedEvents setEventId={setEventId}/>}
					/>
					<Route
						path="/Profile" element={
						<Profile />}
					/>
					<Route
						path="/Notifications" element={
						<Notifications />}
					/>
					<Route
						path="/Suggestion" element={
						<SuggestEvent />}
					/>
					<Route
						path="/Browse" element={
						<Browse setEventId={setEventId}/>}
					/>
					<Route
						path="/Event"element={
						<Event eventId={eventId} />}
					/>
					<Route
						path="/PaymentMethods"element={
						<PaymentMethods />}
					/>


					<Route path="/HomePromoter" element={
						<HomePromoter setEventId={setEventId}/>} 
					/>
					<Route
						path="/Suggestions" element={
						<SuggestedEvents setSuggestedEvent={setSuggestedEvent}/>}
					/>
					<Route
						path="/Events" element={
						<EventsListing />}
					/>
					<Route
						path="/AddEvent" element={
						<CreateEvent suggestedEvent={suggestedEvent}/>}
					/>


					<Route path="/HomeAdmin" element={
						<HomeAdmin setEventId={setEventId}/>} 
					/>
					<Route path="/Promoters" element={
						<PromotersListing />} 
					/>
					<Route path="/CreatePromoter" element={
						<CreatePromoter/>} 
					/>


				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
  );
}

export default App;
