import "../../Styles/Profile.css";
import { useTranslation } from "react-i18next";
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function PopUpRemoveListing(props) {
  const {t} = useTranslation();
  const handleRemoveList = () => {
    props.onRemove(props.popUpID);
    props.setPopUpTrigger(false);
    props.setPopUpID("");
  };

  return props.trigger ? (
    <div>
      <div className="editContainter">
        <h3 className="editTitle">
        {t('sureYouWantToRemove')}
        </h3>
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

/*
    <div className="popupSellingList">
      <div className="popupSellingListInner">
        <h1>Are you sure you want to delete this listing?</h1>
        <div className="divButtons">
          <button
            className="button"
            onClick={() => props.setPopUpTrigger(false)}
          >
            {" "}
            Yes
          </button>
          <button
            className="button"
            onClick={() => props.setPopUpTrigger(false)}
          >
            {" "}
            No
          </button>
        </div>
      </div>
    </div> */
