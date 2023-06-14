import React from "react";
import "../../Styles/SellingListing.css";

export default function PopUpSellingListing(props) {
  return props.trigger ? (
    <div className="popupSellingList">
      <div className="popupSellingListInner">
        <h1>Are you sure you want to delete this listing?</h1>
        <div className="divButtons">
          <button
            className="closeButtonSellingInner"
            onClick={() => props.setPopUpTrigger(false)}
          >
            {" "}
            Yes
          </button>
          <button
            className="closeButtonSellingInner"
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
