
import { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "../Contexts/UserContext"
import NavBarAdmin from "../Components/NavBar/NavBarAdmin"
import Promoter from "../Components/PromotersListing/Promoter"

import add from "../Images/plus.png"

import "../Styles/PromotersListing.css"

export default function PromotersListing(){

    const navigate = useNavigate();
    const {user} = useContext(UserContext);


    const [promoters,setPromoters] = useState([
        {
            id: 1,
            name: "Maria Conceição",
            email: "maria@maria",
            password: "maria",
        },
        {
            id: 2,
            name: "Maria Conceição",
            email: "maria@maria",
            password: "maria",
        },
        {
            id: 3,
            name: "Maria Conceição",
            email: "maria@maria",
            password: "maria",
        },
    ])

    function sendGetPromotersRequest(){

        fetch("http://localhost:8080/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
            //setSuggestedEvents(responseJSON)
            console.log(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });
    }

    function addPromoter(){
        navigate('/CreatePromoter')
    }


    const showPromoters = promoters.map((promoter) => 
        <Promoter key={promoter.id} promoter={promoter} />
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