import { useState } from "react";
import NavBarUser from "../Components/NavBar/NavBarUser";
import PaymentMethodElem from "../Components/PaymentMethods/PaymentMethodElem";
import MBWayPopIn from "../Components/PaymentMethods/MBWayPopIn";
import PayPalPopIn from "../Components/PaymentMethods/PayPalPopIn";
import VisaPopIn from "../Components/PaymentMethods/VisaPopIn";
import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import AddButton from "../Images/add.png";
import TypeList from "../Components/CreateEvent/TypeList";

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDateStart, setEventDateStart] = useState("");
  const [eventDateEnd, setEventDateEnd] = useState("");

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleEventLocationChange = (event) => {
    setEventLocation(event.target.value);
  };

  const handleEventDateStartChange = (event) => {
    setEventDateStart(event.target.value);
  };

  const handleEventDateEndChange = (event) => {
    setEventDateEnd(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Access the input values here (name, email, password, confirmPassword, employer)
    console.log(eventName, eventLocation, eventDateStart, eventDateEnd);
  };
  return (
    <div>
      <NavBarPromoter />
      <div className="center">
        <div className="CreateEventContainer">
          <h1 className="h1CreateEvent">Event Information</h1>
          <form className="formContainer" onSubmit={handleSubmit}>
            <div className="divFormCreateEvent">
              <h2 className="h2FormCreateEvent">Event Name</h2>
              <input
                className="inputFormCreatePromoter"
                type="text"
                value={eventName}
                onChange={handleEventNameChange}
              ></input>
            </div>
            <div className="divFormCreatePromoter">
              <h2 className="h2FormCreatePromoter">Location</h2>
              <input
                className="inputFormCreatePromoter"
                type="email"
                value={eventLocation}
                onChange={handleEventLocationChange}
              ></input>
            </div>
            <div className="divFormCreatePromoter">
              <h2 className="h2FormCreatePromoter">Date(s)</h2>
              <div className="dateFormContainer">
                <input
                  className="dateFormCreateEvent"
                  type="date"
                  value={eventDateStart}
                  onChange={handleEventDateStartChange}
                ></input>
                <input
                  className="dateFormCreateEvent2"
                  type="date"
                  value={eventDateEnd}
                  onChange={handleEventDateEndChange}
                ></input>
              </div>
            </div>
            <div className="divFormCreateEvent">
              <div className="div1CreateEvent">
                <div className="divCreateEventTitle">
                  <h2>Create Ticket Types</h2>
                  <img src={AddButton} alt="" className="addIcon" />
                </div>
                <div>
                  <TypeList></TypeList>
                  <TypeList></TypeList>
                  <TypeList></TypeList>
                </div>
              </div>
              <div className="div2CreateEvent">
                <div className="divCreateEventTitle">
                  <h2>Artist</h2>
                  <img src={AddButton} alt="" className="addIcon" />
                </div>
                <div>
                  <TypeList></TypeList>
                </div>
              </div>
            </div>
            <div className="divButtonCreatePromoter">
              <input className="button" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
