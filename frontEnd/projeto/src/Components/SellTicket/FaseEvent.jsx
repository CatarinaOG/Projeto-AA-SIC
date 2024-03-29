import { useState,useRef, useEffect,useContext } from "react"

import UserContext from "../../Contexts/UserContext"
import SmallEvent from "./SmallEvent"
import Magnifier from "../../Images/magnifier.png"
import { GLOBAL_VARIABLE } from '../../backendIP.js';

import { useTranslation } from "react-i18next";


export default function FaseEvent(props){
    const {t} = useTranslation();

    const {setTicket,setFase} = props
    const {user} = useContext(UserContext);


    const [input,setInput] = useState("")
    const [eventsSuggested,setEventsSuggested] = useState([])
    const [events,setEvents] = useState([])


    const handleEnter = (event) => {
        if (event.key === "Enter") {
            setInput(event.target.value);
            sendGetEventsRequest()
        }
    };

    const toTitleRef = useRef(null)

    useEffect(() => {
        if (toTitleRef.current) {
            toTitleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        sendGetSuggestedRequest()

    }, []);


    function sendGetSuggestedRequest(){

        fetch(`${GLOBAL_VARIABLE}/user/events_suggested_for_selling_ticket`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
            setEventsSuggested(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });

    }

    function sendGetEventsRequest(){

        fetch(`${GLOBAL_VARIABLE}/event/get_filtered_events`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter_text: input,
                filter_place: "",
                filter_time: "",
                filter_category: "",
            })
        })
        .then(response => response.json())
        .then(responseJSON => {
            setEvents(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });

    }

    const showEventsSuggested = eventsSuggested.map( event => 
        <SmallEvent 
            key={event.id} 
            event={event} 
            setTicket={setTicket} 
            setFase={setFase}/>
    )
    
    const eventsSearched = events.map( event => 
        <SmallEvent 
            key={event.id} 
            event={event} 
            setTicket={setTicket} 
            setFase={setFase}/>
    )




    return(
        <div className="center">
            <div>
                <h1 ref={toTitleRef}>{t('selectEvent')}</h1>
                <p className="gray">{t('whichEventMessage')}</p>

                <img className="magnifierSelectTicket" src={Magnifier} alt="" />
                <input className="inputSelectTicket" onKeyDown={handleEnter} type="text" placeholder="Where do you want to go?"/>
            
                {input === "" && (
                    <div>
                        <p className="graySmaller">{t('suggested')}Suggested:</p>
                        <div className="suggestedEvents">
                            {showEventsSuggested}
                        </div>
                    </div>
                )}

                {input !== "" && (
                    <div>
                        <p className="graySmaller">{t('results')}Results:</p>
                        <div className="searchedEvents">
                            {eventsSearched}
                        </div>
                    </div>
                )}

                
            </div>
        </div>
    )

}