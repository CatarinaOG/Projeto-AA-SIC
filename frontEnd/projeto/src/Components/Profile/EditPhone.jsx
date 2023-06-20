import { useState,useContext } from "react"
import UserContext from "../../Contexts/UserContext"
import BlackClose from "../../Images/blackClose.png"
import { useTranslation } from "react-i18next";

export default function EditPhone(props){

    const {setEditInfo} = props
    const { user,setUser } = useContext(UserContext);
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
        setEditInfo("none")
    }

    function sendEditInfoRequest(){

        fetch("http://localhost:8080/api/user/profile_edit", {
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

    function changePhone(event){
        event.preventDefault();    // talvez depois retirar para meter como pedido para a back end
        if(temp !== ""){

            console.log(temp)

            if(temp.length !== 9){
                setEmptyURLError(old => !old);
                setError(t('insertANumberWith9'))
            }
            else{
                sendEditInfoRequest()
                setEditInfo("none")
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
                <h3 className="editTitle">{t('changePhoneNumber')}</h3>
                <form action="/submit" onSubmit={changePhone}>
                    <input className="editInputNumber" onChange={saveTemp} onFocus={setErrorToFalse} placeholder="Insert your new phone number" type="number"/>
                    <p className={emptyURLError? "urlError" : "urlErrorNotVisible"}>{error}</p>
                    <button className="button" type="submit">{t('submit')}</button>
                </form>
            </div>
        </div>
    )


}