
import { useState,useContext, useEffect } from "react"
import NavBarAdmin from "../Components/NavBar/NavBarAdmin"
import NavBarPromoter from "../Components/NavBar/NavBarPromoter"
import NavBarUser from "../Components/NavBar/NavBarUser"
import NavBar from "../Components/NavBar/NavBar"
import TicketAlert from "../Components/Event/TicketAlert"
import TicketType from "../Components/Event/TicketType"
import Ticket from "../Components/Event/Ticket"
import TicketSold from "../Components/Event/TicketSold"
import FullTicket from "../Components/Event/FullTicket"
import Artist from "../Components/Event/Artist"
import Map from "../Components/Event/Map"
import UserContext from "../Contexts/UserContext"

import "../Styles/Event.css";

export default function Event(props){

    const {eventId,setTicketID,updateEvent,setUpdateEvent} = props
    const {user} = useContext(UserContext);

    const [show,setShow] = useState("ticketsType") // ticket / tickets / ticketsType / info

    const [event,setEvent] = useState()
    const [artists,setArtists] = useState([])
    const [ticketTypes,setTicketTypes] = useState([])
    const [ticketType,setTicketType] = useState()
    const [tickets,setTickets] = useState([])
    const [soldTickets,setSoldTickets] = useState([])
    const [ticket,setTicket] = useState()


    useEffect(() => {
        sendGetFullEventRequest()
        sendGetTicketTypesRequest()
    },[updateEvent])


    function sendGetFullEventRequest(){

        let input = {
            event_id: eventId
        }

        if(user.type === "user"){
            input = {
                event_id: eventId,
                token: user.token
            }
        }

        fetch("http://localhost:8080/api/event/get_full_event", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(input)
        })
        .then(response => response.json())
        .then(responseJSON => {
            setArtists(responseJSON.artists)
            setEvent(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });
    }

    function sendGetTicketTypesRequest(){

        fetch("http://localhost:8080/api/event/get_ticket_types_event", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event_id: eventId
            })
        })
        .then(response => response.json())
        .then(responseJSON => {
            setTicketTypes(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });
    }
    
    function sendGetTicketsRequest(ticket_id){

        fetch("http://localhost:8080/api/user/get_tickets_by_type_and_event", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event_id: eventId,
                ticket_type_id: ticket_id,
            })
        })
        .then(response => response.json())
        .then(responseJSON => {
            setTickets(responseJSON)
            sendGetTicketsSoldRequest(ticket_id)
            setShow("tickets")
        })
        .catch(error => {
            console.log(error)
        });
    }

    function sendGetTicketsSoldRequest(ticket_id){

        fetch("http://localhost:8080/api/user/get_sold_tickets_by_type_and_event", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event_id: eventId,
                ticket_type_id: ticket_id,
            })
        })
        .then(response => response.json())
        .then(responseJSON => {
            console.log(responseJSON)
            setSoldTickets(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });
    }

    function sendSaveEventRequest(){

        fetch("http://localhost:8080/api/user/save_event", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                event_id: event.id
            })
        })
        .then(setUpdateEvent(old => !old))
        .catch(error => {
            console.log(error)
        });

    }


    function showTicketsTypes(){
        setShow("ticketsType")
    }

    function showInfo(){
        setShow("info")
    }


    function saveEvent(){
        if(!event.event_saved)
            sendSaveEventRequest()
    }


    const showTheTicketsTypes = ticketTypes.map((ticketType) => 
        <TicketType 
            key={ticketType.id}
            ticketType={ticketType}
            sendGetTicketsRequest={sendGetTicketsRequest}
            setTicketType={setTicketType}
        />
    )
    
    const showTheTickets = tickets.map((ticket) =>
        <Ticket 
            key={ticket.id}
            ticket={ticket}
            ticketType={ticketType}
            setShow={setShow}
            setTicket={setTicket}
        />
    )

    const showTheSoldTickets = soldTickets.map((ticketSold) => 
        <TicketSold 
            key={ticketSold.id}
            ticketSold={ticketSold}
            ticketType={ticketType}
        />
    )
    
    const showArtists = artists.map((artist) =>
        <Artist 
            key={artist.artist_code}
            artist={artist}
        />
    )

    let background_img = "https://w0.peakpx.com/wallpaper/378/616/HD-wallpaper-night-party-concert-night-club-fans-dancing-people-dancing-party.jpg"

    if(event && event.event_image)
        background_img = event.event_image

   
    return event ? (
        <div>
            { !user.type && <NavBar />}
            { user.type === "user" && <NavBarUser selected="home"/>}
            { user.type === "promoter" && <NavBarPromoter selected="home"/>}
            { user.type === "admin" && <NavBarAdmin selected="home"/>}
            
            <img className="wallpaperBlur" src={background_img} alt="" />

            <div className="center">
                <div>
                    <div className="overImageContainer">
                        <img className="eventImage" src={background_img} alt="" />
                        <h2>{event.event_name}</h2>
                        <h3>{event.start_date} - {event.end_date}</h3>
                        <p>{event.event_place}</p>

                        {user.type === "user" &&
                            <button className="saveEventButton" onClick={saveEvent}>
                                {event.event_saved? "You saved this event!" : "Save Event"}
                            </button>
                        }
                    </div>
                
                    <div className="defaultContainer">
                        <div className="eventNavBar">

                            <div className="eventNavBarLeftSide">
                                <h2 onClick={showTicketsTypes} className={show !== "info"? "eventTabSelected" : "eventTab"}>Tickets</h2>
                                <h2 onClick={showInfo} className={show === "info"? "eventTabSelected" : "eventTab"} >Info</h2>
                            </div>

                            <div className="eventNavBarRighSide">
                                <div className="ticketsInfoSection">
                                    <p>{event.tickets_available}</p>
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


                        { show === "ticketsType" &&
                            <div className="marginBottom">
                                {user.type === "user" &&
                                    <TicketAlert event={event} setUpdateEvent={setUpdateEvent}/>
                                }      
                                <h2 className="marginTop">Tickets Types</h2>
                                {showTheTicketsTypes}
                            </div>
                        }

                        { show === "tickets" &&
                            <div>
                                {user.type === "user" &&
                                    <TicketAlert event={event} setUpdateEvent={setUpdateEvent}/>
                                }
                                <h2 className="marginTop">Tickets Available</h2>
                                {showTheTickets.length === 0 && <p className="marginBottom">There are no tickets available...</p>}
                                {showTheTickets}

                                { showTheSoldTickets.length > 0 && <h2>Tickets Sold</h2>}
                                {showTheSoldTickets}
                            </div>
                        }

                        { show === "ticket" &&
                            <div>
                                <FullTicket 
                                    ticket={ticket}
                                    ticketType={ticketType}
                                    setShow={setShow}
                                    setTicketID={setTicketID}
                                />
                            </div>
                        }

                        { show === "info" &&
                            <div className="marginBottom">
                                <div className="artistsSection">
                                    <h2>Artists</h2>
                                    {showArtists}
                                </div>
                                <div className="locationSection">
                                    <h2>Location</h2>
                                    <div className="displayHorizontally">
                                        <Map event={event}/>
                                        <div className="mapInfo">
                                            <h3>{event.event_place}</h3>
                                            <p>{event.upcoming_events} upcoming events</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    ):("")

}


