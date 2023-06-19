import NavBarUser from "../Components/NavBar/NavBarUser"
import Filters from "../Components/Filters/Filters"
import BoughtTicket from "../Components/BoughtTickets/BoughtTicket"
import UserContext from "../Contexts/UserContext"

import "../Styles/BoughTickets.css"

import { useState,useContext, useEffect } from "react"

export default function BoughtTickets(){

    const {user} = useContext(UserContext);
    const [tickets,setTickets] =useState([])
    const [filters,setFilters] = useState({
        filter_place: "",
        filter_time: "",
        filter_category: "",
    })

    function filtersChanged(){
        console.log(filters)
        //sendGetBoughtTicketsRequest()
    }


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
            console.log(userResponse)
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

                    <Filters setFilters={setFilters} filtersChanged={filtersChanged}/>

                    <div className="eventsContainer">
                        { tickets.length > 0 ? 
                            ticketrsFiltered : <p>Your search did not yield any results</p>}
                    </div>

                </div>
            </div>
        
        </div>
    )

}