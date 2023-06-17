package AASIC.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetEventsByPromoterResponse {
    private String name;
    private int event_id;
    private String date;
    private String venue_name;
    private String city;
}

/**
 * [{
 * 	"name":"Stand Up Show",
 * 	"event_id" : 1231231,
 * 	"date" : ,
 * 	"venue_name": "Passeio Marítimo Algés"
 * 	"city" : "Lisboa"
 * }]
 */