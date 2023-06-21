export default function TicketSold(props){

    const {ticketSold,ticketType} = props

    const profile_pic = ticketSold.user_image ? ticketSold.user_image : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

    return(
        <div className="eventSoldTicketContainer">
            <img className="ticketUserImage" src={profile_pic} alt="" />
            <h3 className="ticketContent">{ticketType.description}</h3>
            <p className="ticketContent">"{ticketSold.description}"</p>
            <h2 className="ticketPrice">{ticketSold.price}</h2>
        </div>
    )
}