
import { useState } from "react"
import BlackClose from "../../Images/blackClose.png"

export default function EditBankDetails(props){

    const {setUser,setEditInfo} = props

    const [temp,setTemp] = useState("")
    const [temp2,setTemp2] = useState("")
    const [emptyURLError,setEmptyURLError] = useState(false)
    const [error, setError] = useState("Insert an bank account number before confirming")

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

    function changeBankDetails(event){
        event.preventDefault();    // talvez depois retirar para meter como pedido para a back end
        if(temp !== "" && temp2 !== ""){

            if(temp.length !== 10 || temp2.length !== 3){
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
                <h3 className="editTitle">Change Bank Details</h3>
                <form action="/submit" onSubmit={changeBankDetails}>
                    <div className="center">
                        <div className="bankInputContainer">
                            <input className="editInputCard" onChange={saveTemp} onFocus={setErrorToFalse} placeholder="Bank account number" type="text"/>
                            <input className="editInputCVC" onChange={saveTemp2} onFocus={setErrorToFalse} placeholder="CVC" type="text"/>
                        </div>
                    </div>
                    <button className="button" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )
}