
export default function SuggestedEvent(props){

    const {event} = props

    function addSuggestedEvent(){
        // meter no estado da app
    }

    return(
        <div className="center">
            <div className="suggestedContainer">
                <div className="suggestedInfo">
                    <h3>{event.name}</h3>
                    <p>{event.place}</p>
                    <p>{event.start_date}-{event.end_date}</p>
                    <div className="buttonSuggestedContainer">
                        <button className="button" onClick={addSuggestedEvent}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}