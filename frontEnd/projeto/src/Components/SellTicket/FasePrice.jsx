import SmallEventSelected from "./SmallEventSelected"
import TicketTypeSelected from "./TicketTypeSelected"
import TicketPrice from "./TicketPrice"

import { useRef, useEffect } from "react"
import { useTranslation } from "react-i18next";

export default function FasePrice(props){

    const {ticket,setTicket,setFase} = props
    const {t} = useTranslation();
    
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
                    setFase={setFase}/>

                <h1>{t('selectTicket')}</h1>
                <p className="gray">{t('whatKindOfTicket')}</p>

                <TicketTypeSelected
                    ticket={ticket}
                    setTicket={setTicket}
                    setFase={setFase}/>

                <h1 ref={toTitleRef}>{t('selectPrice')}</h1>
                <p className="gray">{t('forHowMuch')}</p>

                <TicketPrice 
                    ticket={ticket} 
                    setTicket={setTicket}
                    setFase={setFase}/>
                
                
                
            </div>
        </div>
    )


}