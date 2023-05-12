import { useState } from "react"

import NavBarUser from "../Components/NavBar/NavBarUser"
import SelectEventFase from "../Components/SellTicket/SelectEventFase"
import SelectTypeFase from "../Components/SellTicket/SelectTypeFase"


import "../Styles/BuyTicket.css"

export default function BuyTicket(){

    const [events,setEvents] = useState([
        {
            id: 1,
            dates: "July 6th",
            name: "NOS Alive",
            place: "Passeio Marítimo de algés, Lisboa"
        },
        {
            id: 2,
            dates: "July 18th",
            name: "Harry Styles",
            place: "Passeio Marítimo de algés, Lisboa"
        },
        {
            id: 3,
            dates: "May 13th",
            name: "Hanz Zimmer",
            place: "Altice Arena, Lisboa"
        },
        {
            id: 4,
            dates: "May 17th",
            name: "Coldplay",
            place: "Passeio Marítimo de algés, Lisboa"
        },
        {
            id: 5,
            dates: "July 6th",
            name: "NOS Alive",
            place: "Passeio Marítimo de algés, Lisboa"
        },
    ])

    const [types,setTypes] = useState([
        {
            id: 1,
            description: "2 Day Ticket | 6 & 7th July",
			price: "198$"
        },
        {
            id: 2,
            description: "1 Day Ticket | 7th July",
			price: "88$"
        },
        {
            id: 3,
            description: "2 Day Ticket | 7 & 8th July",
			price: "200$"
        }
    ])

    const [suggested,setSuggested] = useState([
        {
            id: 1,
            dates: "July 6th",
            name: "NOS Alive",
            place: "Passeio Marítimo de algés, Lisboa"
        },
        {
            id: 2,
            dates: "July 18th",
            name: "Harry Styles",
            place: "Passeio Marítimo de algés, Lisboa"
        }
    ])

    const [ticket,setTicket] = useState({
        userID: "0",
        eventID: "1",
        typeID: "3",
        price: "4483.34",
        description: "nao posso ir"
    })

    const [fase,setFase] = useState("event") // event / type / price / description / file

    

    return(

        <div>

            <NavBarUser selected="sellTicket"/>

            <div className="center">
                <div className="buyContainer">

                    {fase == "event" && 
                        <SelectEventFase 
                            events={events} 
                            setTicket={setTicket} 
                            setFase={setFase} 
                            suggested={suggested}/>}

                    {fase == "type" && 
                        <SelectTypeFase 
                            events={events} 
                            ticket={ticket}
                            setTicket={setTicket} 
                            setFase={setFase} 
                            types={types}/>}
                    
                </div>
            </div>

        </div>

    )


}