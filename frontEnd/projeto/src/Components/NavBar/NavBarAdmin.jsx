import { useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "../../Contexts/UserContext"

import Logo from "../../Images/logo.png"
import Logout from "../../Images/logout.png"

import "../../Styles/NavBar.css"

export default function NavBarAdmin(props){

    const {selected} = props
    const {setUser} = useContext(UserContext);

    function logout(){
        setUser({})
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