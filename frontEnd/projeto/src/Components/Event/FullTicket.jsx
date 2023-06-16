
import goBackImg from "../../Images/goBack.png"

export default function FullTicket(props){

    const {ticket,ticketType,user,setShow} = props

    function goBack(){
        setShow("tickets")
    }

    function buyTicket(){
        // enviar pedido user.id ticket.id
    }

    return(
        <div>
            <div className="ticketTypeTitle">
                <img className="goBackImage" onClick={goBack} src={goBackImg} alt="" />
                <h2>{ticketType.description}</h2>
            </div>

            <div className="center">
                <div>
                    <div className="buySection">
                        <h2>{ticket.price}</h2>
                        <button className="button" onClick={buyTicket}>Buy</button>
                    </div>
                    <div className="userSection">
                        <img className="userImageBuySection" src={ticket.user_image} alt="" />
                        <div className="userInfoSection">
                            <h3>{user.name}</h3>
                            <p>"{ticket.description}"</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}