package features.jdbc.domain.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class DepartmentResponseDTO {
    private String dept_id;
    private String dept_name;
    private String loc_id;
}
