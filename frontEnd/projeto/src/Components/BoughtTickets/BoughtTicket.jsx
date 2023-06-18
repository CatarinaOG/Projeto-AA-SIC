import Calendar from "../../Images/calendar.png"
import Ticket from "../../Images/blueticket.png"

export default function BoughtTicket(props){

    const {ticket} = props

    return(
        <div className="event">
            <div className="eventLeftSide">
                <img className="eventCalendar" src={Calendar} alt="" />
                <h3>{ticket.eventName}</h3>
                <h3>{ticket.ticketType}</h3>
                <p className="colorGreen">{ticket.dayOfWeek}, {ticket.month} {ticket.day} | {ticket.time} </p>
                <p>{ticket.eventPlace}</p>
            </div>

            <div className="eventRightSide">
                <h3>{ticket.ticketPrice} $</h3>
                <a href={ticket.file} download>
                    <img src={Ticket}  className="downloadButton" alt="" />
                </a>
            </div>

        </div>
    )

}