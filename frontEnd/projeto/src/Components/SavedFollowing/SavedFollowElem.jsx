import "../../Styles/SellingListing.css";
import close from "../../Images/close.png";

export default function SavedFollowElem(props) {
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
        <h4>
          {event.dayOfWeek}, {event.month} {event.day} | {event.eventPlace}{" "}
        </h4>
      </div>
      <div className="listing-elem-3">
        <img
          className="closeIc  display: flex;
          on"
          src={close}
          alt=""
          onClick={clickedClose}
        />
      </div>
    </div>
  );
}
