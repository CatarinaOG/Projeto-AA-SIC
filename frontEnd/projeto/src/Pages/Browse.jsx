import { useState,useContext, useEffect } from "react"

import Filters from "../Components/Filters/Filters"
import NavBarUser from "../Components/NavBar/NavBarUser"
import NavBar from "../Components/NavBar/NavBar"
import BrowseTicket from "../Components/Browse/BrowseTicket"
import UserContext from "../Contexts/UserContext"
import NavBarPromoter from "../Components/NavBar/NavBarPromoter"
import NavBarAdmin from "../Components/NavBar/NavBarAdmin"

import Magnifier from "../Images/magnifier.png"

import "../Styles/Browse.css"



export default function Browse(props){

    const {searchText,setSearchText,setEventId} = props
    const {user} = useContext(UserContext);

    const [events,setEvents] =useState([])

    function sendGetEventsRequest(){

        fetch("http://localhost:8080/api/event/get_filtered_events", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter_text: "",
                filter_place: "",
                filter_time: "",
                filter_category: "",
            })
        })
        .then(response => response.json())
        .then(responseJSON => {
            setEvents(responseJSON)
        })
        .catch(error => {
            console.log(error)
        });

    }


    useEffect(() => {
        if(events.length === 0)
            sendGetEventsRequest()

    },[])

    function searchEvents(){
    }

    const show_events = events.map((event) => 
        <BrowseTicket 
            key={event.id}
            event={event} 
            setEventId={setEventId}
        />
    )

    return(
        <div>
            { !user.type && <NavBar />}
            { user.type === "user" && <NavBarUser selected="home"/>}
            { user.type === "promoter" && <NavBarPromoter selected="home"/>}
            { user.type === "admin" && <NavBarAdmin selected="home"/>}

            <div className="center">
                <div className="defaultContainer">
                    <div>
                        <h1>Browse Events</h1>
                        <p className="gray">Find events off all types from any date in any place!</p>


                        <div className="searchBarBrowse">
                            <div>
                                <img className="magnifier" src={Magnifier} alt="" />
                                <form onSubmit={searchEvents}>
                                    <input className="inputBrowse" type="text" placeholder="Where do you want to go?" value={searchText} onChange={(event) => setSearchText(event.target.value)}/>              
                                </form>
                            </div>
                        </div>

                        <Filters />

                        { events.length > 0 && 
                            <div className="eventsContainer">
                                {show_events}
                            </div>
                        }
                        
                        { events.length === 0 &&
                            <div>
                                <h2 className="marginTop">No Events Found</h2>
                                <p>Your filters did not yield any results</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}