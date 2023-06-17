package AASIC.requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuggestEventRequest {

    private String event_name;
    private String address;
    private String start_date;
    private String end_date;


}
