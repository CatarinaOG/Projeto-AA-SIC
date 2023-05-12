import Close from "../../Images/close.png"

export default function TicketTypeSelected(props){

    const {ticket,setTicket,setFase} = props

    const type = ticket.type

    function goToTypeFase(){
        setFase("type")
        setTicket( oldTicket => ({...oldTicket,price:0}))
    }

    return(
        <div className="selectedContainer">
            <h3>{type.description} - {type.price}</h3>
            <img className="smallEventClose" onClick={goToTypeFase} src={Close} alt="" />
        </div>
    )

}