import { useState, useEffect } from "react";
import "../../Styles/Profile.css";

export default function PopUpAddType(props) {
  const [ticketType, setTicketType] = useState("");
  const [price, setPrice] = useState(null);
  const [dateStartType, setDateStartType] = useState(null);
  const [dateEndType, setDateEndType] = useState(null);
  const [timeStartType, setTimeStartType] = useState(null);
  const [timeEndType, setTimeEndType] = useState(null);
  const [message, setMessage] = useState("");
  const dateStartCompare = new Date(props.dateStart);
  const dateEndCompare = new Date(props.dateEnd);

  useEffect(() => {
    if (props.trigger) {
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

  const handleTimeStartTypeChange = (event) => {
      setTimeStartType(event.target.value);
  };

  const handleTimeEndTypeChange = (event) => {
    setTimeEndType(event.target.value);
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
      const type_start  = dateStartType + " " + timeStartType
      const type_end  = dateEndType + " " + timeEndType


      const event_date_start_unform = dateStartType;
      const [year, month, day] = event_date_start_unform.split('-');
      const formattedStart = `${day}/${month}/${year} ${timeStartType}`;
      const event_date_end_unform = dateEndType;
      const [year2, month2, day2] = event_date_end_unform.split('-');
      const formattedEnd = `${day2}/${month2}/${year2} ${timeEndType}`;

      const newType = {
        ticket_type: ticketType,
        price: price,
        type_date_start : formattedStart,
        type_date_end : formattedEnd,
      };
      console.log(JSON.stringify(newType))
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
              type="time"
              className="addTypeDate"
              value={timeStartType}
              onChange={handleTimeStartTypeChange}
            ></input>
          </div>
          <div>
            <input
              type="date"
              className="addTypeDate"
              value={dateEndType}
              onChange={handleDateEndChange}
            ></input>
            <input
              type="time"
              className="addTypeDate"
              value={timeEndType}
              onChange={handleTimeEndTypeChange}
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
