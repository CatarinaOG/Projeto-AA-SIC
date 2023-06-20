import { useState, useContext} from "react";
import UserContext from "../../Contexts/UserContext";

export default function VisaPopIn({
  setPaymentType,
  setPaymentInfo,
  setMessage,
  ticketID
}) {

  const {user} = useContext(UserContext);

  const [ccv, setCCV] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ccv < 100 && number < 100000000000) setMessage("Both fields Incomplete");
    else if (ccv === "") setMessage("Incomplete CCV");
    else if (number === "") setMessage("Incomplete Number");
    else postTicketBuy();
  };

  const handleCCVChange = (event) => {
    const inputValue = event.target.value;
    const cappedValue = inputValue.slice(0, 3);
    event.target.value = cappedValue;
    setCCV(event.target.value);
  };

  const handleNumberChange = (event) => {
    const inputValue = event.target.value;
    const cappedValue = inputValue.slice(0, 12);
    event.target.value = cappedValue;
    setNumber(event.target.value);
  };



  function postTicketBuy(){

    fetch("http://localhost:8080/api/user/buy_ticket", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          ticket_id: ticketID
        })
    })
    .then(response => {
      if (response.ok) return response.json();
      else throw new Error('Error: ' + response.status);
    })
    .then(responseJSON => {
      if(responseJSON.confirmed === "true"){
        setPaymentType("");
        setPaymentInfo({ number: number, ccv: ccv });
        setMessage("Success");
      } 
      else setMessage("Category already exists!")
    })
    .catch(error => {
		  console.log('Error:', error);
    });
  }



  return (
    <div className="VisaPaymentMethod">
      <div className="MBWayHeaderDiv">
        <h2>Enter your card data:</h2>
      </div>
      <div className="listing-elem-3-Payment">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="number"
              className="creditNumberInput"
              pattern="[0-9]*"
              inputMode="numeric"
              value={number}
              onInput={handleNumberChange}
            />{" "}
            <input
              type="number"
              className="creditCCVInput"
              pattern="[0-9]*"
              inputMode="numeric"
              value={ccv}
              onInput={handleCCVChange}
            ></input>
          </label>
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
