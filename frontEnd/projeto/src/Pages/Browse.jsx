import { useState,useContext } from "react"

import Filters from "../Components/Filters/Filters"
import NavBarUser from "../Components/NavBar/NavBarUser"
import NavBar from "../Components/NavBar/NavBar"
import BrowseTicket from "../Components/Browse/BrowseTicket"
import UserContext from "../Contexts/UserContext"
import NavBarPromoter from "../Components/NavBar/NavBarPromoter"
import NavBarAdmin from "../Components/NavBar/NavBarAdmin"

import Magnifier from "../Images/magnifier.png"

import "../Styles/Browse.css"



export default function Browse(props){

    const {searchText,setSearchText,setEventId} = props
    const {user} = useContext(UserContext);

    const [events,setEvents] =useState([ // para ser substituido pelo pedido com base no filtro
        {
            id: 1,
            dayOfWeek: "Wednesday",
            month: "May",
            day: "8",
            time: "9:25 PM",
            eventName: "Coldplay - Music Of The Spheres World Tour",
            eventPlace: "Estádio Cidade de Coimbra, Coimbra",
        },
        {
            id: 2,
            dayOfWeek: "Friday",
            month: "May",
            day: "19",
            time: "08:00 PM",
            eventName: "Post Malone - Twelve Carat Tour",
            eventPlace: "Ziggo Dome, Amsterdam",
        },
        {
            id: 3,
            dayOfWeek: "Thursday",
            month: "Jul",
            day: "7",
            time: "03:00 PM",
            eventName: "NOS ALIVE'23",
            eventPlace: "NOS Alive, Algés, Portugal",
        },
        {
            id: 4,
            dayOfWeek: "Thursday",
            month: "Jul",
            day: "7",
            time: "03:00 PM",
            eventName: "NOS ALIVE'23",
            eventPlace: "NOS Alive, Algés, Portugal",
        },
        {
            id: 5,
            dayOfWeek: "Thursday",
            month: "Jul",
            day: "7",
            time: "03:00 PM",
            eventName: "NOS ALIVE'23",
            eventPlace: "NOS Alive, Algés, Portugal",
        },
        {
            id: 6,
            dayOfWeek: "Thursday",
            month: "Jul",
            day: "7",
            time: "03:00 PM",
            eventName: "NOS ALIVE'23",
            eventPlace: "NOS Alive, Algés, Portugal",
        },
        {
            id: 7,
            dayOfWeek: "Thursday",
            month: "Jul",
            day: "7",
            time: "03:00 PM",
            eventName: "NOS ALIVE'23",
            eventPlace: "NOS Alive, Algés, Portugal",
        },
    ])

    function searchEvents(){
    }

    const show_events = events.map((event) => 
        <BrowseTicket 
            key={event.id}
            event={event} 
            setEventId={setEventId}
        />
    )

    return(
        <div>
            { !user.type && <NavBar />}
            { user.type === "user" && <NavBarUser selected="home"/>}
            { user.type === "promoter" && <NavBarPromoter selected="home"/>}
            { user.type === "admin" && <NavBarAdmin selected="home"/>}

            <div className="center">
                <div className="defaultContainer">
                    <div>
                        <h1>Browse Events</h1>
                        <p className="gray">Find events off all types from any date in any place!</p>


                        <div className="searchBarBrowse">
                            <div>
                                <img className="magnifier" src={Magnifier} alt="" />
                                <form onSubmit={searchEvents}>
                                    <input className="inputBrowse" type="text" placeholder="Where do you want to go?" value={searchText} onChange={(event) => setSearchText(event.target.value)}/>              
                                </form>
                            </div>
                        </div>

                        <Filters />

                        { events.length > 0 && 
                            <div className="eventsContainer">
                                {show_events}
                            </div>
                        }
                        
                        { events.length === 0 &&
                            <div>
                                <h2 className="marginTop">No Events Found</h2>
                                <p>Your filters did not yield any results</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}