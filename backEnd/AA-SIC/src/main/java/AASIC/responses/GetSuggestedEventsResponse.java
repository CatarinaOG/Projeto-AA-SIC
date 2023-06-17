package AASIC.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetSuggestedEventsResponse {

    private int id;
    private String name;
    private String address;
    private String start_date;
    private String end_date;

}
