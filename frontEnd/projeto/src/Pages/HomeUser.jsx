import Calendar from "../Components/Home/Calendar"
import NavBarUser from "../Components/NavBar/NavBarUser"

import Wallpaper from "../Images/wallpaper.png"
import Magnifier from "../Images/magnifier.png"


export default function Home(){

    return(
        <div>

            <NavBarUser />

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