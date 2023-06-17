import { useState,useContext } from "react";
import UserContext from "../Contexts/UserContext"

import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import SuggestedEvent from "../Components/SuggestedEvents/SuggestedEvent"

import "../Styles/SuggestedEvents.css"

export default function SuggestedEvents(props){

    const {setSuggestedEvent} = props
    const {user} = useContext(UserContext);

    const [suggestedEvents,setSuggestedEvents] = useState([
        {
            id: 1,
            name: "Nos alice",
            address: "Porto",
            start_date: "24/03/34 10:23",
            end_date: "03/34/23 10:23",
        },
        {
            id: 2,
            name: "Nos alice",
            address: "lisboa",
            start_date: "24/03/34 10:23",
            end_date: "03/34/23 10:23",
        },
    ])

    function sendGetSuggestedRequest(){

        fetch("http://localhost:8080/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
            //setSuggestedEvents(responseJSON)
            console.log(responseJSON)
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