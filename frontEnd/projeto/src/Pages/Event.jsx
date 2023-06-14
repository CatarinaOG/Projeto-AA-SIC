
import NavBarUser from "../Components/NavBar/NavBarUser"


export default function Event(props){

    const {event} = props



    /*
    {
            dayOfWeek: "Thursday",
            month: "Jul",
            day: "7",
            time: "03:00 PM",
            eventName: "NOS ALIVE'23",
            eventPlace: "NOS Alive, Algés, Portugal",
            image: "https://w0.peakpx.com/wallpaper/378/616/HD-wallpaper-night-party-concert-night-club-fans-dancing-people-dancing-party.jpg"
            
        },
     */


    return(
        <div>
            <NavBarUser />
            
            <img className="wallpaperBlur" src={event.image} alt="" />

            <div className="center">
                <div>


                    <div className="overImageContainer">
                        <img className="eventImage" src={event.image} alt="" />
                        <h2>{event.eventName}</h2>
                        <h3>{event.dayOfWeek}, {event.month} {event.day} | {event.time} </h3>
                        <p>{event.eventPlace}</p>
                        <button className="saveEventButton">Save Event</button>
                    </div>
                


                    <div className="defaultContainer">
                        <div className="eventNavBar">
                            <h2>Tickets</h2>
                            <h2>Info</h2>


                        </div>
                    </div>




                </div>
            </div>
            

        </div>
    )
}