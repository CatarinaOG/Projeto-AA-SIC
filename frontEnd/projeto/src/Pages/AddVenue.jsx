import { useState } from "react";
import NavBarUser from "../Components/NavBar/NavBarUser";
import PaymentMethodElem from "../Components/PaymentMethods/PaymentMethodElem";
import MBWayPopIn from "../Components/PaymentMethods/MBWayPopIn";
import PayPalPopIn from "../Components/PaymentMethods/PayPalPopIn";
import VisaPopIn from "../Components/PaymentMethods/VisaPopIn";

export default function CreatePromoter() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [capacity, setCapacity] = useState("");
  const [city, setCity] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setAddress(event.target.value);
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Access the input values here (name, email, password, confirmPassword, employer)
    console.log(name, address, latitude, longitude, capacity);
  };
  return (
    <div>
      <NavBarUser />
      <div className="center">
        <div className="CreateVenueContainer">
          <h1 className="h1CreateVenue">Add a Venue</h1>
          <form className="formContainer" onSubmit={handleSubmit}>
            <div className="divFormCreateVenue">
              <h2 className="h2FormCreateVenue">Name</h2>
              <input
                className="inputFormCreateVenue"
                type="text"
                value={name}
                onChange={handleNameChange}
              ></input>
            </div>
            <div className="divFormCreateVenue">
              <h2 className="h2FormCreateVenue">Address</h2>
              <input
                className="inputFormCreateVenue"
                type="text"
                value={address}
                onChange={handleAddressChange}
              ></input>
            </div>
            <div className="divFormCreateVenue">
              <h2 className="h2FormCreateVenue">City</h2>
              <input
                className="inputFormCreateVenue"
                type="text"
                value={city}
                onChange={handleAddressChange}
              ></input>
            </div>
            <div className="divFormCreateVenue">
              <h2 className="h2FormCreateVenue">Capacity</h2>
              <input
                className="inputFormCreateVenue"
                type="number"
                value={capacity}
                onChange={handleCapacityChange}
              ></input>
            </div>
            <div className="divFormCreateVenue">
              <h2 className="h2FormCreateVenue">Coordinates(Lat/Lng)</h2>
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
              <input className="button" type="submit" value="Submit" />
              <input className="button" type="submit" value="Cancel" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
