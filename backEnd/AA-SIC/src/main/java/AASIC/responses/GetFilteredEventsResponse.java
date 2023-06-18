package AASIC.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetFilteredEventsResponse {
    private int id;
    private String start_date;
    private String end_date;
    private String event_name;
    private String event_place;
}
