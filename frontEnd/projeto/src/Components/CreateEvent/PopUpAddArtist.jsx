import { useState, useEffect } from "react";
import "../../Styles/Profile.css";

export default function PopUpAddArtist(props) {
  const [artistName, setArtistName] = useState("");

  useEffect(() => {
    if (props.trigger) {
      setArtistName("");
    }
  }, [props.trigger]);

  const handleArtistChange = (event) => {
    setArtistName(event.target.value);
  };

  const submitType = () => {
    props.onAddArtist(artistName);
  };
  return props.trigger ? (
    <div>
      <div className="editContainter">
        <h3 className="editTitle">Add Artist Name</h3>
        <form>
          <input
            className="inputPopUpAddType"
            type="text"
            placeholder="Artist"
            value={artistName}
            onChange={handleArtistChange}
          ></input>
        </form>
        <div className="popUpSellingListButton">
          <button
            className="button"
            onClick={() => {
              submitType();
              props.setPopUpTrigger(false);
            }}
          >
            Yes
          </button>
          <button
            className="button"
            onClick={() => props.setPopUpTrigger2(false)}
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
