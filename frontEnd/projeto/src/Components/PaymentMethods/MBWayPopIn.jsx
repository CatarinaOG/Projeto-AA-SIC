import { useState, useContext} from "react";
import UserContext from "../../Contexts/UserContext";
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function MBWayPopIn({
  setPaymentType,
  setPaymentInfo,
  setMessage,
  ticketID,
  setBlock
}) {
  const {t} = useTranslation();

  const {user} = useContext(UserContext);

  const [number, setNumber] = useState("");

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

  function handleSubmit(event){
    event.preventDefault();    // talvez depois retirar para meter como pedido para a back end
    if(number !== ""){

        console.log(number)
        if(number.length !== 9){
            setMessage(t('insertANumberWith9'))
        }
        else{
          postTicketBuy();
        }
    }
    else{
        setMessage(t('insertPhoneBeforeConfirming'))
    }
}





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
        setBlock(true)
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
              type="num"
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
