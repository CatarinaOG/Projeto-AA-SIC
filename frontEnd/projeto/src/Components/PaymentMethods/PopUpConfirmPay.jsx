import "../../Styles/Profile.css";
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';


export default function PopUpConfirmPay(props) {
  const handleRemoveList = () => {
    props.onRemove(props.popUpID);
    props.setPopUpTrigger(false);
    props.setPopUpID("");
  };
  const {t} = useTranslation();

  return props.trigger ? (
    <div>
      <div className="editContainter">
        <h3 className="editTitle">{t('paymentSubmitted')}</h3>
        <div className="popUpSellingListButton">
          <button className="button" onClick={handleRemoveList}>
            {" "}
            {t('yes')}
          </button>
        </div>
        <div className="popUpSellingListButton">
          <button
            className="button"
            onClick={() => props.setPopUpTrigger(false)}
          >
            {" "}
            {t('no')}
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
