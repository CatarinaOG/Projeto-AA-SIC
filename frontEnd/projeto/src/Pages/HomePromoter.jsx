import Calendar from "../Components/Home/Calendar"
import NavBarPromoter from "../Components/NavBar/NavBarPromoter"

import Wallpaper from "../Images/wallpaper.png"
import Magnifier from "../Images/magnifier.png"


export default function HomePromoter(){

    return(
        <div>

            <NavBarPromoter />

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