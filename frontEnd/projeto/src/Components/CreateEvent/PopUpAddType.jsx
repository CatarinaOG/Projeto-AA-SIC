import { useState, useEffect } from "react";
import "../../Styles/Profile.css";
import BlackClose from "../../Images/blackClose.png"
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';


export default function PopUpAddType(props) {
  const {trigger, setPopUpTrigger, onAddType,dateStart,dateEnd} = props

  const [ticketType, setTicketType] = useState("");
  const [price, setPrice] = useState(null);
  const [dateStartType, setDateStartType] = useState(null);
  const [dateEndType, setDateEndType] = useState(null);
  const [timeStartType, setTimeStartType] = useState(null);
  const [timeEndType, setTimeEndType] = useState(null);
  const [message, setMessage] = useState("");
  const dateStartCompare = new Date(dateStart);
  const dateEndCompare = new Date(dateEnd);
	const {t} = useTranslation();

  useEffect(() => {
    if (trigger) {
      setTicketType("");
      setPrice(null);
    }
  }, [trigger]);

  const handleTypeChange = (event) => {
    setTicketType(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDateStartChange = (event) => {
    const dateTemp = new Date(event.target.value);
    if (dateTemp > dateEndCompare || dateTemp < dateStartCompare) {
      
      setMessage(t('dateNotPossible'));
      setDateStartType("");
    } else {
      setMessage("");
      setDateStartType(event.target.value);
    }
  };

  const handleDateEndChange = (event) => {
    const dateTemp = new Date(event.target.value);
    if (dateTemp > dateEndCompare || dateTemp < dateStartCompare) {
      setMessage(t('dateNotPossible'));
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
      setMessage(t('messageOneOrMoreIncomplete'));
    } else {
      const event_date_start_unform = dateStartType;
      const [year, month, day] = event_date_start_unform.split('-');
      const formattedStart = `${day}/${month}/${year} ${timeStartType}:00`;
      const event_date_end_unform = dateEndType;
      const [year2, month2, day2] = event_date_end_unform.split('-');
      const formattedEnd = `${day2}/${month2}/${year2} ${timeEndType}:00`;

      const newType = {
        ticket_type: ticketType,
        price: price,
        type_date_start : formattedStart,
        type_date_end : formattedEnd,
      };
      console.log(JSON.stringify(newType))
      onAddType(newType);
    }
  };




  
  return trigger ? (
    <div className="overlay">
      <div className="containterAddType">
      <img src={BlackClose} className="editClose" alt="" onClick={() => setPopUpTrigger(false)} />
            <h3 className="editTitle">{t('addTicketType')}</h3>
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
        <p className={message !== "" ? "urlError" : "urlErrorNotVisible"}>{message}</p>
        <div className="popUpSellingListButton">
          <button
            className="button"
            onClick={() => {
              submitType();
              setPopUpTrigger(false);
            }}
          >
            {t('submit')}
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
