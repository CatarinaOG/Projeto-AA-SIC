import { useState,useContext } from "react";

import UserContext from "../../Contexts/UserContext"
import BlackClose from "../../Images/blackClose.png"
import close from "../../Images/close.png"
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';


export default function Promoter(props){

    const {promoter,reload} = props
    const {user} = useContext(UserContext);
    const {t} = useTranslation();


    const [showConfirmation,setShowConfirmation] = useState(false)

    function askConfirmation(){
        setShowConfirmation(true)
    }

    function closeConfirmation(){
        setShowConfirmation(false)
    }

    function sendDeletePromoterRequest(){

        fetch(`${GLOBAL_VARIABLE}/admin/remove_promoter`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                promoter_id: promoter.id
            })
        })
        .then(response => response.json())
        .then(userResponse => {
            setShowConfirmation(false)
            reload()

        })
        .catch(error => {
            console.log(error)
        });

    }

    function deletePromoter(){
        sendDeletePromoterRequest()
    }

    return(
        <div className="center">
            <div className="promoterContainer">
                <img className="closeImg" src={close} alt="" onClick={askConfirmation}/>
                <div className="promoterRightSide">
                    <div className="displayHorizontally">
                        <h3>Name:</h3>
                        <h3 className="promoterValues">{promoter.name}</h3>
                    </div>
                    <div className="displayHorizontally">
                        <h3>Email:</h3>
                        <h3 className="promoterValues">{promoter.email}</h3>
                    </div>
                    
                </div>

                { showConfirmation &&
                    <div>
                        <div className="overlay"></div>
                        <div className="popUpContainer">
                            <img src={BlackClose} className="editClose" alt="" onClick={closeConfirmation} />
                            <h3 className="popUpInfoWithButtons">{t('deletePromoterMessage')}</h3>
                            <div className="center">
                                <div className="promoterButtons">
                                    <button className="button" onClick={deletePromoter}>{t('yes')}</button>
                                    <button className="button" onClick={closeConfirmation}>{t('no')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}