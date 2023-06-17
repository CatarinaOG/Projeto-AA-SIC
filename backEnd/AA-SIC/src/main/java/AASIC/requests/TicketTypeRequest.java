package AASIC.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketTypeRequest {
    private String ticket_type;
    private float price;
    private String type_date_start;
    private String type_date_end;

}

/**
 *  * 	"event_types" : [{
 *  * 		"ticket_type" : "Bilhete Diário",
 *  * 		"price" : 42.00,
 *  * 		"type_date_star": "19/06/2023",
 *  * 		"type_date_end" : "19/06/2023",
 *  *        },...]
 */
