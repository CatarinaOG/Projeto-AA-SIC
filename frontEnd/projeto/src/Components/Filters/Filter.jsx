import Place from "../../Images/place.png"
import Calendar from "../../Images/calendar.png"
import Category from "../../Images/category.png"
import { GLOBAL_VARIABLE } from '../../backendIP.js';


export default function Filter(props){

    const {type,setFilters,options,sendGetEventsRequest} = props

    let showFilter = ""

    function getIcon(){
        switch(type){
            case "filter_place":
                showFilter = "Place"
                return <img className="filterIcon" src={Place} alt="Place" />;
            case "filter_time":
                showFilter = "Time"
                return <img className="filterIcon" src={Calendar} alt="Calendar" />;
            case "filter_category":
                showFilter = "Category"
                return <img className="filterIcon" src={Category} alt="Category" />;
            default:
                return null;
        }
    }

    function handleSelectChange(event){
        sendGetEventsRequest(type,event.target.value)
    }

    const optionsList = options.map( option => 
        (<option className="filterOption" key={option} value={option}>{option}</option>) )

    return(
        <div className="filter">
            {getIcon()}

            <select className="select" onChange={handleSelectChange}>
                <option value="">{showFilter}</option>
                {optionsList}
            </select>
        </div>
    )

}