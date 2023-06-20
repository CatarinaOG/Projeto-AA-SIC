import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

export default function Map(props){

    const {event} = props

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });
    

    const center = useMemo(() => ({ lat: Number(event.lat), lng: Number(event.lng) }), []);
    
    
    return(
        <div className="map">
        {!isLoaded ? (
            <p>Loading...</p>
        ) : (
            <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                zoom={10}
            > 
                <MarkerF position={{ lat: Number(event.lat), lng: Number(event.lng) }} />
            </GoogleMap>
        )}
        </div>
    )
}