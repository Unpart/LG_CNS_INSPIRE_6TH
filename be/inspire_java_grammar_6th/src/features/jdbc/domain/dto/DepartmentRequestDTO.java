package features.jdbc.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DepartmentRequestDTO {
    private String dept_id;
    private String dept_name;
    private String loc_id;
}
