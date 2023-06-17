import { useState, useEffect } from "react";
import "../../Styles/Profile.css";

export default function PopUpAddArtist(props) {
  const [artistName, setArtistName] = useState("");
  const [message, setMessage] = useState("aaaaa");

  const [artistOptions, setArtistOptions] = useState([
    {
      artist_name: "Papa Roach",
      artist_code: 12,
    },
    {
      artist_name: "Architects",
      artist_code: 13,
    },
    {
      artist_name: "Parkway Drive",
      artist_code: 13,
    },
  ]);

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

  return props.trigger ? (
    <div>
      <div className="editContainter">
        <h2 className="editTitle">Select an Artist Name</h2>
        <form>
          <div>
            <select
              className="inputSelectArtist"
              value={artistName}
              onChange={handleArtistChange}
            >
              <option value=""></option>
              {artistOptions.map((option, index) => (
                <option key={index} value={option.artists_code}>
                  {option.artist_name}
                </option>
              ))}
            </select>
            <h3
              className="redH3"
              onClick={() => props.setPopUpTriggerCreate(true)}
            >
              Create New
            </h3>
          </div>
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
