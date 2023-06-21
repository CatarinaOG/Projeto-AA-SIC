

export default function TicketType(props){

    const {type,setTicket,setFase} = props

    function addTypeToTicket(){
        setTicket( oldTicket => ({...oldTicket,type:type}) )
        setFase("price")
    }

    return(
        <div className="blackContainer" onClick={addTypeToTicket}>
            <h3>{type.description} - {type.price}$</h3>
        </div>
    )

}