import React, { useRef } from "react";

export default function SmallEvent(props){

    const {event,setTicket,setFase} = props

    function addEventToTicket(){
        setTicket(oldTicket => ({...oldTicket,event:event}))
        setFase("type")
    }

    return event.name ? (

        <div className="blackContainer" onClick={addEventToTicket}>
            <h3>{event.name}</h3>
            <p>{event.date} | {event.address}</p>
        </div>

    ) : (
        <div className="blackContainer" onClick={addEventToTicket}>
            <h3>{event.event_name}</h3>
            <p>{event.start_date} | {event.event_place}</p>
        </div>
    )

}