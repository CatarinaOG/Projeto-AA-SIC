import "../../Styles/SellingListing.css";
import close from "../../Images/close.png";
import { GLOBAL_VARIABLE } from '../../backendIP.js';

function TypeList(props) {
  const handleRemoveType = () => {
    props.onRemoveType(props.type);
  };
  return (
    <div className="typesListing">
      <div className="typesListing-elem-1">
        <h2>{props.type.ticket_type}</h2>
        <h4>
          {props.type.type_date_start} to {props.type.type_date_end}
        </h4>
      </div>
      <div className="typesListing-elem-2">
        <h2>{props.type.price}$</h2>
      </div>
      <div className="typesListing-elem-3">
        <img
          className="closeIcon"
          src={close}
          alt=""
          onClick={handleRemoveType}
        />
      </div>
    </div>
  );
}

export { TypeList }; // Export TypeList component
