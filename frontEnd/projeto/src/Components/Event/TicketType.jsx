import { GLOBAL_VARIABLE } from '../../backendIP.js';

import ticket from "../../Images/ticket.png"

export default function TicketType(props){

    const {ticketType,sendGetTicketsRequest,setTicketType} = props

    function selectTicketType(){
        setTicketType(ticketType)
        sendGetTicketsRequest(ticketType.id)
    }


    return(
        <div className="eventTicketTypeContainer" onClick={selectTicketType}>
            <h3>{ticketType.description}</h3>
            <h3 className="nrSelling">{ticketType.nr_available}</h3>
            <img className="ticketImage" src={ticket} alt="" />
        </div>
    )

}