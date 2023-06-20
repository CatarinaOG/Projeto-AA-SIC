import NavBarUser from "../Components/NavBar/NavBarUser"
import Filters from "../Components/Filters/Filters"
import BoughtTicket from "../Components/BoughtTickets/BoughtTicket"
import UserContext from "../Contexts/UserContext"

import "../Styles/BoughTickets.css"

import { useState,useContext, useEffect } from "react"

export default function BoughtTickets(){

    const {user} = useContext(UserContext);
    const [tickets,setTickets] =useState([])

    useEffect(() => {
        sendGetBoughtTicketsRequest()
    },[])


    function sendGetBoughtTicketsRequest(){

        fetch("http://localhost:8080/api/user/get_bought_tickets", {
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
                    <h1>Bought Tickets</h1>

                    <div className="eventsContainer">
                        { tickets.length > 0 ? 
                            ticketrsFiltered : <p>You didn't buy any tickets yet</p>}
                    </div>

                </div>
            </div>
        
        </div>
    )

}