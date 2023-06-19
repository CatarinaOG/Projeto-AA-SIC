import "../../Styles/SellingListing.css";
import Close from "../../Images/close.png";

export default function NotificationElem(props) {
  const { notification , removeNotif} = props;


  function clickedClose() {
    removeNotif(notification.notification_id)    
    console.log("Clicked");
  }
  
  


  return (
    <div className="listingEvent">
            <div className="listingEventLeftSide">
                <h2>{notification.title}</h2>
				<h4 className="colorGreen">{notification.content} | {notification.date} </h4>
				<div className="listingElemClose">
					<img className="closeIcon" src={Close} alt="" onClick={() => clickedClose()} />
				</div>
			</div>
    </div>
  );
}
