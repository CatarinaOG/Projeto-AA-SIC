package AASIC.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestHeader;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EditProfileRequest {
    private String email;
    private String phone;
    private String password;
    private String language;
    private String card_number;
    private String card_cvc;
}
