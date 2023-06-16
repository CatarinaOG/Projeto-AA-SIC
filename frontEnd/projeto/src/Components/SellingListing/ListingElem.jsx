import "../../Styles/SellingListing.css";
import close from "../../Images/close.png";
import sold from "../../Images/soldIcon.png";
import selling from "../../Images/onSaleIcon.png";

export default function ListinElem(props) {
  const { event, setPopUpTrigger, setPopUpID } = props;

  function clickedClose() {
    setPopUpTrigger(true);
    setPopUpID(event.id);
    console.log("Clicked");
  }

  return (
    <div className="listing">
        <div className="listing-elem-1">
            <h2>{event.eventName}</h2>
            <h4>{event.dayOfWeek}, {event.month} {event.day} | {event.eventPlace}{" "}</h4>
        </div>

        <div className="listing-elem-2">
            <h3>{event.ticketType}</h3>
            <h3>{event.ticketPrice} $</h3>
            {props.event.status === "selling" ? (
                <img src={selling} alt="" className="soldSellingIcon" />
            ) : (
                <img src={sold} alt="" className="soldSellingIcon" />
            )}
        </div>
        <div className="listing-elem-3">
            <img className="closeIcon" src={close} alt="" onClick={clickedClose} />
        </div>
    </div>
  );
}
