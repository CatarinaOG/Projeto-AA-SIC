import Calendar from "../Components/Home/Calendar"
import NavBarAdmin from "../Components/NavBar/NavBarAdmin"

import Wallpaper from "../Images/wallpaper.png"
import Magnifier from "../Images/magnifier.png"


export default function Home(props){

    const {setEventId} = props

    return(
        <div>

            <NavBarAdmin selected="home"/>

            <div className="container">
                <img className="wallpaper" src={Wallpaper} alt="" />

                <div className="input-wrapper">
                    <img className="magnifier" src={Magnifier} alt="" />
                    <input className="inputHome" type="text" placeholder="Where do you want to go?"/>              
                </div>
            </div>

            <Calendar setEventId={setEventId}/>

        </div>
    )

}