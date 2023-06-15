import unselected from "../../Images/unselected.png";
import selected from "../../Images/selected.png";

import { ReactComponent as MBWayLogo } from "../../Images/Logo_MBWay.svg";
import { ReactComponent as PayPalLogo } from "../../Images/PayPal.svg";
import { ReactComponent as VisaLogo } from "../../Images/Visa.svg";
import { useState } from "react";

function setValues(value, setPaymentType, SetIsSelected, paymentType) {
  if (value) {
    SetIsSelected(value);
    setPaymentType(paymentType);
  } else {
    SetIsSelected(value);
    setPaymentType("");
  }
}

export default function PaymentMethodElem(props) {
  const { type, setPaymentType } = props;
  const [isSelected, SetIsSelected] = useState(false);

  const types = {
    MBWay: {
      typeString: "MBWay",
      component: <MBWayLogo className="MBWayLogo" />,
    },
    PayPal: {
      typeString: "PayPal",
      component: <PayPalLogo className="PayPalLogo" />,
    },
    Visa: {
      typeString: "Debit/Credit",
      component: <VisaLogo className="VisaLogo" />,
    },
  };

  return (
    <div className="listingPaymentMethod">
      <div className="listing-elem-1-Payment">
        {isSelected ? (
          <img
            className="task"
            src={selected}
            alt=""
            onClick={() =>
              setValues(
                false,
                setPaymentType,
                SetIsSelected,
                types[type].typeString
              )
            }
          />
        ) : (
          <img
            className="task"
            src={unselected}
            alt=""
            onClick={() =>
              setValues(
                true,
                setPaymentType,
                SetIsSelected,
                types[type].typeString
              )
            }
          />
        )}
      </div>

      <div className="listing-elem-2-Payment">{types[type].component}</div>
      <div className="listing-elem-3-Payment">{types[type].typeString}</div>
    </div>
  );
}
