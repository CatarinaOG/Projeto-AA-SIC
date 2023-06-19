import { useState,useRef, useEffect,useContext } from "react"

import UserContext from "../../Contexts/UserContext"
import SmallEvent from "./SmallEvent"
import Magnifier from "../../Images/magnifier.png"



export default function FaseEvent(props){

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

        fetch("http://localhost:8080/api/user/events_suggested_for_selling_ticket", {
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

        fetch("http://localhost:8080/api/event/get_filtered_events", {
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
                <h1 ref={toTitleRef}>Select Event</h1>
                <p className="gray">Which event do you want to sell tickets for?</p>

                <img className="magnifierSelectTicket" src={Magnifier} alt="" />
                <input className="inputSelectTicket" onKeyDown={handleEnter} type="text" placeholder="Where do you want to go?"/>
            
                {input === "" && (
                    <div>
                        <p className="graySmaller">Suggested:</p>
                        <div className="suggestedEvents">
                            {showEventsSuggested}
                        </div>
                    </div>
                )}

                {input !== "" && (
                    <div>
                        <p className="graySmaller">Results:</p>
                        <div className="searchedEvents">
                            {eventsSearched}
                        </div>
                    </div>
                )}

                
            </div>
        </div>
    )

}