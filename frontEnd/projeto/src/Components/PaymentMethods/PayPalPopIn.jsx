import { useState, useContext} from "react";
import UserContext from "../../Contexts/UserContext";
import { useTranslation } from "react-i18next";

export default function PayPalPopIn({
  setPaymentType,
  setPaymentInfo,
  setMessage,
  ticketID={ticketID}
}) {
  const {user} = useContext(UserContext);
  const {t} = useTranslation();

  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postTicketBuy()
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
      console.log(responseJSON)
      if(responseJSON.confirmed === "true"){
         setPaymentType("");
    setPaymentInfo({ email: email });
      } 
      else setMessage("There was an error")
    })
    .catch(error => {
		console.log('Error:', error);
    });
  }



  return (
    <div className="PayPalPaymentMethod">
      <div className="MBWayHeaderDiv">
        <h2>{t('enterEmail')}</h2>
      </div>
      <div className="listing-elem-3-Payment">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="email"
              className="MBWayInput"
              onChange={handleEmailChange}
            />
          </label>
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
