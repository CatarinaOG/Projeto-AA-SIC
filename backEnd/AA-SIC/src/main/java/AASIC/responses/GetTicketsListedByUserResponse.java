package AASIC.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetTicketsListedByUserResponse {

    private String day_of_week;
    private String month;
    private int day;
    private String time;
    private String ticket_type;
    private String event_name;
    private String event_place;
    private float ticket_price;
    private int ticket_id;
    private String ticket_status;


}
