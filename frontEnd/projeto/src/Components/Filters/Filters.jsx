import Filter from "./Filter"

import "../../Styles/Filters.css"
import { useEffect, useState } from "react"
import { resolvePath } from "react-router-dom"
import { GLOBAL_VARIABLE } from '../../backendIP.js';

export default function Filters(props){

    const {setFilters,sendGetEventsRequest} = props

    const [placeOptions,setPlaceOptions] = useState([])

    const [timeOptions,setTimeOptions] = useState([
        "this week","next week","this month","next month","this year","next year"
    ])

    const [categoryOptions,setCategoryOptions] = useState([])

    useEffect(() => {
        sendGetOptionsRequest()
    },[])


    function sendGetOptionsRequest(){

        fetch(`${GLOBAL_VARIABLE}/event/get_filters_events`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(responseJSON => {
            setPlaceOptions(responseJSON.place)
            setCategoryOptions(responseJSON.category)
        })
        .catch(error => {
            console.log(error)
        });

    }


    return(
        <div className="displayHorizontallyEvenly">
            
            <Filter 
                key="Place"
                type="filter_place" 
                setFilters={setFilters} 
                options={placeOptions}
                sendGetEventsRequest={sendGetEventsRequest}/>

            <Filter 
                key="Time"
                type="filter_time" 
                setFilters={setFilters} 
                options={timeOptions}
                sendGetEventsRequest={sendGetEventsRequest}/>

            <Filter 
                key="Category"
                type="filter_category" 
                setFilters={setFilters} 
                options={categoryOptions}
                sendGetEventsRequest={sendGetEventsRequest}/>

        </div>
    )

}