import Close from "../../Images/close.png"

export default function SmallEventSelected(props){

    const {ticket,setTicket,setFase} = props

    const event = ticket.event

    function goToEventFase(){
        setFase("event")
        setTicket( oldTicket => ({...oldTicket,price:0}))
    }

    return(
        <div className="selectedContainer">
            <h3>{event.name}</h3>
            <p>{event.dates} | {event.place}</p>
            <img className="smallEventClose" onClick={goToEventFase} src={Close} alt="" />
        </div>
    )

}