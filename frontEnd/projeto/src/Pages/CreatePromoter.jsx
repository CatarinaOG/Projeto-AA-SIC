import { useState,useContext} from "react";
import UserContext from "../Contexts/UserContext";
import NavBarAdmin from "../Components/NavBar/NavBarAdmin";
import BlackClose from "../Images/blackClose.png"
import { useNavigate } from "react-router-dom";

export default function CreatePromoter() {
	
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

		if(name === "password"){
			if(value !== input.password) setMessage("Passwords don't match");
			else setMessage("");
		}
	}

	function handleSubmit(event){
		event.preventDefault();

		if (input.name === "" || input.password === "" || input.confirmPassword === "")
			setMessage("One or more fields incomplete");
		else setPopUpTrigger(true);
	};

	function closePopUp(){
		setPopUpTrigger(false)
	}

	function sendCreatePromoterRequest(){

		fetch("http://localhost:8080/api/admin/create_promoter", {
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
		navigate("/HomeAdmin")
	}

	return (
		<div>
			<NavBarAdmin selected="promoters"/>

			<div className="center">
				<div className="CreatePromoterContainer">
					<h1 className="h1CreatePromoter">Create Promoter</h1>
					<form className="formContainer" onSubmit={handleSubmit}>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Name</h2>
							<input className="inputFormCreatePromoter" type="text" name="name" value={input.name} onChange={handleChangeInput}/>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Email</h2>
							<input className="inputFormCreatePromoter" type="email" name="email" value={input.email} onChange={handleChangeInput}/>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Password</h2>
							<input className="inputFormCreatePromoter" type="password" name="password" value={input.password} onChange={handleChangeInput}/>
						</div>
						<div className="divFormCreatePromoter">
							<h2 className="h2FormCreatePromoter">Confirm Password</h2>
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
							<h3 className="popUpInfoWithButtons">Are you sure you want to create this promoter?</h3>
							<div className="center">
								<div className="promoterButtons">
									<button className="button" onClick={sendCreatePromoterRequest}>Yes</button>
									<button className="button" onClick={closePopUp}>No</button>
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
							<h3 className="popUpInfoWithButtons">This promoter was created with success!</h3>
						</div>
					</div>
				}

			</div>
		</div>
	);
}
