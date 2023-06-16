import { useNavigate } from 'react-router-dom';

import Calendar from "../../Images/calendar.png"


export default function BrowseTicket(props){

    const {event,setEventId} = props
    const navigate = useNavigate();

    function goToEvent(){
        navigate('/Event')
        setEventId(event.id)
    }

    return(
        <div className="eventClickable" onClick={goToEvent}>
            <div className="eventLeftSide">
                <img className="eventCalendar" src={Calendar} alt="" />
                <h3>{event.eventName}</h3>
                <p className='colorGreen'>{event.dayOfWeek}, {event.month} {event.day} | {event.time} </p>
                <p>{event.eventPlace}</p>
            </div>
        </div>
    )

}