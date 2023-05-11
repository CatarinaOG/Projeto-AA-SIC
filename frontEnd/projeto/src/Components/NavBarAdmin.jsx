
import Logo from "../Images/logo.png"
import Logout from "../Images/logout.png"

import "../Styles/NavBar.css"

export default function NavBarAdmin(){

    return(

        <div>
            <nav className="navBar">
                
                <a href="/"><img className="logoImage" src={Logo} alt="" /></a>

                <div className="navBarRighSide">

                    <a href="" className="tab">Promoters</a>
                    <a href="" className="iconTab"><img src={Logout} alt="" /></a>
                    
                </div>

            </nav>
        </div>

    )
}