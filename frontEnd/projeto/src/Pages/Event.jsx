
import { useState,useContext } from "react"
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

    const {eventId} = props
    const {user} = useContext(UserContext);


    const [show,setShow] = useState("ticketsType") // ticket / tickets / ticketsType / info

    const [ticketType,setTicketType] = useState()
    const [ticket,setTicket] = useState()

    const event = {
        id: 7,
        dayOfWeek: "Thursday",
        month: "Jul",
        day: "7",
        time: "03:00 PM",
        eventName: "NOS ALIVE'23",
        eventPlace: "NOS Alive, Algés, Portugal",
        image: "https://w0.peakpx.com/wallpaper/378/616/HD-wallpaper-night-party-concert-night-club-fans-dancing-people-dancing-party.jpg",
        tickets_avaiable: 3,
        tickets_sold: 4,
        tickets_wanted: 200,
        is_saved: true,
        is_followed: true,
        lat: 41.528169,
        lng: -8.583342,
        upcoming_events: 2,
    }

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
            id: 1,
            description: "nao posso ir",
            price: "89$",
            user_image: "https://cdn-icons-png.flaticon.com/128/2335/2335153.png",
        },
        {
            id: 2,
            description: "nao posso ir",
            price: "89$",
            user_image: "https://cdn-icons-png.flaticon.com/128/949/949666.png",
        },
        {
            id: 3,
            description: "nao posso ir",
            price: "89$",
            user_image: "https://cdn-icons-png.flaticon.com/128/921/921089.png",
        },
        {
            id: 4,
            description: "nao posso ir",
            price: "89$",
            user_image: "https://cdn-icons-png.flaticon.com/128/4988/4988350.png",
        },
    ])

    const [artists,setArtists] = useState([
        {
            id: 1,
            name: "Coldplay",
            upcoming_events: 2,    
            image: "https://static.globalnoticias.pt/jn/image.jpg?brand=JN&type=generate&guid=a3d8e6d8-d0c8-4b35-a3a5-959fb88711bf&w=744&h=495&t=20220819135537"
        },
        {
            id: 2,
            name: "Coldplay",
            upcoming_events: 2,  
            image: "https://static.globalnoticias.pt/jn/image.jpg?brand=JN&type=generate&guid=a3d8e6d8-d0c8-4b35-a3a5-959fb88711bf&w=744&h=495&t=20220819135537"
        },
    ])



    function showTicketsTypes(){
        setShow("ticketsType")
    }

    function showInfo(){
        setShow("info")
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
        .catch(error => {
            console.log(error)
        });

    }

    function saveEvent(){
        if(event.is_saved)
            sendSaveEventRequest()
        //else
            //sendDeSaveEventRequest()
    }

    const showTheTicketsTypes = ticketTypes.map((ticketType) => 
        <TicketType 
            key={ticketType.id}
            ticketType={ticketType}
            setTicketType={setTicketType}
            setShow={setShow}
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

    const showTheSoldTickets = tickets.map((ticketSold) => 
        <TicketSold 
            key={ticketSold.id}
            ticketSold={ticketSold}
            ticketType={ticketType}
        />
    )

    const showArtists = artists.map((artist) =>
        <Artist 
            key={artist.id}
            artist={artist}
        />
    )


    return(
        <div>
            { !user.type && <NavBar />}
            { user.type === "user" && <NavBarUser selected="home"/>}
            { user.type === "promoter" && <NavBarPromoter selected="home"/>}
            { user.type === "admin" && <NavBarAdmin selected="home"/>}
            
            <img className="wallpaperBlur" src={event.image} alt="" />

            <div className="center">
                <div>
                    <div className="overImageContainer">
                        <img className="eventImage" src={event.image} alt="" />
                        <h2>{event.eventName}</h2>
                        <h3>{event.dayOfWeek}, {event.month} {event.day} | {event.time} </h3>
                        <p>{event.eventPlace}</p>

                        {user.type === "user" &&
                            <button className="saveEventButton" onClick={saveEvent}>
                                {event.is_saved? "You saved this event!" : "Save Event"}
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


                        { show === "ticketsType" &&
                            <div className="marginBottom">
                                {user.type === "user" &&
                                    <TicketAlert event={event} />
                                }      
                                <h2 className="marginTop">Tickets Types</h2>
                                {showTheTicketsTypes}
                            </div>
                        }

                        { show === "tickets" &&
                            <div>
                                {user.type === "user" &&
                                    <TicketAlert event={event} />
                                }
                                <h2 className="marginTop">Tickets Available</h2>
                                {showTheTickets}
                                <h2>Tickets Sold</h2>
                                {showTheSoldTickets}
                            </div>
                        }

                        { show === "ticket" &&
                            <div>
                                <FullTicket 
                                    ticket={ticket}
                                    ticketType={ticketType}
                                    setShow={setShow}
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
                                            <h3>{event.eventPlace}</h3>
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
    )
}


