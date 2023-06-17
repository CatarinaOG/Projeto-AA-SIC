import { useRef, useState } from "react"

import NavBarUser from "../Components/NavBar/NavBarUser"
import FaseEvent from "../Components/SellTicket/FaseEvent"
import FaseType from "../Components/SellTicket/FaseType"
import FasePrice from "../Components/SellTicket/FasePrice"
import FaseDescription from "../Components/SellTicket/FaseDescription"
import FaseFile from "../Components/SellTicket/FaseFile"

import "../Styles/SellTicket.css"

export default function SellTicket(){

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
			price: 198
        },
        {
            id: 2,
            description: "1 Day Ticket | 7th July",
			price: 88
        },
        {
            id: 3,
            description: "2 Day Ticket | 7 & 8th July",
			price: 200
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
        userID: 1,
        event: null,
        type: null,
        price: 0,
        description: "",
        file: null
    })

    const [fase,setFase] = useState("event") // event / type / price / description / file

    return(

        <div>

            <NavBarUser selected="sellTicket"/>

            <div className="center">
                <div className="buyContainer">

                    {fase === "event" && 
                        <FaseEvent 
                            events={events} 
                            setTicket={setTicket} 
                            setFase={setFase} 
                            suggested={suggested}/>}

                    {fase === "type" && 
                        <FaseType 
                            events={events} // para retirar
                            ticket={ticket}
                            setTicket={setTicket} 
                            setFase={setFase} 
                            types={types}/>}

                    {fase === "price" && 
                        <FasePrice 
                            ticket={ticket}
                            setTicket={setTicket} 
                            setFase={setFase}/>}

                    {fase === "description" && 
                        <FaseDescription 
                            ticket={ticket}
                            setTicket={setTicket} 
                            setFase={setFase}/>}

                    {fase === "file" && 
                        <FaseFile 
                            ticket={ticket}
                            setTicket={setTicket} 
                            setFase={setFase}/>}
                    
                </div>
            </div>

        </div>

    )


}