package AASIC.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetTicketTypesEventReponse {

    private int id;
    private String description;
    private float price;
    private float max_price;

}
