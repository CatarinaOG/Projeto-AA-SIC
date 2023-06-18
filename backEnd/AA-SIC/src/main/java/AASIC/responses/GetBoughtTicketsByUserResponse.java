package AASIC.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetBoughtTicketsByUserResponse {

    private int id;
    private String start_date;
    private String end_date;
    private String ticket_type;
    private String event_name;
    private String event_place;
    private float ticket_price;
    private String ticket_file;

}
