import { useNavigate } from 'react-router-dom';

import NavBar from "../Components/NavBar/NavBar"
import Calendar from "../Components/Home/Calendar"

import Wallpaper from "../Images/wallpaper.png"
import Magnifier from "../Images/magnifier.png"

import "../Styles/Home.css"
import { useState } from 'react';


export default function Home(props){

    const {setUser,setEventId,setSearchText} = props

    const [tmp,setTmp] = useState("") 
    const navigate = useNavigate();


    function handleFormSubmit(){
        setSearchText(tmp)
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
                            <input className="inputHome" type="text" placeholder="Where do you want to go?" onChange={(event) => setTmp(event.target.value)}/>              
                        </form>
                    </div>
                </div>

            <Calendar setEventId={setEventId}/>
        </div>
    )

}