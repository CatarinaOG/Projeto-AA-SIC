import { useRef, useEffect, useState, useContext } from "react"
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage"
import storage from "../../firebaseConfig"

import SmallEventSelected from "./SmallEventSelected"
import TicketTypeSelected from "./TicketTypeSelected"
import TicketPrice from "./TicketPrice"
import TicketDescription from "./TicketDescription"
import UserContext from "../../Contexts/UserContext"

import fileImage from "../../Images/file.png"
import { GLOBAL_VARIABLE } from '../../backendIP.js';


export default function FaseFile(props){

    const {ticket,setTicket,setFase} = props
    const {user} = useContext(UserContext);


    const toTitleRef = useRef(null)
    const [fileSaved,setFileSaved] = useState(false)
    const [done,setDone] = useState(false)

    useEffect(() => {
        if (toTitleRef.current) {
            toTitleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, []);

    function handleFileUpload(event) {
        setTicket(oldTicket => ({...oldTicket,file:event.target.files[0]})) 
        setFileSaved(oldValue => !oldValue)
        if (toTitleRef.current) {
            toTitleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };


    function sendSellTicketRequest(url){

        fetch(`${GLOBAL_VARIABLE}/user/sell_ticket`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                event_id: ticket.event.id,
                type_id: ticket.type.id,
                price: ticket.price,
                description: ticket.description,
                file: url,
            })
        })
        .then(response => response.json())
        .then(responsejson => console.log(responsejson))
        .catch(error => {
            console.log(error)
        });

    }

    function handleFile(){
    
        const storageRef = ref(storage, `/${ticket.file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, ticket.file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setTicket(oldTicket => ({...oldTicket,download_url:url})) 
                    sendSellTicketRequest(url)
                    setDone(oldDone => !oldDone)

                });
            }
        );

    }


    return(
        <div className="center">
            <div>
                <h1>Select Event</h1>
                <p className="gray">Which event do you want to sell tickets for?</p>

                <SmallEventSelected 
                    ticket={ticket}
                    setFase={setFase}
                    done={done}
                />

                <h1>Select Ticket</h1>
                <p className="gray">What kind of ticket do you have?</p>

                <TicketTypeSelected
                    ticket={ticket}
                    setTicket={setTicket}
                    setFase={setFase}
                    done={done}
                />

                <h1>Select Price</h1>
                <p className="gray">For how much would you like to sell the ticket for?</p>

                <TicketPrice 
                    ticket={ticket} 
                    setTicket={setTicket}
                    setFase={setFase}
                    done={done}
                />

                <h1>Insert Description (Optional)</h1>
                <p className="gray">Can you tell us why you want to sell your precious ticket?</p>

                <TicketDescription 
                    setTicket={setTicket}
                    setFase={setFase}
                    done={done}
                />

                <h1 ref={toTitleRef}>Insert file of Ticket</h1>

                { !fileSaved && 
                <div>
                    <div className="file-input-container">
                        <label className="file-input-label" htmlFor="my-file-input">Choose a file</label>
                        <input className="file-input" onChange={handleFileUpload} type="file" id="my-file-input" />
                    </div>
                </div>}

                { fileSaved && !done &&
                    <div>
                        <div className="center">
                            <img className="fileSaved" src={fileImage} alt="" />
                        </div>
                        
                        <div className="center">
                            <button className="button" onClick={handleFile}>Confirm</button>
                        </div>
                    </div>
                }

                { done && 
                    <div>
                        <div className="successContainter">
                            <img className="fileSavedSecond" src={fileImage} alt="" />
                            <div>
                                <h3 className="successFileMsg">Your ticket has been added to the tickets avaiable to purchase!</h3>
                            </div>
                        </div>
                        
                        <div className="center">
                            <a href="/HomeUser" className="button">Home</a>
                        </div>
                    </div>
                }

            </div>
        </div>
    )

}