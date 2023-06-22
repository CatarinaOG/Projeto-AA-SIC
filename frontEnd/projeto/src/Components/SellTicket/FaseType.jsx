import { useRef, useEffect, useState, useContext} from "react"
import UserContext from "../../Contexts/UserContext"
import SmallEventSelected from "./SmallEventSelected"

import TicketType from "./TicketType"
import { GLOBAL_VARIABLE } from '../../backendIP.js';
import { useTranslation } from "react-i18next";

export default function FaseType(props){
    const {t} = useTranslation();

    const {ticket,setTicket,setFase} = props
    const [types,setTypes] = useState([])

    function sendGetTicketTypesRequest(){

        fetch(`${GLOBAL_VARIABLE}/event/get_ticket_types_event`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event_id: ticket.event.id
            })
        })
        .then(response => response.json())
        .then(responseJSON => {
            setTypes(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });
    }

    useEffect(() => {
        sendGetTicketTypesRequest()
    },[])

    const allTypes = types.map( type => 
        <TicketType 
            key={type.id} 
            type={type} 
            setTicket={setTicket} 
            setFase={setFase}/> 
    )

    const toTitleRef = useRef(null)

    useEffect(() => {
        if (toTitleRef.current) {
            toTitleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, []);

    return(

        <div className="center">
            <div>
                <h1>{t('selectEvent')}</h1>
                <p className="gray">{t('whichEventMessage')}</p>

                <SmallEventSelected 
                    ticket={ticket} 
                    setTicket={setTicket}
                    setFase={setFase}
                />

                <h1 ref={toTitleRef}>{t('selectTicket')}</h1>
                <p className="gray">{t('whatKindOfTicket')}</p>

                <div className="exsitingTypes">
                    {allTypes}
                </div>
                
            </div>
        </div>

    )


}