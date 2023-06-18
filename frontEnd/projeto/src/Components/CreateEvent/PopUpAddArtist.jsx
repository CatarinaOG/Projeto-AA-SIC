import { useState, useEffect ,useContext} from "react";
import Select from "react-select";
import UserContext from "../../Contexts/UserContext";
import "../../Styles/Profile.css";

export default function PopUpAddArtist(props) {
  const [artist, setArtist] = useState(null);
  const [message, setMessage] = useState("");
  const {user} = useContext(UserContext);


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

	function getArtists(){
		fetch("http://localhost:8080/api/promoter/get_artists", {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${user.token}`
		}
		})
    .then(response => {
      if (response.ok)
        return response.json(); // Parse the response JSON
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      const sortedOptions = data.sort((a, b) =>
      a.artist_name.localeCompare(b.artist_name)
    );
    setArtistOptions(sortedOptions);
      })
		.catch(error => {
			console.log(error)
		});
	}

  useEffect(() => {
    if (props.trigger) {
      getArtists();

    }
  }, [props.trigger]);

  const handleArtistChange = (selectedOption) => {
    if (selectedOption) {
      const selectedArtist = artistOptions.find(
        (artist) => artist.artist_name === selectedOption.artist_name
      );
      if (selectedArtist) {
        console.log(selectedArtist.artist_name);
        setArtist(selectedArtist);
      }
    }
  };

  const submitType = () => {
    if (artist === "") {
      setMessage("Please select a option");
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
          <Select
              className="inputSelectArtist"
              value={artist}
              onChange={handleArtistChange}
              options={artistOptions}
              getOptionLabel={(option) => option.artist_name}
              getOptionValue={(option) => option}
              placeholder=""
              isSearchable={true}
            />
            <h3
              className="redH3"
              onClick={() => {props.setPopUpTriggerCreate(true); props.setPopUpTrigger(false)}}
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
