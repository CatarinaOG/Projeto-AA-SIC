import Calendar from "../../Images/calendar.png"

import { useNavigate } from 'react-router-dom';

export default function BrowseTicket(props){

    const {event,setEvent} = props
    const navigate = useNavigate();

    function goToEvent(){
        navigate('/Event')
        setEvent(event)
    }

    return(
        <div className="eventClickable" onClick={goToEvent}>
            <div className="eventLeftSide">
                <img className="eventCalendar" src={Calendar} alt="" />
                <h3>{event.dayOfWeek}, {event.month} {event.day} | {event.time} </h3>
                <p>{event.eventName}</p>
                <p>{event.eventPlace}</p>
            </div>
        </div>
    )

}