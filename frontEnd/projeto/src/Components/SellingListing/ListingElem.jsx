import "../../Styles/SellingListing.css";
import close from "../../Images/close.png";

function clickedClose(setPopUpTrigger) {
  setPopUpTrigger(true);
  console.log("Clicked");
}

export default function ListinElem(props) {
  const { event, setPopUpTrigger } = props;

  return (
    <div className="listing">
      <div className="listing-elem-1">
        <h2>{event.eventName}</h2>
        <h4>
          {event.dayOfWeek}, {event.month} {event.day} | {event.eventPlace}{" "}
        </h4>
      </div>

      <div className="listing-elem-2">
        <h3>{event.ticketType}</h3>
        <h3>{event.ticketPrice} $</h3>
      </div>
      <div className="listing-elem-3">
        <img
          className="closeIcon"
          src={close}
          alt=""
          onClick={() => clickedClose(setPopUpTrigger)}
        />
      </div>
    </div>
  );
}
