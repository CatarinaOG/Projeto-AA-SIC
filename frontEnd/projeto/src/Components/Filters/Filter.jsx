import Place from "../../Images/place.png"
import Calendar from "../../Images/calendar.png"
import Category from "../../Images/category.png"


export default function Filter(props){

    const {type,setFilter,getNewFilterResults,options} = props

    function getIcon(){
        switch(type){
            case "Place":
                return <img className="filterIcon" src={Place} alt="Place" />;
            case "Time":
                return <img className="filterIcon" src={Calendar} alt="Calendar" />;
            case "Category":
                return <img className="filterIcon" src={Category} alt="Category" />;
            default:
                return null;
        }
    }

    function handleSelectChange(event){
        setFilter(oldFilter => ({...oldFilter,type:event.target.value}))
        getNewFilterResults()
    }

    const optionsList = options.map( option => 
        (<option className="filterOption" value={option}>{option}</option>) )

    return(
        <div className="filter">
            {getIcon()}

            <select className="select" onChange={handleSelectChange}>
                <option value="">{type}</option>
                {optionsList}
            </select>
        </div>
    )

}