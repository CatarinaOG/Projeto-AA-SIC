import { useState, useEffect ,useContext} from "react";
import Select from "react-select";
import UserContext from "../../Contexts/UserContext";
import "../../Styles/Profile.css";
import BlackClose from "../../Images/blackClose.png"
import { useTranslation } from "react-i18next";

export default function PopUpAddArtist(props) {

  const {trigger,setPopUpTrigger,setPopUpTriggerCreate,onAddArtist,artists} = props
	const {t} = useTranslation();

  const [artist, setArtist] = useState("");
  const [message, setMessage] = useState("");
  const {user} = useContext(UserContext);


  const [artistOptions, setArtistOptions] = useState([]);

	function getArtists(){
		fetch(`${GLOBAL_VARIABLE}/promoter/get_artists`, {
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
    setArtistOptions(data);
      
      })
		.catch(error => {
			console.log(error)
		});
	}

  useEffect(() => {
    if (trigger) {
      getArtists();
    }
  }, [trigger]);



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

  const submitArtist = () => {
    if (artist === "") {
      setMessage(t('addArtistMessage'));
    }
    const foundObject = artists.find(obj => obj.artist_name === artist.artist_name); 
    console.log(foundObject)
    if (foundObject){
      setMessage(t('addArtistMessage2'));
    }
    else {
      console.log(artist.artist_name);
      onAddArtist(artist);
      setPopUpTrigger(false);
    }
  };



    return trigger ? (
      <div className="overlay">
      <div className="editContainter">
          <img src={BlackClose} className="editClose" alt="" onClick={() => setPopUpTrigger(false)} />
          <h3 className="editTitle">{t('addArtistTitle')}</h3>
          <form>
          <Select
                className="inputSelectArtist"
                value={artist}
                onChange={handleArtistChange}
                options={artistOptions}
                getOptionLabel={(option) => option.artist_name}
                getOptionValue={(option) => option}
                placeholder=""
                isSearchable={true}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    borderRadius: '10px',
                    fontSize: '15px',
                    margin: "10px",
                  }),
                }}
              />
              <h4
                className="promptAddArtist"
                onClick={() => {setPopUpTriggerCreate(true); setPopUpTrigger(false)}}
              >
                {t('addArtistNotListed')}
              </h4>
              <h3 className="redH3">{message}</h3>
          </form>
          <button className="button" onClick={() => submitArtist()}>{t('submit')}</button>
      </div>
  </div>
  ) : ("")
}
