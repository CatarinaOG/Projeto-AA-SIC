import "../../Styles/SellingListing.css";
import close from "../../Images/close.png";
import sold from "../../Images/soldIcon.png";
import selling from "../../Images/onSaleIcon.png";

export default function ListinElem(props) {

  	const { event, setPopUpTrigger, setPopUpID } = props;

	function clickedClose() {
		setPopUpTrigger(true);
		setPopUpID(event.id);
	}

	return(
		<div className="listingEvent">
            <div>
                <h3>{event.eventName}</h3>
                <h3>{event.ticketType}</h3>
                <p className="colorGreen">{event.dayOfWeek}, {event.month} {event.day} | {event.eventPlace}{" "} </p>
                <p>{event.eventPlace}</p>
            </div>

            <div className="listingEventRightSide">
                <h3>{event.ticketPrice} $</h3>
				{props.event.status === "selling" ? 
					(<img src={selling} alt="" className="soldSellingIcon" />): 
					(<img src={sold} alt="" className="soldSellingIcon" />)
				}
            </div>
			
			{props.event.status === "selling" && (
				<div className="listingElemClose">
					<img className="closeIcon" src={close} alt="" onClick={clickedClose}/>
				</div>
			)}

        </div>
	)
}