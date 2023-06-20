import { useNavigate } from 'react-router-dom';

import Calendar from "../../Images/calendar.png"

import { GLOBAL_VARIABLE } from '../../backendIP.js';

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
                <h3>{event.event_name}</h3>
                <p className='colorGreen'>{event.start_date} - {event.end_date}</p>
                <p>{event.event_place}</p>
            </div>
        </div>
    )

}