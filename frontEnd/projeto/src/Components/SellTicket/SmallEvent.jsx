import React, { useRef } from "react";

export default function SmallEvent(props){

    const {event,setTicket,setFase} = props

    function addEventToTicket(){
        setTicket(oldTicket => ({...oldTicket,event:event}))
        setFase("type")
    }
    
    return(

        <div className="blackContainer" onClick={addEventToTicket}>
            <h3>{event.name}</h3>
            <p>{event.dates} | {event.place}</p>
        </div>

    )

}