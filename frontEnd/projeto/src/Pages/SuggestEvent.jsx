import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import NavBarUser from "../Components/NavBar/NavBarUser"
import BlackClose from "../Images/blackClose.png"

import "../Styles/SuggestEvent.css"

export default function SuggestEvent(props){


    const [inputs,setInputs] = useState({
        event_name: "",
        address: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: ""
    })


    const navigate = useNavigate();
    const [showConfirmation,setShowConfirmation] = useState(false)

    function suggestTheEvent(){
        setShowConfirmation(true)
    }

    function closeConfirmation(){
        navigate("/HomeUser")
    }

    function updateInputs(event){

        const {name,value} = event.target
        setInputs(oldInputs => ({...oldInputs,[name]:value}))

    }


    return(
        <div>
            <NavBarUser selected="home"/>

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
                                    <input className="suggestEventInput" type="text" name="event_name" onChange={updateInputs}/>
                                    <input className="suggestEventInput" type="text" name="address" onChange={updateInputs}/>
                                    <div className="suggestDateContainer">
                                        <input className="suggestEventInputDate" type="date" name="start_date" onChange={updateInputs}/>
                                        <input className="suggestEventInputTime" type="time" name="satart_time" onChange={updateInputs}/>
                                    </div>
                                    <div className="suggestDateContainer">
                                        <input className="suggestEventInputDate" type="date" name="end_date" onChange={updateInputs}/>
                                        <input className="suggestEventInputTime" type="time" name="end_time" onChange={updateInputs}/>
                                    </div>
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
                        <img src={BlackClose} className="editClose" alt="" onClick={closeConfirmation} />
                        <h3 className="popUpInfo">Your suggestion has been sent!</h3>
                    </div>
                </div>
            }
        </div>
    )
}