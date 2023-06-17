import { useState } from "react";
import "../../Styles/Profile.css";

export default function PopUpConfirm({trigger,setPopUpTrigger,email,password,name}) {
  const [phase, setPhase] = useState(1);


  function handleClick() {
    console.log(email, name, password);
    sendCreateRequest();
  }

  function toHome() {
    setPopUpTrigger(false);
    setPhase(1);
  }

  const inputs = {
    name : {name},
    email : {email}, 
    password : {password}
  }

  function sendCreateRequest(){

    fetch("http://localhost:8080/api/promoter/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    })
    .then(response => response.json())
    .then(message => {
      setPhase(2);
    })
    .catch(error => {
      
    });
}




  return trigger ? (
    <div className="editContainter">
      {phase === 1 ? (
        <div>
          <h3 className="editTitle">Confirm new Promoter?</h3>
          <div className="popUpSellingListButton">
            <button className="button" onClick={handleClick}>
              {" "}
              Yes
            </button>
          </div>
          <div className="popUpSellingListButton">
            <button
              className="button"
              onClick={() => setPopUpTrigger(false)}
            >
              {" "}
              No
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="editTitle">Promoter Confirmed</h3>
          <div className="popUpSellingListButton">
            <button className="button" onClick={toHome}>
              {" "}
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    ""
  );
}
