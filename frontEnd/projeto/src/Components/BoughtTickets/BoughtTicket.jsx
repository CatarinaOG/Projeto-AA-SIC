import Calendar from "../../Images/calendar.png"
import Ticket from "../../Images/blueticket.png"
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function BoughtTicket(props){

    const {ticket} = props

    return(
        <div className="event">
            <div className="eventLeftSide">
                <img className="eventCalendar" src={Calendar} alt="" />
                <h3>{ticket.event_name}</h3>
                <h3>{ticket.ticket_type}</h3>
                <p className="colorGreen">{ticket.start_date} - {ticket.end_date}</p>
                <p>{ticket.event_place}</p>
            </div>

            <div className="eventRightSide">
                <h3>{ticket.ticket_price} $</h3>
                <a href={ticket.ticket_file} download>
                    <img src={Ticket}  className="downloadButton" alt="" />
                </a>
            </div>

        </div>
    )

}