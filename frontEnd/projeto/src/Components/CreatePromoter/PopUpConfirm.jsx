import { useState, useContext} from "react";
import UserContext from "../../Contexts/UserContext";
import "../../Styles/Profile.css";


export default function PopUpConfirm({trigger,setPopUpTrigger,email,password,name,setMessage}) {
  const [phase, setPhase] = useState(1);
  const {user} = useContext(UserContext);

  console.log(email);
  console.log(password);
  console.log(name)


  function handleClick() {
    console.log(email, name, password);
    postPromoter();
  }

  function toHome() {
    setPopUpTrigger(false);
    setPhase(1);
  }

  const inputs = {
    name : name,
    email : email, 
    password : password
  }

	function postPromoter(){
		fetch("http://localhost:8080/api/admin/create_promoter", {
			method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
			body: JSON.stringify(inputs)
		})
    .then(response => response.json())
    .then(responseJSON => {
        //setSuggestedEvents(responseJSON)
        console.log(responseJSON)
    })
		.catch(error => {
			setMessage(error)
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
