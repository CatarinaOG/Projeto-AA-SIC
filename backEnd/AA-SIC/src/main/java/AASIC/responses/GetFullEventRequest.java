package AASIC.responses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetFullEventRequest {

    private int id;
    private String day_of_week;
    private String month;
    private String day;
    private String time;
    private String event_name;
    private String event_place;
    private String image;
    private int tickets_available;
    private int tickets_sold;
    private int tickets_wanted;
    private boolean is_saved;
    private boolean is_followed;
    private String lat;
    private String lng;
    private int upcoming_events; // upcoming events da localização deste evento

}
