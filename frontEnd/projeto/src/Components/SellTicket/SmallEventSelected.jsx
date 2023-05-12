import Close from "../../Images/close.png"

export default function SmallEventSelected(props){

    const {events,ticket,setFase} = props

    const event = events.find( e => e.id === ticket.eventID)

    function goToEventFase(){
        setFase("event")
    }

    return(
        <div className="smallEventSelectedContainer">
            <h3>{event.name}</h3>
            <p>{event.dates} | {event.place}</p>
            <img className="smallEventClose" onClick={goToEventFase} src={Close} alt="" />
        </div>
    )

}