import { useState, useEffect ,useContext} from "react";
import UserContext from "../Contexts/UserContext";
import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import PopUpAddVenue from "../Components/AddVenue/PopUpAddVenue";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AddVenue() {
  const {t} = useTranslation();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [capacity, setCapacity] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [popUpTrigger, setPopUpTrigger] = useState(false);
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleCapacityChange = (event) => {
    const value = event.target.value;

    if (value === "" || /^\d+$/.test(value)) {
      setCapacity(value);
      console.log("Correct");
      setMessage("");
    } else {
      console.log("Incorrect");
      //setMessage("Capacity values must be positive integers");
      setMessage(t('messageCapacityError')); 

      setCapacity("");

    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      name === "" ||
      address === "" ||
      latitude === "" ||
      longitude === "" ||
      capacity === "" ||
      city === ""
    ) {
      //setMessage("One or More inputs incomplete");
      setMessage(t('messageOneOrMoreIncomplete')); 

    } else {
      postVenue()
      console.log(name, address, latitude, longitude, capacity);
    }
  };

  
  function postVenue(){
    const input ={
      name : name,
      address : address,
      latitude : latitude,
      longitude : longitude,
      capacity : capacity,
      city : city
    }
    console.log(JSON.stringify(input))
    fetch("http://localhost:8080/api/promoter/add_location", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(input)
    })
    .then(response => {
        if(response.ok)
          setPopUpTrigger(true);

    })
    .catch(error => {
        setMessage(error)
    });
  }


  function cancel(){
		navigate("/AddEvent")
  }

  
  return (
    <div>
			<NavBarPromoter selected="events"/>
      <PopUpAddVenue trigger={popUpTrigger} setPopUpTrigger={setPopUpTrigger} />
      <div className="center">
        <div className="CreateVenueContainer">
          <h1 className="h1CreateVenue">{t('addVenue')}</h1>
          <form className="formContainer" onSubmit={handleSubmit}>
            <div className="divFormCreateVenue">
              <h2 className="h2FormCreateVenue">{t('name')}</h2>
              <input
                className="inputFormCreateVenue"
                type="text"
                value={name}
                onChange={handleNameChange}
              ></input>
            </div>
            <div className="divFormCreateVenue">
              <h2 className="h2FormCreateVenue">{t('address')}</h2>
              <input
                className="inputFormCreateVenue"
                type="text"
                value={address}
                onChange={handleAddressChange}
              ></input>
            </div>
            <div className="divFormCreateVenue">
              <h2 className="h2FormCreateVenue">{t('city')}</h2>
              <input
                className="inputFormCreateVenue"
                type="text"
                value={city}
                onChange={handleCityChange}
              ></input>
            </div>
            <div className="divFormCreateVenue">
              <h2 className="h2FormCreateVenue">{t('capacity')}</h2>
              <input
                className="inputFormCreateVenue"
                type="number"
                value={capacity}
                onChange={handleCapacityChange}
              ></input>
            </div>
            <div className="divFormCreateVenue">
              <h2 className="h2FormCreateVenue">{t('coordinatesVenue')}</h2>
              <div className="coordFormContainer">
                <input
                  className="coordFormCreateEvent"
                  type="number"
                  value={latitude}
                  onChange={handleLatitudeChange}
                ></input>
                <input
                  className="coordFormCreateEvent2"
                  type="number"
                  value={longitude}
                  onChange={handleLongitudeChange}
                ></input>
              </div>
            </div>
            <div className="divButtonCreatePromoter">
              <h3 className="redH3">{message}</h3>
            </div>
            <div className="divButtonCreatePromoter">
              <input className="button" type="submit" value="Submit" />
              <input className="button" type="submit" value="Cancel" onClick={cancel} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
