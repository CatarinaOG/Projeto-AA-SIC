import { useNavigate } from 'react-router-dom';

import Calendar from "../../Images/calendar.png"


export default function CalendarEvent(props){

    const {event,setEventId} = props;

    const navigate = useNavigate();


    function goToEvent(){
        setEventId(event.id)
        navigate("/Event")
    }
    
    return(
        <div className="calendarEvent" onClick={goToEvent}>
            <img className="calendarImage" src={Calendar} alt="" />
            <p className="calendarEventDates">{event.dates}</p>
            <h3 className="calendarEventName">{event.name}</h3>
            <p className="calendarEventPlace">{event.place}</p>
        </div>
    )
}