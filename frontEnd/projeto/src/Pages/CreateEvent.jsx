import { useState } from "react";
import { TypeList } from "../Components/CreateEvent/TypeList"; // Import TypeList component correctly

import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import AddButton from "../Images/add.png";
import PopUpAddType from "../Components/CreateEvent/PopUpAddType";
import PopUpAddArtist from "../Components/CreateEvent/PopUpAddArtist";
import ArtistElem from "../Components/CreateEvent/ArtistElem";
import PopUpAddCategory from "../Components/CreateEvent/PopUpAddCategory";
import PopUpCreateArtist from "../Components/CreateEvent/PopUpCreateArtist";

export default function CreateEvent(props) {
  const { setUser } = props;

  const [eventName, setEventName] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventCategory, setEventCategory] = useState("");

  const [eventDateStart, setEventDateStart] = useState("");
  const [eventDateEnd, setEventDateEnd] = useState("");
  const [popUpTrigger1, setPopUpTrigger1] = useState(false);
  const [popUpTrigger2, setPopUpTrigger2] = useState(false);
  const [popUpTrigger3, setPopUpTrigger3] = useState(false);
  const [popUpTrigger4, setPopUpTrigger4] = useState(false);

  const [types, setTypes] = useState([]);
  const [artists, setArtists] = useState([]);

  const [message, setMessage] = useState("");

  const [options, setOptions] = useState([
    // para ser substituido pelo pedido com base no filtro
    {
      venueName: "Theatro Circo ",
      venueCode: 1,
    },
    {
      venueName: "Hard Club Porto",
      venueCode: 2,
    },
    {
      venueName: "Estádio Cidade Coimbra",
      venueCode: 3,
    },
    {
      venueName: "Parque da Cidade",
      venueCode: 4,
    },
    {
      venueName: "Parque da Belavista",
      venueCode: 5,
    },
    {
      venueName: "Passeio Marítimo Algés",
      venueCode: 6,
    },
    {
      venueName: "LAV - Lisboa ao Vivo",
      venueCode: 7,
    },
  ]);

  const [categories, setCategories] = useState([
    { name: "Music Festival" },
    { name: "Concert" },
    { name: "Stand Up Show" },
    { name: "Stand Up Festival" },
  ]);

  function handleAddType(newType) {
    setTypes((prevTypes) => [...prevTypes, newType]);
  }

  function handleRemoveType(type) {
    setTypes((prevTypes) => prevTypes.filter((item) => item !== type));
  }

  function handleAddArtist(newArtist) {
    setArtists((prevArtists) => [...prevArtists, newArtist]);
  }

  function handleRemoveArtist(name) {
    setArtists((prevArtists) =>
      prevArtists.filter((item) => item.artist_name !== name)
    );
  }

  function handleEventNameChange(event) {
    setEventName(event.target.value);
  }

  function handleEventVenueChange(event) {
    setEventVenue(event.target.value);
  }

  function handleEventCategortChange(event) {
    setEventCategory(event.target.value);
  }

  function handleEventDateStartChange(event) {
    setEventDateStart(event.target.value);
  }

  function handleEventDateEndChange(event) {
    console.log(event.target.value);
    setEventDateEnd(event.target.value);
  }

  function openPopType() {
    if (eventDateStart !== "" && eventDateEnd !== "") {
      setPopUpTrigger1(true);

      if (message === "Add dates first") {
        setMessage("");
      }
    } else setMessage("Add dates first");
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      eventName === "" ||
      eventVenue === "" ||
      eventDateStart === "" ||
      eventDateEnd === "" ||
      types.length === 0 ||
      artists === 0
    ) {
      setMessage("There are one or more fields empty");
    }
  };

  return (
    <div>
      <NavBarPromoter selected="events" setUser={setUser} />
      <PopUpAddType
        trigger={popUpTrigger1}
        setPopUpTrigger={setPopUpTrigger1}
        onAddType={handleAddType}
        dateStart={eventDateStart}
        dateEnd={eventDateEnd}
      />
      {popUpTrigger2 && (
        <PopUpAddArtist
          trigger={popUpTrigger2}
          setPopUpTrigger={setPopUpTrigger2}
          setPopUpTriggerCreate={setPopUpTrigger4}
          onAddArtist={handleAddArtist}
        />
      )}

      {popUpTrigger4 && (
        <PopUpCreateArtist
          trigger={popUpTrigger4}
          setPopUpTrigger={setPopUpTrigger4}
          setPopUpTriggerAdd={setPopUpTrigger2}
          onAddArtist={handleAddArtist}
        />
      )}

      <PopUpAddCategory
        trigger={popUpTrigger3}
        setPopUpTrigger={setPopUpTrigger3}
      />
      <div className="center">
        <div className="defaultContainer">
          <h1 className="h1CreateEvent">Event Information</h1>
          <form className="formContainer" onSubmit={handleSubmit}>
            <div className="divFormCreateEvent">
              <h2 className="h2FormCreateEvent">Event Name</h2>
              <input
                className="inputFormCreateEvent"
                type="text"
                value={eventName}
                onChange={handleEventNameChange}
              />
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
                    <option key={index} value={option.venueCode}>
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
                />
                <input
                  className="dateFormCreateEvent2"
                  type="date"
                  value={eventDateEnd}
                  onChange={handleEventDateEndChange}
                />
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
                    />
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
                      artist={value.artist_name}
                      onRemoveArtist={handleRemoveArtist}
                    />
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
