

export default function SmallEvent(props){

    const {event,setTicket,setFase} = props

    function addIdToTicket(){
        setTicket(oldTicket => ({...oldTicket,eventID:event.id}))
        setFase("type")
    }
    
    return(

        <div className="smallEventContainer" onClick={addIdToTicket}>
            <h3>{event.name}</h3>
            <p>{event.dates} | {event.place}</p>
        </div>

    )

}