import { useState } from "react";
import NavBarUser from "../Components/NavBar/NavBarUser";
import PaymentMethodElem from "../Components/PaymentMethods/PaymentMethodElem";
import MBWayPopIn from "../Components/PaymentMethods/MBWayPopIn";
import PayPalPopIn from "../Components/PaymentMethods/PayPalPopIn";
import VisaPopIn from "../Components/PaymentMethods/VisaPopIn";

export default function CreatePromoter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [employer, setEmployer] = useState("");

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
    console.log("Confirmed password is:" + confirmPassword);
    if (password !== newConfirmPassword) {
      console.log("Passwords don't match BOZO");
    }
    if (password === newConfirmPassword) {
      console.log("Fucking finally bruv");
    }
    setConfirmPassword(newConfirmPassword);
  };

  const handleEmployerChange = (event) => {
    setEmployer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Access the input values here (name, email, password, confirmPassword, employer)
    console.log(name, email, password, confirmPassword, employer);
  };
  return (
    <div>
      <NavBarUser />
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
            <div className="divFormCreatePromoter">
              <h2 className="h2FormCreatePromoter">Employer</h2>
              <input
                className="inputFormCreatePromoter"
                type="text"
                value={employer}
                onChange={handleEmployerChange}
              ></input>
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
