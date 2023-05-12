import SmallEvent from "./SmallEvent"

import Magnifier from "../../Images/magnifier.png"
import { useState } from "react"

export default function SelectEventFase(props){

    const {events,setTicket,setFase,suggested} = props

    const [input,setInput] = useState("")

    const handleInputChange = (event) => {
        if (event.key === "Enter") {
            setInput(event.target.value); // fazer pedido pelos procurados
        }
    };

    const eventsSuggested = suggested.map( event => <SmallEvent key={event.id} event={event} setTicket={setTicket} setFase={setFase} />)
    const eventsSearched = events.map( event => <SmallEvent key={event.id} event={event} setTicket={setTicket} setFase={setFase}/>) // alterar para a lista de resultados


    return(
        <div className="center">
            <div>
                <h1>Select Event</h1>
                <p className="gray">Which event do you want to sell tickets for?</p>

                <img className="magnifierSelectTicket" src={Magnifier} alt="" />
                <input className="inputSelectTicket" onKeyDown={handleInputChange} type="text" placeholder="Where do you want to go?"/>
            
                {input == "" && (
                    <div>
                        <p className="graySmaller">Suggested:</p>
                        <div className="suggestedEvents">
                            {eventsSuggested}
                        </div>
                    </div>
                )}

                {input != "" && (
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