package AASIC.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetTicketsTypeEventRequest {
    private int ticket_type_id;
    private int event_id;
}
