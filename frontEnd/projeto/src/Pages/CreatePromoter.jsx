import { useState } from "react";
import NavBarUser from "../Components/NavBar/NavBarUser";
import PaymentMethodElem from "../Components/PaymentMethods/PaymentMethodElem";
import MBWayPopIn from "../Components/PaymentMethods/MBWayPopIn";
import PayPalPopIn from "../Components/PaymentMethods/PayPalPopIn";
import VisaPopIn from "../Components/PaymentMethods/VisaPopIn";
import PopUpConfirm from "../Components/CreatePromoter/PopUpConfirm";

export default function CreatePromoter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [popUpTrigger, setPopUpTrigger] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    console.log("Password is: " + newPassword);
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password !== newConfirmPassword) {
      setMessage("Passwords don't match");
    } else {
      setMessage("");
    }
    console.log("Confirmed password is:" + confirmPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === "" || password === "" || confirmPassword === "") {
      setMessage("One or more fields incomplete");
    } else {
      setPopUpTrigger(true);
    }

    // Access the input values here (name, email, password, confirmPassword, employer)
    console.log(name, email, password, confirmPassword);
  };
  return (
    <div>
      <NavBarUser />
      <PopUpConfirm
        trigger={popUpTrigger}
        setPopUpTrigger={setPopUpTrigger}
        email={email}
        password={password}
        name={name}
      />

      <div className="center">
        <div className="CreatePromoterContainer">
          <h1 className="h1CreatePromoter">Create Promoter</h1>
          <form className="formContainer" onSubmit={handleSubmit}>
            <div className="divFormCreatePromoter">
              <h2 className="h2FormCreatePromoter">Name</h2>
              <input
                className="inputFormCreatePromoter"
                type="text"
                value={name}
                onChange={handleNameChange}
              ></input>
            </div>
            <div className="divFormCreatePromoter">
              <h2 className="h2FormCreatePromoter">Email</h2>
              <input
                className="inputFormCreatePromoter"
                type="email"
                value={email}
                onChange={handleEmailChange}
              ></input>
            </div>
            <div className="divFormCreatePromoter">
              <h2 className="h2FormCreatePromoter">Password</h2>
              <input
                className="inputFormCreatePromoter"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              ></input>
            </div>
            <div className="divFormCreatePromoter">
              <h2 className="h2FormCreatePromoter">Confirm Password</h2>
              <input
                className="inputFormCreatePromoter"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              ></input>
            </div>
            {message !== "" ? (
              <div className="buttonContainerPayment">
                <h3 className="redH3">{message}</h3>
              </div>
            ) : (
              ""
            )}
            <div className="divButtonCreatePromoter">
              <input className="button" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
