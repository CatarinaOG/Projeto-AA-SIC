import { useState, useContext} from "react";
import UserContext from "../../Contexts/UserContext";
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function VisaPopIn({
  setPaymentType,
  setPaymentInfo,
  setMessage,
  ticketID,        
  setBlock
}) {
  const {t} = useTranslation();

  const {user} = useContext(UserContext);

  const [ccv, setCCV] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ccv < 100 && number < 100000000000) setMessage(t('bothFieldsIncomplete'));
    else if (ccv === "") setMessage(t('incompleteCCV'));
    else if (number === "") setMessage(t('incompleteNumber'));
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

    fetch(`${GLOBAL_VARIABLE}/user/buy_ticket`, {
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
        setBlock(true);

        setMessage("Success");
      } 
      else setMessage("There was an error")
    })
    .catch(error => {
		  console.log('Error:', error);
    });
  }



  return (
    <div className="VisaPaymentMethod">
      <div className="MBWayHeaderDiv">
        <h2>{t('enterCardData')}</h2>
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
