import "../../Styles/SellingListing.css";
import BlackClose from "../../Images/blackClose.png";
import Close from "../../Images/close.png";
import { useNavigate } from "react-router-dom";

import { useState,useContext,useEffect } from "react";
import UserContext from "../../Contexts/UserContext"

export default function EventListElem(props) {
	const {event} = props; // saved / followed
    const {user} = useContext(UserContext);

	const [showConfirmation,setShowConfirmation] = useState(false)

	const navigate = useNavigate()

	function deleteEvent() {
		setShowConfirmation(true)
	}

	function closeConfirmation(){
		setShowConfirmation(false)
	}

	function goToEvent(){
		navigate("/Event")
	}

	let confirmationStatment = ""
	function yesClick(){
	removeEventPromoter()
	
	}

	const input = {
		event : event.event_id
	  }

      

	  function removeEventPromoter(){
		fetch("http://localhost:8080/api/promoter/remove_event", {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',        
			  'Authorization': `Bearer ${user.token}`
			},
			body: JSON.stringify(input)
		})
		.then(response => {
		  if (response.ok) {
			return response.json();
		  } else {
			throw new Error('Error: ' + response.status);
		  }
		})
		.then(responseJSON => {
		  console.log(responseJSON.confirmed);
		  if (responseJSON.confirmed === true){
			console.log("AAAAAAAAAAA")
		  }
		  else{
			console.log("BBBBBBBBBBB")

		  }
		})
		.catch(error => {
		  console.log('Error:', error);
		});
	  }
	





	return(
		<div className="listingEvent">
            <div className="listingEventLeftSide">
                <h2>{event.name}</h2>
				<h4 className="colorGreen">{event.date} | {event.venue_name} </h4>
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
								<button className="button" onClick={yesClick}>Yes</button>
								<button className="button" onClick={closeConfirmation}>No</button>
							</div>
						</div>

					</div>
				</div>
			}

		</div>
	)
}
