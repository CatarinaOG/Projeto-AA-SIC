
import { useState } from "react"
import BlackClose from "../../Images/blackClose.png"

export default function AddBankDetails(props){

    const {setUser,setEditInfo} = props

    const [temp,setTemp] = useState("")
    const [emptyURLError,setEmptyURLError] = useState(false)
    const [error, setError] = useState("Insert an bank account number before confirming")

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

            if(temp.length !== 10){
                setEmptyURLError(old => !old);
                setError("Insert a valid bank account number")
            }
            else{
                setUser(oldUser => ({...oldUser,bank_details:temp}))
                setEditInfo("none")
            }
        }
        else{
            setEmptyURLError(old => !old);
            setError("Insert an bank account number before confirming")
        }
    }

    return(
        <div>
            <div className="editContainter">
                <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                <h3 className="editTitle">Add Bank Details</h3>
                <form action="/submit" onSubmit={changeEmail}>
                    <div className="center">
                        <div className="bankInputContainer">
                            <input className="editInputCard" onChange={saveIntTemp} onFocus={setErrorToFalse} placeholder="Bank account number" type="text"/>
                            <input className="editInputCVC" onChange={saveIntTemp} onFocus={setErrorToFalse} placeholder="CVC" type="text"/>
                        </div>
                    </div>
                    <p className={emptyURLError? "urlError" : "urlErrorNotVisible"}>{error}</p>
                    <button className="button" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )
}