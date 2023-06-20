
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function Ticket(props){

    const {ticket,ticketType,setShow,setTicket} = props

    function goToTicket(){
        setTicket(ticket)
        setShow("ticket")
    }

    const profile_pic = ticket.user_image ? ticket.user_image : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

    return(
        <div className="eventTicketContainer" onClick={goToTicket}>
            <img className="ticketUserImage" src={profile_pic} alt=""/>
            <h3 className="ticketContent">{ticketType.description}</h3>
            <p className="ticketContent">"{ticket.description !== "" ? ticket.description : "** No description **"}"</p>
            <h2 className="ticketPrice">{ticket.price}$</h2>
        </div>
    )
}