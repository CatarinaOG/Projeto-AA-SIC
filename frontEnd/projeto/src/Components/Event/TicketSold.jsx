

export default function TicketSold(props){

    const {ticketSold,ticketType} = props

    return(
        <div className="eventSoldTicketContainer">
            <img className="ticketUserImage" src={ticketSold.user_image} alt="" />
            <h3 className="ticketContent">{ticketType.description}</h3>
            <p className="ticketContent">"{ticketSold.description}"</p>
            <h2 className="ticketPrice">{ticketSold.price}</h2>
        </div>
    )
}