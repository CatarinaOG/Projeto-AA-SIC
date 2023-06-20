import { useState,useContext } from "react"
import UserContext from "../../Contexts/UserContext"
import BlackClose from "../../Images/blackClose.png"
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function AddPhone(props){

    const {setAddInfo} = props
    const { user, setUser } = useContext(UserContext);
    const {t} = useTranslation();

    const [temp,setTemp] = useState("")
    const [emptyURLError,setEmptyURLError] = useState(false)
    const [error,setError] = useState(t('insertPhoneBeforeConfirming'))

    function saveTemp(event){
        setTemp(event.target.value)
    }

    function setErrorToFalse(){
        setEmptyURLError(false)
    }

    function closeEdit(){
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
                phone: temp,
            })
        })
        .then(response => {
            setUser((oldUser) => ({...oldUser,phone: temp}))
        })
        .catch(error => {
            console.log(error)
        });

    }

    function addPhone(event){
        event.preventDefault();    // talvez depois retirar para meter como pedido para a back end
        if(temp !== ""){

            if(temp.length !== 9){
                setEmptyURLError(old => !old);
                setError(t('insertANumberWith9'))
            }
            else{
                sendEditInfoRequest()
                setAddInfo("none")
            }
        }
        else{
            setEmptyURLError(old => !old);
            setError(t('insertPhoneBeforeConfirming'))
        }
    }

    return(
        <div>
            <div className="editContainter">
                <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                <h3 className="editTitle">{t('addPhoneNumber')}</h3>
                <form action="/submit" onSubmit={addPhone}>
                    <input className="editInputNumber" onChange={saveTemp} onFocus={setErrorToFalse} placeholder="Insert your new phone number" type="number"/>
                    <p className={emptyURLError? "urlError" : "urlErrorNotVisible"}>{error}</p>
                    <button className="button" type="submit">{t('submit')}</button>
                </form>
            </div>
        </div>
    )


}