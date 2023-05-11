
import Logo from "../Images/logo.png"
import Info from "../Images/info.png"

import "../Styles/NavBar.css"

export default function NavBar(){

    return(

        <nav className="navBar">
            
            <a href=""><img src={Logo} className="logoImage" alt="" /></a>

            <div className="navBarRighSide">

                <a href="/Home" className="infoTab"><img src={Info} alt="" /></a>
                <a href="" className="loginTab">Login</a>
                <a href="" className="sellTab">Sell Tickets!</a>
                
            </div>

        </nav>

    )
}