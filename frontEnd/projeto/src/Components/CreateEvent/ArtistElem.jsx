import "../../Styles/SellingListing.css";
import close from "../../Images/close.png";
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function ArtistElem(props) {
  const handleRemoveArtist = () => {
    props.onRemoveArtist(props.artist);
  };

  return (
    <div className="typesListing">
      <div className="typesListing-elem-1">
        <h3>{props.artist}</h3>
      </div>
      <div className="typesListing-elem-3">
        <img className="closeIcon" src={close} alt="" onClick={handleRemoveArtist}/>
      </div>
    </div>
  );
}
