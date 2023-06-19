import "../../Styles/SellingListing.css";
import close from "../../Images/close.png";
import sold from "../../Images/soldIcon.png";
import selling from "../../Images/onSaleIcon.png";

export default function ListinElem(props) {

  	const { ticket, setPopUpTrigger, setPopUpID } = props;

	function clickedClose() {
		setPopUpTrigger(true);
		setPopUpID(ticket.id);
	}

	return(
		<div className="listingEvent">
            <div>
                <h3>{ticket.event_name}</h3>
                <h3>{ticket.ticket_type}</h3>
                <p className="colorGreen"> Event Start: {ticket.start_date}  </p>
				<p className="colorGreen">Date Created {ticket.created_date} {" "} </p>
                <p>{ticket.eventPlace}</p>
            </div>

            <div className="listingEventRightSide">
                <h3>{ticket.ticket_price} $</h3>
				{ticket.ticket_status  === "selling" ? 
					(<img src={selling} alt="" className="soldSellingIcon" />): 
					(<img src={sold} alt="" className="soldSellingIcon" />)
				}
            </div>
			
			{ticket.ticket_status === "selling" && (
				<div className="listingElemClose">
					<img className="closeIcon" src={close} alt="" onClick={clickedClose}/>
				</div>
			)}

        </div>
	)
}