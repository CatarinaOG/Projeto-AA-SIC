import { useState } from "react";

import NavBarUser from "../Components/NavBar/NavBarUser";
import SuggestedEvent from "../Components/SuggestedEvents/SuggestedEvent"

import "../Styles/SuggestedEvents.css"

export default function SuggestedEvents(){

    const [suggestedEvents,setSuggestedEvents] = useState([
        {
            name: "nos alice",
            place: "lisboa",
            start_date: "24/03/34",
            end_date: "03/34/23",
        },
        {
            name: "nos alice",
            place: "lisboa",
            start_date: "24/03/34",
            end_date: "03/34/23",
        },
    ])

    const showTheSuggestedEvents = suggestedEvents.map((event) => 
        <SuggestedEvent event={event} />
    )

    return(
        <div>

            <NavBarUser />

            <div className="center">
                <div className="defaultContainer">

                    <h1>Events Suggested By Users</h1>
                    {showTheSuggestedEvents}
                </div>
            </div>
        </div>
    )
}