import bell from "../../Images/bell.png"
import add from "../../Images/add.png"
import check from "../../Images/check.png"
import BlackClose from "../../Images/blackClose.png"
import UserContext from "../../Contexts/UserContext"

import { useState,useContext } from "react"


export default function TicketAlert(props){

    const {event} = props
    const {user} = useContext(UserContext);


    const [showAdded,setShowAdded] = useState(false)

    function sendFollowRequest(){

        fetch("http://localhost:8080/api/user/save_event", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                event_id: event.id
            })
        })
        .catch(error => {
            console.log(error)
        });

    }


    function addTicketAlert(){
        // enviar pedido event.id e user.id

        if(!event.is_followed){
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
                <h3>Ticket Alerts</h3>
                <p>Get notified when a ticket becomes available</p>
                <img className="addImage" onClick={addTicketAlert} src={event.is_followed ? check : add} alt="" />
            </div>

            { showAdded &&
            
            <div>
                <div className="overlay"></div>
                <div className="popUpContainer">
                    <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                    <h3 className="popUpInfo">You are now following this event!</h3>
                </div>
            </div>
            
            }

        </div>
    )
}