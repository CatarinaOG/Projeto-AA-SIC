import Close from "../../Images/close.png"
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function TicketTypeSelected(props){

    const {ticket,setTicket,setFase,done} = props

    const type = ticket.type

    function goToTypeFase(){
        if(!done){
            setFase("type")
            setTicket( oldTicket => ({...oldTicket,price:0}))
        }
    }

    return(
        <div className="selectedContainer">
            <h3>{type.description} - {type.price}</h3>
            <img className="smallEventClose" onClick={goToTypeFase} src={Close} alt="" />
        </div>
    )

}