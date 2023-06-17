
import { useState } from "react"
import BlackClose from "../../Images/blackClose.png"

export default function AddPhone(props){

    const {setUser,setAddInfo} = props

    const [temp,setTemp] = useState("")
    const [emptyURLError,setEmptyURLError] = useState(false)
    const [error,setError] = useState("Insert a phone number before confirming")

    function saveIntTemp(event){
        setTemp(event.target.value)
    }

    function setErrorToFalse(){
        setEmptyURLError(false)
    }

    function closeEdit(){
        setAddInfo("none")
    }

    function changePhone(event){
        event.preventDefault();    // talvez depois retirar para meter como pedido para a back end
        if(temp !== ""){

            console.log(temp)

            if(temp.length !== 9){
                setEmptyURLError(old => !old);
                setError("Insert a phone number with 9 digits")
            }
            else{
                setUser(oldUser => ({...oldUser,phone:temp}))
                setAddInfo("none")
            }
        }
        else{
            setEmptyURLError(old => !old);
            setError("Insert a phone number before confirming")
        }
    }

    return(
        <div>
            <div className="editContainter">
                <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                <h3 className="editTitle">Add Phone Number</h3>
                <form action="/submit" onSubmit={changePhone}>
                    <input className="editInputNumber" onChange={saveIntTemp} onFocus={setErrorToFalse} placeholder="Insert your new phone number" type="number"/>
                    <p className={emptyURLError? "urlError" : "urlErrorNotVisible"}>{error}</p>
                    <button className="button" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )


}