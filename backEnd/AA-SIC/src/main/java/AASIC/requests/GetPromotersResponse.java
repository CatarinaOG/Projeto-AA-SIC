package AASIC.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetPromotersResponse {

    private int id;
    private String email;
    private String password;
    private String name;

}
