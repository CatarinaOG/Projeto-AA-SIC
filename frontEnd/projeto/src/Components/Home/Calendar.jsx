import { useEffect, useState } from "react"

import "../../Styles/Home.css"

import CalendarEvent from "./CalendarEvent"
import { useTranslation } from "react-i18next";

export default function Calendar(props){
	const {t} = useTranslation();

    const {setEventId} = props

    const [events,setEvents] = useState([
    ])

    function sendGetCalendarEventsRequest(){

        fetch("http://localhost:8080/api/event/get_events", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
            setEvents(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });

    }


    useEffect(() => {
        sendGetCalendarEventsRequest()
    },[])


    const showEvents = events.map( event => {
            return (
                <CalendarEvent key={event.id} event={event} setEventId={setEventId} />
            )        
        }
    )


    return(
        <div className="centerAll">
            <div className="calendar">
                <h1 className="calendarTitle">{t('eventsCalendar')}</h1>
                
                <div className="calendarEvents">
                    {showEvents}
                </div>
            </div>
        </div>
    )

}