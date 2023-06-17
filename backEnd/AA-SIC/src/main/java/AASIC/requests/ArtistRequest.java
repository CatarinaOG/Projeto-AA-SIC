package AASIC.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtistRequest {
    private String artist_name;
}

/**
 * * 	event_artists[{
 *  * 		"artist_name": "Coldplaye"
 *  *    },...]
 */