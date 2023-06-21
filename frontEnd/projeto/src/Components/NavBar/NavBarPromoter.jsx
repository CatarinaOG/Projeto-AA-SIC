import { useContext } from "react"
import { Link } from "react-router-dom"
import { Cookies } from "react-cookie"
import UserContext from "../../Contexts/UserContext"

import Logo from "../../Images/logo.png"
import Out from "../../Images/logout.png"
import Info from "../../Images/info.png"

import "../../Styles/NavBar.css"

export default function NavBarPromoter(props){

    const {selected} = props
    const {setUser} = useContext(UserContext);
    const cookie = new Cookies()
    

    function logout(){
        setUser({})
        cookie.remove('token')
        cookie.remove('type')
    }

    return(

        <div>
            <nav className="navBar">
                
                <Link to="/HomePromoter"><img className="logoImage" src={Logo} alt="" /></Link>

                <div className="navBarRighSide">
                
                    <Link to="/InformationsUser" className="iconTab"><img src={Info} alt="" /></Link>
                    <Link to="/Suggestions" className={selected === "suggestions" ? "tabSelected" : "tab"}>Suggestions</Link>
                    <Link to="/Events" className={selected === "events" ? "tabSelected" : "tab"}>Events</Link>
                    <Link to="/" className="iconTab"><img src={Out} alt="" onClick={logout} /></Link>

                </div>

            </nav>
        </div>

    )
}