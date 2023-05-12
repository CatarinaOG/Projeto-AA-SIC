

import SmallEventSelected from "./SmallEventSelected"

export default function SelectTypeFase(props){

    const {events,ticket,setTicket,setFase,types} = props

    return(

        <div className="center">
            <div>
                <h1>Select Event</h1>
                <SmallEventSelected 
                    events={events} 
                    ticket={ticket} 
                    setFase={setFase}/>
            </div>
        </div>

    )


}