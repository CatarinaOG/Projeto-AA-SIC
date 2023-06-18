package AASIC.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtistRequest {
    private int artist_code;
}

/**
 * * 	event_artists[{
 *  * 		"artist_name": "Coldplaye"
 *  *    },...]
 */