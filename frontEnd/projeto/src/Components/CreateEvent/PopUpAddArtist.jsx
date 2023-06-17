import { useState, useEffect } from "react";
import "../../Styles/Profile.css";

export default function PopUpAddArtist(props) {
  const [artist, setArtist] = useState(null);
  const [message, setMessage] = useState("aaaaa");

  const [artistOptions, setArtistOptions] = useState([
    {
      artist_name: "Papa Roach",
      artist_code: 12,
    },
    {
      artist_name: "Architects",
      artist_code: 14,
    },
    {
      artist_name: "Parkway Drive",
      artist_code: 13,
    },
  ]);

  useEffect(() => {
    if (props.trigger) {
      setArtist();
      setMessage("");
    }
  }, [props.trigger]);

  const handleArtistChange = (event) => {
    const selectedArtist = artistOptions.find(
      (artist) => artist.artist_name === event.target.value
    );
    console.log(selectedArtist.artist_name);
    setArtist(selectedArtist);
  };

  //ALTERAR MENSAGEM DE ERRO
  const submitType = () => {
    if (artist === "") {
      setMessage("Invalid artist name");
    } else {
      console.log(artist.artist_name);
      props.onAddArtist(artist);
      props.setPopUpTrigger(false);
    }
  };

  return props.trigger ? (
    <div>
      <div className="editContainter">
        <h2 className="editTitle">Select an Artist Name</h2>
        <form>
          <div>
            <select className="inputSelectArtist" onChange={handleArtistChange}>
              <option value=""></option>
              {artistOptions.map((artist) => (
                <option key={artist.artist_code} value={artist.artist_name}>
                  {artist.artist_name}
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
