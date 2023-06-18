package AASIC.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetEventsResponse {

    private int id;
    private String start_date;
    private String end_date;
    private String name;
    private String address;

}
