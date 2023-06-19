package AASIC.requests;

import AASIC.model.TicketType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddEventRequest {
    private String event_name;
    private int event_venue_id;
    private String event_date_start;
    private String event_date_end;
    private String event_category;
    private List<TicketTypeRequest> event_types;
    private List<ArtistRequest> event_artists;
    private String image;
}


/**
 * {
 * 	"event_name" : "Coldplay",
 * 	"event_venue_id" : 123,
 * 	"event_date_start": "19/06/2023",
 * 	"event_date_end" : "19/06/2023",
 * 	"event_category" : "Festival",
 * 	"event_types" : [{
 * 		"ticket_type" : "Bilhete Diário",
 * 		"price" : 42.00,
 * 		"type_date_star": "19/06/2023",
 * 		"type_date_end" : "19/06/2023",
 *        },...]
 * 	event_artists[{
 * 		"artist_name": "Coldplaye"
 *    },...]
 * }*/