import NavBarUser from "../Components/NavBar/NavBarUser";
import Filters from "../Components/Filters/Filters";
import ListingElem from "../Components/SellingListing/ListingElem";
import PopUpRemoveListing from "../Components/SellingListing/PopUpRemoveListing";

import { useState } from "react";

export default function SellingListing() {
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

  const eventsFiltered = events.map((event) => {
    return <ListingElem event={event} setPopUpTrigger={setPopUpTrigger} />;
  });

  return (
    <div>
      <NavBarUser selected="listings" />
      <PopUpRemoveListing
        trigger={popUpTrigger}
        setPopUpTrigger={setPopUpTrigger}
        type={"selling"}
      />

      <div className="center">
        <div className="defaultContainer">
          <h1>Tickets Listed</h1>

          <Filters type="boughtTickets" />

          <div className="eventsContainer">{eventsFiltered}</div>
        </div>
      </div>
    </div>
  );
}
