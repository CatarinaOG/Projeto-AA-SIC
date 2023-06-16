

export default function Ticket(props){

    const {ticket,ticketType,setShow,setTicket} = props

    function goToTicket(){
        setTicket(ticket)
        setShow("ticket")
    }

    return(
        <div className="eventTicketContainer" onClick={goToTicket}>
            <img className="ticketUserImage" src={ticket.user_image} alt="" />
            <h3 className="ticketContent">{ticketType.description}</h3>
            <p className="ticketContent">"{ticket.description}"</p>
            <h2 className="ticketPrice">{ticket.price}</h2>
        </div>
    )
}