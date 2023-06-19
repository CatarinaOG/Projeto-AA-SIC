import "../../Styles/SellingListing.css";
import BlackClose from "../../Images/blackClose.png";
import Close from "../../Images/close.png";
import { useNavigate } from "react-router-dom";

import { useState,useContext,useEffect } from "react";
import UserContext from "../../Contexts/UserContext"

export default function EventElem(props) {
	const {event,type,setEventId} = props; // saved / followed
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
		setEventId(event.event_id)
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


	function yesClick(){
		switch(type){
			case "saved":
				break
			case "followed":
				removeFollowed();
				break
			case "created":
				removeEventPromoter()
				break
		}
	
	}



	function removeSaved(){

		console.log({
			event_id:event.event_id
		})

		fetch("http://localhost:8080/api/user/remove_saved_event", {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${user.token}`,
			body : JSON.stringify({
				event_id:event.id
			})
		}
		})
		.then(response => {
			if (response.ok) {
			  return response.json();
			} else {
			  throw new Error('Error: ' + response.status);
			}
		  })
		  .then(responseJSON => {
			if (responseJSON.confirmed === true){
			}
			else{
				console.log("Correu Mal")
			}
		  })
		  .catch(error => {
			console.log('Error:', error);
		  });
	}


	function removeFollowed(){

		const input = {
			event_id : event.event_id
		}
		console.log({
			event_id:event.event_id
		})

		fetch("http://localhost:8080/api/user/remove_followed_event", {
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
			if (responseJSON.confirmed === true){
			}
			else{
				console.log("Correu Mal")
			}
		  })
		  .catch(error => {
			console.log('Error:', error);
		  });
	}


	const input = {
		event : event.event_id
	  }
	  function removeEventPromoter(){
		fetch("http://localhost:8080/api/promoter/create_artist", {
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
		  if (responseJSON.confirmed){
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
                <h2>{event.event_name}</h2>
				<h4 className="colorGreen">{event.start_date} | {event.event_place} </h4>
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
