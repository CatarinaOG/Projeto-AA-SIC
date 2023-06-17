import "../../Styles/SellingListing.css";
import close from "../../Images/close.png";

export default function EventElem(props) {
	const { event, setPopUpTrigger, setPopUpID } = props;

	function clickedClose() {
		setPopUpTrigger(true);
		setPopUpID(event.id);
	}

	return (
		<div className="listing">
			<div className="listing-elem-1">
				<h2>{event.eventName}</h2>
				<h4 className="colorGreen">{event.dayOfWeek}, {event.month} {event.day} | {event.eventPlace}{" "}</h4>
			</div>
			<div className="listing-elem-3">
				<img className="closeIcon" src={close} alt="" onClick={clickedClose}/>
			</div>
		</div>
	);
}
