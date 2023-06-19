import Filter from "./Filter"

import "../../Styles/Filters.css"
import { useEffect, useState } from "react"
import { resolvePath } from "react-router-dom"

export default function Filters(props){

    const {setFilters,filtersChanged} = props

    const [placeOptions,setPlaceOptions] = useState([])

    const [timeOptions,setTimeOptions] = useState([
        "this week","next week","this month","next month","this year","next year"
    ])

    const [categoryOptions,setCategoryOptions] = useState([])

    useEffect(() => {
        sendGetOptionsRequest()
    },[])


    function sendGetOptionsRequest(){

        fetch("http://localhost:8080/api/event/get_filters_events", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(responseJSON => {
            console.log(responseJSON)
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
                filtersChanged={filtersChanged}/>

            <Filter 
                key="Time"
                type="filter_time" 
                setFilters={setFilters} 
                options={timeOptions}
                filtersChanged={filtersChanged}/>

            <Filter 
                key="Category"
                type="filter_category" 
                setFilters={setFilters} 
                options={categoryOptions}
                filtersChanged={filtersChanged}/>

        </div>
    )

}