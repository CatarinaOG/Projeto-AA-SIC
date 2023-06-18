package AASIC.responses;

import AASIC.model.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetFiltersResponse {
    private List<String> place;
    private List<String> category;
}
