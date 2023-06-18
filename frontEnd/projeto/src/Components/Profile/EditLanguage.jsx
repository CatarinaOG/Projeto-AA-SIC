import { useState,useContext } from "react"
import UserContext from "../../Contexts/UserContext"
import BlackClose from "../../Images/blackClose.png"

export default function EditLanguage(props){

    const {setEditInfo} = props
    const { user,setUser } = useContext(UserContext);

    function closeEdit(){
        setEditInfo("none")
    }

    function sendEditInfoRequest(lng){

        fetch("http://localhost:8080/api/user/profile_edit", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                language: lng,
            })
        })
        .then(response => {
            setUser((oldUser) => ({...oldUser,language: lng}))

        })
        .catch(error => {
            console.log(error)
        });

    }


    function handleOptionChange(event){
        event.preventDefault();
        sendEditInfoRequest(event.target.value)
        setEditInfo("none")
    }

    return(
        <div>
            <div className="editContainter">
                <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                <h3 className="editTitle">Change Email Address</h3>
                <select className="editInputLanguage" value={user.language} onChange={handleOptionChange}>
                    <option value="English">English</option>
                    <option value="Português">Português</option>
                </select>
            </div>
        </div>
    )
}