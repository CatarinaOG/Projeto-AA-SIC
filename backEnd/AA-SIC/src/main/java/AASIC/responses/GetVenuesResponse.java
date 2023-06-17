package AASIC.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetVenuesResponse {
    private String venue_name;
    private int venue_code;
}

/**
 * [{
 * "venue_name": "Altice Arena",
 * "venue_code": 12
 * },
 * {
 * "venue_name": "LAV - Lisboa ao Vivo",
 * "venue_code": 13
 * },...]
 */