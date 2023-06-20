import { useRef, useState } from "react"

import NavBarUser from "../Components/NavBar/NavBarUser"
import FaseEvent from "../Components/SellTicket/FaseEvent"
import FaseType from "../Components/SellTicket/FaseType"
import FasePrice from "../Components/SellTicket/FasePrice"
import FaseDescription from "../Components/SellTicket/FaseDescription"
import FaseFile from "../Components/SellTicket/FaseFile"
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../backendIP.js';

import "../Styles/SellTicket.css"

export default function SellTicket(){
    const {t} = useTranslation();

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