import { useState, useEffect } from "react";
import "../../Styles/Profile.css";

export default function PopUpAddCategory(props) {
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("aaaaa");

  useEffect(() => {
    if (props.trigger) {
      setCategoryName("");
      setMessage("");
    }
  }, [props.trigger]);

  const handleArtistChange = (event) => {
    setCategoryName(event.target.value);
  };

  const submitType = () => {
    if (categoryName === "") {
      setMessage("Invalid artist name");
    } else {
      props.setPopUpTrigger(false);
    }
  };

  function postCategory(){
    fetch("http://localhost:8080/api/promoter/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name : {categoryName}})
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
  ) : (
    ""
  );
}
