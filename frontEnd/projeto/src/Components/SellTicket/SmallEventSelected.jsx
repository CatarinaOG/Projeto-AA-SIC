import Close from "../../Images/close.png"

export default function SmallEventSelected(props){

    const {ticket,setTicket,setFase,done} = props

    const event = ticket.event

    function goToEventFase(){
        if(!done){
            setFase("event")
            setTicket( oldTicket => ({...oldTicket,price:0}))
        }
    }

    return event.name ? (
        <div className="selectedContainer">
            <h3>{event.name}</h3>
            <p>{event.date} | {event.address}</p>
            <img className="smallEventClose" onClick={goToEventFase} src={Close} alt="" />
        </div>
    ) : (
        <div className="selectedContainer">
            <h3>{event.event_name}</h3>
            <p>{event.start_date} | {event.event_place}</p>
            <img className="smallEventClose" onClick={goToEventFase} src={Close} alt="" />
        </div>
    )

}