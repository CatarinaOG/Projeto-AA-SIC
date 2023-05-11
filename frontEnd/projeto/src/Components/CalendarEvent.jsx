import Calendar from "../Images/calendar.png"


export default function CalendarEvent(props){

    const {event} = props;

    
    return(

        <div className="calendarEvent">
            <img className="calendarImage" src={Calendar} alt="" />
            <p className="calendarEventDates">{event.dates}</p>
            <h3 className="calendarEventName">{event.name}</h3>
            <p className="calendarEventPlace">{event.place}</p>
        </div>

    )
}