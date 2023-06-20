import "../../Styles/Profile.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PopUpAddVenue(props) {
	const {t} = useTranslation();

  const navigate = useNavigate();
  const handleRemoveList = () => {
    props.setPopUpTrigger(0);
		navigate("/AddEvent")
  };

  return props.trigger === 2 ? (
    <div>
      <div className="editContainter">
        <h3 className="editTitle">{t('venueSuccess')}</h3>
        <div className="popUpSellingListButton">
          <button className="button" onClick={handleRemoveList}>
            {" "}
            {t('venuePopUpButton')}          
            </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
