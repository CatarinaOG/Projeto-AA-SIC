import "../../Styles/SellingListing.css";
import close from "../../Images/close.png";
import sold from "../../Images/soldIcon.png";
import selling from "../../Images/onSaleIcon.png";

export default function ListinElem(props) {

  	const { ticket, setPopUpTrigger, setPopUpID } = props;

	function clickedClose() {
		setPopUpID(ticket.ticket_id);
		setPopUpTrigger(true);
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
				{ticket.ticket_status  === "available" ? 
					(<img src={selling} alt="" className="soldSellingIcon" />): 
					(<img src={sold} alt="" className="soldSellingIcon" />)
				}
            </div>
			
			{ticket.ticket_status === "available" && (
				<div className="listingElemClose">
					<img className="closeIcon" src={close} alt="" onClick={clickedClose}/>
				</div>
			)}

        </div>
	)
}