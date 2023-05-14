import Filter from "./Filter"

import "../../Styles/Filters.css"
import { useState } from "react"

export default function Filters(props){

    const {type,userID} = props // ambos vao ser usados

    const [filter,setFilter] = useState({
        Place: "",
        Time: "",
        Category: ""
    })

    const [placeOptions,setPlaceOptions] = useState([
        "Lisboa","Porto"
    ])

    const [timeOptions,setTimeOptions] = useState([
        "Next Month","Tomorrow"
    ])

    const [categoryOptions,setCategoryOptions] = useState([
        "Concert","Festival"
    ])

    function getNewFilterResults(){
        /*
        if(type == "boughtTickets")
            // dar set as novas listas + mandar id
        else
            // dar set as novas listas
        */
    }

    return(
        <div className="displayHorizontallyEvenly">
            
            <Filter 
                type="Place" 
                setFilter={setFilter} 
                getNewFilterResults={getNewFilterResults} 
                options={placeOptions}/>

            <Filter 
                type="Time" 
                setFilter={setFilter} 
                getNewFilterResults={getNewFilterResults} 
                options={timeOptions}/>

            <Filter 
                type="Category" 
                setFilter={setFilter} 
                getNewFilterResults={getNewFilterResults} 
                options={categoryOptions}/>

        </div>
    )

}