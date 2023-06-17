import { useState } from "react";

import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import SuggestedEvent from "../Components/SuggestedEvents/SuggestedEvent"

import "../Styles/SuggestedEvents.css"

export default function SuggestedEvents(props){

    const {setSuggestedEvent} = props

    const [suggestedEvents,setSuggestedEvents] = useState([
        {
            name: "nos alice",
            place: "Porto",
            start_date: "24/03/34",
            start_time: "10:23",
            end_date: "03/34/23",
            end_time: "10:23",

        },
        {
            name: "nos alice",
            place: "lisboa",
            start_date: "24/03/34",
            start_time: "10:23",
            end_date: "03/34/23",
            end_time: "10:23",
        },
    ])

    const showTheSuggestedEvents = suggestedEvents.map((event) => 
        <SuggestedEvent event={event} setSuggestedEvent={setSuggestedEvent}/>
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