
import { useState,useContext } from "react"
import UserContext from "../../Contexts/UserContext"
import BlackClose from "../../Images/blackClose.png"
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';


export default function AddBankDetails(props){

    const {setAddInfo} = props
    const { user,setUser } = useContext(UserContext);
    const {t} = useTranslation();


    const [temp,setTemp] = useState("")
    const [temp2,setTemp2] = useState("")
    const [emptyURLError,setEmptyURLError] = useState(false)
    const [error, setError] = useState(t('insertNumberBeforeConfirming'))

    function saveTemp(event){
        setTemp(event.target.value)
    }

    function saveTemp2(event){
        setTemp2(event.target.value)
    }

    function setErrorToFalse(){
        setEmptyURLError(false)
    }

    function closeAdd(){
        setAddInfo("none")
    }

    function sendEditInfoRequest(){

        fetch(`${GLOBAL_VARIABLE}/user/profile_edit`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                card_number: temp,
                card_cvc: temp2,
            })
        })
        .then(response => {
            setUser((oldUser) => ({...oldUser,card_number: temp,card_cvc: temp2}))
        })
        .catch(error => {
            console.log(error)
        });

    }

    function changeEmail(event){
        event.preventDefault();    // talvez depois retirar para meter como pedido para a back end
        if(temp !== "" && temp2 !== ""){

            if(temp.length !== 10 || temp2.length !== 3){
                setEmptyURLError(old => !old);
                setError(t('insertAValidBankNumber'))
            }
            else{
                sendEditInfoRequest()
                setAddInfo("none")
            }
        }
        else{
            setEmptyURLError(old => !old);
            setError(t('insertNumberBeforeConfirming'))
        }
    }

    return(
        <div>
            <div className="editContainter">
                <img src={BlackClose} className="editClose" alt="" onClick={closeAdd} />
                <h3 className="editTitle">{t('addBankDetails')}</h3>
                <form action="/submit" onSubmit={changeEmail}>
                    <div className="center">
                        <div className="bankInputContainer">
                            <input className="editInputCard" onChange={saveTemp} onFocus={setErrorToFalse} placeholder="Bank account number" type="text"/>
                            <input className="editInputCVC" onChange={saveTemp2} onFocus={setErrorToFalse} placeholder="CVC" type="text"/>
                        </div>
                    </div>
                    <p className={emptyURLError? "urlError" : "urlErrorNotVisible"}>{error}</p>
                    <button className="button" type="submit">{t('submit')}</button>
                </form>
            </div>
        </div>
    )
}