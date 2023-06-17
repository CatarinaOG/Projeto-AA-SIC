import NavBarUser from "../Components/NavBar/NavBarUser"
import Filters from "../Components/Filters/Filters"
import BoughtTicket from "../Components/BoughtTickets/BoughtTicket"

import { useState } from "react"

export default function BoughtTickets(){


    const [events,setEvents] =useState([ // para ser substituido pelo pedido com base no filtro
        {
            dayOfWeek: "Wednesday",
            month: "May",
            day: "8",
            time: "9:25 PM",
            ticketType: "Relvado",
            eventName: "Coldplay - Music Of The Spheres World Tour",
            eventPlace: "Estádio Cidade de Coimbra, Coimbra",
            ticketPrice: "80.56"
        },
        {
            dayOfWeek: "Friday",
            month: "May",
            day: "19",
            time: "08:00 PM",
            ticketType: "Floor",
            eventName: "Post Malone - Twelve Carat Tour",
            eventPlace: "Ziggo Dome, Amsterdam",
            ticketPrice: "109.02"
        },
        {
            dayOfWeek: "Thursday",
            month: "Jul",
            day: "7",
            time: "03:00 PM",
            ticketType: "1 Day Ticket | 7 July",
            eventName: "NOS ALIVE'23",
            eventPlace: "NOS Alive, Algés, Portugal",
            ticketPrice: "91,07"
        },
        {
            dayOfWeek: "Thursday",
            month: "Jul",
            day: "7",
            time: "03:00 PM",
            ticketType: "1 Day Ticket | 7 July",
            eventName: "NOS ALIVE'23",
            eventPlace: "NOS Alive, Algés, Portugal",
            ticketPrice: "91,07"
        },
        {
            dayOfWeek: "Thursday",
            month: "Jul",
            day: "7",
            time: "03:00 PM",
            ticketType: "1 Day Ticket | 7 July",
            eventName: "NOS ALIVE'23",
            eventPlace: "NOS Alive, Algés, Portugal",
            ticketPrice: "91,07"
        },
        {
            dayOfWeek: "Thursday",
            month: "Jul",
            day: "7",
            time: "03:00 PM",
            ticketType: "1 Day Ticket | 7 July",
            eventName: "NOS ALIVE'23",
            eventPlace: "NOS Alive, Algés, Portugal",
            ticketPrice: "91,07"
        },
        {
            dayOfWeek: "Thursday",
            month: "Jul",
            day: "7",
            time: "03:00 PM",
            ticketType: "1 Day Ticket | 7 July",
            eventName: "NOS ALIVE'23",
            eventPlace: "NOS Alive, Algés, Portugal",
            ticketPrice: "91,07"
        },
    ])

    const eventsFiltered = events.map( event => 
        <BoughtTicket key={event.id} event={event}/>
    )


    return(
        <div>
            <NavBarUser selected="boughtTickets" />
            
            <div className="center">
                <div className="defaultContainer">
                    <h1>Bought Tickets</h1>

                    <Filters type="boughtTickets"/>

                    <div className="eventsContainer">
                        {eventsFiltered}
                    </div>

                </div>
            </div>
        
        </div>
    )

}