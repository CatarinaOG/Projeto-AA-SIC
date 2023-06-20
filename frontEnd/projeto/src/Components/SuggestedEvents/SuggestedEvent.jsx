import { useNavigate } from "react-router-dom"
import { useState,useContext } from "react";
import UserContext from "../../Contexts/UserContext"

import close from "../../Images/close.png";
import BlackClose from "../../Images/blackClose.png"
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function SuggestedEvent(props){
    const {t} = useTranslation();

    const {event,setSuggestedEvent,setUpdate} = props
    const {user} = useContext(UserContext);

    const navigate = useNavigate()

    const [showConfirmation, setShowConfirmation] = useState(false)

    function addSuggestedEvent(){
        setSuggestedEvent(event)
        navigate("/AddEvent")
    }

    function sendRemoveSuggestionRequest(){

        fetch(`${GLOBAL_VARIABLE}/promoter/remove_suggestion`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                suggestion_id: event.id
            })
        })
        .then(reponse => setUpdate(old => !old))
        .catch(error => {
            console.log(error)
        });
    }

    function removeSuggestion(){
        sendRemoveSuggestionRequest()
        setShowConfirmation(false)
    }

    function showTheConfirmation(){
        setShowConfirmation(true)
    }

    function showNothing(){
        setShowConfirmation(false)
    }

    

    return(
        <div className="center">
            <div className="suggestedContainer">
                <div className="suggestedInfo">
                    <h3>{event.name}</h3>
                    <p>{event.address}</p>
                    <p className="colorGreen">{event.start_date} - {event.end_date}</p>
                </div>
                <div className="buttonSuggestedContainer">
                    <button className="button" onClick={addSuggestedEvent}>{t('add')}</button>
                </div>
				<img className="smallCloseIcon" src={close} onClick={showTheConfirmation} alt=""/>
            </div>

            { showConfirmation &&
                <div>
                    <div className="overlay"></div>
                    <div className="popUpContainer">
                        <img src={BlackClose} className="editClose" alt="" onClick={showNothing} />
                        <h3 className="popUpInfoWithButtons">{t('sureDeleteSuggestion')}</h3>
                        <div className="center">
                            <div className="promoterButtons">
                                <button className="button" onClick={removeSuggestion}>{t('yes')}</button>
                                <button className="button" onClick={showNothing}>{t('no')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}