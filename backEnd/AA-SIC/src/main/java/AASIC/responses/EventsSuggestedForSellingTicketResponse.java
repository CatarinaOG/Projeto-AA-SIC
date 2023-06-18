package AASIC.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventsSuggestedForSellingTicketResponse {

    private int id;
    private String date;
    private String duration;
    private String name;
    private String address;

}
