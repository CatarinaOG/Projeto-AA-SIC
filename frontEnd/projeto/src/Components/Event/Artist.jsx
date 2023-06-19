
export default function Artist(props){

    const {artist} = props

    return(
        <div className="artistSection">
            <img className="artistImage" src={artist.image} alt="" />
            <div className="artistInfo">
                <h3>{artist.artist_name}</h3>
                <p>{artist.upcoming_events} upcoming events</p>
            </div>
        </div>
    )
}