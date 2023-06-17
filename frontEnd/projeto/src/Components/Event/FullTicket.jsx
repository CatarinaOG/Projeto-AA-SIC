import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import goBackImg from "../../Images/goBack.png"
import BlackClose from "../../Images/blackClose.png"

export default function FullTicket(props){

    const {ticket,ticketType,user,setShow} = props

    const [loginMandatory,setLoginMandatory] = useState(false)

    const navigate = useNavigate();


    function goBack(){
        setShow("tickets")
    }

    function buyTicket(){

        if(!user.email)
            setLoginMandatory(true)
        else
            navigate('/PaymentMethods')
            // enviar pedido user.id ticket.id
    }

    function closeEdit(){
        setLoginMandatory(false)
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

            { loginMandatory &&

                <div>
                    <div className="overlay"></div>
                    <div className="popUpContainer">
                        <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                        <h3 className="popUpInfo">Sign in to buy a ticket!</h3>
                    </div>
                </div>
            }

        </div>
    )
}