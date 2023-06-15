import "../../Styles/SellingListing.css";
import close from "../../Images/close.png";

export default function TypeList() {
  return (
    <div className="typesListing">
      <div className="typesListing-elem-1">
        <h2>Bancada Poente VIP</h2>
      </div>
      <div className="typesListing-elem-2">
        <h2>42.00</h2>
      </div>
      <div className="typesListing-elem-3">
        <img className="closeIcon" src={close} alt="" />
      </div>
    </div>
  );
}
