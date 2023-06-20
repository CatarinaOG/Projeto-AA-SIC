import "../../Styles/SellingListing.css";
import close from "../../Images/close.png";
import sold from "../../Images/soldIcon.png";
import selling from "../../Images/onSaleIcon.png";
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function ListinElem(props) {

  	const { ticket, setPopUpTrigger, setPopUpID } = props;
	const {t} = useTranslation();

	function clickedClose() {
		setPopUpID(ticket.ticket_id);
		setPopUpTrigger(true);
	}

	return(
		<div className="listingEvent">
            <div>
                <h3>{ticket.event_name}</h3>
                <h3>{ticket.ticket_type}</h3>
                <p className="colorGreen">{t('eventStart')} {ticket.start_date}  </p>
				<p className="colorGreen">{t('dateCreated')} {ticket.created_date} {" "} </p>
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