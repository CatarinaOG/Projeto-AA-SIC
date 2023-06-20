import { useTranslation } from "react-i18next";

export default function Artist(props){
	const {t} = useTranslation();

    const {artist} = props

    return(
        <div className="artistSection">
            <img className="artistImage" src={artist.image} alt="" />
            <div className="artistInfo">
                <h3>{artist.artist_name}</h3>
                <p>{artist.upcoming_events}
                {t('upcomingEvents')}</p>
            </div>
        </div>
    )
}