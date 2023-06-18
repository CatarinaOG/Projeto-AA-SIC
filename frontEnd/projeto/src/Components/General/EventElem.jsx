import "../../Styles/SellingListing.css";
import BlackClose from "../../Images/blackClose.png";
import Close from "../../Images/close.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EventElem(props) {
	const {event,type,setEventId} = props; // saved / followed

	const [showConfirmation,setShowConfirmation] = useState(false)

	const navigate = useNavigate()

	function deleteEvent() {
		setShowConfirmation(true)
	}

	function closeConfirmation(){
		setShowConfirmation(false)
	}

	function goToEvent(){
		setEventId(event.id)
		navigate("/Event")
	}

	let confirmationStatment = ""

	switch(type){
		case "saved":
			confirmationStatment = "Are you sure you want to remove this event from Saved?"
			break
		case "followed":
			confirmationStatment = "Are you sure you want to remove this event from Followed?"
			break
	}

	return(
		<div className="listingEvent" onClick={goToEvent}>
            <div className="listingEventLeftSide">
                <h2>{event.name}</h2>
				<h4 className="colorGreen">{event.date} | {event.venue_name}|{event.city} {" "} </h4>
				<div className="listingElemClose">
					<img className="closeIcon" src={Close} alt="" onClick={deleteEvent}/>
				</div>
			</div>

			{ showConfirmation &&
				<div>
					<div className="overlay"></div>
					<div className="popUpContainer">
						<img src={BlackClose} className="editClose" alt="" onClick={closeConfirmation} />
						<h3 className="popUpInfoWithButtons">{confirmationStatment}</h3>
						<div className="center">
							<div className="promoterButtons">
								<button className="button">Yes</button>
								<button className="button">No</button>
							</div>
						</div>

					</div>
				</div>
			}

		</div>
	)
}
