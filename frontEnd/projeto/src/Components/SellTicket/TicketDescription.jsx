
export default function TicketDescription(props){

    const {ticket,setTicket,setFase,done} = props

    const handleEnter = (event) => {
        if (event.key === "Enter"){
            setFase("file")
        }
    };


    return done || done === false ? (
        <div>
            <textarea className="descriptionInput" name="" id="" cols="30" rows="10" readOnly={true} value={ticket.description}></textarea>
        </div>
    ):
    (
        <div>
            <textarea className="descriptionInput" onKeyDown={handleEnter} name="" id="" cols="30" rows="10" value={ticket.description} onChange={(event) => setTicket(old => ({...old,description:event.target.value}))}></textarea>
        </div>
    )

}