import NavBarUser from "../Components/NavBar/NavBarUser";
import PopUpRemoveListing from "../Components/SellingListing/PopUpRemoveListing";
import EventElem from "../Components/General/EventElem.jsx";

import { useState } from "react";
import PopUpSaved from "../Components/General/PopUpSaved";

export default function SavedEvents(props) {

	const {setEventId} = props

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
		day: "8",
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
		day: "6",
		time: "03:00 PM",
		ticketType: "1 Day Ticket | 6 July",
		eventName: "NOS ALIVE'23",
		eventPlace: "NOS Alive, Algés, Portugal",
		ticketPrice: "91,07",
		id: 5,
		status: "sold",
		},
	]);

	const eventsFiltered = events.map((event) =>
		<EventElem 
			key={event.id}
			event={event} 
			type="saved" 
			setEventId={setEventId}
		/>
	);

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
