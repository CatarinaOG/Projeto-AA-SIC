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

	const [tickets, setTickets] = useState([
		// para ser substituido pelo pedido com base no filtro
		{
			dayOfWeek: "Wednesday",
			month: "May",
			day: "8",
			time: "9:25 PM",
			ticketType: "Relvado",
			eventName: "Coldplay - Music Of The Spheres World Tour",
			eventPlace: "Estádio Cidade de Coimbra, Coimbra",
			ticketPrice: "80.56",
			id: 1,
			status: "selling",
		},
		{
			dayOfWeek: "Friday",
			month: "May",
			day: "19",
			time: "08:00 PM",
			ticketType: "Floor",
			eventName: "Post Malone - Twelve Carat Tour",
			eventPlace: "Ziggo Dome, Amsterdam",
			ticketPrice: "109.02",
			id: 2,
			status: "selling",
		},
		{
			dayOfWeek: "Thursday",
			month: "Jul",
			day: "7",
			time: "03:00 PM",
			ticketType: "1 Day Ticket | 7 July",
			eventName: "NOS ALIVE'23",
			eventPlace: "NOS Alive, Algés, Portugal",
			ticketPrice: "91,07",
			id: 3,
			status: "sold",
		},
		{
			dayOfWeek: "Thursday",
			month: "Jul",
			day: "7",
			time: "03:00 PM",
			ticketType: "1 Day Ticket | 8 July",
			eventName: "NOS ALIVE'23",
			eventPlace: "NOS Alive, Algés, Portugal",
			ticketPrice: "91,07",
			id: 4,
			status: "selling",
		},
		{
			dayOfWeek: "Thursday",
			month: "Jul",
			day: "7",
			time: "03:00 PM",
			ticketType: "1 Day Ticket | 6 July",
			eventName: "NOS ALIVE'23",
			eventPlace: "NOS Alive, Algés, Portugal",
			ticketPrice: "91,07",
			id: 5,
			status: "sold",
		},
	]);

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





	function closeConfirmation(){
		setPopUpTrigger(false)
	}

	const eventsFiltered = tickets.map((ticket) =>
		<ListingElem
			key={ticket.ticket_id}
			ticket={ticket}
			setPopUpTrigger={setPopUpTrigger}
			setPopUpID={setPopUpID}
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
								<button className="button">Yes</button>
								<button className="button">No</button>
							</div>
						</div>

					</div>
				</div>
			}

		</div>
	);
}
