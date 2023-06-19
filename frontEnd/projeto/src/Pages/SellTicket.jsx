import { useRef, useState } from "react"

import NavBarUser from "../Components/NavBar/NavBarUser"
import FaseEvent from "../Components/SellTicket/FaseEvent"
import FaseType from "../Components/SellTicket/FaseType"
import FasePrice from "../Components/SellTicket/FasePrice"
import FaseDescription from "../Components/SellTicket/FaseDescription"
import FaseFile from "../Components/SellTicket/FaseFile"

import "../Styles/SellTicket.css"

export default function SellTicket(){

    /*const [types,setTypes] = useState([
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
    ])*/


    const [ticket,setTicket] = useState({
        event: null,
        type: null,
        price: 0,
        description: "",
        file: "",
        download_url: "",
    })

    const [fase,setFase] = useState("event") // event / type / price / description / file

    return(

        <div>

            <NavBarUser selected="sellTicket"/>

            <div className="center">
                <div className="buyContainer">

                    {fase === "event" && 
                        <FaseEvent 
                            setTicket={setTicket} 
                            setFase={setFase}/>}

                    {fase === "type" && 
                        <FaseType 
                            ticket={ticket}
                            setTicket={setTicket} 
                            setFase={setFase}/>}

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