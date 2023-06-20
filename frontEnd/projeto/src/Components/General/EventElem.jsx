import "../../Styles/SellingListing.css";
import BlackClose from "../../Images/blackClose.png";
import Close from "../../Images/close.png";
import { useNavigate } from "react-router-dom";

import { useState,useContext,useEffect } from "react";
import UserContext from "../../Contexts/UserContext"
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function EventElem(props) {
	const {event,type,setEventId,method,setShowConfirmation,setEventRemoveID} = props; // saved / followed
    const {user} = useContext(UserContext);

	const navigate = useNavigate()

	function triggerEvent() {
		setEventRemoveID(event.event_id)
		setShowConfirmation(true)
	}


	function goToEvent(){
		setEventId(event.event_id)
		navigate("/Event")
	}

	return(
		<div className="listingEvent">
            <div className="listingEventLeftSide" onClick={goToEvent}>
                <h2>{event.event_name}</h2>
				<h4 className="colorGreen">{event.start_date} | {event.event_place} </h4>
				
			</div>
			<div className="listingElemClose">
					<img className="closeIcon" src={Close} alt="" onClick={triggerEvent}/>
			</div>
		</div>
	)
}
