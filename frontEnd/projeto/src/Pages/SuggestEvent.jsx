import NavBarUser from "../Components/NavBar/NavBarUser"
import { useState } from "react";

import BlackClose from "../Images/blackClose.png"

import "../Styles/SuggestEvent.css"

export default function SuggestEvent(){

    const [eventName, setEventName] = useState('');
    const [place, setPlace] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const [showConfirmation,setShowConfirmation] = useState(false)

    function suggestTheEvent(){
        //enviar pedido
        setShowConfirmation(true)
    }

    function closeEdit(){
        // enviar para tras
    }


    return(
        <div>
            <NavBarUser />

            <div className="center">
                <div className="defaultContainer">
                    <h1>Suggest an Event</h1>   
                    <div className="smallContainer">

                        <div className="smallContainerInputs">
                            <div className="smallContainerLeftSide">
                                <div>
                                    <p className="suggestEventLabel">Event Name</p>
                                    <p className="suggestEventLabel">Place</p>
                                    <p className="suggestEventLabel">Start Date</p>
                                    <p className="suggestEventLabel">End Date</p>
                                </div>
                            </div>

                            <div className="smallContainerRightSide">
                                <div>
                                    <input className="suggestEventInput" type="text" onChange={e => setEventName(e.target.value)}/>
                                    <input className="suggestEventInput" type="text" onChange={e => setPlace(e.target.value)}/>
                                    <input className="suggestEventInputDate" type="date" onChange={e => setStartDate(e.target.value)}/>
                                    <input className="suggestEventInputDate" type="date" onChange={e => setEndDate(e.target.value)}/>
                                </div>
                            </div>
                        </div>

                        <button className="button" onClick={suggestTheEvent}>Confirm</button>

                    </div>  
                </div>
            </div>

            { showConfirmation &&

                <div>
                    <div className="overlay"></div>
                    <div className="popUpContainer">
                        <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                        <h3 className="popUpInfo">Your suggested has been sent!</h3>
                    </div>
                </div>
            }


        </div>
    )
}