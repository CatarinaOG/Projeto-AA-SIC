import { useState } from "react";
import NavBarUser from "../Components/NavBar/NavBarUser";
import PaymentMethodElem from "../Components/PaymentMethods/PaymentMethodElem";
import MBWayPopIn from "../Components/PaymentMethods/MBWayPopIn";
import PayPalPopIn from "../Components/PaymentMethods/PayPalPopIn";
import VisaPopIn from "../Components/PaymentMethods/VisaPopIn";

export default function PaymentMethods() {
  const [paymentType, setPaymentType] = useState("PayPal");

  return (
    <div>
      <NavBarUser />
      <div className="center">
        <div className="defaultContainer">
          <h1>Payment Methods</h1>
          <div className="eventsContainer">
            <PaymentMethodElem
              type={"MBWay"}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
            />
            {paymentType === "MBWay" && (
              <MBWayPopIn setPaymentType={setPaymentType} />
            )}

            <PaymentMethodElem
              type={"PayPal"}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
            />
            {paymentType === "PayPal" && (
              <PayPalPopIn setPaymentType={setPaymentType} />
            )}

            <PaymentMethodElem
              type={"Visa"}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
            />
            {paymentType === "Visa" && (
              <VisaPopIn setPaymentType={setPaymentType} />
            )}
          </div>
          <div className="buttonContainerPayment">
            <button className="button">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
