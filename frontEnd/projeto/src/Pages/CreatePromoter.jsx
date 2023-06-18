import { useState } from "react";
import NavBarAdmin from "../Components/NavBar/NavBarAdmin";
import PopUpConfirm from "../Components/CreatePromoter/PopUpConfirm";

export default function CreatePromoter() {

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [popUpTrigger, setPopUpTrigger] = useState(false);

	function handleNameChange(event){
		setName(event.target.value);
	};

	function handleEmailChange(event){
		setEmail(event.target.value);
	};

	function handlePasswordChange(event){
		setPassword(event.target.value);
	};

	function handleConfirmPasswordChange(event){
		const newConfirmPassword = event.target.value;
		setConfirmPassword(newConfirmPassword);

		if (password !== newConfirmPassword) setMessage("Passwords don't match");
		else setMessage("");
	};

	function handleSubmit(event){
		event.preventDefault();

		if (name === "" || password === "" || confirmPassword === "")
			setMessage("One or more fields incomplete");
		else setPopUpTrigger(true);
	};

	return (
		<div>
			<NavBarAdmin selected="promoters"/>

			<PopUpConfirm
				trigger={popUpTrigger}
				setPopUpTrigger={setPopUpTrigger}
				email={email}
				password={password}
				name={name}
				setMessage={setMessage}
			/>

			<div className="center">
				<div className="CreatePromoterContainer">
					<h1 className="h1CreatePromoter">Create Promoter</h1>
					<form className="formContainer" onSubmit={handleSubmit}>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Name</h2>
							<input className="inputFormCreatePromoter" type="text" value={name} onChange={handleNameChange}/>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Email</h2>
							<input className="inputFormCreatePromoter" type="email" value={email} onChange={handleEmailChange}/>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Password</h2>
							<input className="inputFormCreatePromoter" type="password" value={password} onChange={handlePasswordChange}/>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Confirm Password</h2>
							<input className="inputFormCreatePromoter" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
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
			</div>
		</div>
	);
}
