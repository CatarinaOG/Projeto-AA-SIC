import NavBarUser from "../Components/NavBar/NavBarUser";
import EventElem from "../Components/General/EventElem.jsx";
import UserContext from "../Contexts/UserContext"
import BlackClose from "../Images/blackClose.png";
import { useTranslation } from "react-i18next";

import { useState,useContext,useEffect } from "react";
import { GLOBAL_VARIABLE } from '../backendIP.js';

export default function SavedEvents(props) {

	const {setEventId} = props
    const {user} = useContext(UserContext);
    const {t} = useTranslation();
	useEffect(() => {
		getSaved()
	  }, []);


	const [events, setEvents] = useState([]);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [eventRemoveID,setEventRemoveID] = useState("");

	const eventsFiltered = events.map((event) =>
		<EventElem 
			key={event.id}
			event={event} 
			type="saved" 
			method={removeSaved}
			setShowConfirmation = {setShowConfirmation}
			setEventRemoveID = {setEventRemoveID}
			setEventId={setEventId}
		/>
	);

	function yesClick(){
		removeSaved(eventRemoveID);
	}


	function getSaved(){
		fetch(`${GLOBAL_VARIABLE}/user/get_saved_events`, {
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

		fetch(`${GLOBAL_VARIABLE}/user/remove_saved_event`, {
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
			if (responseJSON.confirmed === "true"){
				getSaved();
				setShowConfirmation(false);
			} 
			else console.log("Correu Mal")
		})
		.catch(error => {
			console.log('Error:', error);
		})
	}


	function closeConfirmation(){
		setShowConfirmation(false)
	}


	return (
		<div>
		{ showConfirmation && (
			<div>
				<div className="overlay"></div>
				<div className="popUpContainer">
					<img src={BlackClose} className="editClose" alt="" onClick={closeConfirmation} />
					<h3 className="popUpInfoWithButtons">{t('sureYouWantToRemove')}</h3>
					<div className="center">
						<div className="promoterButtons">
							<button className="button" onClick={yesClick}>{t('yes')}</button>
							<button className="button" onClick={closeConfirmation}>{t('no')}</button>
						</div>
					</div>

				</div>
			</div>)
		}
		<div>
			<NavBarUser selected="home"/>
			
			<div className="center">
				<div className="defaultContainer">
					<h1>{t('savedEvents')}</h1>
					<div className="eventsContainer"> { events.length > 0 ? 
                            eventsFiltered : <p>{t('dontHaveSaved')}</p>}</div>
				</div>
			</div>
		</div>

		
		</div>
		
	);
}
