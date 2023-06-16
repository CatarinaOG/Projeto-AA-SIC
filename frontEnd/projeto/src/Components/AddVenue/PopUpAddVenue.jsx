import "../../Styles/Profile.css";

export default function PopUpAddVenue(props) {
  const handleRemoveList = () => {
    props.setPopUpTrigger(false);
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
