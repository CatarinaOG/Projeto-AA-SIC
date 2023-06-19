import NavBarUser from "../Components/NavBar/NavBarUser";
import SavedFollowElem from "../Components/General/EventElem.jsx";
import { useTranslation } from "react-i18next";

import UserContext from "../Contexts/UserContext"

import { useState,useContext,useEffect } from "react";

export default function FollowedEvents(props) {
	const {t} = useTranslation();
    const {user} = useContext(UserContext);

	const {setEventId} = props

	useEffect(() => {
		getFollowed()
	  }, []);

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
		<SavedFollowElem key={event.id} event={event} setEventId={setEventId} type="followed"/>
	);

	function getFollowed(){
		fetch("http://localhost:8080/api/user/get_followed_events", {
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
			console.log(JSON.stringify(data))
			setEvents(data); // Set the parsed JSON data
		  })
		  .catch(error => {
			console.log(error);
		  });
	}




	return (
		<div>
			<NavBarUser selected="home"/>

			<div className="center">
				<div className="defaultContainer">
					<h1>Followed Events</h1>
					<div className="eventsContainer">{eventsFiltered}</div>
				</div>
			</div>
		</div>
	);
}
