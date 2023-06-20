import { useState,useContext } from "react"
import UserContext from "../../Contexts/UserContext"
import BlackClose from "../../Images/blackClose.png"
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function EditPassword(props){

    const {setEditInfo} = props
    const { user,setUser } = useContext(UserContext);
    const {t} = useTranslation();

    const [temp,setTemp] = useState("")
    const [temp2,setTemp2] = useState("")
    const [emptyURLError,setEmptyURLError] = useState(false)
    const [error,setError] = useState(t('insertBothPassBeforeConfirming'))

    function saveTemp(event){
        setTemp(event.target.value)
    }

    function saveTemp2(event){
        setTemp2(event.target.value)
    }

    function setErrorToFalse(){
        setEmptyURLError(false)
    }

    function closeEdit(){
        setEditInfo("none")
    }

    function sendEditInfoRequest(){

        fetch(`${GLOBAL_VARIABLE}/user/profile_edit`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                password: temp,
            })
        })
        .then(response => {
            setUser((oldUser) => ({...oldUser,password: temp}))

        })
        .catch(error => {
            console.log(error)
        });

    }


    function changePassword(event){
        event.preventDefault();    // talvez depois retirar para meter como pedido para a back end
        
        if(temp !== "" && temp2 !== ""){

            if(temp !== temp2){
                setEmptyURLError(old => !old);
                setError(t('passwordsDontMatch'))
            }
            else{
                sendEditInfoRequest()
                setEditInfo("none")
            }
        }
        else{
            setEmptyURLError(old => !old);
            setError(t('insertBothPassBeforeConfirming'))
        }
    }

    return(
        <div>
            <div className="editContainterPassword">
                <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                <h3 className="editTitle">{t('changePassword')}</h3>
                <form action="/submit" onSubmit={changePassword}>
                    <input className="editInput" onChange={saveTemp} onFocus={setErrorToFalse} placeholder="Insert your new password" type="password"/>
                    <input className="editInputSecondPassword" onChange={saveTemp2} onFocus={setErrorToFalse} placeholder="Repeat your password" type="password"/>
                    <p className={emptyURLError? "urlError" : "urlErrorNotVisible"}>{error}</p>
                    <button className="button" type="submit">{t('submit')}</button>
                </form>
            </div>
        </div>
    )


}