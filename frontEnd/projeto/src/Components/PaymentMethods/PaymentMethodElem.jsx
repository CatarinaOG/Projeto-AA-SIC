import unselected from "../../Images/unselected.png";
import selected from "../../Images/selected.png";

import { ReactComponent as MBWayLogo } from "../../Images/Logo_MBWay.svg";
import { ReactComponent as PayPalLogo } from "../../Images/PayPal.svg";
import { ReactComponent as VisaLogo } from "../../Images/Visa.svg";
import { useState ,useEffect} from "react";


export default function PaymentMethodElem(props) {
  const { type, paymentType, setPaymentType,block } = props;

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

  function select() {
    setPaymentType(type);
  }
	useEffect(() => {
    console.log("Block is"+block)
	}, []);


  return (
    <div className="listingPaymentMethod">
    <div className="listing-elem-1-Payment">
      {block === false ? 
        (paymentType === type ? (
          <img className="task" src={selected} alt="" />
        ) : (
          <img className="task" src={unselected} alt="" onClick={select} />
        ))
        : <img className="task" src={unselected} alt=""/>
      }
    </div>

      <div className="listing-elem-2-Payment">{types[type].component}</div>
      <div className="listing-elem-3-Payment">{types[type].typeString}</div>
    </div>
  );
}
