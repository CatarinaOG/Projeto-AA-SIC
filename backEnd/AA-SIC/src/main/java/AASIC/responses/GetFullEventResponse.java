package AASIC.responses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetFullEventResponse {

    private int id;
    private String start_date;
    private String end_date;
    private String event_name;
    private String event_place;
    private String image;
    private int tickets_available;
    private int tickets_sold;
    private int tickets_wanted;
    private boolean event_saved;
    private boolean event_followed;
    private String lat;
    private String lng;
    private int upcoming_events; // upcoming events da localização deste evento


}
