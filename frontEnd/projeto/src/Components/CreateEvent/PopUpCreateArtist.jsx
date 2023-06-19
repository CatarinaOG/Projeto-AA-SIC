import { useState, useEffect ,useContext} from "react";
import UserContext from "../../Contexts/UserContext";
import "../../Styles/Profile.css";
import BlackClose from "../../Images/blackClose.png"

export default function PopUpCreateArtist(props) {
  const [artistName, setArtistName] = useState("");
  const [message, setMessage] = useState("");
  const {user} = useContext(UserContext);


  const {trigger,setPopUpTrigger,setPopUpTriggerAdd,onAddArtist} = props
  
  useEffect(() => {
    if (trigger) {
      setArtistName("");
      setMessage("");
    }
  }, [trigger]);

  const handleArtistChange = (event) => {
    setArtistName(event.target.value);
  };

  const submitType = () => {
    if (artistName === "") {
      setMessage("Invalid artist name");
    } else {
      postArtist();

    }
  };


  const input = {
    name : artistName
  }


  function postArtist(){
    fetch("http://localhost:8080/api/promoter/create_artist", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(input)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .then(responseJSON => {
      console.log(responseJSON.confirmed);
      if (responseJSON.confirmed === "true"){
        setPopUpTrigger(false);
        setPopUpTriggerAdd(true);
      }
      else{
        setMessage("There is already an artist with that name")
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
  }


  return trigger ? (
    <div className="overlay">
        <div className="editContainter">
            <img src={BlackClose} className="editClose" alt="" onClick={() => setPopUpTrigger(false)} />
            <h3 className="editTitle">Add new Artist</h3>
            <form>
                <input className="editInputNumber" onChange={handleArtistChange}  placeholder="Insert artist name" type="text"/>
                <p className={message !== "" ? "urlError" : "urlErrorNotVisible"}>{message}</p>
            </form>
            <button className="button" onClick={postArtist}>Confirm</button>

        </div>
    </div>
  ):("")
}
