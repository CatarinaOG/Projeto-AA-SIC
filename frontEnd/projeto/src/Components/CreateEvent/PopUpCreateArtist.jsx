import { useState, useEffect ,useContext} from "react";
import UserContext from "../../Contexts/UserContext";
import "../../Styles/Profile.css";

export default function PopUpCreateArtist(props) {
  const [artistName, setArtistName] = useState("");
  const [message, setMessage] = useState("");
  const {user} = useContext(UserContext);


  
  useEffect(() => {
    if (props.trigger) {
      setArtistName("");
      setMessage("");
    }
  }, [props.trigger]);

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
      if (responseJSON.confirmed){
        props.setPopUpTrigger(false);
        props.setPopUpTriggerAdd(true);
      }
      else{
        setMessage("There is already an artist with that name")
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
  }




  return (
    <div>
      <div className="editContainter">
        <h2 className="editTitle">Add Artist Name</h2>
        <form>
          <input
            className="inputPopUpAddType"
            type="text"
            placeholder="Artist"
            value={artistName}
            onChange={handleArtistChange}
          ></input>
        </form>
        <h3 className="redH3">{message}</h3>
        <div className="popUpSellingListButton">
          <button
            className="button"
            onClick={() => {
              submitType();
            }}
          >
            Yes
          </button>
          <button
            className="button"
            onClick={() => props.setPopUpTrigger(false)}
          >
            {" "}
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
