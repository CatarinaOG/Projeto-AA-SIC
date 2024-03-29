import bell from "../../Images/bell.png"
import add from "../../Images/add.png"
import check from "../../Images/check.png"
import BlackClose from "../../Images/blackClose.png"
import UserContext from "../../Contexts/UserContext"

import { useState,useContext } from "react"
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';


export default function TicketAlert(props){

    const {event,setUpdateEvent} = props
    const {user} = useContext(UserContext);
	const {t} = useTranslation();


    const [showAdded,setShowAdded] = useState(false)

    function sendFollowRequest(){

        fetch(`${GLOBAL_VARIABLE}/user/follow_event`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                event_id: event.id
            })
        })
        .then(response => setUpdateEvent(old => !old))
        .catch(error => {
            console.log(error)
        });

    }


    function addTicketAlert(){
        // enviar pedido event.id e user.id

        if(!event.event_followed){
            sendFollowRequest()
            setShowAdded(true)
        }
        else{
            //sendDeFollowRequest
        }
    }

    function closeEdit(){
        setShowAdded(false)
    }

    return(
        <div className="eventAlert">
            <img src={bell} className="bellImage" alt="" />

            <div className="alertText">
                <h3>{t('ticketAlerts')}</h3>
                <p>{t('getNotified')}</p>
                <img className="addImage" onClick={addTicketAlert} src={event.event_followed ? check : add} alt="" />
            </div>

            { showAdded &&
            
            <div>
                <div className="overlay"></div>
                <div className="popUpContainer">
                    <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                    <h3 className="popUpInfo">{t('youAreNowFollowing')}</h3>
                </div>
            </div>
            
            }

        </div>
    )
}