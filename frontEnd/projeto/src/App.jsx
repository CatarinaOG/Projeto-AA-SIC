import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cookies } from 'react-cookie'
import UserContext from "./Contexts/UserContext"

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

	const cookies = new Cookies()

	const [cookiesSave,setCookiesSave] = useState({
		token: cookies.get("token"),
		type: cookies.get("type")
	})
	const [user, setUser] = useState({});
  	const [eventId, setEventId] = useState();
	const [suggestedEvent,setSuggestedEvent] = useState({})
	const [addEventInfo,setAddEventInfo] = useState({})
	const [searchText,setSearchText] = useState("")


	function sendGetUserRequest(){

		let url = ""

		switch(cookiesSave.type){
			case "user":
				url = "http://localhost:8080/api/user/get_user"
				break
			case "promoter":
				url = "http://localhost:8080/api/promoter/get_user"
				break
			case "admin":
				url = "http://localhost:8080/api/admin/get_user"
				break
		}

		fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${cookiesSave.token}`
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
			setUser(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });

	}


	useEffect(() => {
		if(!user && cookiesSave.token)
			sendGetUserRequest()
	},[])


  	return (
		<BrowserRouter>
			<UserContext.Provider value={{ user, setUser }}>
				<Routes>
					<Route path="/" element={
						<Home setUser={setUser} setEventId={setEventId} setSearchText={setSearchText}/>} 
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
						<Browse searchText={searchText} setSearchText={setSearchText} setEventId={setEventId}/>}
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
						<CreateEvent suggestedEvent={suggestedEvent} addEventInfo={addEventInfo} setAddEventInfo={setAddEventInfo}/>}
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
					<Route path="/AddVenue" element={
						<AddVenue/>} 
					/>



				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
  );
}

export default App;
