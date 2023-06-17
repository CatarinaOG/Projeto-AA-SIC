
import { useState } from "react"
import { useNavigate } from "react-router-dom"

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

    const {selected,user,setUser} = props 

    const [showOptions, setShowOptions] = useState(false)

    function showOptionsFunction(event){
        event.preventDefault();
        setShowOptions(old => !old)
    }

    function showNone(){
        setShowOptions(false)
    }

    function removeUser(){
        setUser({})
    }

    return(

        <div>
            <nav className="navBar">
                
                <a href="/HomeUser"><img className="logoImage" onClick={showNone} src={Logo} alt="" /></a>

                <div className="navBarRighSide">

                    <a href="" className="iconTab"><img src={Info} alt="" /></a>
                    <a href="/Listings" className={selected === "listings"? "tabSelected" : "tab"}>My Listings</a>
                    <a href="/MyTickets" className={selected === "boughtTickets"? "tabSelected" : "tab"}>My Tickets</a>
                    <a href="/"><img className="profileTab" onClick={showOptionsFunction} src={user.profile_pic} alt="" /></a>
                    <a href="/SellTicket" className={selected === "sellTicket"? "sellTabSelected" : "sellTab"}>Sell Tickets!</a>
                    
                </div>

            </nav>

            {showOptions && (
                <div>
                    <div className="clearOverlay" onClick={showNone}></div>
                    <div className="popupOptions">
                        <div className="displayVertically">
                            <a href="/SavedEvents" className="option">
                                <div className="displayHorizontally">
                                    <img className="optionsIcon" src={Saved} alt="" />
                                    <p className="optionsName">Saved Events</p>
                                </div>
                            </a>

                            <a href="/FollowedEvents" className="option">
                                <div className="displayHorizontally">
                                    <img className="optionsIcon" src={Alert} alt="" />
                                    <p className="optionsName">Followed Events</p>
                                </div>
                            </a>

                            <a href="/Profile" className="option">
                                <div className="displayHorizontally">
                                    <img className="optionsIcon" src={Account} alt="" />
                                    <p className="optionsName">Account</p>
                                </div>
                            </a>

                            <a href="/Notifications" className="option">
                                <div className="displayHorizontally">
                                    <img className="optionsIcon" src={Notification} alt="" />
                                    <p className="optionsName">Notifications</p>
                                </div>
                            </a>

                            <a href="/Suggestion" className="option">
                                <div className="displayHorizontally">
                                    <img className="optionsIcon" src={Suggest} alt="" />
                                    <p className="optionsName">Suggest Event</p>
                                </div>
                            </a>

                            <a href="/" className="option" onClick={removeUser}>
                                <div className="displayHorizontally">
                                    <img className="optionsIcon" src={Logout} alt="" />
                                    <p className="optionsName">Logout</p>
                                </div>
                            </a>

                        </div>
                    </div>
                </div>
            )}


        </div>

    )
}