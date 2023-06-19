import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from "../../Contexts/UserContext"
import goBackImg from "../../Images/goBack.png"
import BlackClose from "../../Images/blackClose.png"

export default function FullTicket(props){

    const {ticket,ticketType,setShow,setTicketID} = props
    const {user} = useContext(UserContext);

    const profile_pic = ticket.user_image ? ticket.user_image : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

    const [loginMandatory,setLoginMandatory] = useState(false)
    const [onlyUser,setOnlyUser] = useState(false)

    const navigate = useNavigate();

    function goBack(){
        setShow("tickets")
    }

    function buyTicket(){

        if(!user){
            setLoginMandatory(true)
            return
        }

        if(user.type === "user"){
            setTicketID(ticket.id)
            navigate('/PaymentMethods')
            return
        }
        
        if(user.type !== "user"){
            setOnlyUser(true)
            return
        }
    }

    function closeEdit(){
        setLoginMandatory(false)
        setOnlyUser(false)
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
                        <h2>{ticket.price}$</h2>
                        <button className="button" onClick={buyTicket}>Buy</button>
                    </div>
                    <div className="userSection">
                        <img className="userImageBuySection" src={profile_pic} alt="" />
                        <div className="userInfoSection">
                            <h3>{ticket.user_name}</h3>
                            <p>"{ticket.description !== "" ? ticket.description : "** No description **"}"</p>
                        </div>
                    </div>
                </div>
            </div>

            { loginMandatory &&

                <div>
                    <div className="overlay"></div>
                    <div className="popUpContainer">
                        <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                        <h3 className="popUpInfo">Log in to buy a ticket!</h3>
                    </div>
                </div>
            }

            { onlyUser &&

                <div>
                    <div className="overlay"></div>
                    <div className="popUpContainer">
                        <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                        <h3 className="popUpInfo">Only users can buy a ticket!</h3>
                    </div>
                </div>
            }

        </div>
    )
}