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
import "./Styles/SellingListing.css";
import "./Styles/InformationsUser.css";

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
import  InformationsUser  from "./Pages/InformationsUser";


import "./Styles/General.css";
import { GLOBAL_VARIABLE } from './backendIP.js';


function App() {

	const cookies = new Cookies()

	const [cookiesSave,setCookiesSave] = useState({
		token: cookies.get("token"),
		type: cookies.get("type"),
		event: cookies.get("event_id")
	})
	const [user, setUser] = useState({});
  	const [eventId, setEventId] = useState(cookiesSave.event);
	const [suggestedEvent,setSuggestedEvent] = useState({})
	const [addEventInfo,setAddEventInfo] = useState({})
	const [searchText,setSearchText] = useState("")
	const [ticketID, setTicketID] = useState()
    const [updateEvent,setUpdateEvent] = useState(false)


	function sendGetUserRequest(){

		let url = ""

		switch(cookiesSave.type){
			case "user":
				url = `${GLOBAL_VARIABLE}/user/get_user`
				break
			case "promoter":
				url = `${GLOBAL_VARIABLE}/promoter/get_user`
				break
			case "admin":
				url = `${GLOBAL_VARIABLE}/admin/get_user`
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
			setUser((old) => ({...old,token: cookiesSave.token}))
        })
        .catch(error => {
            console.log(error)
        });

	}


	useEffect(() => {
		if(!user.type && cookiesSave.token){
			sendGetUserRequest()
		}

	},[])


  	return (
		<BrowserRouter>
			<UserContext.Provider value={{ user, setUser }}>
				<Routes>
					<Route path="/" element={
						<Home setUser={setUser} setEventId={setEventId} setSearchText={setSearchText}/>} 
					/>

					{ user.type === "user" &&
						<Route
							path="/HomeUser" element={
							<HomeUser setEventId={setEventId} setSearchText={setSearchText}/>}
						/>
					}
					{ user.type === "user" &&
						<Route
							path="/Listings" element={
							<SellingListing />}
						/>
					}
					{ user.type === "user" &&
						<Route
							path="/MyTickets" element={
							<BoughtTickets />}
						/>
					}
					{ user.type === "user" &&
						<Route
							path="/SellTicket" element={
							<SellTicket />}
						/>
					}
					{ user.type === "user" &&
						<Route
							path="/SavedEvents" element={
							<SavedEvents setEventId={setEventId}/>}
						/>
					}
					{ user.type === "user" &&
						<Route
							path="/FollowedEvents" element={
							<FollowedEvents setEventId={setEventId}/>}
						/>
					}
					{ user.type === "user" &&
						<Route
							path="/Profile" element={
							<Profile />}
						/>
					}
					{ user.type === "user" &&

						<Route
							path="/Notifications" element={
							<Notifications />}
						/>
					}
					{ user.type === "user" &&

						<Route
							path="/Suggestion" element={
							<SuggestEvent />}
						/>
					}

					<Route
						path="/Browse" element={
						<Browse searchText={searchText} setSearchText={setSearchText} setEventId={setEventId}/>}
					/>

					<Route
						path="/Event"element={
						<Event eventId={eventId} setTicketID={setTicketID} updateEvent={updateEvent} setUpdateEvent={setUpdateEvent}/>}
					/>

					{ user.type === "user" &&

						<Route
							path="/PaymentMethods"element={
							<PaymentMethods ticketID={ticketID}/>}
						/>
					}

					

						<Route
							path="/InformationsUser"element={
							<InformationsUser type={user.type}/>}
						/>




					{ user.type === "promoter" &&
						<Route path="/HomePromoter" element={
							<HomePromoter setEventId={setEventId} setSearchText={setSearchText}/>} 
						/>
					}
					{ user.type === "promoter" &&
						<Route
							path="/Suggestions" element={
							<SuggestedEvents setSuggestedEvent={setSuggestedEvent}/>}
						/>
					}
					{ user.type === "promoter" &&
						<Route
							path="/Events" element={
							<EventsListing />}
						/>
					}
					{ user.type === "promoter" &&
						<Route
							path="/AddEvent" element={
							<CreateEvent suggestedEvent={suggestedEvent} setSuggestedEvent={setSuggestedEvent} addEventInfo={addEventInfo} setAddEventInfo={setAddEventInfo}/>}
						/>
					}
					{ user.type === "promoter" &&
						<Route path="/AddVenue" element={
							<AddVenue />} 
						/>
					}	


					{ user.type === "admin" &&
						<Route path="/HomeAdmin" element={
							<HomeAdmin setEventId={setEventId} setSearchText={setSearchText}/>} 
						/>
					}
					{ user.type === "admin" &&
						<Route path="/Promoters" element={
							<PromotersListing />} 
						/>
					}
					{ user.type === "admin" &&
						<Route path="/CreatePromoter" element={
							<CreatePromoter/>} 
						/>
					}	
					
				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
  );
}

export default App;
