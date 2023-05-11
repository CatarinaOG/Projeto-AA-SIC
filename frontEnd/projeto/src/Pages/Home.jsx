import NavBar from "../Components/NavBar"
import Calendar from "../Components/Calendar"

import Wallpaper from "../Images/wallpaper.png"
import Magnifier from "../Images/magnifier.png"

import "../Styles/Home.css"


export default function Home(){

    return(
        <div>
            <NavBar />

                <div class="container">
                    <img className="wallpaper" src={Wallpaper} alt="" />

                    <div class="input-wrapper">
                        <img className="magnifier" src={Magnifier} alt="" />
                        <input className="inputHome" type="text" placeholder="Where do you want to go?"/>
                        
                        
                        
                    </div>
                </div>

            <Calendar />
        </div>
    )

}