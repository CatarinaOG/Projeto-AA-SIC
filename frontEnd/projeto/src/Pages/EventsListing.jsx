import { useState, useEffect ,useContext} from "react";
import UserContext from "../Contexts/UserContext";

import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import PopUpRemoveListing from "../Components/SellingListing/PopUpRemoveListing";
import EventElem from "../Components/General/EventElem.jsx";

import AddPrompt from "../Components/EventsListing/AddPrompt";
import EventListElem from "../Components/EventsListing/EventListElem";

export default function EventsListing() {
	const {user} = useContext(UserContext);

	const [events, setEvents] = useState([
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
		},
	]);

	const [popUpTrigger, setPopUpTrigger] = useState(false);

	const showEvents = events.map((event) =>
		<EventListElem event={event}/>
	);
	
	useEffect(() => {
		getEvents()
	  }, []);


	function getEvents(){
		fetch("http://localhost:8080/api/promoter/get_events_by_promoter", {
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
    	setEvents(data);
      })
		.catch(error => {
			console.log(error)
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
						<h1> Events</h1>
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
