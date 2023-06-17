import { useState, useEffect } from "react";
import "../../Styles/Profile.css";

export default function PopUpCreateArtist(props) {
  const [artistName, setArtistName] = useState("");
  const [message, setMessage] = useState("aaaaa");

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
      props.onAddArtist(artistName);
      props.setPopUpTrigger(false);
    }
  };


  function postArtist(){
    fetch("http://localhost:8080/api/promoter/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name : {artistName}})
    })
    .then(response => {
        if(response.ok){
          props.setPopUpTrigger(false);
        }
    })
    .catch(error => {
        setMessage(error)
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
