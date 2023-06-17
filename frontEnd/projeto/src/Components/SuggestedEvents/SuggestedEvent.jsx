import { useNavigate } from "react-router-dom"

export default function SuggestedEvent(props){

    const {event,setSuggestedEvent} = props
    const navigate = useNavigate()

    function addSuggestedEvent(){
        setSuggestedEvent(event)
        navigate("/AddEvent")
    }

    return(
        <div className="center">
            <div className="suggestedContainer">
                <div className="suggestedInfo">
                    <h3>{event.name}</h3>
                    <p>{event.place}</p>
                    <p>{event.start_date} ({event.start_time}) - {event.end_date} ({event.end_time})</p>
                    <div className="buttonSuggestedContainer">
                        <button className="button" onClick={addSuggestedEvent}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}