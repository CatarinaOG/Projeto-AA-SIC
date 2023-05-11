
import Logo from "../Images/logo.png"


export default function NavBar(){


    return(

        <nav>
            
            <a href="">
                <img src={Logo} alt="" />
            </a>

            <a href="" className="id">Info</a>
            <a href="">Login</a>
            <a href="">Sell Tickets!</a>

        </nav>

    )
}