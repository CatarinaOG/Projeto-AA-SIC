import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import NavBarUser from "../Components/NavBar/NavBarUser";
import PaymentMethodElem from "../Components/PaymentMethods/PaymentMethodElem";
import MBWayPopIn from "../Components/PaymentMethods/MBWayPopIn";
import PayPalPopIn from "../Components/PaymentMethods/PayPalPopIn";
import VisaPopIn from "../Components/PaymentMethods/VisaPopIn";

export default function PaymentMethods(props) {
  
	const {ticketID} = props

	const [paymentType, setPaymentType] = useState("");
	const [paymentInfo, setPaymentInfo] = useState();
	const [message, setMessage] = useState(false);

	const navigate = useNavigate();


	function goBack(){
		navigate('/Event')
	}

	return (
		<div>
		<NavBarUser selected="home"/>

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
				<MBWayPopIn
					setPaymentType={setPaymentType}
					setPaymentInfo={setPaymentInfo}
					setMessage={setMessage}
					ticketID={ticketID}
				/>
				)}

				<PaymentMethodElem
				type={"PayPal"}
				paymentType={paymentType}
				setPaymentType={setPaymentType}
				/>
				{paymentType === "PayPal" && (
				<PayPalPopIn
					setPaymentType={setPaymentType}
					setPaymentInfo={setPaymentInfo}
					setMessage={setMessage}
				/>
				)}

				<PaymentMethodElem
				type={"Visa"}
				paymentType={paymentType}
				setPaymentType={setPaymentType}
				/>
				{paymentType === "Visa" && (
				<VisaPopIn
					setPaymentType={setPaymentType}
					setPaymentInfo={setPaymentInfo}
					setMessage={setMessage}
				/>
				)}
			</div>
			{message !== "Success" ? (
				<div>
				<div className="buttonContainerPayment">
					<h3 className="redH3">{message}</h3>
				</div>
				<div className="buttonContainerPayment">
					<button className="button" onClick={goBack}>Go back</button>
				</div>
				</div>
			) : (
				<div>
				<div className="buttonContainerPayment">
					<h3 className="greenH3">
					Success! you may return to the main page
					</h3>
				</div>
				<div className="buttonContainerPayment">
					<button className="button">Return to Main</button>
				</div>
				</div>
			)}
			</div>
		</div>
		</div>
	);
}
