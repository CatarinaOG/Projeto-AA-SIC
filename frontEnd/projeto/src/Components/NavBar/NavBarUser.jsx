
import { useState } from "react"

import Logo from "../../Images/logo.png"
import Info from "../../Images/info.png"
import Saved from "../../Images/saved.png"
import Alert from "../../Images/alert.png"
import Account from "../../Images/account.png"
import Notification from "../../Images/notification.png"
import Suggest from "../../Images/suggest.png"
import Logout from "../../Images/logout.png"

import "../../Styles/NavBar.css"

export default function NavBarUser(props){

    const {selected} = props 

    const [user,setUser] = useState({
        profilePic: "https://cdn-icons-png.flaticon.com/128/4140/4140047.png"
    })

    const [showOptions, setShowOptions] = useState("none")

    function showOptionsFunction(event){
        event.preventDefault();

        if(showOptions == "none") setShowOptions("options")
        else setShowOptions("none")
    }

    function showNone(event){
        setShowOptions("none")
    }

    return(

        <div>
            <nav className="navBar">
                
                <a href="/"><img className="logoImage" onClick={showNone} src={Logo} alt="" /></a>

                <div className="navBarRighSide">

                    <a href="" className="iconTab"><img src={Info} alt="" /></a>
                    <a href="" className={selected == "listings"? "tabSelected" : "tab"}>My Listings</a>
                    <a href="" className={selected == "tickets"? "tabSelected" : "tab"}>My Tickets</a>
                    <a href=""><img className="profileTab" onClick={showOptionsFunction} src={user.profilePic} alt="" /></a>
                    <a href="" className={selected == "sellTicket"? "sellTabSelected" : "sellTab"}>Sell Tickets!</a>
                    
                </div>

            </nav>

            {showOptions == "options" && (
                <div className="popupOptions">
                    <div className="displayVertically">
                        <a href="" className="option">
                            <div className="displayHorizontally">
                                <img className="optionsIcon" src={Saved} alt="" />
                                <p className="optionsName">Saved Events</p>
                            </div>
                        </a>

                        <a href="" className="option">
                            <div className="displayHorizontally">
                                <img className="optionsIcon" src={Alert} alt="" />
                                <p className="optionsName">Tickets Alert</p>
                            </div>
                        </a>

                        <a href="" className="option">
                            <div className="displayHorizontally">
                                <img className="optionsIcon" src={Account} alt="" />
                                <p className="optionsName">Account</p>
                            </div>
                        </a>

                        <a href="" className="option">
                            <div className="displayHorizontally">
                                <img className="optionsIcon" src={Notification} alt="" />
                                <p className="optionsName">Notifications</p>
                            </div>
                        </a>

                        <a href="" className="option">
                            <div className="displayHorizontally">
                                <img className="optionsIcon" src={Suggest} alt="" />
                                <p className="optionsName">Suggest Event</p>
                            </div>
                        </a>

                        <a href="" className="option">
                            <div className="displayHorizontally">
                                <img className="optionsIcon" src={Logout} alt="" />
                                <p className="optionsName">Logout</p>
                            </div>
                        </a>

                    </div>
                </div>
            )}


        </div>

    )
}