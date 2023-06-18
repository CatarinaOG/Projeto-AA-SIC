package AASIC.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetFilteredEventsRequest {
    private String filter_text;
    private String filter_place;
    private String filter_time;
    private String filter_category;
}
