import "../../Styles/SellingListing.css";
import close from "../../Images/close.png";

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
