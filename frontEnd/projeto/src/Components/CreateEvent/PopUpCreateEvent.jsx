import { useNavigate } from "react-router-dom";

export default function PopUpCreateEvent(props) {
  const navigate = useNavigate();
  const confirmButton = () => {
    props.setPopUpTrigger(false);
		navigate("/Events")
  };

  return props.trigger ? (
    <div>
      <div className="editContainter">
        <h3 className="editTitle">Successful!</h3>
        <div className="popUpSellingListButton">
          <button className="button" onClick={confirmButton}>
            {" "}
            Back to Event Listing!
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
