import bell from "../../Images/bell.png"
import add from "../../Images/add.png"
import check from "../../Images/check.png"
import BlackClose from "../../Images/blackClose.png"

import { useState } from "react"


export default function TicketAlert(props){

    const {event,user} = props

    const [showAdded,setShowAdded] = useState(false)

    function addTicketAlert(){
        // enviar pedido event.id e user.id

        if(!event.is_followed)
            setShowAdded(true)
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