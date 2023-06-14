import "../../Styles/Profile.css";

export default function PopUpRemoveListing(props) {
  return props.trigger ? (
    <div>
      <div className="editContainter">
        <h3 className="editTitle">
          Are you sure you want to remove the listing?
        </h3>
        <div className="popUpSellingListButton">
          <button
            className="button"
            onClick={() => props.setPopUpTrigger(false)}
          >
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

/*
    <div className="popupSellingList">
      <div className="popupSellingListInner">
        <h1>Are you sure you want to delete this listing?</h1>
        <div className="divButtons">
          <button
            className="button"
            onClick={() => props.setPopUpTrigger(false)}
          >
            {" "}
            Yes
          </button>
          <button
            className="button"
            onClick={() => props.setPopUpTrigger(false)}
          >
            {" "}
            No
          </button>
        </div>
      </div>
    </div> */
