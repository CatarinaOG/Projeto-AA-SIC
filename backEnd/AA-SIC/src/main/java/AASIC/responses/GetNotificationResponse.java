package AASIC.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetNotificationResponse {
    private int notification_id;
    private String title;
    private String content;
    private String date;
}
