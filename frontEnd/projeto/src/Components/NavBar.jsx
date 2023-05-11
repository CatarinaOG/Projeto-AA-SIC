import { useState } from "react"

import Logo from "../Images/logo.png"
import Info from "../Images/info.png"

import "../Styles/NavBar.css"

export default function NavBar(){

    const [showPopup, setShowPopup] = useState("none")

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

    return(

        <div>
            <nav className="navBar">
                
                <a href="/"><img className="logoImage" onClick={showNone} src={Logo} alt="" /></a>

                <div className="navBarRighSide">

                    <a href="" className="iconTab"><img src={Info} alt="" /></a>
                    <a href="" className="tab" onClick={showLogin}>Login</a>
                    <a href="" className="sellTab">Sell Tickets!</a>
                    
                </div>

            </nav>

            {showPopup == "login" && (
                <div className="popup">
                    <div className="center">
                        <div className="displayVertically">
                            <p className="popupTitle">Login</p>
                            <input className="input" type="text" placeholder="Insert username" />
                            <input className="input" type="text" placeholder="Insert password" />
                            <p className="popupLoginSignup" onClick={showSignup} >Don't have an account? Sign up here</p>
                            <button className="popupButton" type="submit">Confirm</button>
                        </div>
                    </div>
                </div>
            )}


            {showPopup == "signup" && (
                <div className="popup">
                    <div className="center">
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
            )}

        </div>

    )
}