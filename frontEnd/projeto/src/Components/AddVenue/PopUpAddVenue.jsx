import "../../Styles/Profile.css";
import { useNavigate } from "react-router-dom";

export default function PopUpAddVenue(props) {
  const navigate = useNavigate();
  const handleRemoveList = () => {
    props.setPopUpTrigger(false);
		navigate("/AddEvent")
  };

  return props.trigger ? (
    <div>
      <div className="editContainter">
        <h3 className="editTitle">Successful!</h3>
        <div className="popUpSellingListButton">
          <button className="button" onClick={handleRemoveList}>
            {" "}
            Back to Event Creation!
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
