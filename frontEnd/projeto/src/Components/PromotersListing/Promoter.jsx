import { useState } from "react"
import BlackClose from "../../Images/blackClose.png"
import close from "../../Images/close.png"


export default function Promoter(props){

    const {promoter} = props

    const [showConfirmation,setShowConfirmation] = useState(false)

    function askConfirmation(){
        setShowConfirmation(true)
    }

    function closeConfirmation(){
        setShowConfirmation(false)
    }

    function deletePromoter(){
        //fazer pedido
        setShowConfirmation(false)
    }

    return(
        <div className="promoterContainer">
            <img className="closeImg" src={close} alt="" onClick={askConfirmation}/>
            <div className="promoterLeftSide">
                <h2>{promoter.name}</h2>
            </div>
            <div className="promoterRightSide">
                <div className="displayHorizontally">
                    <h3>Email:</h3>
                    <h3 className="promoterValues">{promoter.email}</h3>
                </div>
                <div className="displayHorizontally">
                    <h3>Password:</h3>
                    <h3 className="promoterValues">{promoter.password}</h3>
                </div>
            </div>

            { showConfirmation &&
                <div>
                    <div className="overlay"></div>
                    <div className="popUpContainer">
                        <img src={BlackClose} className="editClose" alt="" onClick={closeConfirmation} />
                        <h3 className="popUpInfoWithButtons">Are you sure you want to delete this promoter?</h3>
                        <div className="center">
                            <div className="promoterButtons">
                                <button className="button" onClick={deletePromoter}>Yes</button>
                                <button className="button" onClick={closeConfirmation}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}