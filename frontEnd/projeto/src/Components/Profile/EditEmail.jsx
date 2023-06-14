
import { useState } from "react"
import BlackClose from "../../Images/blackClose.png"

export default function EditEmail(props){

    const {setUser,setEditInfo} = props

    const [temp,setTemp] = useState("")
    const [emptyURLError,setEmptyURLError] = useState(false)

    function saveIntTemp(event){
        setTemp(event.target.value)
    }

    function setErrorToFalse(){
        setEmptyURLError(false)
    }

    function closeEdit(){
        setEditInfo("none")
    }

    function changeEmail(event){
        event.preventDefault();    // talvez depois retirar para meter como pedido para a back end
        if(temp !== ""){
            setUser(oldUser => ({...oldUser,email:temp}))
            setEditInfo("none")
        }
        else{
            setEmptyURLError(old => !old);
        }
    }

    return(
        <div>
            <div className="editContainter">
                <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                <h3 className="editTitle">Change Email Address</h3>
                <form action="/submit" onSubmit={changeEmail}>
                    <input className="editInput" onChange={saveIntTemp} onFocus={setErrorToFalse} placeholder="Insert your new email" type="email"/>
                    <p className={emptyURLError? "urlError" : "urlErrorNotVisible"}>Insert an email before confirming</p>
                    <button className="button" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )


}