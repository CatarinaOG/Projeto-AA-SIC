
import Logo from "../../Images/logo.png"
import Logout from "../../Images/logout.png"

import "../../Styles/NavBar.css"

export default function NavBarAdmin(props){

    const {selected,setUser} = props

    function logout(){
        setUser({})
    }

    return(

        <div>
            <nav className="navBar">
                
                <a href="/"><img className="logoImage" src={Logo} alt="" /></a>

                <div className="navBarRighSide">

                    <a href="/Promoters" className={selected === "promoters" ? "tabSelected" : "tab"}>Promoters</a>
                    <a href="/" className="iconTab" onClick={logout}><img src={Logout} alt="" /></a>
                    
                </div>

            </nav>
        </div>

    )
}