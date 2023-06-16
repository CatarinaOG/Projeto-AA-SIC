import { useState } from "react";
import "../../Styles/Profile.css";

export default function PopUpConfirm(props) {
  const [phase, setPhase] = useState(1);

  function handleClick() {
    console.log(props.email, props.name, props.password);
    setPhase(2);
  }

  function toHome() {
    props.setPopUpTrigger(false);
    setPhase(1);
  }
  return props.trigger ? (
    <div className="editContainter">
      {phase === 1 ? (
        <div>
          <h3 className="editTitle">Confirm new Promoter?</h3>
          <div className="popUpSellingListButton">
            <button className="button" onClick={handleClick}>
              {" "}
              Yes
            </button>
          </div>
          <div className="popUpSellingListButton">
            <button
              className="button"
              onClick={() => props.setPopUpTrigger(false)}
            >
              {" "}
              No
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="editTitle">Promoter Confirmed</h3>
          <div className="popUpSellingListButton">
            <button className="button" onClick={toHome}>
              {" "}
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    ""
  );
}
