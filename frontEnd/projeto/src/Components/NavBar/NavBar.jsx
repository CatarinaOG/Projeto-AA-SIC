import { useState,useContext } from "react"
import { useNavigate,Link } from 'react-router-dom';
import UserContext from "../../Contexts/UserContext"


import Logo from "../../Images/logo.png"
import Info from "../../Images/info.png"

import "../../Styles/NavBar.css"

export default function NavBar(){

    const { setUser } = useContext(UserContext);

    const [showError,setShowError] = useState(0)
    const [error,setError] = useState("")
    const [showPopup, setShowPopup] = useState("none")
    const [inputs,setInputs] = useState({
        email: "",
        name: "",
        password: "",
        password_repeat: "",
    })

    const navigate = useNavigate();


    function showNone(event){
        event.preventDefault();
        setShowPopup("none")
        setShowError(0)
    }

    function showLogin(event){
        event.preventDefault();
        setShowPopup("login")
    }

    function showSignup(event){
        event.preventDefault();
        setShowError(0)
        setShowPopup("signup")
    }

    function updateInputs(event){
        const {name,value} = event.target
        setInputs( oldInput => ({...oldInput, [name]:value}) )
    }

    function sendLoginRequest(){

        fetch("http://localhost:8080/api/user/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: inputs.email,
                password: inputs.password
            })
        })
        .then(response => response.json())
        .then(userResponse => {

            setUser({...userResponse,email: inputs.email})
            
            switch (userResponse.type){
                case "user": 
                    navigate('/HomeUser')
                    break
                case "promoter":
                    navigate('/HomePromoter')
                    break
                case "admin":
                    navigate('/HomeAdmin')
                    break
            }
        })
        .catch(error => {
            setShowError(1)
            setError("Email our password incorrect!")
        });
    }

    function sendSignUpRequest(){

        fetch("http://localhost:8080/api/user/register", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        .then(response => response.json())
        .then(userResponse => {
            setUser({...userResponse,email: inputs.email})
            navigate('/HomeUser')
        })
        .catch(error => {
            setShowError(4)
            setError("Email given is already in use")
        });
    }

    function login(){

        if(inputs.email === "" || inputs.password === ""){
            setShowError(3)
            setError("Fill all the information")
            return
        }

        sendLoginRequest()
    }

    function signUp(){
        if(inputs.password !== inputs.password_repeat){
            setShowError(2)
            setError("Passwords don't match")
            return
        }

        if(inputs.email === "" || inputs.password === "" || inputs.password_repeat === "" || inputs.name === ""){
            setShowError(3)
            setError("Fill all the information")
            return
        }

        sendSignUpRequest()
    }

    return(

        <div>
            <nav className="navBar">
                
                <Link to="/"><img className="logoImage" onClick={showNone} src={Logo} alt="" /></Link>

                <div className="navBarRighSide">

                    <Link to="" className="iconTab"><img src={Info} alt="" /></Link>
                    <Link to="" className="tab" onClick={showLogin}>Login</Link>
                    <Link to="" className="sellTab" onClick={showLogin}>Sell Tickets!</Link>
                    
                </div>

            </nav>

            {showPopup == "login" && (
                <div>
                    <div className="clearOverlay" onClick={showNone}></div>
                    <div className="popup">
                        <div className="centerAll">
                            <div className="displayVertically">
                                <p className="popupTitle">Login</p>
                                <input className="input" type="text" placeholder="Insert email" name="email" onChange={updateInputs} />
                                <input className="input" type="password" placeholder="Insert password" name="password" onChange={updateInputs}/>
                                <p className="popupLoginSignup" onClick={showSignup} >Don't have an account? Sign up here</p>
                                <p className={[1, 3].includes(showError) ? "error" : "errorNotVisible"}>{error}</p>
                                <button className="popupButton" onClick={login}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {showPopup == "signup" && (
                <div>
                    <div className="clearOverlay" onClick={showNone}></div>
                    <div className="popup">
                        <div className="centerAll">
                            <div className="displayVertically">
                                <p className="popupTitle">Sign up</p>
                                <input className="input" type="text" placeholder="Insert name" name="name" onChange={updateInputs} />
                                <input className="input" type="email" placeholder="Insert email address" name="email" onChange={updateInputs} />
                                <input className="input" type="password" placeholder="Insert password" name="password" onChange={updateInputs} />
                                <input className="input" type="password" placeholder="Confirm password" name="password_repeat" onChange={updateInputs} />
                                <p className={[2, 3, 4].includes(showError) ? "error" : "errorNotVisible"}>{error}</p>
                                <button className="popupButton" onClick={signUp}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}