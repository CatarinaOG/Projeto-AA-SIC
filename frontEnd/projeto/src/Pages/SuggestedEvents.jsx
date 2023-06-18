import { useState,useContext, useEffect } from "react";
import UserContext from "../Contexts/UserContext"

import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import SuggestedEvent from "../Components/SuggestedEvents/SuggestedEvent"

import "../Styles/SuggestedEvents.css"

export default function SuggestedEvents(props){

    const {setSuggestedEvent} = props
    const {user} = useContext(UserContext);

    const [suggestedEvents,setSuggestedEvents] = useState([])


    useEffect(() => {
        sendGetSuggestedRequest()
    },[])

    function sendGetSuggestedRequest(){

        fetch("http://localhost:8080/api/user/get_suggested_events", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
            setSuggestedEvents(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });
    }
    

    const showTheSuggestedEvents = suggestedEvents.map((event) => 
        <SuggestedEvent 
            key={event.id} 
            event={event} 
            setSuggestedEvent={setSuggestedEvent}
        />
    )

    return(
        <div>

            <NavBarPromoter selected="suggestions" />

            <div className="center">
                <div className="defaultContainer">

                    <h1>Events Suggested By Users</h1>
                    {showTheSuggestedEvents}
                </div>
            </div>
        </div>
    )
}