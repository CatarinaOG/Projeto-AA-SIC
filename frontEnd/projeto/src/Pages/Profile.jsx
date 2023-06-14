import { useState } from "react"

import NavBarUser from "../Components/NavBar/NavBarUser"
import EditPic from "../Components/Profile/EditPic"
import EditEmail from "../Components/Profile/EditEmail"
import EditPhone from "../Components/Profile/EditPhone"
import EditPassword from "../Components/Profile/EditPassword"
import EditLanguage from "../Components/Profile/EditLanguage"
import EditBankDetails from "../Components/Profile/EditBankDetails"

import "../Styles/Profile.css"


export default function Profile(){

    const [editInfo,setEditInfo] = useState("bank_details") // picture / email / phone /password / language / bank_details

    const [user,setUser] = useState({
        name: "Catarina Gonçalves",
        profile_pic: "https://cdn-icons-png.flaticon.com/128/4140/4140047.png",
        email: "catarina.oliveira.41@hotmail.com",
        password: "hello",
        phone: 933066325,
        language: "English",
        bank_details: "23455667234"
    })

    function editProfilePic(){
        setEditInfo("picture")
    }

    function editEmailAddress(){
        setEditInfo("email")
    }

    function editPhoneNumber(){
        setEditInfo("phone")
    }

    function editPassword(){
        setEditInfo("password")
    }

    function editLanguage(){
        setEditInfo("language")
    }

    return(

        <div>
            <NavBarUser />

            <div className="centerAll">
                <div className="defaultContainer">
                    <div className="relative">
                        <img className="profilePic" src={user.profile_pic} alt="" />
                        <button className="editProfilePicButton" onClick={editProfilePic}></button>
                    </div>
                    <h2>{user.name}</h2>

                    <div className="editInfo">

                        <div className="editSection">
                            <div className="editContent">
                                <h3>Email Address</h3>
                                <div className="displayHorizontally">
                                    <p>{user.email}</p>
                                    <button className="editButton" onClick={editEmailAddress}></button>
                                </div>
                            </div>
                        </div>

                        <div className="editSection">
                            <div className="editContent">
                                <h3>Phone Number</h3>
                                <div className="displayHorizontally">
                                    <p>{user.phone}</p>
                                    <button className="editButton" onClick={editPhoneNumber}></button>
                                </div>
                            </div>
                        </div>

                        <div className="editSection">
                            <div className="editContent">
                                <h3>Password</h3>
                                <div className="displayHorizontally">
                                    <p>{user.password.replace(/./g, '*')}</p>
                                    <button className="editButton" onClick={editPassword}></button>
                                </div>
                            </div>
                        </div>

                        <div className="lastEditSection">
                            <div className="editContent">
                                <h3>Language</h3>
                                <div className="displayHorizontally">
                                    <p>{user.language}</p>
                                    <button className="editButton" onClick={editLanguage}></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="financialTitleContainer">
                        <h2 className="financialTitle">Financial</h2>
                    </div>

                    <div className="financialInfo">
                        <div className="editContent">
                            <h3>Bank Details</h3>
                            <div className="displayHorizontally">
                                <p>{"*".repeat(user.bank_details.length - 4) + user.bank_details.slice(-4)}</p>
                                <button className="editButton" onClick={editLanguage}></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            { editInfo === "picture" && 
                <div>
                    <div className="overlay"></div>
                    <EditPic setUser={setUser} setEditInfo={setEditInfo}/>
                </div>
            }
            { editInfo === "email" && 
                <div>
                    <div className="overlay"></div>
                    <EditEmail setUser={setUser} setEditInfo={setEditInfo}/>
                </div>
            }
            { editInfo === "phone" && 
                <div>
                    <div className="overlay"></div>
                    <EditPhone setUser={setUser} setEditInfo={setEditInfo}/>
                </div>
            }
            { editInfo === "password" && 
                <div>
                    <div className="overlay"></div>
                    <EditPassword setUser={setUser} setEditInfo={setEditInfo}/>
                </div>
            }
            { editInfo === "language" && 
                <div>
                    <div className="overlay"></div>
                    <EditLanguage user={user} setUser={setUser} setEditInfo={setEditInfo}/>
                </div>
            }
            { editInfo === "bank_details" && 
                <div>
                    <div className="overlay"></div>
                    <EditBankDetails setUser={setUser} setEditInfo={setEditInfo}/>
                </div>
            }

        </div>

    )
}