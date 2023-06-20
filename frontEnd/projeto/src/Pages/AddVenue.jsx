import { useState, useEffect ,useContext} from "react";
import UserContext from "../Contexts/UserContext";
import NavBarPromoter from "../Components/NavBar/NavBarPromoter";
import PopUpAddVenue from "../Components/AddVenue/PopUpAddVenue";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AddPictureVenue from "../Components/AddVenue/AddPictureVenue";

export default function AddVenue() {
  const {t} = useTranslation();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [capacity, setCapacity] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
	const [image, setImage] = useState("");

  const [popUpTriggers,setPopUpTriggers] = useState("");

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
      setMessage("");
    } else {
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
      setMessage(t('messageOneOrMoreIncomplete')); 

    } else {
      postVenue()
    }
  };

  
  function postVenue(){
    const input ={
      name : name,
      address : address,
      latitude : latitude,
      longitude : longitude,
      capacity : capacity,
      city : city,
      map:image
    }
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
          setPopUpTriggers(2);

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

    {popUpTriggers === 1 &&
				<AddPictureVenue 
					setPopUpAddPhoto={setPopUpTriggers}
					setImage={setImage}/>}
		<NavBarPromoter selected="events"/>
		<PopUpAddVenue trigger={popUpTriggers} setPopUpTrigger={setPopUpTriggers} />
		<div className="center">
			<div className="defaultContainer">
			<h1>{t('addVenue')}</h1>
				<form >
					<div className="smallContainer">

						<div className="smallContainerInputsCreateVenue">
							<div className="smallContainerLeftSide">
								<div>
									<p className="suggestEventLabel">{t('name')}</p>
									<p className="suggestEventLabel">{t('address')}</p>
									<p className="suggestEventLabel">{t('city')}</p>
									<p className="suggestEventLabel">{t('capacity')}</p>
									<p className="suggestEventLabel">{t('coordinatesVenue')}</p>
								</div>
							</div>

							<div className="smallContainerRightSide">
								<div>
									<input className="suggestEventInput" type="text" value={name} onChange={handleNameChange}></input>
									<input className="suggestEventInput" type="text" value={address} onChange={handleAddressChange}></input>
									<input className="suggestEventInput" type="text" value={city} onChange={handleCityChange}></input>
									<input className="suggestEventInput" type="number" value={capacity} onChange={handleCapacityChange}></input>

									<div className="displayHorizontally">
										<input className="suggestEventInputDate" type="number" value={latitude} onChange={handleLatitudeChange}></input>
										<input className="suggestEventInputDate" type="number" value={longitude} onChange={handleLongitudeChange}></input>
									</div>
								</div>
							</div>
						</div>

						<h3 className="redH3">{message}</h3>
            <div className="centerVenueButtons">
								<div className="divButtonsCreatePromoter">
                <button className="buttonAddVenue"   onClick={handleSubmit} >{t('submit')}</button> 
								<button className="buttonAddVenue"   onClick={cancel} >{t('cancel')}</button> 
                <button className="buttonAddVenue"  value="Add Photo" onClick={() => setPopUpTriggers(1)}>{t('addSeatingPlan')}</button>
								</div>
							</div>
          			</div>
            	</form>          
        	</div>
      	</div>
    </div>
  );
}
