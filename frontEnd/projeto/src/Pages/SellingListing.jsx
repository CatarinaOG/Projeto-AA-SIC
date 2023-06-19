import NavBarUser from "../Components/NavBar/NavBarUser";
import Filters from "../Components/Filters/Filters";
import ListingElem from "../Components/SellingListing/ListingElem";
import BlackClose from "../Images/blackClose.png"

import { useEffect, useState, useContext } from "react";
import UserContext from "../Contexts/UserContext"

export default function SellingListing() {
    const {user} = useContext(UserContext);

	const [filters,setFilters] = useState({
        filter_place: "",
        filter_time: "",
        filter_category: "",
    })

	useEffect(() => {
		getSellingListing()
	}, []);

	const [tickets, setTickets] = useState([]);

	const [popUpTrigger, setPopUpTrigger] = useState(false);
	const [popUpID, setPopUpID] = useState("");

	function handleRemoveEvents(id){
		setTickets((prevEvents) => prevEvents.filter((item) => item.id !== id));
	};


	function getSellingListing(){
		fetch("http://localhost:8080/api/user/get_tickets_listed_by_user", {
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
			console.log(data)
			setTickets(data); // Set the parsed JSON data
		  })
		  .catch(error => {
			console.log(error);
		  });
	}


	function removeListing(ticket_id){

		console.log(popUpID)
		const input = {
			ad_id : ticket_id
		}

		console.log("Input was" + JSON.stringify(input))
		console.log(user.token)

		fetch("http://localhost:8080/api/user/remove_ticket_listing", {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': `Bearer ${user.token}`
			},
			body: JSON.stringify(input)
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
					<h1>Tickets Listed</h1>
					<Filters setFilters={setFilters}/>
					
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
						<h3 className="popUpInfoWithButtons">Are you sure you want to remove this ticket from listings?</h3>
						<div className="center">
							<div className="promoterButtons">
								<button className="button" onClick={() => removeListing(popUpID)}>Yes</button>
								<button className="button">No</button>
							</div>
						</div>

					</div>
				</div>
			}

		</div>
	);
}
