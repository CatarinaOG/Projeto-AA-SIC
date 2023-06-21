import SmallEventSelected from "./SmallEventSelected"
import TicketTypeSelected from "./TicketTypeSelected"
import TicketPrice from "./TicketPrice"
import TicketDescription from "./TicketDescription"

import { useRef, useEffect } from "react"
import { useTranslation } from "react-i18next";

export default function FaseDescription(props){
    const {t} = useTranslation();

    const {ticket,setTicket,setFase} = props

    const toTitleRef = useRef(null)

    useEffect(() => {
        if (toTitleRef.current) {
            toTitleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, []);

    function goToFileFase(){
        setFase("file")
    }

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

                <h1>{t('selectPrice')}</h1>
                <p className="gray">{t('forHowMuch')}</p>

                <TicketPrice 
                    ticket={ticket} 
                    setTicket={setTicket}
                    setFase={setFase}/>

                <h1 ref={toTitleRef}>{t('insertDesc')}</h1>
                <p className="gray">{t('canYouTellUsWhy')}</p>

                <TicketDescription 
                    setTicket={setTicket}
                    setFase={setFase}/>

                <div className="center">
                    <button className="button" onClick={goToFileFase}>{t('next')}</button>
                </div>

            </div>
        </div>
    )

}