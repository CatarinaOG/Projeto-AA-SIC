
import { useState } from "react"
import NavBarUser from "../Components/NavBar/NavBarUser"
import TicketAlert from "../Components/Event/TicketAlert"

import TicketType from "../Components/Event/TicketType"
import Ticket from "../Components/Event/Ticket"
import TicketSold from "../Components/Event/TicketSold"


export default function Event(props){

    const {event} = props

    const [ticketType,setTicketType] = useState()
    const [ticketTypes,setTicketTypes] = useState([
        {
            id: 1,
            description: "2 Day Ticket | 6 & 7th July",
			price: 198,
            nr_selling: 2,
        },
        {
            id: 2,
            description: "1 Day Ticket | 7th July",
			price: 88,
            nr_selling: 2,
        },
        {
            id: 3,
            description: "2 Day Ticket | 7 & 8th July",
			price: 200,
            nr_selling: 3,
        }
    ])
    const [tickets,setTickets] = useState([
        {
            description: "nao posso ir",
            price: "89$",
            user_image: "https://cdn-icons-png.flaticon.com/128/2335/2335153.png",
        },
        {
            description: "nao posso ir",
            price: "89$",
            user_image: "https://cdn-icons-png.flaticon.com/128/949/949666.png",
        },
        {
            description: "nao posso ir",
            price: "89$",
            user_image: "https://cdn-icons-png.flaticon.com/128/921/921089.png",
        },
        {
            description: "nao posso ir",
            price: "89$",
            user_image: "https://cdn-icons-png.flaticon.com/128/4988/4988350.png",
        },
    ])

    const [show,setShow] = useState("ticketsType")


    function showTicketsTypes(){
        setShow("ticketsType")
    }

    function showInfo(){
        setShow("info")
    }

    const showTheTicketsTypes = ticketTypes.map((ticketType) => 
        <TicketType 
            ticketType={ticketType}
            setTicketType={setTicketType}
            setShow={setShow}
        />
    )
    
    const showTheTickets = tickets.map((ticket) =>
        <Ticket 
            ticket={ticket}
            ticketType={ticketType}
        />
    )

    const showTheSoldTickets = tickets.map((ticketSold) => 
        <TicketSold 
            ticketSold={ticketSold}
            ticketType={ticketType}
        />
    )

    return(
        <div>
            <NavBarUser />
            
            <img className="wallpaperBlur" src={event.image} alt="" />

            <div className="center">
                <div>

                    <div className="overImageContainer">
                        <img className="eventImage" src={event.image} alt="" />
                        <h2>{event.eventName}</h2>
                        <h3>{event.dayOfWeek}, {event.month} {event.day} | {event.time} </h3>
                        <p>{event.eventPlace}</p>
                        <button className="saveEventButton">Save Event</button>
                    </div>
                
                    <div className="defaultContainer">
                        <div className="eventNavBar">

                            <div className="eventNavBarLeftSide">
                                <h2 onClick={showTicketsTypes} className={show == "tickets"? "eventTabSelected" : "eventTab"}>Tickets</h2>
                                <h2 className={show == "info"? "eventTabSelected" : "eventTab"} >Info</h2>
                            </div>

                            <div className="eventNavBarRighSide">
                                <div className="ticketsInfoSection">
                                    <p>{event.tickets_avaiable}</p>
                                    <p className="gray">available</p>
                                </div>
                                <div className="ticketsInfoSection">
                                    <p>{event.tickets_sold}</p>
                                    <p className="gray">sold</p>
                                </div>
                                <div className="ticketsInfoSection">
                                    <p>{event.tickets_wanted}</p>
                                    <p className="gray">wanted</p>
                                </div>
                            </div>
                        </div>


                        { show == "ticketsType" &&
                            <div>
                                <TicketAlert />
                                <h2>Tickets Types</h2>
                                {showTheTicketsTypes}
                            </div>
                        }

                        { show == "tickets" &&
                            <div>
                                <TicketAlert />
                                <h2>Tickets Available</h2>
                                {showTheTickets}
                                <h2>Tickets Sold</h2>
                                {showTheSoldTickets}
                            </div>
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}