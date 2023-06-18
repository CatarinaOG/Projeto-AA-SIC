
export default function TicketDescription(props){

    const {setTicket,setFase,done} = props

    const handleEnter = (event) => {
        if (event.key === "Enter"){
            setTicket( oldTicket => ({...oldTicket,description:event.target.value}))
            setFase("file")
        }
    };

    return(
        <div>
            <textarea className="descriptionInput" onKeyDown={handleEnter} name="" id="" cols="30" rows="10" readOnly={done? true : false}></textarea>
        </div>
    )

}