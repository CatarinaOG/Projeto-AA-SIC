
import { useState } from "react"
import BlackClose from "../../Images/blackClose.png"

export default function EditPic(props){

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

    function changePicture(event){
        event.preventDefault();    // talvez depois retirar para meter como pedido para a back end
        if(temp !== ""){
            setUser(oldUser => ({...oldUser,profilePic:temp}))
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
                <h3 className="editTitle">Change profile Picture</h3>
                <form action="/submit" onSubmit={changePicture}>
                    <input className="editInput" onChange={saveIntTemp} onFocus={setErrorToFalse} placeholder="Insert the url for your new profile picture" type="text"/>
                    <p className={emptyURLError? "urlError" : "urlErrorNotVisible"}>Insert an URL before confirming</p>
                    <button className="button" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )


}