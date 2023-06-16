import { useState, useEffect } from "react";
import "../../Styles/Profile.css";

export default function PopUpAddType(props) {
  const [ticketType, setTicketType] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (props.trigger) {
      // Clear the form when the popup is triggered
      setTicketType("");
      setPrice(0);
    }
  }, [props.trigger]);

  const handleTypeChange = (event) => {
    setTicketType(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const submitType = () => {
    const newType = {
      typeName: ticketType,
      price: price,
    };
    props.onAddType(newType);
  };
  return props.trigger ? (
    <div>
      <div className="editContainter">
        <h3 className="editTitle">Add Ticket Type and Price</h3>
        <form>
          <input
            className="inputPopUpAddType"
            type="text"
            placeholder="Ticket Type"
            value={ticketType}
            onChange={handleTypeChange}
          ></input>
          <input
            className="inputPopUpAddTypePrice"
            type="number"
            placeholder="Price"
            value={price}
            onChange={handlePriceChange}
          ></input>
        </form>
        <div className="popUpSellingListButton">
          <button
            className="button"
            onClick={() => {
              submitType();
              props.setPopUpTrigger(false);
            }}
          >
            Yes
          </button>
          <button
            className="button"
            onClick={() => props.setPopUpTrigger(false)}
          >
            {" "}
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
