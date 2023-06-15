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
              setPaymentType={setPaymentType}
            ></PaymentMethodElem>
            {paymentType === "MBWay" && (
              <MBWayPopIn setPaymentType={setPaymentType}></MBWayPopIn>
            )}
            <PaymentMethodElem
              type={"PayPal"}
              setPaymentType={setPaymentType}
            ></PaymentMethodElem>
            {paymentType === "PayPal" && (
              <PayPalPopIn setPaymentType={setPaymentType}></PayPalPopIn>
            )}
            <PaymentMethodElem
              type={"Visa"}
              setPaymentType={setPaymentType}
            ></PaymentMethodElem>
            {paymentType === "Debit/Credit" && (
              <VisaPopIn setPaymentType={setPaymentType}></VisaPopIn>
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
