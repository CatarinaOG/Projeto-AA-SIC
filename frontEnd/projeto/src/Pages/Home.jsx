import { useNavigate } from 'react-router-dom';

import NavBar from "../Components/NavBar/NavBar"
import Calendar from "../Components/Home/Calendar"

import Wallpaper from "../Images/wallpaper.png"
import Magnifier from "../Images/magnifier.png"

import "../Styles/Home.css"


export default function Home(props){

    const {setUser} = props

    const navigate = useNavigate();


    function handleFormSubmit(){
        navigate("/Browse")
    }


    return(
        <div>
            <NavBar setUser={setUser}/>

                <div className="container">
                    <img className="wallpaper" src={Wallpaper} alt="" />

                    <div className="input-wrapper">
                        <img className="magnifier" src={Magnifier} alt="" />
                        <form onSubmit={handleFormSubmit}>
                            <input className="inputHome" type="text" placeholder="Where do you want to go?"/>              
                        </form>
                    </div>
                </div>

            <Calendar />
        </div>
    )

}