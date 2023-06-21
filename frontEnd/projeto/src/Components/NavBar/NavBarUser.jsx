
import { useState,useContext } from "react"
import { useNavigate,Link } from "react-router-dom"
import { Cookies } from "react-cookie"
import UserContext from "../../Contexts/UserContext"
import { useTranslation } from "react-i18next";


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
    const {user, setUser} = useContext(UserContext);
    const {t} = useTranslation();

    const cookie = new Cookies()

    const [showOptions, setShowOptions] = useState(false)

    const navigate = useNavigate();
    const profile_pic = user.profile_pic? user.profile_pic : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

    function showOptionsFunction(event){
        event.preventDefault();
        setShowOptions(old => !old)
    }

    function showNone(){
        setShowOptions(false)
    }

    function removeUser(){
        setUser({})
        cookie.remove('token')
        cookie.remove('type')
    }

    function goToProfile(){
        navigate("/Profile")
    }

    return(

        <div>
            <nav className="navBar">
                
                <Link to="/HomeUser"><img className="logoImage" onClick={showNone} src={Logo} alt="" /></Link>

                <div className="navBarRighSide">

                    <Link to="/InformationsUser" className="iconTab"><img src={Info} alt="" /></Link>
                    <Link to="/Listings" className={selected === "listings"? "tabSelected" : "tab"}>{t('myListings')}</Link>
                    <Link to="/MyTickets" className={selected === "boughtTickets"? "tabSelected" : "tab"}>{t('myTickets')}</Link>
                    <Link to=""><img className="profileTab" onClick={showOptionsFunction} src={profile_pic} alt="" /></Link>
                    <Link to="/SellTicket" className={selected === "sellTicket"? "sellTabSelected" : "sellTab"}>{t('sellTickets')}</Link>
                    
                </div>

            </nav>

            {showOptions && (
                <div>
                    <div className="clearOverlay" onClick={showNone}></div>
                    <div className="popupOptions">
                        <div className="displayVertically">
                            <Link to="/SavedEvents" className="option">
                                <div className="displayHorizontally">
                                    <img className="optionsIcon" src={Saved} alt="" />
                                    <p className="optionsName">{t('savedEvents')}</p>
                                </div>
                            </Link>

                            <Link to="/FollowedEvents" className="option">
                                <div className="displayHorizontally">
                                    <img className="optionsIcon" src={Alert} alt="" />
                                    <p className="optionsName">{t('followedEvents')}</p>
                                </div>
                            </Link>

                            <Link to="/Profile" className="option" onClick={goToProfile}>
                                <div className="displayHorizontally">
                                    <img className="optionsIcon" src={Account} alt="" />
                                    <p className="optionsName">{t('account')}</p>
                                </div>
                            </Link>

                            <Link to="/Notifications" className="option">
                                <div className="displayHorizontally">
                                    <img className="optionsIcon" src={Notification} alt="" />
                                    <p className="optionsName">{t('notificationsH1')}</p>
                                </div>
                            </Link>

                            <Link to="/Suggestion" className="option">
                                <div className="displayHorizontally">
                                    <img className="optionsIcon" src={Suggest} alt="" />
                                    <p className="optionsName">{t('suggestEvent')}</p>
                                </div>
                            </Link>

                            <Link to="/" className="option" onClick={removeUser}>
                                <div className="displayHorizontally">
                                    <img className="optionsIcon" src={Logout} alt="" />
                                    <p className="optionsName">{t('logout')}</p>
                                </div>
                            </Link>

                        </div>
                    </div>
                </div>
            )}


        </div>

    )
}