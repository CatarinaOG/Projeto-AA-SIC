import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import NavBarUser from "../Components/NavBar/NavBarUser";
import PaymentMethodElem from "../Components/PaymentMethods/PaymentMethodElem";
import MBWayPopIn from "../Components/PaymentMethods/MBWayPopIn";
import PayPalPopIn from "../Components/PaymentMethods/PayPalPopIn";
import VisaPopIn from "../Components/PaymentMethods/VisaPopIn";

export default function PaymentMethods(props) {
	const {t} = useTranslation();

	const {ticketID} = props
	const [block,setBlock] = useState(false)

	const [paymentType, setPaymentType] = useState("");
	const [paymentInfo, setPaymentInfo] = useState();
	const [message, setMessage] = useState(false);

	const navigate = useNavigate();


	function goBack(){
		navigate('/Event')
	}

	function returnHome(){
		navigate('/HomeUser')
	}

	return (
		<div>
		<NavBarUser selected="home"/>

		<div className="center">
			<div className="defaultContainer">
			<h1>{t('paymentMethods')}</h1>
			<div className="eventsContainer">
				<PaymentMethodElem
				type={"MBWay"}
				paymentType={paymentType}
				setPaymentType={setPaymentType}
				block={block}
				/>
				{paymentType === "MBWay" && (
				<MBWayPopIn
					setPaymentType={setPaymentType}
					setPaymentInfo={setPaymentInfo}
					setMessage={setMessage}
					ticketID={ticketID}
				setBlock = {setBlock}

				/>
				)}

				<PaymentMethodElem
				type={"PayPal"}
				paymentType={paymentType}
				setPaymentType={setPaymentType}
				block={block}
				
				/>
				{paymentType === "PayPal" && (
				<PayPalPopIn
					setPaymentType={setPaymentType}
					setPaymentInfo={setPaymentInfo}
					setMessage={setMessage}
					ticketID={ticketID}
				setBlock = {setBlock}


				/>
				)}

				<PaymentMethodElem
				type={"Visa"}
				paymentType={paymentType}
				setPaymentType={setPaymentType}
				block={block}
				/>
				{paymentType === "Visa" && (
				<VisaPopIn
					setPaymentType={setPaymentType}
					setPaymentInfo={setPaymentInfo}
					setMessage={setMessage}
					ticketID={ticketID}
					setBlock = {setBlock}

				/>
				)}
			</div>
			{message !== "Success" ? (
				<div>
				<div className="buttonContainerPayment">
					<h3 className="redH3">{message}</h3>
				</div>
				<div className="buttonContainerPayment">
					<button className="button" onClick={goBack}>{t('goBack')}</button>
				</div>
				</div>
			) : (
				<div>
				<div className="buttonContainerPayment">
					<h3 className="greenH3">
					{t('successYouMayReturn')}
					</h3>
				</div>
				<div className="buttonContainerPayment">
					<button className="button" onClick={returnHome}> {t('returnHome')}</button>
				</div>
				</div>
			)}
			</div>
		</div>
		</div>
	);
}
