import { useState } from "react"

import "../../Styles/Home.css"

import CalendarEvent from "./CalendarEvent"

export default function Calendar(props){

    const {setEventId} = props

    const [events,setEvents] = useState([
        {
            id: 1,
            dates: "July 6th",
            name: "NOS Alive",
            place: "Passeio Marítimo de algés, Lisboa"
        },
        {
            id: 2,
            dates: "July 18th",
            name: "Harry Styles",
            place: "Passeio Marítimo de algés, Lisboa"
        },
        {
            id: 3,
            dates: "May 13th",
            name: "Hanz Zimmer",
            place: "Altice Arena, Lisboa"
        },
        {
            id: 4,
            dates: "May 17th",
            name: "Coldplay",
            place: "Passeio Marítimo de algés, Lisboa"
        },
        {
            id: 5,
            dates: "July 6th",
            name: "NOS Alive",
            place: "Passeio Marítimo de algés, Lisboa"
        },
    ])

    const showEvents = events.map( event => {
            return (
                <CalendarEvent key={event.id} event={event} setEventId={setEventId} />
            )        
        }
    )


    return(
        <div className="centerAll">
            <div className="calendar">
                <h1 className="calendarTitle">Events Calendar</h1>
                
                <div className="calendarEvents">
                    {showEvents}
                </div>
            </div>
        </div>
    )

}