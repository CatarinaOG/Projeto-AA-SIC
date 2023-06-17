import { useState } from "react"
import { useNavigate } from 'react-router-dom';


import Logo from "../../Images/logo.png"
import Info from "../../Images/info.png"

import "../../Styles/NavBar.css"

export default function NavBar(props){

    const {setUser} = props

    const [showPopup, setShowPopup] = useState("none")
    const [inputs,setInputs] = useState()

    const navigate = useNavigate();


    function showNone(event){
        event.preventDefault();
        setShowPopup("none")
    }

    function showLogin(event){
        event.preventDefault();
        setShowPopup("login")
    }

    function showSignup(event){
        event.preventDefault();
        setShowPopup("signup")
    }

    function updateUsername(event){
        setInputs( oldInput => [...oldInput, {email:event.target.value}] )
    }

    function updatePassword(event){
        setInputs( oldInput => [...oldInput, {password:event.target.value}] )
    }

    function login(){
        // enviar pedido com input.password e input.email
        // adicionar os erros
        // verificar tipo de user
        navigate('/HomePromoter')
    }

    return(

        <div>
            <nav className="navBar">
                
                <a href="/"><img className="logoImage" onClick={showNone} src={Logo} alt="" /></a>

                <div className="navBarRighSide">

                    <a href="" className="iconTab"><img src={Info} alt="" /></a>
                    <a href="" className="tab" onClick={showLogin}>Login</a>
                    <a href="" className="sellTab" onClick={showLogin}>Sell Tickets!</a>
                    
                </div>

            </nav>

            {showPopup == "login" && (
                <div>
                    <div className="clearOverlay" onClick={showNone}></div>
                    <div className="popup">
                        <div className="centerAll">
                            <div className="displayVertically">
                                <p className="popupTitle">Login</p>
                                <input className="input" type="text" placeholder="Insert username" onChange={updateUsername} />
                                <input className="input" type="text" placeholder="Insert password" onChange={updatePassword}/>
                                <p className="popupLoginSignup" onClick={showSignup} >Don't have an account? Sign up here</p>
                                <button className="popupButton" onClick={login}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {showPopup == "signup" && (
                <div>
                    <div className="clearOverlay" onClick={showNone}></div>
                    <div className="popup">
                        <div className="centerAll">
                            <div className="displayVertically">
                                <p className="popupTitle">Sign up</p>
                                <input className="input" type="text" placeholder="Insert email address" />
                                <input className="input" type="text" placeholder="Insert username" />
                                <input className="input" type="text" placeholder="Insert password" />
                                <input className="input" type="text" placeholder="Confirm password" />
                                <button className="popupButton" type="submit">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>

            )}

        </div>

    )
}