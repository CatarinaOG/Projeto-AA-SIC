
import { useState } from "react"
import BlackClose from "../../Images/blackClose.png"

export default function EditPassword(props){

    const {setUser,setEditInfo} = props

    const [temp,setTemp] = useState("")
    const [temp2,setTemp2] = useState("")
    const [emptyURLError,setEmptyURLError] = useState(false)
    const [error,setError] = useState("Insert both password before confirming")

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

    function changePassword(event){
        event.preventDefault();    // talvez depois retirar para meter como pedido para a back end
        
        if(temp !== "" && temp2 !== ""){

            if(temp !== temp2){
                setEmptyURLError(old => !old);
                setError("Passwords don't match")
            }
            else{
                setUser(oldUser => ({...oldUser,password:temp}))
                setEditInfo("none")
            }
        }
        else{
            setEmptyURLError(old => !old);
            setError("Insert both password before confirming")
        }
    }

    return(
        <div>
            <div className="editContainterPassword">
                <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                <h3 className="editTitle">Change Password</h3>
                <form action="/submit" onSubmit={changePassword}>
                    <input className="editInput" onChange={saveTemp} onFocus={setErrorToFalse} placeholder="Insert your new password" type="password"/>
                    <input className="editInputSecondPassword" onChange={saveTemp2} onFocus={setErrorToFalse} placeholder="Repeat your password" type="password"/>
                    <p className={emptyURLError? "urlError" : "urlErrorNotVisible"}>{error}</p>
                    <button className="button" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )


}