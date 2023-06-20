import { useState, useContext} from "react";
import UserContext from "../../Contexts/UserContext";
import { useTranslation } from "react-i18next";

export default function MBWayPopIn({
  setPaymentType,
  setPaymentInfo,
  setMessage,
  ticketID
}) {
  const {t} = useTranslation();

  const {user} = useContext(UserContext);

  const [number, setNumber] = useState(0);

  const handleKeyDown = (event) => {
    const keyCode = event.which || event.keyCode;
    const isValid = keyCode >= 48 && keyCode <= 57;
    const isMaxLengthReached = event.target.value.length >= 9;
    const isBackspace = keyCode === 8;

    if ((!isValid && !isBackspace) || (isMaxLengthReached && !isBackspace)) {
      event.preventDefault();
      setNumber(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (number > 100000000) {
      setPaymentInfo({ phoneNumber: number });
      postTicketBuy()
    } else {
      setMessage(t('phoneNumberNotValid'));
    }
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
      console.log(responseJSON)
      if(responseJSON.confirmed === "true"){
        setPaymentType("");
        setMessage("Success");
      } 
      else setMessage(t('errorTryAgain'))
    })
    .catch(error => {
		console.log('Error:', error);
    });
  }






  return (
    <div className="MBWayPaymentMethod">
      <div className="MBWayHeaderDiv">
        <h2>{t('enterPhoneNumber')}</h2>
      </div>
      <div className="listing-elem-3-Payment">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="tel"
              className="MBWayInput"
              onKeyDown={handleKeyDown}
            />
          </label>
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
