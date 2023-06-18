import { useState, useEffect ,useContext} from "react";
import UserContext from "../../Contexts/UserContext";
import "../../Styles/Profile.css";

export default function PopUpAddCategory(props) {
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("aaaaa");
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (props.trigger) {
      setCategoryName("");
      setMessage("");
    }
  }, [props.trigger]);

  const handleCategoryChange = (event) => {
    setCategoryName(event.target.value);
  };

  const submitType = () => {
    if (categoryName === "") {
      setMessage("Invalid artist name");
    } else {
      postCategory();
    }
  };

  const input = {
    name : categoryName
  }
  function postCategory(){
    fetch("http://localhost:8080/api/promoter/create_category", {
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
      if(responseJSON.confirmed){
        props.setPopUpTrigger(false)
      }
      else{
        setMessage("Category already exists!")
      }
    })
    .catch(error => {
      console.log('Error:', error);
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
            onChange={handleCategoryChange}
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
