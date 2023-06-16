import { useRef, useEffect } from "react"

import SmallEventSelected from "./SmallEventSelected"

import TicketType from "./TicketType"

export default function FaseType(props){

    const {events,ticket,setTicket,setFase,types} = props

    const allTypes = types.map( type => 
        <TicketType 
            key={type.id} 
            type={type} 
            setTicket={setTicket} 
            setFase={setFase}/> 
    )

    const toTitleRef = useRef(null)

    useEffect(() => {
        if (toTitleRef.current) {
            toTitleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, []);

    return(

        <div className="center">
            <div>
                <h1>Select Event</h1>
                <p className="gray">Which event do you want to sell tickets for?</p>

                <SmallEventSelected 
                    events={events} 
                    ticket={ticket} 
                    setTicket={setTicket}
                    setFase={setFase}
                />

                <h1 ref={toTitleRef}>Select Ticket</h1>
                <p className="gray">What kind of ticket do you have?</p>

                <div className="exsitingTypes">
                    {allTypes}
                </div>
                
            </div>
        </div>

    )


}