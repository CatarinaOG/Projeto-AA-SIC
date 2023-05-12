
import Logo from "../../Images/logo.png"
import Logout from "../../Images/logout.png"

import "../../Styles/NavBar.css"

export default function NavBarPromoter(){

    return(

        <div>
            <nav className="navBar">
                
                <a href="/"><img className="logoImage" src={Logo} alt="" /></a>

                <div className="navBarRighSide">

                    <a href="" className="tab">Suggestions</a>
                    <a href="" className="tab">Events</a>
                    <a href="" className="iconTab"><img src={Logout} alt="" /></a>

                </div>

            </nav>
        </div>

    )
}