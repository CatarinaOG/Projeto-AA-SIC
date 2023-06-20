import { useState, useEffect ,useContext} from "react";
import UserContext from "../Contexts/UserContext";

import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import PopUpRemoveListing from "../Components/SellingListing/PopUpRemoveListing";

import AddPrompt from "../Components/EventsListing/AddPrompt";
import EventListElem from "../Components/EventsListing/EventListElem";
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../backendIP.js';


export default function EventsListing() {
	const {user} = useContext(UserContext);

	const [events, setEvents] = useState([]);

	const [popUpTrigger, setPopUpTrigger] = useState(false);

	const showEvents = events.map((event) =>
		<EventListElem 
			key={event.event_id}
			event={event} 
			type = "created" 
			method={removeEventPromoter}/>
	);
	
	useEffect(() => {
		getEvents()
	  }, []);

	  const {t} = useTranslation();

	function getEvents(){
		fetch(`${GLOBAL_VARIABLE}/promoter/get_events_by_promoter`, {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${user.token}`
		}
		})
    .then(response => {
      if (response.ok) return response.json(); // Parse the response JSON
      else throw new Error('Network response was not ok.');
    })
    .then(data => {
    	setEvents(data);
      })
		.catch(error => {
			console.log(error)
		});
	}

	function removeEventPromoter( event_id){

		fetch(`${GLOBAL_VARIABLE}/promoter/remove_event`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',        
			  'Authorization': `Bearer ${user.token}`
			},
			body: JSON.stringify({
				event_id : event_id
			})
		})
		.then(response => {
			if (response.ok) return response.json();
			else throw new Error('Error: ' + response.status);
		})
		.then(responseJSON => {
		  console.log(responseJSON.confirmed);
		  if (responseJSON.confirmed === "true"){
			console.log("AAAAAAAAAAA")
			getEvents();
		  }
		  else{
			console.log("BBBBBBBBBBB")

		  }
		})
		.catch(error => {
		  console.log('Error:', error);
		});
	  }
	


	return (
		<div>
			<NavBarPromoter selected="events"/>

			<PopUpRemoveListing
				trigger={popUpTrigger}
				setPopUpTrigger={setPopUpTrigger}
				type={"saved"}
			/>

			<div className="center">
				<div className="defaultContainer">
					<div className="headerButtonEventListing">
						<h1> {t('events')}</h1>
						<AddPrompt />
					</div>
					<div className="eventsContainer">
						{showEvents}
					</div>
				</div>
			</div>
		</div>
	);
}
