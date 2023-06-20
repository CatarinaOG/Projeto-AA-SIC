import { useState, useEffect ,useContext} from "react";
import UserContext from "../../Contexts/UserContext";
import BlackClose from "../../Images/blackClose.png"

import "../../Styles/Profile.css";
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function PopUpAddCategory(props) {
  const {trigger,setPopUpTrigger} = props
	const {t} = useTranslation();

  const [temp,setTemp] = useState("")

  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (props.trigger) {
      setCategoryName("");
      setMessage("");
    }
  }, [props.trigger]);

  function saveTemp(event){
    setTemp(event.target.value);
  };

  function postCategory(){

    fetch(`${GLOBAL_VARIABLE}/promoter/create_category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          name: temp
        })
    })
    .then(response => {
      if (response.ok) return response.json();
      else throw new Error('Error: ' + response.status);
    })
    .then(responseJSON => {
      if(responseJSON.confirmed === "true") setPopUpTrigger(false)
      else setMessage(t('categoryAlreadyExists'))
    })
    .catch(error => {
		console.log('Error:', error);
    });
  }


  return trigger ? (
    <div className="overlay">
        <div className="editContainter">
            <img src={BlackClose} className="editClose" alt="" onClick={() => setPopUpTrigger(false)} />
            <h3 className="editTitle">{t('addCategory')}</h3>
                <input className="editInputNumber" onChange={saveTemp}  placeholder="Insert your new category" type="text"/>
                <p className={message !== "" ? "urlError" : "urlErrorNotVisible"}>{message}</p>
            <button className="button" onClick={postCategory}>{t('submit')}</button>
        </div>
    </div>
  ):("")
}
