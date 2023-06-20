import NavBarUser from "../Components/NavBar/NavBarUser";
import ListingElem from "../Components/SellingListing/ListingElem";
import BlackClose from "../Images/blackClose.png"

import { useEffect, useState, useContext } from "react";
import UserContext from "../Contexts/UserContext"
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../backendIP.js';

export default function SellingListing() {
    const {user} = useContext(UserContext);
    const {t} = useTranslation();

	const [popUpTrigger, setPopUpTrigger] = useState(false);
	const [popUpID, setPopUpID] = useState("");
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		getSellingListing()
	}, []);

	function handleRemoveEvents(id){
		setTickets((prevEvents) => prevEvents.filter((item) => item.id !== id));
	};


	function getSellingListing(){

		fetch(`${GLOBAL_VARIABLE}/user/get_tickets_listed_by_user`, {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${user.token}`
			},
		})
		.then(response => {
			if (response.ok) return response.json();
			throw new Error('Network response was not ok.');
		  })
		  .then(data => setTickets(data))
		  .catch(error => {
			console.log(error);
		  });
	}


	function removeListing(ticket_id){

		const input = {
			ad_id : ticket_id
		}

		fetch(`${GLOBAL_VARIABLE}/user/remove_ticket_listing`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': `Bearer ${user.token}`
			},
			body: JSON.stringify(input)
		})
		.then(response => {
			if (response.ok) return response.json();
			else throw new Error('Error: ' + response.status);
			
		  })
		  .then(responseJSON => {
			if (responseJSON.confirmed === "true"){
				getSellingListing();
				setPopUpTrigger(false);
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
		setPopUpTrigger(false)
	}

	const eventsFiltered = tickets.map((ticket) =>
		<ListingElem
			key={ticket.ticket_id}
			ticket={ticket}
			setPopUpTrigger={setPopUpTrigger}
			setPopUpID={setPopUpID}
			removeListing = {removeListing}
		/>
	);

	return (
		<div>
			<NavBarUser selected="listings" />

			<div className="center">
				<div className="defaultContainer">
					<h1>{t('ticketsListed')}</h1>
					
					<div className="eventsContainer">
						{eventsFiltered}
					</div>
				</div>
			</div>

			{popUpTrigger &&
				<div>
					<div className="overlay"></div>
					<div className="popUpContainer">
						<img src={BlackClose} className="editClose" alt="" onClick={closeConfirmation} />
						<h3 className="popUpInfoWithButtons">{t('sureYouWantToRemoveListing')}</h3>
						<div className="center">
							<div className="promoterButtons">
								<button className="button" onClick={() => removeListing(popUpID)}>{t('yes')}</button>
								<button className="button">{t('no')}</button>
							</div>
						</div>

					</div>
				</div>
			}

		</div>
	);
}
