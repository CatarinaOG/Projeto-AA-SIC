import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PopUpCreateEvent(props) {
	const {t} = useTranslation();

  const {trigger,setPopUpTrigger} = props
  const navigate = useNavigate();
  const confirmButton = () => {
    setPopUpTrigger(false);
		navigate("/Events")
  };

  return trigger ? (
    <div className="overlay">
      <div className="editContainter">
        <h3 className="editTitle">{t('eventSuccessfulCreate')}</h3>
        <div className="popUpSellingListButton">
          <button className="button" onClick={confirmButton}>
            {" "}
            {t('backToEventListing')}
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
