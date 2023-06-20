import SmallEventSelected from "./SmallEventSelected"
import TicketTypeSelected from "./TicketTypeSelected"
import TicketPrice from "./TicketPrice"

import { useRef, useEffect } from "react"
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function FasePrice(props){

    const {ticket,setTicket,setFase} = props
    
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
                    ticket={ticket}
                    setTicket={setTicket}
                    setFase={setFase}/>

                <h1>Select Ticket</h1>
                <p className="gray">What kind of ticket do you have?</p>

                <TicketTypeSelected
                    ticket={ticket}
                    setTicket={setTicket}
                    setFase={setFase}/>

                <h1 ref={toTitleRef}>Select Price</h1>
                <p className="gray">For how much would you like to sell the ticket for?</p>

                <TicketPrice 
                    ticket={ticket} 
                    setTicket={setTicket}
                    setFase={setFase}/>
                
                
                
            </div>
        </div>
    )


}