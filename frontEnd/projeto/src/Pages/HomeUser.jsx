import Calendar from "../Components/Home/Calendar"
import NavBarUser from "../Components/NavBar/NavBarUser"

import Wallpaper from "../Images/wallpaper.png"
import Magnifier from "../Images/magnifier.png"

import { useState } from "react"


export default function Home(props){

    const {user,setUser} = props

    return(
        <div>

            <NavBarUser 
                selected="home"
                user={user} 
                setUser={setUser}
            />

            <div className="container">
                <img className="wallpaper" src={Wallpaper} alt="" />

                <div className="input-wrapper">
                    <img className="magnifier" src={Magnifier} alt="" />
                    <input className="inputHome" type="text" placeholder="Where do you want to go?"/>              
                </div>
            </div>

            <Calendar />

        </div>
    )

}