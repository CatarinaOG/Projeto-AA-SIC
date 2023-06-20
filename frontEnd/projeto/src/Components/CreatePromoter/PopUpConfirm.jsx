import { useState, useContext} from "react";
import "../../Styles/Profile.css";
import { useTranslation } from "react-i18next";


export default function PopUpConfirm({trigger,setPopUpTrigger,email,password,name,setMessage}) {
  const [phase, setPhase] = useState(1);
	const {t} = useTranslation();

  function handleClick() {
    console.log(email, name, password);
    postPromoter();
  }

  function toHome() {
    setPopUpTrigger(false);
    setPhase(1);
  }
  
  return trigger ? (
    <div className="editContainter">
      {phase === 1 ? (
        <div>
          <h3 className="editTitle">{t('confirmNewPromoter')}</h3>
          <div className="popUpSellingListButton">
            <button className="button" onClick={handleClick}>
              {" "}
              {t('yes')}
            </button>
          </div>
          <div className="popUpSellingListButton">
            <button
              className="button"
              onClick={() => setPopUpTrigger(false)}
            >
              {" "}
              {t('no')}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="editTitle">{t('promoterConfirmed')}</h3>
          <div className="popUpSellingListButton">
            <button className="button" onClick={toHome}>
              {" "}
              {t('backToHome')}
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    ""
  );
}
