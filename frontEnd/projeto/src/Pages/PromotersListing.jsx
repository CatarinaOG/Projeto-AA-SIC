
import { useState,useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "../Contexts/UserContext"
import NavBarAdmin from "../Components/NavBar/NavBarAdmin"
import Promoter from "../Components/PromotersListing/Promoter"
import { useTranslation } from "react-i18next";

import add from "../Images/plus.png"

import "../Styles/PromotersListing.css"

export default function PromotersListing(){

    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const {t} = useTranslation();


    const [promoters,setPromoters] = useState([])

    function sendGetPromotersRequest(){

        fetch(`${GLOBAL_VARIABLE}/admin/get_promoters`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
        })
        .then(response => response.json())
        .then(responseJSON => {
            setPromoters(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });
    }

    useEffect(() => {
        if(promoters.length === 0)
            sendGetPromotersRequest()
    })

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
                            <p className="addPromoter" onClick={addPromoter}>{t('addPromoters')}</p>
                        </div>
                    </div>
                    {showPromoters}

                </div>
            </div>
        </div>
    )
}