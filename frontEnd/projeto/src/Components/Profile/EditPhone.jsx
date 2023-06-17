import { useState,useContext } from "react"
import UserContext from "../../Contexts/UserContext"
import BlackClose from "../../Images/blackClose.png"

export default function EditPhone(props){

    const {setEditInfo} = props
    const { user } = useContext(UserContext);

    const [temp,setTemp] = useState("")
    const [emptyURLError,setEmptyURLError] = useState(false)
    const [error,setError] = useState("Insert a phone number before confirming")

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
            console.log(response) 
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
                setError("Insert a phone number with 9 digits")
            }
            else{
                sendEditInfoRequest()
                setEditInfo("none")
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
                <h3 className="editTitle">Change Phone Number</h3>
                <form action="/submit" onSubmit={changePhone}>
                    <input className="editInputNumber" onChange={saveTemp} onFocus={setErrorToFalse} placeholder="Insert your new phone number" type="number"/>
                    <p className={emptyURLError? "urlError" : "urlErrorNotVisible"}>{error}</p>
                    <button className="button" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )


}