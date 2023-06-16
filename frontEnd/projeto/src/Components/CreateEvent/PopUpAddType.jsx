import { useState, useEffect } from "react";
import "../../Styles/Profile.css";

export default function PopUpAddType(props) {
  const [ticketType, setTicketType] = useState("");
  const [price, setPrice] = useState(null);
  const [dateStartType, setDateStartType] = useState(null);
  const [dateEndType, setDateEndType] = useState(null);
  const [message, setMessage] = useState("");
  const dateStartCompare = new Date(props.dateStart);
  const dateEndCompare = new Date(props.dateEnd);

  useEffect(() => {
    if (props.trigger) {
      // Clear the form when the popup is triggered
      setTicketType("");
      setPrice(null);
    }
  }, [props.trigger]);

  const handleTypeChange = (event) => {
    setTicketType(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDateStartChange = (event) => {
    const dateTemp = new Date(event.target.value);
    if (dateTemp > dateEndCompare || dateTemp < dateStartCompare) {
      setMessage("Date's are not possible");
      setDateStartType("");
    } else {
      setMessage("");
      setDateStartType(event.target.value);
    }
  };

  const handleDateEndChange = (event) => {
    const dateTemp = new Date(event.target.value);
    if (dateTemp > dateEndCompare || dateTemp < dateStartCompare) {
      setMessage("Date's are not possible");
      setDateEndType("");
    } else {
      setMessage("");
      setDateEndType(event.target.value);
    }
  };

  const submitType = () => {
    if (
      ticketType === "" ||
      dateStartType === "" ||
      dateEndType === "" ||
      price === null
    ) {
      setMessage("One or more fields Incomplete");
    } else {
      const newType = {
        typeName: ticketType,
        price: price,
        dateStart: dateStartType,
        dateEnd: dateStartType,
      };
      props.onAddType(newType);
    }
  };
  return props.trigger ? (
    <div>
      <div className="editContainter">
        <h2 className="editTitle">Add Type Information</h2>
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
          <div>
            <input
              className="addTypeDate"
              type="date"
              value={dateStartType}
              onChange={handleDateStartChange}
            ></input>
            <input
              type="date"
              className="addTypeDate"
              value={dateEndType}
              onChange={handleDateEndChange}
            ></input>
          </div>
        </form>
        <h3 className="redH3">{message}</h3>
        <div className="popUpSellingListButton">
          <button
            className="button"
            onClick={() => {
              submitType();
              props.setPopUpTrigger(false);
            }}
          >
            Add
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
