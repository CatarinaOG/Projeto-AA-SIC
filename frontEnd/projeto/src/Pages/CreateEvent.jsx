import { useState } from "react";
import NavBarUser from "../Components/NavBar/NavBarUser";
import PaymentMethodElem from "../Components/PaymentMethods/PaymentMethodElem";
import MBWayPopIn from "../Components/PaymentMethods/MBWayPopIn";
import PayPalPopIn from "../Components/PaymentMethods/PayPalPopIn";
import VisaPopIn from "../Components/PaymentMethods/VisaPopIn";
import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import AddButton from "../Images/add.png";
import { TypeList } from "../Components/CreateEvent/TypeList"; // Import TypeList component correctly
import PopUpAddType from "../Components/CreateEvent/PopUpAddType";
import PopUpAddArtist from "../Components/CreateEvent/PopUpAddArtist";
import ArtistElem from "../Components/CreateEvent/ArtistElem";
import PopUpAddCategory from "../Components/CreateEvent/PopUpAddCategory";

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventCategory, setEventCategory] = useState("");

  const [eventDateStart, setEventDateStart] = useState("");
  const [eventDateEnd, setEventDateEnd] = useState("");
  const [popUpTrigger1, setPopUpTrigger1] = useState(false);
  const [popUpTrigger2, setPopUpTrigger2] = useState(false);
  const [popUpTrigger3, setPopUpTrigger3] = useState(false);
  const [types, setTypes] = useState([]);
  const [artists, setArtists] = useState([]);

  const [message, setMessage] = useState("");

  const [options, setOptions] = useState([
    // para ser substituido pelo pedido com base no filtro
    {
      venueName: "Theatro Circo ",
    },
    {
      venueName: "Hard Club Porto",
    },
    {
      venueName: "Estádio Cidade Coimbra",
    },
    {
      venueName: "Parque da Cidade",
    },
    {
      venueName: "Parque da Belavista",
    },
    {
      venueName: "Passeio Marítimo Algés",
    },
    {
      venueName: "LAV - Lisboa ao Vivo",
    },
  ]);

  const [categories, setCategories] = useState([
    { name: "Music Festival" },
    { name: "Concert" },
    { name: "Stand Up Show" },
    { name: "Stand Up Festival" },
  ]);

  const handleAddType = (newType) => {
    setTypes((prevTypes) => [...prevTypes, newType]);
  };

  const handleRemoveType = (type) => {
    setTypes((prevTypes) => prevTypes.filter((item) => item !== type));
  };

  const handleAddArtist = (newArtist) => {
    setArtists((prevArtists) => [...prevArtists, newArtist]);
  };

  const handleRemoveArtist = (artist) => {
    setArtists((prevArtists) => prevArtists.filter((item) => item !== artist));
  };

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleEventVenueChange = (event) => {
    setEventVenue(event.target.value);
  };

  const handleEventCategortChange = (event) => {
    setEventCategory(event.target.value);
  };

  const handleEventDateStartChange = (event) => {
    setEventDateStart(event.target.value);
  };

  const handleEventDateEndChange = (event) => {
    console.log(event.target.value);
    setEventDateEnd(event.target.value);
  };

  function openPopType() {
    if (eventDateStart !== "" && eventDateEnd !== "") {
      setPopUpTrigger1(true);
      if (message === "Add dates first") {
        setMessage("");
      }
    } else {
      setMessage("Add dates first");
    }
  }

  const handleSubmit = (event) => {
    if (
      eventName === "" ||
      eventVenue === "" ||
      eventDateStart === "" ||
      eventDateEnd === "" ||
      types.length === 0 ||
      artists === 0
    ) {
      setMessage("There are one or more fields empty");
    } else {
      console.log(eventName, eventVenue, eventDateStart, eventDateEnd);
      console.log(eventVenue);
    }
    event.preventDefault();
  };

  return (
    <div>
      <NavBarPromoter />
      <PopUpAddType
        trigger={popUpTrigger1}
        setPopUpTrigger={setPopUpTrigger1}
        onAddType={handleAddType}
        dateStart={eventDateStart}
        dateEnd={eventDateEnd}
      />
      <PopUpAddArtist
        trigger={popUpTrigger2}
        setPopUpTrigger={setPopUpTrigger2}
        onAddArtist={handleAddArtist}
      />
      <PopUpAddCategory
        trigger={popUpTrigger3}
        setPopUpTrigger={setPopUpTrigger3}
      />
      <div className="center">
        <div className="CreateEventContainer">
          <h1 className="h1CreateEvent">Event Information</h1>
          <form className="formContainer" onSubmit={handleSubmit}>
            <div className="divFormCreateEvent">
              <h2 className="h2FormCreateEvent">Event Name</h2>
              <input
                className="inputFormCreateEvent"
                type="text"
                value={eventName}
                onChange={handleEventNameChange}
              ></input>
            </div>
            <div className="divFormCreatePromoter">
              <h2 className="h2FormCreatePromoter">Category</h2>
              <div className="dateFormContainer">
                <select
                  className="inputVenueCreateEvent"
                  value={eventCategory}
                  onChange={handleEventCategortChange}
                >
                  <option value=""></option>

                  {categories.map((option, index) => (
                    <option key={index} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <h4 className="underlined" onClick={setPopUpTrigger3}>
                  Add New
                </h4>
              </div>
            </div>
            <div className="divFormCreatePromoter">
              <h2 className="h2FormCreatePromoter">Venue</h2>
              <div className="dateFormContainer">
                <select
                  className="inputVenueCreateEvent"
                  value={eventVenue}
                  onChange={handleEventVenueChange}
                >
                  <option value=""></option>

                  {options.map((option, index) => (
                    <option key={index} value={option.venueName}>
                      {option.venueName}
                    </option>
                  ))}
                </select>
                <h4 className="underlined">Add New</h4>
              </div>
            </div>
            <div className="divFormCreatePromoter">
              <h2 className="h2FormCreatePromoter">Date(Start/End)</h2>
              <div className="dateFormContainer">
                <input
                  className="inputFormCreateEvent"
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
                  <img
                    src={AddButton}
                    alt=""
                    className="addIcon"
                    onClick={openPopType}
                  />
                </div>
                <div>
                  {types.map((value, index) => (
                    <TypeList
                      key={index}
                      type={value}
                      onRemoveType={handleRemoveType}
                    ></TypeList>
                  ))}
                </div>
              </div>
              <div className="div2CreateEvent">
                <div className="divCreateEventTitle">
                  <h2>Artist</h2>

                  <img
                    src={AddButton}
                    alt=""
                    className="addIcon"
                    onClick={() => setPopUpTrigger2(true)}
                  />
                </div>
                <div>
                  {artists.map((value, index) => (
                    <ArtistElem
                      key={index}
                      artist={value}
                      onRemoveArtist={handleRemoveArtist}
                    ></ArtistElem>
                  ))}
                </div>
              </div>
            </div>
            <div className="divButtonCreatePromoter">
              <h3 className="redH3">{message}</h3>
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
