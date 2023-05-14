import Calendar from "../../Images/calendar.png"

export default function BoughtTicket(props){

    const {event} = props

    return(
        <div className="event">
            <div className="eventLeftSide">
                <img className="eventCalendar" src={Calendar} alt="" />
                <h3>{event.dayOfWeek}, {event.month} {event.day} | {event.time} </h3>
                <h3>{event.ticketType}</h3>
                <p>{event.eventName}</p>
                <p>{event.eventPlace}</p>
            </div>

            <div className="eventRightSide">
                <h3>{event.ticketPrice} $</h3>
            </div>

        </div>
    )

}