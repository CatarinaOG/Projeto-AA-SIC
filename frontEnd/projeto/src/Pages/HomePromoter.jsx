import Calendar from "../Components/Home/Calendar"
import NavBarPromoter from "../Components/NavBar/NavBarPromoter"

import Wallpaper from "../Images/wallpaper.png"
import Magnifier from "../Images/magnifier.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function HomePromoter(props){

    const {setEventId,setSearchText} = props
    const [tmp,setTmp] = useState("") 

    const navigate = useNavigate()


    function handleEnter(event){
        if (event.key === 'Enter') {
            setSearchText(tmp)
            navigate("/Browse")
        }
    }


    return(
        <div>

            <NavBarPromoter selected="home" />

            <div className="container">
                <img className="wallpaper" src={Wallpaper} alt="" />

                <div className="input-wrapper">
                        <img className="magnifier" src={Magnifier} alt="" />
                            <input 
                                className="inputHome" 
                                type="text" 
                                placeholder="Where do you want to go?" 
                                onChange={(event) => setTmp(event.target.value)} 
                                onKeyDown={handleEnter}
                            />              
                    </div>
            </div>

            <Calendar setEventId={setEventId}/>

        </div>
    )

}