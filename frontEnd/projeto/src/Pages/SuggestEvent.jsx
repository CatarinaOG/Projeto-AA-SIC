import { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';

import NavBarUser from "../Components/NavBar/NavBarUser"
import BlackClose from "../Images/blackClose.png"
import UserContext from "../Contexts/UserContext"

import "../Styles/SuggestEvent.css"
import { useTranslation } from "react-i18next";


function orderDate(date){

    const parts = date.split('-');

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const transformedDate = `${day}/${month}/${year}`;

    return transformedDate;
}



export default function SuggestEvent(props){

    const {user} = useContext(UserContext);
    const {t} = useTranslation();


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


    function sendSuggestEventRequest(){

        const start_date_ordered = orderDate(inputs.start_date)
        const end_date_ordered = orderDate(inputs.end_date)

        const fullStartDate = start_date_ordered + " " + inputs.start_time + ":00"
        const fullEndDate = end_date_ordered + " " + inputs.end_time + ":00"


        fetch("http://localhost:8080/api/user/suggest_event", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                event_name: inputs.event_name,
                address: inputs.address,
                start_date: fullStartDate,
                end_date: fullEndDate,
            })
        })
        .catch(error => {
            console.log(error)
        });

    }


    function suggestTheEvent(){
        sendSuggestEventRequest()
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
                    <h1>{t('suggestEvent')}</h1>   
                    <div className="smallContainer">

                        <div className="smallContainerInputs">
                            <div className="smallContainerLeftSide">
                                <div>
                                    <p className="suggestEventLabel">{t('eventName')}</p>
                                    <p className="suggestEventLabel">{t('venue')}</p>
                                    <p className="suggestEventLabel">{t('startDate')}</p>
                                    <p className="suggestEventLabel">{t('endDate')}</p>
                                </div>
                            </div>

                            <div className="smallContainerRightSide">
                                <div>
                                    <input className="suggestEventInput" type="text" name="event_name" onChange={updateInputs}/>
                                    <input className="suggestEventInput" type="text" name="address" onChange={updateInputs}/>
                                    <div className="suggestDateContainer">
                                        <input className="suggestEventInputDate" type="date" name="start_date" onChange={updateInputs}/>
                                        <input className="suggestEventInputTime" type="time" name="start_time" onChange={updateInputs}/>
                                    </div>
                                    <div className="suggestDateContainer">
                                        <input className="suggestEventInputDate" type="date" name="end_date" onChange={updateInputs}/>
                                        <input className="suggestEventInputTime" type="time" name="end_time" onChange={updateInputs}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="button" onClick={suggestTheEvent}>{t('submit')}</button>

                    </div>  
                </div>
            </div>

            { showConfirmation &&
                <div>
                    <div className="overlay"></div>
                    <div className="popUpContainer">
                        <img src={BlackClose} className="editClose" alt="" onClick={closeConfirmation} />
                        <h3 className="popUpInfo">{t('suggestionHasBeenSent')}</h3>
                    </div>
                </div>
            }
        </div>
    )
}