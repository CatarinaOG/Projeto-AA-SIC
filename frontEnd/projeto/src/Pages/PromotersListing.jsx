
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import NavBarAdmin from "../Components/NavBar/NavBarAdmin"
import Promoter from "../Components/PromotersListing/Promoter"

import add from "../Images/plus.png"

import "../Styles/PromotersListing.css"

export default function PromotersListing(){

    const navigate = useNavigate();

    const [promoters,setPromoters] = useState([
        {
            name: "Maria Conceição",
            email: "maria@maria",
            password: "maria",
        },
        {
            name: "Maria Conceição",
            email: "maria@maria",
            password: "maria",
        },
        {
            name: "Maria Conceição",
            email: "maria@maria",
            password: "maria",
        },
    ])

    function addPromoter(){
        navigate('/CreatePromoter')
    }


    const showPromoters = promoters.map((promoter) => 
        <Promoter promoter={promoter} />
    )

    return(
        <div>

            <NavBarAdmin selected="promoters"/>

            <div className="center">
                <div className="defaultContainer">

                    <div className="titlePromoters">
                        <h1>Promoters</h1>
                        <div className="displayHorizontally">
                            <img className="addPromoterImg" src={add} alt="" />
                            <p className="addPromoter" onClick={addPromoter}>Add Promoter</p>
                        </div>
                    </div>
                    {showPromoters}

                </div>
            </div>
        </div>
    )
}