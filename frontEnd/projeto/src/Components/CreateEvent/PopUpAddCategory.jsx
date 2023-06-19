import { useState, useEffect ,useContext} from "react";
import UserContext from "../../Contexts/UserContext";
import BlackClose from "../../Images/blackClose.png"

import "../../Styles/Profile.css";
import { useTranslation } from "react-i18next";

export default function PopUpAddCategory(props) {

  const {setPopUpTrigger} = props

  const [temp,setTemp] = useState("")

  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (props.trigger) {
      setCategoryName("");
      setMessage("");
    }
  }, [props.trigger]);

  function saveTemp(event){
    setTemp(event.target.value);
  };

  const submitType = () => {
    if (categoryName === "") {
      setMessage("Invalid artist name");
    } else {
      postCategory();
    }
  };


  function postCategory(){

    fetch("http://localhost:8080/api/promoter/create_category", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          name: temp
        })
    })
    .then(response => {
      if (response.ok) return response.json();
      else throw new Error('Error: ' + response.status);
    })
    .then(responseJSON => {
      if(responseJSON.confirmed) setPopUpTrigger(false)
      else setMessage("Category already exists!")
    })
    .catch(error => {
		console.log('Error:', error);
    });
  }


  return props.trigger ? (
    <div>
        <div className="editContainter">
            <img src={BlackClose} className="editClose" alt="" onClick={() => setPopUpTrigger(false)} />
            <h3 className="editTitle">Add Category</h3>
            <form>
                <input className="editInputNumber" onChange={saveTemp}  placeholder="Insert your new category" type="text"/>
                <p className={message !== "" ? "urlError" : "urlErrorNotVisible"}>{message}</p>
                <button className="button" type="submit" onClick={submitType}>Confirm</button>
            </form>
        </div>
    </div>
  ):("")


  return props.trigger ? (
    <div>
      <div className="editContainter">
        <h2 className="editTitle">Add Category</h2>
        <form>
          <input
            className="inputPopUpAddType"
            type="text"
            placeholder="Category Name"
            value={categoryName}
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
  ) : (
    ""
  );
}
