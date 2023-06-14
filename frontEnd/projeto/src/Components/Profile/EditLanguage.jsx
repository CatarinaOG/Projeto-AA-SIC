
import BlackClose from "../../Images/blackClose.png"

export default function EditLanguage(props){

    const {user,setUser,setEditInfo} = props

    function closeEdit(){
        setEditInfo("none")
    }

    function handleOptionChange(event){
        event.preventDefault();    // talvez depois retirar para meter como pedido para a back end
        setUser(oldUser => ({...oldUser,language:event.target.value}))
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