
import ticket from "../../Images/ticket.png"

export default function TicketType(props){

    const {ticketType,setTicketType,setShow} = props

    function selectTicketType(){
        setTicketType(ticketType)
        setShow("tickets")
    }


    return(
        <div className="eventTicketTypeContainer" onClick={selectTicketType}>
            <h3>{ticketType.description}</h3>
            <h3 className="nrSelling">{ticketType.nr_selling}</h3>
            <img className="ticketImage" src={ticket} alt="" />
        </div>
    )

}