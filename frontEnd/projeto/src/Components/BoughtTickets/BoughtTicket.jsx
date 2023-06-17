import Calendar from "../../Images/calendar.png"

export default function BoughtTicket(props){

    const {event} = props

    return(
        <div className="event">
            <div className="eventLeftSide">
                <img className="eventCalendar" src={Calendar} alt="" />
                <h3>{event.eventName}</h3>
                <h3>{event.ticketType}</h3>
                <p className="colorGreen">{event.dayOfWeek}, {event.month} {event.day} | {event.time} </p>
                <p>{event.eventPlace}</p>
            </div>

            <div className="eventRightSide">
                <h3>{event.ticketPrice} $</h3>
            </div>

        </div>
    )

}