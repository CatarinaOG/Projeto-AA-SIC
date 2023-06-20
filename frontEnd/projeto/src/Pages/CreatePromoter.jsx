import { useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import NavBarAdmin from "../Components/NavBar/NavBarAdmin";
import BlackClose from "../Images/blackClose.png"
import { useTranslation } from "react-i18next";

export default function CreatePromoter() {
	const {t} = useTranslation();
	const {user} = useContext(UserContext);
	const navigate = useNavigate()

	const [input,setInput] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	})

	const [message, setMessage] = useState("");
	const [popUpTrigger, setPopUpTrigger] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);



	function handleChangeInput(event){

		const {name,value} = event.target
		setInput((oldInput) => ({...oldInput,[name]:value}))

		console.log(value);
		if(name === "password"){
			console.log("Value is" + value)
			if(value !== input.confirmPassword) setMessage(t('messagePasswordsDontMatch')); 
			else setMessage("");
		}
		if(name === "confirmPassword"){
			if(value !== input.password) setMessage(t('messagePasswordsDontMatch')); 
			else setMessage("");
		}
	}

	function handleSubmit(event){
		event.preventDefault();

		if (input.name === "" || input.password === "" || input.confirmPassword === "")
			setMessage(t('messageOneOrMoreIncomplete')); 

		else setPopUpTrigger(true);
	};

	function closePopUp(){
		setPopUpTrigger(false)
	}

	function sendCreatePromoterRequest(){

		fetch(`${GLOBAL_VARIABLE}/admin/create_promoter`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${user.token}`
			},
				body: JSON.stringify({
					name : input.name,
					email : input.email, 
					password : input.password
				})
			})
		.then(response => response.json())
		.then(responseJSON => {
			setPopUpTrigger(false)
			setShowConfirmation(true)
		})
			.catch(error => {
				setMessage(error)
			});

	}

	function goHome(){
		setShowConfirmation(false)
		navigate("/Promoters")
	}

	return (
		<div>
			<NavBarAdmin selected="promoters"/>

			<div className="center">
				<div className="CreatePromoterContainer">
					<h1 className="h1CreatePromoter">{t('createPromoter')}</h1>
					<form className="formContainer" onSubmit={handleSubmit}>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">{t('name')}</h2>
							<input className="inputFormCreatePromoter" type="text" name="name" value={input.name} onChange={handleChangeInput}/>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Email</h2>
							<input className="inputFormCreatePromoter" type="email" name="email" value={input.email} onChange={handleChangeInput}/>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">{t('password')}</h2>
							<input className="inputFormCreatePromoter" type="password" name="password" value={input.password} onChange={handleChangeInput}/>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">{t('confirmPassword')}</h2>
							<input className="inputFormCreatePromoter" type="password" name="confirmPassword" value={input.confirmPassword} onChange={handleChangeInput}/>
						</div>
						{message !== "" ? (
							<div className="buttonContainerPayment">
								<h3 className="redH3">{message}</h3>
							</div>
							) : (
							""
							)
						}
						<div className="divButtonCreatePromoter">
							<input className="button" type="submit" value="Submit" />
						</div>
					</form>
				</div>
				
				{ popUpTrigger &&
					<div>
						<div className="overlay"></div>
						<div className="popUpContainer">
							<img src={BlackClose} className="editClose" alt="" onClick={closePopUp} />
							<h3 className="popUpInfoWithButtons">{t('promoterAreYouSure')}</h3>
							<div className="center">
								<div className="promoterButtons">
									<button className="button" onClick={sendCreatePromoterRequest}>{t('yes')}</button>
									<button className="button" onClick={closePopUp}>{t('no')}</button>
								</div>
							</div>
						</div>
					</div>
				}

				{ showConfirmation &&
					<div>
						<div className="overlay"></div>
						<div className="popUpContainer">
							<img src={BlackClose} className="editClose" alt="" onClick={goHome} />
							<h3 className="popUpInfoWithButtons">{t('promoterSuccessMessage')}</h3>
						</div>
					</div>
				}

			</div>
		</div>
	);
}
