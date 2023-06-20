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

import { useTranslation } from "react-i18next";

export default function Browse(props){
	const {t} = useTranslation();

    const {searchText,setSearchText,setEventId} = props
    const {user} = useContext(UserContext);

    const [events,setEvents] =useState([])
    const [filters,setFilters] = useState({
        filter_place: "",
        filter_time: "",
        filter_category: "",
    })


    function sendGetEventsRequest(type,value){

        let updatedFilters = filters

        if(type){
            setFilters(oldFilter => ({...oldFilter,[type]:value}))

            updatedFilters = {
                ...filters,
                [type]:value
            }
        }

        fetch("http://localhost:8080/api/event/get_filtered_events", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter_text: searchText,
                filter_place: updatedFilters.filter_place,
                filter_time: updatedFilters.filter_time,
                filter_category: updatedFilters.filter_category,
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


    function handleEnter(event){
        if (event.key === 'Enter') {
            sendGetEventsRequest()
        }
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
                        <h1>{t('browseEvents')}</h1>
                        <p className="gray">{t('findEventsBrowseText')}</p>


                        <div className="searchBarBrowse">
                            <div>
                                <img className="magnifier" src={Magnifier} alt="" />
                                <input className="inputBrowse" type="text" placeholder="Where do you want to go?" value={searchText} onChange={(event) => setSearchText(event.target.value)} onKeyDown={handleEnter}/>              
                            </div>
                        </div>

                        <Filters setFilters={setFilters} sendGetEventsRequest={sendGetEventsRequest}/>

                        { events.length > 0 && 
                            <div className="eventsContainer">
                                {show_events}
                            </div>
                        }
                        
                        { events.length === 0 &&
                            <div>
                                <h2 className="marginTop">{t('noEventsFoundTitle')}</h2>
                                <p>{t('noEventsFoundFiltreText')}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}