import bell from "../../Images/bell.png"
import add from "../../Images/add.png"


export default function TicketAlert(){



    return(
        <div className="eventAlert">
            <img src={bell} className="bellImage" alt="" />

            <div className="alertText">
                <h3>Ticket Alerts</h3>
                <p>Get notified when a ticket becomes available</p>
                <img className="addImage" src={add} alt="" />
            </div>

        </div>
    )
}