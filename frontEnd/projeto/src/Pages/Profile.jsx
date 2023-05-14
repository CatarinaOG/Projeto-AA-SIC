import { useState } from "react"

import NavBarUser from "../Components/NavBar/NavBarUser"
import EditInfo from "../Components/Profile/EditInfo"

import "../Styles/Profile.css"

export default function Profile(){

    const [editInfo,setEditInfo] = useState("picture") // picture / 

    const [user,setUser] = useState({
        name: "Catarina Gonçalves",
        profilePic: "https://cdn-icons-png.flaticon.com/128/4140/4140047.png",
        email: "catarina.oliveira.41@hotmail.com",
    })

    function editProfilePic(){
        setEditInfo("picture")
    }

    return(

        <div>
            <NavBarUser />

            <div className="centerAll">
                <div className="defaultContainer">
                    <div className="relative">
                        <img className="profilePic" src={user.profilePic} alt="" />
                        <button className="editProfilePicButton" onClick={editProfilePic}></button>
                    </div>
                    <h2>{user.name}</h2>
                </div>
            </div>

            { editInfo !== "none" && 
                <div>
                    <div className="overlay"></div>
                    <EditInfo setUser={setUser} setEditInfo={setEditInfo}/>
                </div>
            }

        </div>

    )
}