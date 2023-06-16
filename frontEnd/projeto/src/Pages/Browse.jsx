import Filters from "../Components/Filters/Filters"
import NavBarUser from "../Components/NavBar/NavBarUser"

import { useState } from "react"

import "../Styles/Browse.css"
import BrowseTicket from "../Components/Browse/BrowseTicket"


export default function Browse(props){

    const {setEventId,user,setUser} = props

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

    const show_events = events.map((event) => 
        <BrowseTicket 
            key={event.id}
            event={event} 
            setEventId={setEventId}
        />
    )


    return(
        <div>

            <NavBarUser 
                selected="home"
                user={user}
                setUser={setUser}
            />

            <div className="center">
                <div className="defaultContainer">
                    <div>
                        <h1>Browse Events</h1>
                        <p className="gray">Find events off all types from any date in any place!</p>

                        <Filters />

                        { events.length > 0 && 
                            <div className="marginTop">
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