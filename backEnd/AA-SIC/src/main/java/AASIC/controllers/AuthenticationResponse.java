package AASIC.controllers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private String token;
    private String type;
    private String profile_pic;
    private String name;
    private String phone;
    private String language;
    private String card_number;
    private String card_cvc;
}
