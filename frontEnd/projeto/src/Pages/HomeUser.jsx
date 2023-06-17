import { useNavigate } from 'react-router-dom';

import Calendar from "../Components/Home/Calendar"
import NavBarUser from "../Components/NavBar/NavBarUser"
import Wallpaper from "../Images/wallpaper.png"
import Magnifier from "../Images/magnifier.png"


export default function HomeUser(props){

    const {setEventId} = props

    const navigate = useNavigate();


    function handleFormSubmit(){
        navigate("/Browse")
    }

    return(
        <div>

            <NavBarUser selected="home"/>

            <div className="container">
                <img className="wallpaper" src={Wallpaper} alt="" />

                <div className="input-wrapper">
                    <img className="magnifier" src={Magnifier} alt="" />
                    <form onSubmit={handleFormSubmit}>
                        <input className="inputHome" type="text" placeholder="Where do you want to go?"/>              
                    </form>
                </div>
            </div>

            <Calendar setEventId={setEventId}/>

        </div>
    )

}