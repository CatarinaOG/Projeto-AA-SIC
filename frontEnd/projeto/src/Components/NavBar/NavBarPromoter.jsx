
import Logo from "../../Images/logo.png"
import Out from "../../Images/logout.png"

import "../../Styles/NavBar.css"

export default function NavBarPromoter(props){

    const {selected,setUser} = props

    function logout(){
        setUser({})
    }

    return(

        <div>
            <nav className="navBar">
                
                <a href="/"><img className="logoImage" src={Logo} alt="" /></a>

                <div className="navBarRighSide">

                    <a href="/Suggestions" className={selected === "suggestions" ? "tabSelected" : "tab"}>Suggestions</a>
                    <a href="/Events" className={selected === "events" ? "tabSelected" : "tab"}>Events</a>
                    <a href="/" className="iconTab"><img src={Out} alt="" onClick={logout} /></a>

                </div>

            </nav>
        </div>

    )
}