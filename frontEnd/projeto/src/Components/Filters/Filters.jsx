import Filter from "./Filter"

import "../../Styles/Filters.css"
import { useState } from "react"

export default function Filters(props){

    const {setFilters,filtersChanged} = props

    const [placeOptions,setPlaceOptions] = useState([
        "Lisboa","Porto"
    ])

    const [timeOptions,setTimeOptions] = useState([
        "next week","this month","next month","this year","next year"
    ])

    const [categoryOptions,setCategoryOptions] = useState([
        "Concert","Festival"
    ])


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