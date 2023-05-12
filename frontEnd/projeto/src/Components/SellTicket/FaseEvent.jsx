import SmallEvent from "./SmallEvent"

import Magnifier from "../../Images/magnifier.png"
import { useState,useRef, useEffect } from "react"

export default function FaseEvent(props){

    const {events,setTicket,setFase,suggested} = props // events para retirar

    const [input,setInput] = useState("")

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            setInput(event.target.value); // fazer pedido pelos procurados
        }
    };

    const toTitleRef = useRef(null)

    useEffect(() => {
        if (toTitleRef.current) {
            toTitleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, []);

    const eventsSuggested = suggested.map( event => 
        <SmallEvent 
            key={event.id} 
            event={event} 
            setTicket={setTicket} 
            setFase={setFase}/>
    )
    
    const eventsSearched = events.map( event => 
        <SmallEvent 
            key={event.id} 
            event={event} 
            setTicket={setTicket} 
            setFase={setFase}/>
    ) // alterar para a lista de resultados de pesquisa




    return(
        <div className="center">
            <div>
                <h1 ref={toTitleRef}>Select Event</h1>
                <p className="gray">Which event do you want to sell tickets for?</p>

                <img className="magnifierSelectTicket" src={Magnifier} alt="" />
                <input className="inputSelectTicket" onKeyDown={handleEnter} type="text" placeholder="Where do you want to go?"/>
            
                {input === "" && (
                    <div>
                        <p className="graySmaller">Suggested:</p>
                        <div className="suggestedEvents">
                            {eventsSuggested}
                        </div>
                    </div>
                )}

                {input !== "" && (
                    <div>
                        <p className="graySmaller">Results:</p>
                        <div className="searchedEvents">
                            {eventsSearched}
                        </div>
                    </div>
                )}

                
            </div>
        </div>
    )

}