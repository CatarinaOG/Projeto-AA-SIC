
import { useState,useContext,useRef } from "react"
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage"
import storage from "../../firebaseConfig"
import UserContext from "../../Contexts/UserContext"
import BlackClose from "../../Images/blackClose.png"
import fileImage from "../../Images/doc.png"


export default function AddPictureEvent(props){

    const {setPopUpAddPhoto,setImage} = props
    const {user,setUser} = useContext(UserContext);

    const [fileSaved,setFileSaved] = useState(false)
    const [temp,setTemp] = useState("")

    function saveTemp(event){
        setTemp(event.target.files[0])
        setFileSaved(true)
    }

    function closeEdit(){
        setPopUpAddPhoto(false)
    }

    function handleFile(){
    
        const storageRef = ref(storage, `/${temp.name}`)
        const uploadTask = uploadBytesResumable(storageRef, temp);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setImage(url)
                    setPopUpAddPhoto(false)
                });
            }
        );

    }


    function choosePicture(event){
        event.preventDefault();
        handleFile()
    }


    return(
        <div className="overlay">
            <div className="editContainter">
                <img src={BlackClose} className="editClose" alt="" onClick={closeEdit} />
                <h3 className="editTitle">Change profile Picture</h3>
                <form action="/submit" onSubmit={choosePicture}>
                    { !fileSaved && 
                        <div>
                            <div className="file-input-container">
                                <label className="file-input-label" htmlFor="my-file-input">Choose a file</label>
                                <input className="file-input" onChange={saveTemp} type="file" id="my-file-input" />
                            </div>
                        </div>
                    }
                    { fileSaved &&
                        <div>
                            <div className="center">
                                <img className="picSaved" src={fileImage} alt="" />
                            </div>
                        </div>
                    }
                    <button className="button" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )


}