import { useState, useEffect ,useContext} from "react";
import UserContext from "../../Contexts/UserContext";
import "../../Styles/Profile.css";
import BlackClose from "../../Images/blackClose.png"
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';



export default function PopUpCreateArtist(props) {
  const [artistName, setArtistName] = useState("");
  const [message, setMessage] = useState("");
  const {user} = useContext(UserContext);
	const {t} = useTranslation();
  const {trigger,setPopUpTrigger,setPopUpTriggerAdd} = props
  
  useEffect(() => {
    if (trigger) {
      setArtistName("");
      setMessage("");
    }
  }, [trigger]);

  const handleArtistChange = (event) => {
    setArtistName(event.target.value);
  };

  const submitType = (event) => {
    event.preventDefault();
    if (artistName === "") {
      setMessage(t('invalidArtistName'));
    } else {
      postArtist();

    }
  };


  const input = {
    name : artistName
  }


  function postArtist(){
    fetch(`${GLOBAL_VARIABLE}/promoter/create_artist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(input)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .then(responseJSON => {
      console.log(responseJSON.confirmed);
      if (responseJSON.confirmed === "true"){
        setPopUpTrigger(false);
        setPopUpTriggerAdd(true);
      }
      else{
        setMessage(t('thereAlreadyIsArtist'));
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
  }


  return trigger ? (
    <div className="overlay">
        <div className="editContainter">
            <img src={BlackClose} className="editClose" alt="" onClick={() => setPopUpTrigger(false)} />
            <h3 className="editTitle">{t('createNewArtist')}</h3>
            <form onSubmit={submitType}>
                <input className="editInputNumber" onChange={handleArtistChange}  placeholder="Insert artist name" type="text"/>
                <p className={message !== "" ? "urlError" : "urlErrorNotVisible"}>{message}</p>
                <button className="button" type="submit">{t('submit')}</button>
            </form>

        </div>
    </div>
  ):("")
}
