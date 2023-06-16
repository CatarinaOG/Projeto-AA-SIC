import "../../Styles/Profile.css";

export default function PopUpConfirmPay(props) {
  const handleRemoveList = () => {
    props.onRemove(props.popUpID);
    props.setPopUpTrigger(false);
    props.setPopUpID("");
  };

  return props.trigger ? (
    <div>
      <div className="editContainter">
        <h3 className="editTitle">Payment Info Submitted</h3>
        <div className="popUpSellingListButton">
          <button className="button" onClick={handleRemoveList}>
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
    </div>
  ) : (
    ""
  );
}
