
import { useState,useContext } from "react"
import UserContext from "../../Contexts/UserContext"
import BlackClose from "../../Images/blackClose.png"

export default function EditPic(props){

    const {setEditInfo} = props
    const {user,setUser} = useContext(UserContext);


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

    function sendEditInfoRequest(){

        fetch("http://localhost:8080/api/user/profile_edit", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                picture: temp,
            })
        })
        .then(response => {
            if(response.ok)
                setUser(oldUser => ({...oldUser,profilePic:temp}))
        })
        .catch(error => {
            console.log(error)
        });

    }

    function changePicture(event){
        event.preventDefault();
        if(temp !== ""){
            sendEditInfoRequest()
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