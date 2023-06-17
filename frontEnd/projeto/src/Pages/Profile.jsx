import { useState,useContext } from "react"
import UserContext from "../Contexts/UserContext"

import NavBarUser from "../Components/NavBar/NavBarUser"
import EditPic from "../Components/Profile/EditPic"
import EditPhone from "../Components/Profile/EditPhone"
import EditPassword from "../Components/Profile/EditPassword"
import EditLanguage from "../Components/Profile/EditLanguage"
import EditBankDetails from "../Components/Profile/EditBankDetails"
import AddPhone from "../Components/Profile/AddPhone"
import AddBankDetails from "../Components/Profile/AddBankDetails"
import Plus from "../Images/plus.png"

import "../Styles/Profile.css"


export default function Profile(){
    const { user } = useContext(UserContext);

    const [editInfo,setEditInfo] = useState("none") // picture / phone /password / language / bank_details
    const [addInfo,setAddInfo] = useState("none") // phone / bank_details
    
    const profile_pic = user.profile_pic? user.profile_pic : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"


    function editProfilePic(){
        setEditInfo("picture")
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

    function editBackDetails(){
        setEditInfo("bank_details")
    }

    function addPhoneNumber(){
        setAddInfo("phone")
    }

    function addCard(){
        setAddInfo("bank_details")
    }

    return(

        <div>
            <NavBarUser selected="home"/>

            <div className="centerAll">
                <div className="defaultContainer">
                    <div className="relative">
                        <img className="profilePic" src={profile_pic} alt="" />
                        <button className="editProfilePicButton" onClick={editProfilePic}></button>
                    </div>
                    <h2>{user.name}</h2>

                    <div className="editInfo">

                        <div className="editSection">
                            <div className="editContent">
                                <div className="displayHorizontally">
                                    <h3>Phone Number</h3>
                                    { !user.phone && <img className="plusButton" onClick={addPhoneNumber} src={Plus} alt="" />}
                                </div>
                                <div className="displayHorizontally">
                                    { user.phone &&
                                        <div>
                                            <p>{user.phone}</p>
                                            <button className="editButton" onClick={editPhoneNumber}></button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="editSection">
                            <div className="editContent">
                                <h3>Password</h3>
                                <div className="displayHorizontally">
                                    <p>**********</p>
                                    <button className="editButton" onClick={editPassword}></button>
                                </div>
                            </div>
                        </div>

                        <div className="lastEditSection">
                            <div className="editContent">
                                <h3>Language</h3>
                                <div className="displayHorizontally">
                                    { false && // para tirar pq vem sempre uma
                                        <div>
                                            <p>{user.language}</p>
                                            <button className="editButton" onClick={editLanguage}></button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="financialTitleContainer">
                        <h2 className="financialTitle">Financial</h2>
                    </div>

                    <div className="financialInfo">
                        <div className="editContent">
                            <div className="displayHorizontally">
                                <h3>Bank Details</h3>
                                { !user.card_number && <img className="plusButton" onClick={addCard} src={Plus} alt="" />}
                            </div>
                            <div className="displayHorizontally">
                                { user.card_number &&
                                    <div>
                                        <p>{"*".repeat(user.card_number.length - 4) + user.card_number.slice(-4)}</p>
                                        <button className="editButton" onClick={editBackDetails}></button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            { editInfo === "picture" && 
                <div>
                    <div className="overlay"></div>
                    <EditPic setEditInfo={setEditInfo}/>
                </div>
            }
            { editInfo === "phone" && 
                <div>
                    <div className="overlay"></div>
                    <EditPhone setEditInfo={setEditInfo}/>
                </div>
            }
            { addInfo === "phone" && 
                <div>
                    <div className="overlay"></div>
                    <AddPhone setAddInfo={setAddInfo}/>
                </div>
            }
            { editInfo === "password" && 
                <div>
                    <div className="overlay"></div>
                    <EditPassword setEditInfo={setEditInfo}/>
                </div>
            }
            { editInfo === "language" && 
                <div>
                    <div className="overlay"></div>
                    <EditLanguage user={user} setEditInfo={setEditInfo}/>
                </div>
            }
            { editInfo === "bank_details" && 
                <div>
                    <div className="overlay"></div>
                    <EditBankDetails setEditInfo={setEditInfo}/>
                </div>
            }
            { editInfo === "bank_details" && 
                <div>
                    <div className="overlay"></div>
                    <EditBankDetails setEditInfo={setEditInfo}/>
                </div>
            }
            { addInfo === "bank_details" && 
                <div>
                    <div className="overlay"></div>
                    <AddBankDetails setAddInfo={setAddInfo}/>
                </div>
            }

        </div>

    )
}