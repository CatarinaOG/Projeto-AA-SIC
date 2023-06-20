import { useContext } from "react"
import { Link } from "react-router-dom"
import { Cookies } from "react-cookie"
import UserContext from "../../Contexts/UserContext"

import Logo from "../../Images/logo.png"
import Logout from "../../Images/logout.png"

import "../../Styles/NavBar.css"
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function NavBarAdmin(props){

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
                
                <Link to="/"><img className="logoImage" src={Logo} alt="" /></Link>

                <div className="navBarRighSide">

                    <Link to="/Promoters" className={selected === "promoters" ? "tabSelected" : "tab"}>Promoters</Link>
                    <Link to="/" className="iconTab" onClick={logout}><img src={Logout} alt="" /></Link>
                    
                </div>

            </nav>
        </div>

    )
}