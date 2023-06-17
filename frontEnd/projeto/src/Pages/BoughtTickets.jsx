import NavBarUser from "../Components/NavBar/NavBarUser"
import Filters from "../Components/Filters/Filters"
import BoughtTicket from "../Components/BoughtTickets/BoughtTicket"
import UserContext from "../Contexts/UserContext"


import { useState,useContext } from "react"

export default function BoughtTickets(){

    const {user} = useContext(UserContext);
    const [filters,setFilters] = useState({
        filter_place: "",
        filter_time: "",
        filter_category: "",
    })


    const [events,setEvents] =useState([
        {
            id: 1,
            dayOfWeek: "Wednesday",
            month: "May",
            day: "8",
            time: "9:25 PM",
            ticketType: "Relvado",
            eventName: "Coldplay - Music Of The Spheres World Tour",
            eventPlace: "Estádio Cidade de Coimbra, Coimbra",
            ticketPrice: "80.56"
        },
        {
            id: 2,
            dayOfWeek: "Friday",
            month: "May",
            day: "19",
            time: "08:00 PM",
            ticketType: "Floor",
            eventName: "Post Malone - Twelve Carat Tour",
            eventPlace: "Ziggo Dome, Amsterdam",
            ticketPrice: "109.02"
        },
    ])

    function sendGetBoughtTicketsRequest(){

        fetch("http://localhost:8080/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                filter_place: filters.filter_place,
                filter_time: filters.filter_time,
                ilter_category: filters.filter_category,
            })
        })
        .then(response => response.json())
        .then(userResponse => {
            console.log(userResponse)
        })
        .catch(error => {
            console.log(error)
        });
    }


    const eventsFiltered = events.map( event => 
        <BoughtTicket key={event.id} event={event}/>
    )

    console.log(filters)


    return(
        <div>
            <NavBarUser selected="boughtTickets" />
            
            <div className="center">
                <div className="defaultContainer">
                    <h1>Bought Tickets</h1>

                    <Filters type="boughtTickets" setFilters={setFilters}/>

                    <div className="eventsContainer">
                        {eventsFiltered}
                    </div>

                </div>
            </div>
        
        </div>
    )

}