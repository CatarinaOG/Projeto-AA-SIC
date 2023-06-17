package AASIC.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellTicketRequest {

    private int event_id;
    private int type_id;
    private float price;
    private String description;
    private String file;

}
