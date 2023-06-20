import NavBarUser from "../Components/NavBar/NavBarUser"
import Filters from "../Components/Filters/Filters"
import BoughtTicket from "../Components/BoughtTickets/BoughtTicket"
import UserContext from "../Contexts/UserContext"
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../backendIP.js';


import "../Styles/BoughTickets.css"

import { useState,useContext, useEffect } from "react"

export default function BoughtTickets(){
	const {t} = useTranslation();
    const {user} = useContext(UserContext);
    const [tickets,setTickets] =useState([])

    useEffect(() => {
        sendGetBoughtTicketsRequest()
    },[])


    function sendGetBoughtTicketsRequest(){

        fetch(`${GLOBAL_VARIABLE}/user/get_bought_tickets`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
        })
        .then(response => response.json())
        .then(userResponse => {
            setTickets(userResponse)
        })
        .catch(error => {
            console.log(error)
        });
    }


    const ticketrsFiltered = tickets.map( ticket => 
        <BoughtTicket key={ticket.id} ticket={ticket}/>
    )

    return(
        <div>
            <NavBarUser selected="boughtTickets" />
            
            <div className="center">
                <div className="defaultContainer">
                    <h1>{t('boughtTickets')} </h1>

                    <div className="eventsContainer">
                        { tickets.length > 0 ? 
                            ticketrsFiltered : <p>{t('noTicketsYet')}</p>}
                    </div>

                </div>
            </div>
        
        </div>
    )

}