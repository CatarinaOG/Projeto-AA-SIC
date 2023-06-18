package AASIC.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetTicketsTypeEventResponse {
    private int id;
    private String description;
    private float price;
    private String user_image;
    private String user_name;
}
