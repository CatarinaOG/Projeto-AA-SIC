
import { useState } from "react"
import BlackClose from "../../Images/blackClose.png"

export default function EditInfo(props){

    const {setUser,setEditInfo} = props

    const [temp,setTemp] = useState("")

    function saveIntTemp(event){
        setTemp(event.target.value)
    }

    function changePicture(){
        setUser(oldUser => ({...oldUser,profilePic:temp}))
        setEditInfo("none")
    }

    return(
        <div>
            <div className="editContainter">
                <img src={BlackClose} className="editClose" alt="" />
                <h3 className="editTitle">Change profile Picture</h3>
                <form action="" onSubmit={changePicture}>
                    <input className="editInputPicture" onChange={saveIntTemp} placeholder="Insert the url for your new profile picture" type="text" name="" id=""/>
                    <button className="button" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )


}