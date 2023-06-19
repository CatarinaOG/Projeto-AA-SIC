import { useRef, useEffect, useState, useContext} from "react"
import UserContext from "../../Contexts/UserContext"
import SmallEventSelected from "./SmallEventSelected"

import TicketType from "./TicketType"

export default function FaseType(props){

    const {ticket,setTicket,setFase} = props
    const [types,setTypes] = useState([])
    const {user} = useContext(UserContext);

    function sendGetTicketTypesRequest(){

        fetch("http://localhost:8080/api/event/get_ticket_types_event", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event_id: ticket.event.id
            })
        })
        .then(response => response.json())
        .then(responseJSON => {
            console.log(responseJSON)
            setTypes(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });
    }

    useEffect(() => {
        sendGetTicketTypesRequest()
    },[])

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