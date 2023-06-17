import Filter from "./Filter"

import "../../Styles/Filters.css"
import { useState } from "react"

export default function Filters(props){

    const {setFilters} = props // ambos vao ser usados

    const [placeOptions,setPlaceOptions] = useState([
        "Lisboa","Porto"
    ])

    const [timeOptions,setTimeOptions] = useState([
        "Next Month","Tomorrow"
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
                options={placeOptions}/>

            <Filter 
                key="Time"
                type="filter_time" 
                setFilters={setFilters} 
                options={timeOptions}/>

            <Filter 
                key="Category"
                type="filter_category" 
                setFilters={setFilters} 
                options={categoryOptions}/>

        </div>
    )

}