
import { useState,useContext } from "react"
import UserContext from "../../Contexts/UserContext"
import BlackClose from "../../Images/blackClose.png"


export default function AddBankDetails(props){

    const {setAddInfo} = props
    const { user,setUser } = useContext(UserContext);


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

    function closeAdd(){
        setAddInfo("none")
    }

    function sendEditInfoRequest(){

        fetch("http://localhost:8080/api/user/profile_edit", {
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
                setError("Insert a valid bank account number and CVC")
            }
            else{
                sendEditInfoRequest()
                setAddInfo("none")
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
                <img src={BlackClose} className="editClose" alt="" onClick={closeAdd} />
                <h3 className="editTitle">Add Bank Details</h3>
                <form action="/submit" onSubmit={changeEmail}>
                    <div className="center">
                        <div className="bankInputContainer">
                            <input className="editInputCard" onChange={saveTemp} onFocus={setErrorToFalse} placeholder="Bank account number" type="text"/>
                            <input className="editInputCVC" onChange={saveTemp2} onFocus={setErrorToFalse} placeholder="CVC" type="text"/>
                        </div>
                    </div>
                    <p className={emptyURLError? "urlError" : "urlErrorNotVisible"}>{error}</p>
                    <button className="button" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )
}