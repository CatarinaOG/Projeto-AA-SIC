import NavBarUser from "../Components/NavBar/NavBarUser";
import EventElem from "../Components/General/EventElem.jsx";
import UserContext from "../Contexts/UserContext"

import { useState,useContext,useEffect } from "react";

export default function SavedEvents(props) {

	const {setEventId} = props
    const {user} = useContext(UserContext);
  
	useEffect(() => {
		getSaved()
	  }, []);


	const [events, setEvents] = useState([]);

	const eventsFiltered = events.map((event) =>
		<EventElem 
			key={event.id}
			event={event} 
			type="saved" 
			method={removeSaved}
		/>
	);


	function getSaved(){
		fetch("http://localhost:8080/api/user/get_saved_events", {
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
			setEvents(data); // Set the parsed JSON data
		  })
		  .catch(error => {
			console.log(error);
		  });
	}


	function removeSaved(event_id){

		fetch("http://localhost:8080/api/user/remove_saved_event", {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': `Bearer ${user.token}`
			},
			body: JSON.stringify({
				event_id:event_id
			})
		})
		.then(response => {
			if (response.ok) return response.json();
			else throw new Error('Error: ' + response.status);
		})
		.then(responseJSON => {
			if (responseJSON.confirmed === "true") getSaved();
			else console.log("Correu Mal")
		})
		.catch(error => {
			console.log('Error:', error);
		})
	}




	return (
		<div>
			<NavBarUser selected="home"/>
			
			<div className="center">
				<div className="defaultContainer">
					<h1>Saved Events</h1>
					<div className="eventsContainer">{eventsFiltered}</div>
				</div>
			</div>
		</div>
	);
}
