import NavBarUser from "../Components/NavBar/NavBarUser";
import SavedFollowElem from "../Components/General/EventElem.jsx";
import { useTranslation } from "react-i18next";
import BlackClose from "../Images/blackClose.png";

import UserContext from "../Contexts/UserContext"
import { GLOBAL_VARIABLE } from '../backendIP.js';

import { useState,useContext,useEffect } from "react";

export default function FollowedEvents(props) {
	const {t} = useTranslation();
    const {user} = useContext(UserContext);

	const {setEventId} = props

	const [showConfirmation, setShowConfirmation] = useState(false);
	const [eventRemoveID,setEventRemoveID] = useState("");

	useEffect(() => {
		getFollowed()
	  }, []);

	const [events, setEvents] = useState([
	]);

	const eventsFiltered = events.map((event) =>
		<SavedFollowElem key={event.id} event={event} method = {removeFollowed} setShowConfirmation={setShowConfirmation} setEventRemoveID={setEventRemoveID} type="followed" setEventId={setEventId}
		/>
	);

	function getFollowed(){
		fetch(`${GLOBAL_VARIABLE}/user/get_followed_events`, {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${user.token}`
		}
		})
		.then(response => {
			if (response.ok)
			  return response.json(); // Parse the response JSON
			throw new Error('Network response was not ok.');
		  })
		  .then(data => {
			setEvents(data); // Set the parsed JSON data
		  })
		  .catch(error => {
			console.log(error);
		  });
	}


	function removeFollowed(event_id){

		fetch(`${GLOBAL_VARIABLE}/user/remove_followed_event`, {
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
			if (response.ok) {
			  return response.json();
			} else {
			  throw new Error('Error: ' + response.status);
			}
		  })
		  .then(responseJSON => {
			if (responseJSON.confirmed === "true"){
				setShowConfirmation(false)
				getFollowed();
			}
			else{
				console.log("Correu Mal")
			}
		  })
		  .catch(error => {
			console.log('Error:', error);
		  });
	}



	function closeConfirmation(){
		setShowConfirmation(false)
	}

	function yesClick(){
		removeFollowed(eventRemoveID);
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
					<h1>{t('followedEvents')}</h1>
					<div className="eventsContainer"> { events.length > 0 ? 
                            eventsFiltered : <p>{t('dontHaveFollowed')}</p>}</div>
				</div>
			</div>
		</div>
		</div>
		
	);
}
